class LottoBuyer {
  #money;
  #lottos;

  constructor(money) {
    this.#money = money;
    this.#lottos = [];
  }

  buyLottos(lottoCompany) {
    this.#lottos = lottoCompany.issueLottos(this.#money);
  }

  getProfitRate(totalPrize) {
    return ((totalPrize / this.#money) * 100).toFixed(1);
  }

  getLottos() {
    return this.#lottos;
  }
}

export default LottoBuyer;