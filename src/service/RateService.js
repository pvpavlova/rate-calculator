export const RateService = {
  getRatesData() {
    return [
      {
        id: 1,
        key: "001",
        name: "Basic",
        description: "Стандартный тариф",
        monthRate: 100,
        yearRate: 1000,
        fullYearRate: 1200,
      },
      {
        id: 2,
        key: "002",
        name: "Advanced",
        description: "Продвинутый тариф",
        monthRate: 150,
        yearRate: 1400,
        fullYearRate: 1800,
      },
    ];
  },
  getRates() {
    return Promise.resolve(this.getRatesData());
  },
};
