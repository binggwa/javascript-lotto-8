class LottoResult {
  static #getMatchCount(lotto, winningNumbers) {
    const nums = lotto.getNumbers();
    return nums.filter((num) => winningNumbers.includes(num)).length;
  }
  
  static #getRank(matchCount, lotto, bonusNumber) {
    if (matchCount === 6) return 'first';
    if (matchCount === 5 && lotto.getNumbers().includes(bonusNumber)) return 'second';
    if (matchCount === 5) return 'third';
    if (matchCount === 4) return 'fourth';
    if (matchCount === 3) return 'fifth';
    return null;
  }

  static match(lottos, winningNumbers, bonusNumber) {
    const rankCounts = { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 };

    lottos.forEach((lotto) => {
      const matchCount = this.#getMatchCount(lotto, winningNumbers);
      const rank = this.#getRank(matchCount, lotto, bonusNumber);
      if (rank) rankCounts[rank]++;
    });

    return rankCounts;
  }

  static calculateTotalPrize(rankCounts) {
    return (
        (rankCounts.fifth * 5000) + 
        (rankCounts.fourth * 50000) + 
        (rankCounts.third * 1500000) + 
        (rankCounts.second * 30000000) + 
        (rankCounts.first * 2000000000)
    );
  }
    
  static calculateTotalReturn(totalPrize, purchasePrice) {
    return Number(((totalPrize / purchasePrice) * 100).toFixed(1));
  }
}