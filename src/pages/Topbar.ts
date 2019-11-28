import Chart from './Chart';

export default class Topbar {
  constructor() {
    $('.top-bar').waitForDisplayed();
  }

  compareExpenses() {
    $('#showExpensesChart').click();
    return Chart;
  }
}
