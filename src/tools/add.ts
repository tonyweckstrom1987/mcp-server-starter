/** Laskee lukujen summan. Heittää virheen, jos listassa on epäfiniitti arvo. */
export function add(numbers: number[]): number {
  for (const n of numbers) {
    if (!Number.isFinite(n)) {
      throw new Error(`Virheellinen luku: ${n}`);
    }
  }
  return numbers.reduce((sum, n) => sum + n, 0);
}
