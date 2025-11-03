import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import { 
  LOTTO_NUMBERS_PER_TICKET, 
  LOTTO_PRICE, 
  MAX_NUMBER_RANGE, 
  MIN_NUMBER_RANGE, 
  PRIZES
} from '../common/Constants.js';

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

  /**
   * 각 등수별 당첨 갯수를 계산해 반환한다.
   * 
   * @param {Lotto[]} lottos 구매한 로또 목록
   * @returns {number[]} 각 등수별 당첨 갯수 배열
   */
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
  
  /**
   * 당첨번호 일치 갯수에 따라 로또 등수를 반환한다.
   * 
   * @param {number} matchCount 당첨번호 일치 갯수
   * @param {number[]} lottoNumbers 로또 번호 배열
   * @returns {number | null} 로또 등수 (1~5), 일치하지 않으면 null
   */
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

  /**
   * 각 등수별 당첨 갯수를 이용해 총 당첨금을 계산하여 반환한다.
   * 
   * @param {number[]} rankCounts 각 등수별 당첨 갯수 배열
   * @returns {number} 총 당첨금
   */
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