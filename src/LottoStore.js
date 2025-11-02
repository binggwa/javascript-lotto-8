import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from './Lotto';
import Constants from './Constants';

class LottoStore {
  static pickLottoNumbersAndSort() {
    const lottoNumbers = MissionUtils.Random
    .pickUniqueNumbersInRange(
      Constants.MIN_NUMBER_RANGE, 
      Constants.MAX_NUMBER_RANGE,
      Constants.LOTTO_NUMBERS_PER_TICKET,
    )
    .sort((a, b) => a - b);

    return new Lotto(lottoNumbers);
  }

  static buyLotto(purchasePrice) {
    const ticketsCount = purchasePrice / Constants.PRICE_UNIT;
    const ticketsList = [];
    for (let i = 0; i < ticketsCount; i++) {
      ticketsList.push(LottoStore.pickLottoNumbersAndSort());
    }

    return ticketsList;
  }
}

export default LottoStore;