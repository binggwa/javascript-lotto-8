import { MissionUtils } from '@woowacourse/mission-utils';

class UserInput {
  static async readPurchasePrice() {
    const purchasePriceStr = await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n');

    const trimmedPrice = purchasePriceStr.trim();
    if (!trimmedPrice) {
      throw new Error('[ERROR] 구입 금액이 비어있습니다!');
    }

    const purchasePrice = Number(trimmedPrice);
    if (Number.isNaN(purchasePrice)) {
      throw new Error('[ERROR] 구입 금액이 숫자가 아닙니다!');
    };

    if (purchasePrice < 1000) {
      throw new Error('[ERROR] 구입 최소 금액은 1,000원 입니다!');
    }

    if (purchasePrice % 1000 !== 0) {
      throw new Error('[ERROR] 구입 금액은 1,000의 배수여야 합니다!');
    }

    return purchasePrice;
  }

  static async readWinningNumbers() {
    // 당첨번호 입력받아서 저장
    const winningNumbersStr = await MissionUtils.Console.readLineAsync('\n당첨 번호를 입력해 주세요\n');
    const winningNumbers = winningNumbersStr.split(',').map(numStr => Number(numStr.trim())).filter(num => !Number.isNaN(num));

    // 당첨번호 검증
    if (winningNumbers.length !== 6) throw new Error('[ERROR] 당첨 번호는 6개여야 합니다!');

    const isOutRange = winningNumbers.some(
      (num) => num < 1 || num > 45,
    );
    if (isOutRange) {
      throw new Error('[ERROR] 당첨 번호는 1~45 범위여야 합니다!');
    }
    
    if (new Set(winningNumbers).size !== 6) throw new Error('[ERROR] 당첨 번호는 중복되지 않아야 합니다!');

    return winningNumbers;
  }
}

export default UserInput;