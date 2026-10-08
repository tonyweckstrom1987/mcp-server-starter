import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { greet } from "./tools/greet.js";
import { add } from "./tools/add.js";

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/**
 * Rakentaa MCP-palvelimen ja rekisteröi esimerkkityökalut.
 * Lisää omat työkalusi tähän: yksi `server.registerTool(...)` per työkalu.
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "mcp-server-starter",
    version: "0.1.0",
  });

  server.registerTool(
    "greet",
    {
      title: "Tervehdi",
      description: "Palauttaa tervehdyksen annetulle nimelle suomeksi tai englanniksi.",
      inputSchema: {
        name: z.string().describe("Tervehdittävän nimi"),
        language: z.enum(["fi", "en"]).optional().describe("Kieli: 'fi' (oletus) tai 'en'"),
      },
    },
    async ({ name, language }) => {
      try {
        return { content: [{ type: "text" as const, text: greet(name, language) }] };
      } catch (err) {
        return { isError: true, content: [{ type: "text" as const, text: errorMessage(err) }] };
      }
    },
  );

  server.registerTool(
    "add",
    {
      title: "Laske summa",
      description: "Laskee annettujen lukujen summan.",
      inputSchema: {
        numbers: z.array(z.number()).min(1).describe("Lista summattavia lukuja"),
      },
    },
    async ({ numbers }) => {
      try {
        return { content: [{ type: "text" as const, text: String(add(numbers)) }] };
      } catch (err) {
        return { isError: true, content: [{ type: "text" as const, text: errorMessage(err) }] };
      }
    },
  );

  return server;
}
