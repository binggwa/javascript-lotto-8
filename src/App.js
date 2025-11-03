import { MissionUtils } from '@woowacourse/mission-utils';
import ConsoleInput from './common/ConsoleInput.js';
import ConsoleOutput from './common/ConsoleOutput.js';
import LottoBuyer from './lottos/LottoBuyer.js';
import LottoCompany from './lottos/LottoCompany.js';

class App {
  async run() {
    // 구입할 로또 금액 입력받기
    const purchasePrice = await this.#retryUntilValid(() => ConsoleInput.readPurchasePrice());

    // 로또 구매
    const lottoBuyer = new LottoBuyer(purchasePrice);
    const lottoCompany = new LottoCompany();
    lottoBuyer.buyLottos(lottoCompany);

    // 구매내역 출력
    ConsoleOutput.printLottoTicketsAmount(purchasePrice);
    ConsoleOutput.printLottoNumbers(lottoBuyer.getLottos());

    // 당첨번호, 보너스 번호 입력
    const winningNumbers = await this.#retryUntilValid(() => ConsoleInput.readWinningNumbers());
    const bonusNumber = await this.#retryUntilValid(() => ConsoleInput.readBonusNumber(winningNumbers));
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

  // [ERROR] 메시지 출력 후 다음 해당 지점부터 다시 입력을 받기 위한 메소드
  async #retryUntilValid(fn) {
    while (true) {
      try {
        return await fn();
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }
} 

export default App;