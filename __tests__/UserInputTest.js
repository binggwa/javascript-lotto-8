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

  test.each([
    { input: '1,2,3,4,5,6', expected: [1, 2, 3, 4, 5, 6] },
    { input: '40,41,42,43,44,45', expected: [40, 41, 42, 43, 44, 45] },
  ])('당첨 번호 정상 테스트: $input', async ({ input, expected }) => {
    mockQuestions([input]);
    await expect(UserInput.readWinningNumbers()).resolves.toEqual(expected);
  });

  test.each([
    { input: '1,2,3,4,5', message: '당첨 번호 개수 부족' },
    { input: '1,2,3,4,5,5', message: '당첨 번호 중복' },
    { input: '0,1,2,3,4,5', message: '당첨 번호 하한 범위 이탈' },
    { input: '1,2,3,4,5,46', message: '당첨 번호 상한 범위 이탈' },
    { input: 'a,b,c,d,e,f', message: '당첨 번호 숫자 아님' },
  ])('당첨 번호 예외 테스트: "$input", $message', async ({ input }) => {
    mockQuestions([input]);
    await expect(UserInput.readWinningNumbers()).rejects.toThrow(/^\[ERROR\]/);
  });

  test.each([
    { input: '1', winNumber: [2, 3, 4, 5, 6, 7], expected: 1 },
    { input: '45', winNumber: [1, 2, 3, 4, 5, 6], expected: 45 },
  ])('보너스 번호 정상 테스트: $input', async ({ input, winNumber, expected }) => {
    mockQuestions([input]);
    await expect(UserInput.readBonusNumber(winNumber)).resolves.toBe(expected);
  });

  test.each([
    { input: 'a', winNumber: [1, 2, 3, 4, 5, 6], message: '보너스 번호 숫자 아님' },
    { input: '0', winNumber: [1, 2, 3, 4, 5, 6], message: '보너스 번호 하한 이탈' },
    { input: '46', winNumber: [1, 2, 3, 4, 5, 6], message: '보너스 번호 상한 이탈' },
    { input: '1', winNumber: [1, 2, 3, 4, 5, 6], message: '당첨 번호와 중복' },
  ])('보너스 번호 예외 테스트: "$input", $message', async ({ input, winNumber }) => {
    mockQuestions([input]);
    await expect(UserInput.readBonusNumber(winNumber)).rejects.toThrow(/^\[ERROR\]/);
  });

});