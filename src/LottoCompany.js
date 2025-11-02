import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import { 
  LOTTO_NUMBERS_PER_TICKET, 
  LOTTO_PRICE, 
  MAX_NUMBER_RANGE, 
  MIN_NUMBER_RANGE, 
  PRIZES
} from './Constants.js';

class LottoCompany {
  #winningNumbers;
  #bonusNumber;

  constructor() {
    this.#winningNumbers = [];
    this.#bonusNumber = null;
  }

  issueLottos(purchasePrice) {
    const ticketsCount = purchasePrice / LOTTO_PRICE;

    return Array.from({ length: ticketsCount }, () => this.#createLotto());
  }

  #createLotto() {
    const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
      MIN_NUMBER_RANGE,
      MAX_NUMBER_RANGE,
      LOTTO_NUMBERS_PER_TICKET
    ).sort((a, b) => a - b);

    return new Lotto(lottoNumbers);
  }

  getMatchedCounts(lottos) {
    // 0: 1등, 1: 2등, 2: 3등, 3: 4등, 4: 5등
    const rankCounts = Array.from({ length: 5 }, () => 0);

    lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getNumbers();
      const matchCount = this.#getMatchCount(lottoNumbers);
      const rank = this.#getRank(matchCount, lottoNumbers);
      if (rank) {
        rankCounts[rank - 1]++;
      }
    });

    return rankCounts;
  }

  #getMatchCount(lottoNumbers) {
    return lottoNumbers.filter((num) => this.#winningNumbers.includes(num)).length;
  }

  #getRank(matchCount, lottoNumbers) {
    if (matchCount === 6) {
      return 1;
    } else if (matchCount === 5) {
      // 보너스 번호의 일치여부에 따른 2등과 3등 구분
      const hasBonus = lottoNumbers.includes(this.#bonusNumber);
      return 2 + !hasBonus;
    } else if (matchCount === 4) {
      return 4;
    } else if (matchCount === 3) {
      return 5;
    }

    return null;
  }

  getTotalPrize(rankCounts) {
    return rankCounts.reduce((total, count, index) => {
      return total + count * PRIZES[index];
    }, 0);
  }

  setWinningNumbers(winningNumbers) {
    this.#winningNumbers = winningNumbers;
  }

  setBonusNumber(bonusNumber) {
    this.#bonusNumber = bonusNumber;
  }
}

export default LottoCompany;