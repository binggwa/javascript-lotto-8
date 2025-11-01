import { MissionUtils } from '@woowacourse/mission-utils';
import UserInput from './UserInput.js';
import OutputFormat from './OutputFormat.js';
import LottoStore from './LottoStore.js';
import LottoResult from './LottoResult.js';

class App {
  async run() {
    try {
      // 구입금액 입력받아서 저장 및 검증
      const purchasePrice = await UserInput.readPurchasePrice();

      // 로또 구매
      const lottos = LottoStore.buyLotto(purchasePrice);
      
      // 구매한 로또 갯수 출력
      OutputFormat.printLottoTicketsAmount(purchasePrice);

      // 구매한 로또번호 출력
      OutputFormat.printLottoNumbers(lottos);
      
      // 당첨번호 입력받아서 저장 및 검증
      const winningNumbers = await UserInput.readWinningNumbers();
      
      // 보너스번호 입력받아서 저장 및 검증
      const bonusNumber = await UserInput.readBonusNumber(winningNumbers);

      // 당첨번호와 로또번호가 몇 개 맞는지 확인
      const rankCounts = LottoResult.match(lottos, winningNumbers, bonusNumber);

      // 당첨 통계 출력
      OutputFormat.printStatistics(rankCounts);

      // 총 당첨상금 계산
      const totalPrize = LottoResult.calculateTotalPrize(rankCounts);

      // 총 수익률 계산
      const totalReturn = LottoResult.calculateTotalReturn(totalPrize, purchasePrice);

      // 총 수익률 출력
      OutputFormat.printTotalReturn(totalReturn);
    } catch (error) {
      MissionUtils.Console.print(error.message);
      throw error;
    }
  } 
}

export default App;