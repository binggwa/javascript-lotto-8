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
      { message: '6개 전부 일치',
        lottoNumbers: [mockLotto([1, 2, 3, 4, 5, 6])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 1, second: 0, third: 0, fourth: 0, fifth: 0 },
      },
      { message: '5개 일치 + 보너스볼 일치',
        lottoNumbers: [mockLotto([1, 2, 3, 4, 5, 7])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 0, second: 1, third: 0, fourth: 0, fifth: 0 },
      },
      { message: '5개 일치',
        lottoNumbers: [mockLotto([1, 2, 3, 4, 5, 8])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 0, second: 0, third: 1, fourth: 0, fifth: 0 },
      },
      { message: '4개 일치',
        lottoNumbers: [mockLotto([1, 2, 3, 4, 9, 10])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 0, second: 0, third: 0, fourth: 1, fifth: 0 },
      },
      { message: '3개 일치',
        lottoNumbers: [mockLotto([1, 2, 3, 11, 12, 13])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 0, second: 0, third: 0, fourth: 0, fifth: 1 },
      },
      { message: '0개 일치',
        lottoNumbers: [mockLotto([14, 15, 16, 17, 18, 19])],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonus: 7,
        expected: { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 },
      },
      { message: '전부 포함',
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
});