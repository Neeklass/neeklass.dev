---
title: "Beispielentwurf: Markdown prüfen"
description: "Eine technische Testdatei für das Bloglayout, kein veröffentlichter Artikel."
publishedAt: 2026-10-07
updatedAt: 2026-10-08
tags:
  - markdown
  - test
draft: true
translationKey: example-draft
---

Dieser **Beispielentwurf** dient ausschließlich zum Prüfen der Darstellung.
Er ist kein persönlicher Artikel von Niklas Dittmann und bleibt unveröffentlicht.

## Text und Struktur

Kurze Absätze, verständliche Überschriften und konkrete Beispiele machen
technische Inhalte leichter lesbar. Dieser Absatz prüft die Textbreite.
Ein [Link zum Blog](/blog/) und `Inline-Code` gehören ebenfalls zum Test.

- Markdown bleibt die Quelle.
- Astro erzeugt statisches HTML.
- Ein Entwurf ist nur unter seiner direkten URL in der Entwicklung erreichbar.

> Diese Datei nicht als echten Artikel veröffentlichen. Für eigene Texte einen
> neuen Ordner anlegen.

## Code

```ts
const message = 'A deliberately long line to check keyboard scrolling on narrow screens without making the whole page overflow.';
console.log(message);
```

## Bild

![Ein Ablaufdiagramm mit drei Schritten: Markdown, Astro und HTML.](./flow.svg)

Das lokale Bild liegt direkt neben dieser Markdown-Datei. Es ist eine
Testgrafik für diesen Entwurf, kein Projektbeleg.

## Tabelle

| Quelle | Ergebnis |
| --- | --- |
| Markdown | Statisches HTML |
| Entwurf | Lokale Vorschau |
