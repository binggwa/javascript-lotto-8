import { MissionUtils } from '@woowacourse/mission-utils';
import Constants from './Constants.js';

class UserInput {
  static async readPurchasePrice() {
    const purchasePriceStr = await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n');

    const trimmedPrice = purchasePriceStr.trim();
    if (!trimmedPrice) {
      throw new Error('[ERROR] 구입 금액이 비어있습니다!');
    }

    const purchasePrice = Number(trimmedPrice);
    this.#validatePurchasePrice(purchasePrice);

    return purchasePrice;
  }

  static #validatePurchasePrice(price) {
    if (Number.isNaN(price)) {
      throw new Error('[ERROR] 구입 금액이 숫자가 아닙니다!');
    }
    if (price < MIN_PURCHASE_PRICE) {
      throw new Error(`[ERROR] 구입 최소 금액은 ${Constants.PRICE_UNIT}원 입니다!`);
    }
    if (price % MIN_PURCHASE_PRICE !== 0) {
      throw new Error(`[ERROR] 구입 금액은 ${Constants.PRICE_UNIT}의 배수여야 합니다!`);
    }
  }

  static async readWinningNumbers() {
    // 당첨번호 입력받아서 저장
    const winningNumbersStr = await MissionUtils.Console.readLineAsync('\n당첨 번호를 입력해 주세요\n');
    const winningNumbers = winningNumbersStr.split(',').map(numStr => Number(numStr.trim())).filter(num => !Number.isNaN(num));

    // 당첨번호 검증
    this.#validateWinningNumbers(winningNumbers);

    return winningNumbers;
  }

  static #validateWinningNumbers(nums) {
    if (nums.length !== Constants.LOTTO_NUMBERS_PER_TICKET) {
      throw new Error(`[ERROR] 당첨 번호는 ${Constants.LOTTO_NUMBERS_PER_TICKET}개여야 합니다!`);
    }

    const isOutRange = nums.some((num) => num < Constants.MIN_NUMBER_RANGE || num > Constants.MAX_NUMBER_RANGE);
    if (isOutRange) {
      throw new Error(`[ERROR] 당첨 번호는 ${Constants.MIN_NUMBER_RANGE}~${Constants.MAX_NUMBER_RANGE} 범위여야 합니다!`);
    }
    
    if (new Set(nums).size !== Constants.LOTTO_NUMBERS_PER_TICKET) throw new Error('[ERROR] 당첨 번호는 중복되지 않아야 합니다!');
  }

  static async readBonusNumber(winningNumbers) {
    // 보너스번호 입력받아서 저장 
    const bonusNumberStr = await MissionUtils.Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n');
    const bonusNumber = Number(bonusNumberStr.trim());

    // 보너스번호 검증
    this.#validateBonusNumber(bonusNumber, winningNumbers);

    return bonusNumber;
  }

  static #validateBonusNumber(bonus, winningNumbers) {
    if (Number.isNaN(bonus) || bonus < Constants.MIN_NUMBER_RANGE || bonus > Constants.MAX_NUMBER_RANGE) {
      throw new Error(`[ERROR] 보너스 번호는 ${Constants.MIN_NUMBER_RANGE}~${Constants.MAX_NUMBER_RANGE} 범위의 숫자여야 합니다!`);
    }
    if (winningNumbers.includes(bonus)) {
      throw new Error('[ERROR] 보너스 번호가 당첨번호와 중복됩니다!');
    }
  }
}

export default UserInput;