import ConsoleInput from './common/ConsoleInput.js';
import ConsoleOutput from './common/ConsoleOutput.js';
import LottoBuyer from './lottos/LottoBuyer.js';
import LottoCompany from './lottos/LottoCompany.js';

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
  }
} 

export default App;