import { 
  LOTTO_NUMBERS_PER_TICKET, 
  LOTTO_PRICE, 
  MAX_NUMBER_RANGE, 
  MIN_NUMBER_RANGE 
} from './Constants';

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
    const lottoNumbers = MissionUtils.Random.pickUniqueNumberInRange(
      MIN_NUMBER_RANGE,
      MAX_NUMBER_RANGE,
      LOTTO_NUMBERS_PER_TICKET
    ).sort((a, b) => a - b);

    return new Lotto(lottoNumbers);
  }
}