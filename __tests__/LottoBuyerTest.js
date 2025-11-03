import { LOTTO_PRICE } from '../src/common/Constants.js';
import LottoBuyer from '../src/lottos/LottoBuyer.js';
import Lotto from '../src/lottos/Lotto.js';

describe('LottoBuyer 동작 테스트', () => {
    test('getProfitRate 동작 테스트', () => {
      const buyer = new LottoBuyer(10_000);
      expect(buyer.getProfitRate(0)).toBe(0.0);
      expect(buyer.getProfitRate(10_000)).toBe(100.0);
      expect(buyer.getProfitRate(9_995)).toBe(100.0);  // 99.95 반올림
      expect(buyer.getProfitRate(1)).toBe(0.0);  // 0.01 반올림
    });

    test('buyLottos 동작 테스트', () => {
      const buyer = new LottoBuyer(2 * LOTTO_PRICE);

      const issueLottos = jest.fn().mockReturnValue([
        new Lotto([1,2,3,4,5,6]),
        new Lotto([40,41,42,43,44,45]),
      ]);

      const company = { issueLottos };
      buyer.buyLottos(company);

      const lottos = buyer.getLottos();
      expect(lottos).toHaveLength(2);
      expect(lottos[0]).toBeInstanceOf(Lotto);
    })

  });