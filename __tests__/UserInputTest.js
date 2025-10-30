import UserInput from '../src/UserInput.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

describe('UserInput 검증 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test.each([
    { input: '1000', expected: 1000 },
    { input: '200000000', expected: 200000000 },
  ])('구입 금액 정상 테스트: $input', async ({ input, expected }) => {
    mockQuestions([input]);
    await expect(UserInput.readPurchasePrice()).resolves.toBe(expected);
  });
  
  test.each([
    { input: 'abcde' },
    { input: '999' },
    { input: '-1000' },
    { input: '2500' },
    { input: '' },
    { input: '    ' },
  ])('구입 금액 예외 테스트: "$input"', async ({ input }) => {
    mockQuestions([input]);
    await expect(UserInput.readPurchasePrice()).rejects.toThrow(/^\[ERROR\]/);
  });
});