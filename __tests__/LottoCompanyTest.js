import { MissionUtils } from '@woowacourse/mission-utils';
import { LOTTO_PRICE } from '../src/common/Constants.js';
import LottoCompany from '../src/lottos/LottoCompany.js';
import Lotto from '../src/lottos/Lotto.js';

const mockRandoms = (arrays) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  arrays.reduce((acc, arr) => {
    return acc.mockReturnValueOnce(arr);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

describe('LottoCompany 동작 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('issueLottos 테스트: 구매 금액/1000만큼 로또 구매', () => {
    const company = new LottoCompany();
    mockRandoms([
      [1, 2, 3, 4, 5, 6],
      [40, 41, 42, 43, 44, 45],
    ]);
    const lottos = company.issueLottos(2 * LOTTO_PRICE);
    expect(lottos).toHaveLength(2);
    expect(lottos[0]).toBeInstanceOf(Lotto);
  });

  test('getMatchedCounts 테스트: 각 등수 카운팅', () => {
    const company = new LottoCompany();
    company.setWinningNumbers([1, 2, 3, 4, 5, 6]);
    company.setBonusNumber(7);

    const lottos = [
      new Lotto([1, 2, 3, 4, 5, 6]),  // 1등
      new Lotto([1, 2, 3, 4, 5, 7]),  // 2등
      new Lotto([1, 2, 3, 4, 5, 8]),  // 3등
      new Lotto([1, 2, 3, 4, 9, 10]),  // 4등
      new Lotto([1, 2, 3, 11, 12, 13]),  // 5등
      new Lotto([14, 15, 16, 17, 18, 19]),  // 일치 없음
    ];
    
    const counts = company.getMatchedCounts(lottos);
    expect(counts).toEqual([1, 1, 1, 1, 1]);
  });

  test('getTotalPrize 테스트: 매치카운트와 상금을 이용해 전체상금 계산', () => {
    const company = new LottoCompany();
    expect(company.getTotalPrize([0, 0, 0, 0, 0])).toBe(0);
    expect(company.getTotalPrize([1, 1, 1, 1, 1])).toBe(2031555000);
    expect(company.getTotalPrize([1, 2, 3, 4, 5])).toBe(
      1 * 2000000000 +
      2 * 30000000 +
      3 * 1500000 +
      4 * 50000 +
      5 * 5000
    );
  });
});