import Chart from './Chart';
import Topbar from './Topbar';
import Transactions from './Transactions';

export default class FinacialOverviewPage {
  constructor() {
    $('.all-wrapper').waitForDisplayed();
  }

  isDisplayed() {
    return $('.all-wrapper').isDisplayed();
  }

  get topBar() {
    return new Topbar();
  }

  get transactions() {
    return new Transactions();
  }

  get chart() {
    return new Chart();
  }

  flashSaleGif1() {
    return $('#flashSale img');
  }

  flashSaleGif2() {
    return $('#flashSale2 img');
  }
}
