export function mapIngredientAmount(
  unit: string,
  amount: number | null
): string {
  const unitMap: { [key: string]: string } = {
    GRAM: 'gram',
    KILOGRAM: 'kilogram',
    LITER: 'liter',
    MILLILITER: 'milliliter',
    PIECE: 'stuks',
    TEASPOON: 'theelepels',
    TABLESPOON: 'eetlepels',
    CUP: 'kopjes',
    PINCH: 'snufjes',
    SOME: 'wat',
    OTHER: 'anders',
  };

  if (
    amount === 1 ||
    amount === 0 ||
    (amount === null && unit !== 'SOME')
  ) {
    return unitMap[unit].slice(0, -1);
  }

  return unitMap[unit] || unit;
}
