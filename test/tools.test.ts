import { describe, it, expect } from "vitest";
import { greet } from "../src/tools/greet.js";
import { add } from "../src/tools/add.js";

describe("greet", () => {
  it("tervehtii oletuksena suomeksi", () => {
    expect(greet("Tony")).toBe("Hei, Tony!");
  });

  it("tervehtii englanniksi pyydettäessä", () => {
    expect(greet("Tony", "en")).toBe("Hello, Tony!");
  });

  it("poistaa ylimääräiset välilyönnit", () => {
    expect(greet("  Tony  ")).toBe("Hei, Tony!");
  });

  it("heittää virheen tyhjällä nimellä", () => {
    expect(() => greet("   ")).toThrow("Nimi ei voi olla tyhjä.");
  });
});

describe("add", () => {
  it("laskee summan", () => {
    expect(add([1, 2, 3.5])).toBe(6.5);
  });

  it("hylkää ei-äärelliset luvut", () => {
    expect(() => add([1, Number.NaN])).toThrow("Virheellinen luku");
  });
});
