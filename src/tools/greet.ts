/** Puhdas funktio: helppo testata ilman MCP-palvelinta. */
export function greet(name: string, language: "fi" | "en" = "fi"): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    throw new Error("Nimi ei voi olla tyhjä.");
  }
  return language === "fi" ? `Hei, ${trimmed}!` : `Hello, ${trimmed}!`;
}
