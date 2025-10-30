import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

class App {
  async run() {
    try {
      // 구입금액 입력받기
      const purchasePriceStr = await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n');
      const purchasePrice = Number(purchasePriceStr);

      // 구입금액이 숫자인지 확인
      // 구입금액/1000 으로 검증 및 로또 갯수 구하기
      if (Number.isNaN(purchasePrice)) {
        throw new Error('[ERROR] 구입 금액이 숫자가 아닙니다!');
      }

      const lottoTickets = purchasePrice / 1000;
      if (!Number.isInteger(lottoTickets) || lottoTickets < 1) {
        throw new Error('[ERROR] 로또 구입 금액은 1,000의 배수여야 합니다!');
      }

      // 구한 로또 갯수로 출력
      MissionUtils.Console.print(`\n${lottoTickets}개를 구매했습니다.`);

      // MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      // 위 메소드를 로또 갯수만큼 반복, 각 로또 객체 생성
      let ticketsList = [];
      for (let i = 0; i < lottoTickets; i++) {
        const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
        const lotto = new Lotto(lottoNumbers);
        ticketsList.push(lotto);
        MissionUtils.Console.print(`[${lottoNumbers.join(', ')}]`);
      }
      
      // 당첨번호 입력받아서 저장
      const winningNumbersStr = await MissionUtils.Console.readLineAsync('\n당첨 번호를 입력해 주세요\n');
      const winningNumbers = winningNumbersStr.split(',').map(numStr => Number(numStr.trim())).filter(num => !Number.isNaN(num));

      // 당첨번호 검증
      if (winningNumbers.length !== 6) throw new Error('[ERROR] 당첨 번호는 6개여야 합니다!');
      if (winningNumbers < 1 || winningNumbers > 45) throw new Error('[ERROR] 당첨번호는 1~45 범위여야 합니다!');
      if (new Set(winningNumbers).size !== 6) throw new Error('[ERROR] 당첨 번호는 중복되지 않아야 합니다!');
      
      // 보너스번호 입력받아서 저장 
      const bonusNumberStr = await MissionUtils.Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n');
      const bonusNumber = Number(bonusNumberStr.trim());

      // 보너스번호 검증
      if (Number.isNaN(bonusNumber) || bonusNumber < 1 || bonusNumber > 45) {
        throw new Error('[ERROR] 보너스 번호는 1~45 범위의 숫자여야 합니다!');
      }
      if (winningNumbers.includes(bonusNumber)) {
        throw new Error('[ERROR] 보너스 번호가 당첨번호와 중복됩니다!');
      }

      // 당첨번호와 로또번호가 몇 개 맞는지 확인
      let [fifth, fourth, third, second, first] = [0, 0, 0, 0, 0];

      for (const lotto of ticketsList) {
        const matchCount = lotto.getNumbers().filter(num => winningNumbers.includes(num)).length;
    
        if (matchCount === 6) { first++; continue; }
        if (matchCount === 5 && lotto.getNumbers().includes(bonusNumber)) { second++; continue; }
        if (matchCount === 5) { third++; continue; }
        if (matchCount === 4) { fourth++; continue; }
        if (matchCount === 3) { fifth++; continue; }
      }

      // 당첨 통계 출력
      MissionUtils.Console.print('\n당첨 통계\n---');
      MissionUtils.Console.print(`3개 일치 (5,000원) - ${fifth}개`);
      MissionUtils.Console.print(`4개 일치 (50,000원) - ${fourth}개`);
      MissionUtils.Console.print(`5개 일치 (1,500,000원) - ${third}개`);
      MissionUtils.Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${second}개`);
      MissionUtils.Console.print(`6개 일치 (2,000,000,000원) - ${first}개`);

      // 총 당첨상금 계산
      let totalPrize = 
        (fifth * 5000) + 
        (fourth * 50000) + 
        (third * 1500000) + 
        (second * 30000000) + 
        (first * 2000000000);  
      const totalReturn = ((totalPrize / purchasePrice) * 100).toFixed(1);

      // 총 수익률 출력
      MissionUtils.Console.print(`총 수익률은 ${totalReturn}%입니다.`);
    } catch (error) {
      MissionUtils.Console.print(error.message);
      throw error;
    }
  } 
}

export default App;