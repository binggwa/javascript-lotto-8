import { MissionUtils } from "@woowacourse/mission-utils";
import Constants from './Constants.js';

class OutputFormat {
  static printLottoTicketsAmount(purchasePrice){
    const lottoTicketsAmount = (purchasePrice / Constants.PRICE_UNIT);
    MissionUtils.Console.print(`\n${lottoTicketsAmount}개를 구매했습니다.`);
  }

  static printLottoNumbers(lottos) {
    lottos.forEach((lotto) => {
      const nums = lotto.getNumbers();
      MissionUtils.Console.print(`[${nums.join(', ')}]`);
    });
  }

  static printStatistics(rankCounts) {
    MissionUtils.Console.print('\n당첨 통계\n---');
    MissionUtils.Console.print(`3개 일치 (5,000원) - ${rankCounts.fifth}개`);
    MissionUtils.Console.print(`4개 일치 (50,000원) - ${rankCounts.fourth}개`);
    MissionUtils.Console.print(`5개 일치 (1,500,000원) - ${rankCounts.third}개`);
    MissionUtils.Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankCounts.second}개`);
    MissionUtils.Console.print(`6개 일치 (2,000,000,000원) - ${rankCounts.first}개`);
  }

  static printTotalReturn(totalReturn) {
    MissionUtils.Console.print(`총 수익률은 ${totalReturn}%입니다.`);
  }
}

export default OutputFormat;