import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scratch = join(tmpdir(), 'neeklass-blog-tests');

test('static blog publication, translation links, RSS and draft isolation', { timeout: 120_000 }, async () => {
  await mkdir(scratch, { recursive: true });
  const fixtureRoot = await mkdtemp(join(scratch, 'blog-test-'));
  const dependencies = join(fixtureRoot, 'node_modules');
  let linked = false;
  try {
    for (const name of ['src', 'public', 'astro.config.mjs', 'tsconfig.json', 'package.json']) {
      await cp(join(root, name), join(fixtureRoot, name), { recursive: true });
    }
    await symlink(join(root, 'node_modules'), dependencies, process.platform === 'win32' ? 'junction' : 'dir');
    linked = true;

    async function addPost(locale, slug, key, { draft = false, date = '2026-10-07', body = 'Integration test fixture. Never deploy this content.' } = {}) {
      const directory = join(fixtureRoot, 'src/content/blog', locale, slug);
      await mkdir(directory, { recursive: true });
      await writeFile(join(directory, 'index.md'), [
        '---',
        `title: "Test & <Code>: ${slug}"`,
        'description: "Integration fixture & XML escaping check."',
        `publishedAt: ${date}`,
        ...(draft === 'omitted' ? [] : [`draft: ${draft}`]),
        `translationKey: ${key}`,
        '---', '', body, '',
      ].join('\n'));
      return directory;
    }

    const imagePost = await addPost('de', 'pruefartikel', 'integration-pair', {
      body: '## Test\n\n![Test diagram](./published-diagram.svg)\n\n```ts\nconst value = 42;\n```',
    });
    await writeFile(join(imagePost, 'published-diagram.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40"/></svg>');
    await addPost('en', 'test-article', 'integration-pair');
    await addPost('de', 'nur-deutsch', 'integration-unpublished-translation', { date: '2026-10-06' });
    await addPost('en', 'unpublished-translation', 'integration-unpublished-translation', { draft: true });
    await addPost('en', 'english-only', 'integration-english-only');
    await addPost('de', 'default-draft', 'integration-default-draft', { draft: 'omitted' });

    function build() {
      try {
        return execFileSync(process.execPath, [join(root, 'node_modules/astro/bin/astro.mjs'), 'build'], {
          cwd: fixtureRoot, encoding: 'utf8', timeout: 60_000,
          env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
          stdio: 'pipe', windowsHide: true,
        });
      } catch (error) {
        throw new Error(`${error.stdout ?? ''}\n${error.stderr ?? ''}`, { cause: error });
      }
    }
    build();

    const output = join(fixtureRoot, 'dist');
    const html = (path) => readFile(join(output, path, 'index.html'), 'utf8');
    const german = await html('blog/pruefartikel');
    const english = await html('en/blog/test-article');
    assert.match(german, /<html lang="de"/);
    assert.match(english, /<html lang="en"/);
    assert.match(german, /rel="canonical" href="https:\/\/neeklass\.dev\/blog\/pruefartikel\/"/);
    assert.match(german, /hreflang="en" href="https:\/\/neeklass\.dev\/en\/blog\/test-article\/"/);
    assert.match(english, /hreflang="de" href="https:\/\/neeklass\.dev\/blog\/pruefartikel\/"/);
    assert.match(english, /hreflang="x-default" href="https:\/\/neeklass\.dev\/blog\/pruefartikel\/"/);
    assert.match(german, /class="astro-code/);
    assert.match(german, /tabindex="0"/);
    assert.match(german, /alt="Test diagram"/);
    assert.doesNotMatch(german, /<script\b|noindex/);
    assert.doesNotMatch(await html('blog/nur-deutsch'), /hreflang="en"|unpublished-translation/);
    assert.doesNotMatch(await html('en/blog/english-only'), /hreflang="de"|hreflang="x-default"/);

    const index = await html('blog');
    assert.ok(index.indexOf('/blog/pruefartikel/') < index.indexOf('/blog/nur-deutsch/'));
    for (const locale of ['de', 'en']) {
      const prefix = locale === 'de' ? 'blog' : 'en/blog';
      const feed = await readFile(join(output, prefix, 'rss.xml'), 'utf8');
      assert.match(feed, new RegExp(`<language>${locale}</language>`));
      assert.equal((feed.match(/<item>/g) ?? []).length, 2);
      assert.match(feed, /Test &amp; &lt;Code&gt;/);
      const links = [...feed.matchAll(/<link>(.*?)<\/link>/g)].map((match) => match[1]);
      assert.ok(links.every((link) => link.startsWith(`https://neeklass.dev/${prefix}/`)));
      assert.doesNotMatch(feed, /example-draft|beispiel-entwurf|unpublished-translation|default-draft/);
      const listing = await html(prefix);
      assert.doesNotMatch(listing, /example-draft|beispiel-entwurf|unpublished-translation|default-draft/);
    }
    for (const draft of ['blog/beispiel-entwurf', 'en/blog/example-draft', 'en/blog/unpublished-translation', 'blog/default-draft']) {
      await assert.rejects(html(draft), { code: 'ENOENT' });
    }
    const assets = await readdir(join(output, '_astro'));
    assert.ok(assets.some((name) => name.startsWith('published-diagram.')));
    assert.ok(!assets.some((name) => name.startsWith('flow.')), 'Draft-only image leaked into output');
    assert.equal((await readFile(join(output, 'CNAME'), 'utf8')).trim(), 'neeklass.dev');

    await addPost('de', 'duplicate-key', 'integration-pair');
    assert.throws(build, /Duplicate blog translationKey in de: integration-pair/);
  } finally {
    // Never recursively remove a dependency junction or a path outside scratch.
    assert.ok(resolve(fixtureRoot).startsWith(resolve(scratch) + sep));
    if (linked) await unlink(dependencies);
    await rm(fixtureRoot, { recursive: true, force: true });
  }
});
