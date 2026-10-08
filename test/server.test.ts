import { describe, it, expect } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "../src/server.js";

async function connect(): Promise<Client> {
  const server = createServer();
  const client = new Client({ name: "test-client", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

type TextContent = { type: string; text?: string };

function firstText(result: { content?: unknown }): string {
  const content = result.content as TextContent[];
  return content[0]?.text ?? "";
}

describe("MCP-palvelin", () => {
  it("listaa esimerkkityökalut", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.map((t) => t.name).sort()).toEqual(["add", "greet"]);
  });

  it("kutsuu greet-työkalua", async () => {
    const client = await connect();
    const result = await client.callTool({ name: "greet", arguments: { name: "Tony", language: "en" } });
    expect(firstText(result)).toBe("Hello, Tony!");
  });

  it("kutsuu add-työkalua", async () => {
    const client = await connect();
    const result = await client.callTool({ name: "add", arguments: { numbers: [2, 3, 4] } });
    expect(firstText(result)).toBe("9");
  });

  it("palauttaa virheen tyhjällä nimellä", async () => {
    const client = await connect();
    const result = await client.callTool({ name: "greet", arguments: { name: " " } });
    expect(result.isError).toBe(true);
  });
});
