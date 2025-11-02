import { MissionUtils } from "@woowacourse/mission-utils";
import { LOTTO_PRICE } from './Constants.js';

class ConsoleOutput {
  static printLottoTicketsAmount(purchasePrice){
    const lottoTicketsAmount = (purchasePrice / LOTTO_PRICE);
    MissionUtils.Console.print(`\n${lottoTicketsAmount}개를 구매했습니다.`);
  }

  static printLottoNumbers(lottos) {
    lottos.forEach((lotto) => {
      const nums = lotto.getNumbers();
      MissionUtils.Console.print(`[${nums.join(', ')}]`);
    });
  }

  // rankCounts [1등, 2등, 3등, 4등, 5등]
  static printStatistics(rankCounts) {
    MissionUtils.Console.print('\n당첨 통계\n---');
    MissionUtils.Console.print(`3개 일치 (5,000원) - ${rankCounts[4]}개`);
    MissionUtils.Console.print(`4개 일치 (50,000원) - ${rankCounts[3]}개`);
    MissionUtils.Console.print(`5개 일치 (1,500,000원) - ${rankCounts[2]}개`);
    MissionUtils.Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankCounts[1]}개`);
    MissionUtils.Console.print(`6개 일치 (2,000,000,000원) - ${rankCounts[0]}개`);
  }

  static printTotalReturn(totalReturn) {
    MissionUtils.Console.print(`총 수익률은 ${totalReturn}%입니다.`);
  }
}

export default ConsoleOutput;