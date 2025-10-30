import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from './Lotto.js';

class LottoStore {
  static buyLottos(purchasePrice) {
    const ticketsCount = purchasePrice / 1000;
    // 각 로또 객체 생성
    let ticketsList = [];
    for (let i = 0; i < ticketsCount; i++) {
      const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
      const lotto = new Lotto(lottoNumbers);
      ticketsList.push(lotto);
    }

    return ticketsList;
  }
}

export default LottoStore;