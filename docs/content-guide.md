# neeklass Content Guide

Version 1.0 (October 2026). What appears where on neeklass.dev, when a project
is ready to be shown, and how pages are structured. Visual rules live in
[the brand system](brand-system.md).

## Who writes

Niklas writes all public text, in German and English. Tools (Codex, Claude)
may:

- set up the structure of a page from the templates below,
- insert clearly marked `[placeholders]` with a short hint of what belongs
  there,
- point out factual inconsistencies or missing information when asked.

Tools never write final copy, never invent facts, numbers, dates, roles or
results, and never translate a text Niklas has not approved.

Placeholders use the `Placeholder` component
(`<Placeholder hint="Was ich gelernt habe: zwei bis drei Lektionen" />`). It is
visible in development, and a production build fails while any placeholder is
rendered, so unfinished copy cannot be deployed.

## What appears where

| Information | Homepage | Project index | Project page | CV (not on the site) |
| --- | --- | --- | --- | --- |
| Name, short intro | Yes | – | – | Yes |
| Study | Optional, at most a half sentence | – | – | Yes, with university and expected degree |
| Employer and job title | No | – | – | Yes |
| Project title and one sentence | Yes | Yes | Yes | Yes |
| Role | Only if not "own project" | Yes | Yes | Yes |
| Period | No | Yes | Yes | Yes |
| Technology | No | Two or three topics | Yes, in context | Yes |
| Links (live, code, docs) | – | – | Yes | Selected |
| Limitations, lessons learned | – | – | Yes | – |
| "Description updated" date | No | No | Only while the project is ongoing | – |
| Contact | Footer | Footer | Footer | Header |

The CV is never published on the website or offered as a download.

## When a project is ready to be shown

Show a project when all four apply:

1. **There is something to see**: a running application, readable code or an
   unaltered real result.
2. **Your contribution is nameable**: which part, which decisions, which pull
   requests.
3. **You can write the minimum page**: the problem, one real decision with its
   reason, and one limitation.
4. **The page would stay true if work stopped tomorrow**: it describes what
   works, not what is planned.

For projects of other people or organisations, additionally: you are allowed
to describe it publicly, and the page reveals nothing internal.

Not yet: ideas, scaffolding without a working part, projects whose value lies
mainly in planned features. An early-stage team project can appear on the
homepage with one honest sentence before it gets its own page.

## Homepage intro

Roughly 80–120 words, in this order:

1. **Where you come from**: work with enterprise applications and workflows
   (debugging, configuration, testing, user support).
2. **Where you are heading**: software development, data engineering, AI;
   building tools that make real data usable.
3. **How you work**: AI tools such as Claude and Codex are part of the work;
   decisions and review stay with you.
4. **The name**: one line explaining that `neeklass` is pronounced like
   Niklas.

No employer, no grades, no skill list.

## Project page

Headings may be phrased freely; the order and the questions stay.

| Section | Questions to answer |
| --- | --- |
| Lead (under the title) | What problem exists, for whom? |
| Facts | Period, role, technology. |
| Das Problem | Why does the problem matter? What did people do before? |
| Ansatz | What did you build, and how do the parts work together? (Usually with a diagram.) |
| Entscheidungen | Two or three decisions: what were the options, what did you choose, why? |
| Grenzen | What does it not do, what can go wrong, what is not guaranteed? |
| Was ich gelernt habe | Two or three concrete lessons, technical or about the process. |
| Wie es weitergeht | Optional. Planned steps, or a clear statement that the scope is complete. |
| Quellen und Lizenzen | Data sources, licences, disclaimers. |

Write in the first person. State a decision once, with its reason, instead of
hedging throughout the text. Collect caveats in "Grenzen".

### Current projects

| Project | Facts to use | Still open |
| --- | --- | --- |
| Schleswig MCP | Weekend project, October 2026, ongoing; REST API and MCP server with shared domain logic; five snapshots and one live water level. Lessons: deploying an MCP server, metadata management so context is preserved. | Copy for the reason behind snapshots |
| Eurofurence Creator System | Volunteer developer since August 2026; system for the convention's social-media content creators; early stage; development and gathering requirements from stakeholders; public repository. | Homepage sentence; own page once the readiness criteria are met |

## Article

| Part | Content |
| --- | --- |
| Title | The question or the result, not a category |
| Lead | One or two sentences: what the reader will understand afterwards |
| Body | Context → problem → what you tried → what worked → limits |
| Code and figures | Only real code and real results, each with a short caption |
| End | A link to the related project or a way to get in touch |

The blog link appears in the navigation only once the first article is
published.

## Language and style

- German is the default; English pages mirror the structure exactly.
- No English labels inside German text and the other way round.
- Sentence case for headings. No uppercase labels.
- Dates: `21. Oktober 2026` in running text, `10/2026` in compact facts.
- Figures: `Abb. 1` (German), `Fig. 1` (English).
