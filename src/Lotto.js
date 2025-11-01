import Constants from "./Constants.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#validateDuplicate(numbers);
    this.#validateInRange(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== Constants.LOTTO_NUMBERS_PER_TICKET) {
      throw new Error(`[ERROR] 로또 번호는 ${Constants.LOTTO_NUMBERS_PER_TICKET}개여야 합니다.`);
    }
  }

  #validateDuplicate(numbers) {
    if (new Set(numbers).size !== Constants.LOTTO_NUMBERS_PER_TICKET) {
      throw new Error('[ERROR] 로또 번호는 중복되지 않아야 합니다!');
    }
  }

  #validateInRange(numbers) {
    const isOutRange = numbers.some(
      (num) => num < Constants.MIN_NUMBER_RANGE || num > Constants.MAX_NUMBER_RANGE,
    );
    if (isOutRange) {
      throw new Error(`[ERROR] 당첨번호는 ${Constants.MIN_NUMBER_RANGE}~${Constants.MAX_NUMBER_RANGE} 범위여야 합니다!`);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;