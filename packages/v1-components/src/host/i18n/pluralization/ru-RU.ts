export default (choice: number, choicesLength: number): number => {
  /** @example удалить рассылку | удалить рассылки */
  if (choicesLength === 2) {
    return choice === 1 ? 0 : 1
  }

  /** @example 1 яблоко|2-4 яблока, x2-x4 яблока|0 яблок, x0 яблок, 5-9 яблок, 11-14 яблок */
  const mod100 = choice % 100

  return mod100 % 10 === 1 && mod100 !== 11
    ? 0
    : (
      mod100 % 10 >= 2 &&
      mod100 % 10 <= 4 &&
      !(mod100 >= 10 && mod100 < 15)
        ? 1
        : 2
    )
}
