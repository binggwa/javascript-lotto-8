import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from './Lotto.js';

class LottoStore {
  static pickLottoNumbersAndSort() {
    const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
    return new Lotto(lottoNumbers);
  }

  static buyLotto(purchasePrice) {
    const ticketsCount = purchasePrice / 1000;
    const ticketsList = [];
    for (let i = 0; i < ticketsCount; i++) {
      ticketsList.push(LottoStore.pickLottoNumbersAndSort());
    }

    return ticketsList;
  }
}

export default LottoStore;