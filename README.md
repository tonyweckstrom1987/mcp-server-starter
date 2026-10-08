# mcp-server-starter

[![CI](https://github.com/tonyweckstrom1987/mcp-server-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/tonyweckstrom1987/mcp-server-starter/actions/workflows/ci.yml) ![Lisenssi: MIT](https://img.shields.io/badge/lisenssi-MIT-blue.svg)

Valmis TypeScript-pohja [Model Context Protocol](https://modelcontextprotocol.io) -palvelimille. Paina GitHubissa **Use this template**, niin saat oman repon, jossa rakenne, testit, CI ja julkaisutyönkulku ovat jo valmiina.

**English summary:** A ready-to-use TypeScript template for building MCP servers. It includes two example tools, tests that talk to the server through the real MCP protocol, a CI workflow (Node 20/22/24) and a tag-triggered release workflow. Click "Use this template" on GitHub and start adding your own tools in `src/server.ts`.

**Teknologiat:** TypeScript, Node.js 20/22/24, Model Context Protocol (stdio), zod, vitest. Lisenssi: [LICENSE](./LICENSE).

## Mitä mukana on

- `src/server.ts` rekisteröi kaksi esimerkkityökalua (`greet` ja `add`)
- `src/tools/` sisältää työkalujen logiikan puhtaina funktioina, jotka on helppo testata
- `test/` sisältää yksikkötestit ja palvelintestin, joka kutsuu työkaluja oikean MCP-asiakkaan kautta (muistinsisäinen yhteys)
- `.github/workflows/ci.yml` ajaa tyyppitarkistuksen, käännöksen ja testit Node-versioilla 20, 22 ja 24
- `.github/workflows/release.yml` luo GitHub-julkaisun, kun pushaat version-tagin

## Käyttöönotto

```bash
npm install
npm run build
npm test
```

Kokeile palvelinta kehitystilassa:

```bash
npm run dev
```

Palvelin puhuu stdio:n kautta, joten se käynnistetään yleensä MCP-asiakkaasta (esim. Claude Desktop tai Cursor).

### Claude Desktop

Lisää `claude_desktop_config.json`-tiedostoon:

```json
{
  "mcpServers": {
    "mcp-server-starter": {
      "command": "node",
      "args": ["/POLKU/mcp-server-starter/dist/index.js"]
    }
  }
}
```

Korvaa `/POLKU/` omalla polullasi ja aja ensin `npm run build`.

## Oman työkalun lisääminen

1. Kirjoita logiikka puhtaana funktiona tiedostoon `src/tools/oma.ts`.
2. Rekisteröi työkalu tiedostossa `src/server.ts` kutsulla `server.registerTool("oma_tyokalu", { ... }, async (input) => { ... })`.
3. Kirjoita testi tiedostoon `test/`. Palvelintesti `test/server.test.ts` näyttää, miten työkalua kutsutaan oikean MCP-asiakkaan kautta.
4. Päivitä pakettitiedot (`name`, `description`, `bin`) tiedostossa `package.json` ja palvelimen nimi tiedostossa `src/server.ts`.

## Julkaisu

```bash
git tag v0.2.0
git push origin v0.2.0
```

Tagin pushaus käynnistää `release.yml`:n: se ajaa tyyppitarkistuksen, käännöksen ja testit sekä luo GitHub-julkaisun automaattisilla julkaisutiedoilla. Julkaisu npm:ään ei ole mukana; lisää se tarvittaessa `release.yml`:ään.

## Skriptit

| Komento | Mitä tekee |
| --- | --- |
| `npm run build` | Kääntää TypeScriptin kansioon `dist/` |
| `npm run dev` | Käynnistää palvelimen suoraan lähdekoodista (tsx) |
| `npm test` | Ajaa vitest-testit |
| `npm run typecheck` | Tarkistaa tyypit kääntämättä |
