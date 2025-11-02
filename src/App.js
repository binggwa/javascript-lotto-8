import ConsoleInput from './ConsoleInput.js';
import ConsoleOutput from './ConsoleOutput.js';
import LottoBuyer from './LottoBuyer.js';
import LottoCompany from './LottoCompany.js';

class App {
  async run() {
    // 구입할 로또 금액 입력받기
    const purchasePrice = await ConsoleInput.readPurchasePrice();

    // 로또 구매
    const lottoBuyer = new LottoBuyer(purchasePrice);
    const lottoCompany = new LottoCompany();
    lottoBuyer.buyLottos(lottoCompany);

    // 구매내역 출력
    ConsoleOutput.printLottoTicketsAmount(purchasePrice);
    ConsoleOutput.printLottoNumbers(lottoBuyer.getLottos());

    // 당첨번호, 보너스 번호 입력
    const winningNumbers = await ConsoleInput.readWinningNumbers();
    const bonusNumber = await ConsoleInput.readBonusNumber(winningNumbers);
    lottoCompany.setWinningNumbers(winningNumbers);
    lottoCompany.setBonusNumber(bonusNumber);

    // 당첨 결과 집계 및 출력
    const rankCounts = lottoCompany.getMatchedCounts(lottoBuyer.getLottos());
    ConsoleOutput.printStatistics(rankCounts);

    // 총 당첨금 계산 및 출력
    const totalPrize = lottoCompany.getTotalPrize(rankCounts);
    const totalProfitRate = lottoBuyer.getProfitRate(totalPrize);
    ConsoleOutput.printTotalReturn(totalProfitRate);
      // const { purchasePrice, lottos } = await this.#purchaseLottos();
      // this.#printPurchased(purchasePrice, lottos);

      // const { winningNumbers, bonusNumber } = await this.#drawLottoNumbers();

      // // 당첨번호와 로또번호가 몇 개 맞는지 확인
      // const rankCounts = LottoResult.match(lottos, winningNumbers, bonusNumber);
      // this.#printStatistics(rankCounts, purchasePrice);
  }
} 

  // async #purchaseLottos() {
  //     // 구입금액 입력받아서 저장 및 검증
  //     const purchasePrice = await UserInput.readPurchasePrice();

  //     // 로또 구매
  //     const lottos = LottoStore.issueLottos(purchasePrice);

  //     return { purchasePrice, lottos };
  // }

  // #printPurchased(purchasePrice, lottos) {
  //     // 구매한 로또 갯수 출력
  //     OutputFormat.printLottoTicketsAmount(purchasePrice);

  //     // 구매한 로또번호 출력
  //     OutputFormat.printLottoNumbers(lottos);
  // }

  // async #drawLottoNumbers() {
  //   // 당첨번호 입력받아서 저장 및 검증
  //   const winningNumbers = await UserInput.readWinningNumbers();
      
  //   // 보너스번호 입력받아서 저장 및 검증
  //   const bonusNumber = await UserInput.readBonusNumber(winningNumbers);

  //   return { winningNumbers, bonusNumber };
  // }

  // #printStatistics(rankCounts, purchasePrice) {
  //     // 당첨 통계 출력
  //     OutputFormat.printStatistics(rankCounts);

  //     // 총 당첨상금 계산
  //     const totalPrize = LottoResult.calculateTotalPrize(rankCounts);

  //     // 총 수익률 계산
  //     const totalReturn = LottoResult.calculateTotalReturn(totalPrize, purchasePrice);

  //     // 총 수익률 출력
  //     OutputFormat.printTotalReturn(totalReturn);
  // }

export default App;