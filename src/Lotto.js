class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#validateDuplicate(numbers);
    this.#validateInRange(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  #validateDuplicate(numbers) {
    if (new Set(numbers).size !== 6) {
      throw new Error('[ERROR] 로또 번호는 중복되지 않아야 합니다!');
    }
  }

  #validateInRange(numbers) {
    const isOutRange = numbers.some(
      (num) => num < 1 || num > 45,
    );
    if (isOutRange) {
      throw new Error('[ERROR] 당첨번호는 1~45 범위여야 합니다!');
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;