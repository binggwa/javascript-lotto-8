import Lotto from "../src/Lotto";

describe("로또 클래스 테스트", () => {
  test.each([
    { nums: [1, 2, 3, 4, 5], message: '로또 번호의 개수가 6개보다 부족하면 예외가 발생한다.'},
    { nums: [1, 2, 3, 4, 5, 6, 7], message: '로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.'},
  ])('로또 번호 개수 검증 테스트: $message', ({ nums }) => {
    expect(() => new Lotto(nums)).toThrow(/^\[ERROR\]/);
  });

  test.each([
    { nums: [1, 2, 3, 4, 5, 5] },
    { nums: [10, 11, 12, 13, 13, 13] },
    { nums: [45, 44, 43, 43, 43, 43] },
  ])('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', ({ nums }) => {
    expect(() => new Lotto(nums)).toThrow(/^\[ERROR\]/);
  });

  test.each([
    { nums: [0, 1, 2, 3, 4, 5], message: '하한 edge 케이스 확인(0)' },
    { nums: [46, 45, 44, 43, 42, 41], message: '상한 edge 케이스 확인(45)' },
  ])('로또 번호가 1~45 범위를 가지는지 검증한다: $message', ({ nums }) => {
    expect(() => new Lotto(nums)).toThrow(/^\[ERROR\]/);
  });

  test.each([
    { nums: [1, 2, 3, 4, 5, 6] },
    { nums: [45, 44, 43, 42, 41, 40] },
  ])('로또 번호 정상 생성 테스트', ({ nums }) => {
    expect(() => new Lotto(nums)).not.toThrow();
  });
});
