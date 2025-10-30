import LottoResult from "../src/LottoResult.js";

const mockLotto = (num) => ({
  getNumbers: () => num,
});

describe('LottoResult 동작 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('match() 동작 테스트', () => {
    test.each([
      { 
        message: '6개 전부 일치',
        lottoNumbers: [mockLotto([1, 2, 3, 4, 5, 6])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 1, second: 0, third: 0, fourth: 0, fifth: 0 },
      },
      { 
        message: '5개 일치 + 보너스볼 일치',
        lottoNumbers: [mockLotto([1, 2, 3, 4, 5, 7])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 0, second: 1, third: 0, fourth: 0, fifth: 0 },
      },
      { 
        message: '5개 일치',
        lottoNumbers: [mockLotto([1, 2, 3, 4, 5, 8])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 0, second: 0, third: 1, fourth: 0, fifth: 0 },
      },
      { 
        message: '4개 일치',
        lottoNumbers: [mockLotto([1, 2, 3, 4, 9, 10])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 0, second: 0, third: 0, fourth: 1, fifth: 0 },
      },
      { 
        message: '3개 일치',
        lottoNumbers: [mockLotto([1, 2, 3, 11, 12, 13])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 0, second: 0, third: 0, fourth: 0, fifth: 1 },
      },
      { 
        message: '0개 일치',
        lottoNumbers: [mockLotto([14, 15, 16, 17, 18, 19])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 },
      },
      { 
        message: '전부 포함',
        lottoNumbers: [
          mockLotto([1, 2, 3, 4, 5, 6]),
          mockLotto([1, 2, 3, 4, 5, 7]),
          mockLotto([1, 2, 3, 4, 5, 8]),
          mockLotto([1, 2, 3, 4, 9, 10]),
          mockLotto([1, 2, 3, 11, 12, 13]),
          mockLotto([14, 15, 16, 17, 18, 19])
        ],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 1, second: 1, third: 1, fourth: 1, fifth: 1 },
      },
    ])('match() 동작 테스트: $message', ({ lottoNumbers, winningNumbers, bonus, expected }) => {
      const rankCounts = LottoResult.match(lottoNumbers, winningNumbers, bonus);
      expect(rankCounts).toEqual(expected);
    });
  });

  describe('calculateTotalPrize() 동작 테스트', () => {
    test.each([
      { 
        message: '0장 당첨 시',
        rankCounts: { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 },
        expectedPrize: 0,
      },
      { 
        message: '전부 1장씩 당첨 시',
        rankCounts: { first: 1, second: 1, third: 1, fourth: 1, fifth: 1 },
        expectedPrize: 2031555000,
      },
      { 
        message: '섞여서 당첨 시',
        rankCounts: { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 },
        expectedPrize: 
          1 * 2000000000 +
          2 * 30000000 +
          3 * 1500000 +
          4 * 50000 +
          5 * 5000,
      },
    ])('calculateTotalPrize() 동작 테스트: $message', ({ rankCounts, expectedPrize }) => {
      const totalPrize = LottoResult.calculateTotalPrize(rankCounts);
      expect(totalPrize).toBe(expectedPrize);
    });
  });

  describe('calculateTotalReturn() 동작 테스트', () => {
    test.each([
      { 
        message: '수익률 0.0%',
        totalPrize: 0,
        purchasePrice: 10000,
        expected: 0.0
      },
      { 
        message: '수익률 100.0%',
        totalPrize: 10000,
        purchasePrice: 10000,
        expected: 100.0
      },
      { 
        message: '소수점 자리 체크 - 반올림 올림',
        totalPrize: 9995,
        purchasePrice: 10000,
        expected: 100.0
      },
      { 
        message: '소수점 자리 체크 - 반올림 내림',
        totalPrize: 1,
        purchasePrice: 10000,
        expected: 0.0
      },
    ])('calculateTotalReturn() 동작 테스트: $message', ({ totalPrize, purchasePrice, expected }) => {
      const totalReturn = LottoResult.calculateTotalReturn(totalPrize, purchasePrice);
      expect(totalReturn).toBe(expected);
    });
  });
});