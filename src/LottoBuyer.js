class LottoBuyer {
  #money;
  #lottos;

  constructor(money) {
    this.#money = money;
    this.#lottos = [];
  }

  buyLottos(LottoCompany) {
    this.#lottos = LottoCompany.issueLottos(this.#money);
  }

  getProfitRate(totalPrize) {
    return Number(((totalPrize / this.#money) * 100).toFixed(1));
  }

  getLottos() {
    return this.#lottos;
  }
}

export default LottoBuyer;