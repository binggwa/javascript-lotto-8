import LottoStore from '../src/LottoStore.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockRandoms = (arrays) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  arrays.reduce((acc, arr) => {
    return acc.mockReturnValueOnce(arr);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

describe('LottoStore 동작 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test.each([
    { input: [1, 2, 3, 4, 5, 6] },
    { input: [40, 41, 42, 43, 44, 45] },
  ])('pickLottoNumbersAndSort 동작 테스트: $input', ({ input }) => {
    mockRandoms([input]);
    const lottos = LottoStore.pickLottoNumbersAndSort();
    expect(lottos.getNumbers()).toEqual(input);
  });

  test('buyLotto는 구매 가격/1000만큼 로또 구매', () => {
    mockRandoms([
      [1, 2, 3, 4, 5, 6],
      [40, 41, 42, 43, 44, 45],
    ]);
    const lottos = LottoStore.buyLotto(2000);
    expect(lottos).toHaveLength(2);
  });
});