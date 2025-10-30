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
}

export default UserInput;