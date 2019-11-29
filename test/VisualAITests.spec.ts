import FinancialOverviewPage from 'src/pages/FinancialOverviewPage';
import LoginPage from 'src/pages/LoginPage';
import { Target } from '@applitools/eyes-webdriverio';
declare let eyes: any;

describe('On the Login page,', () => {
  beforeEach(() => new LoginPage().open());
  it('UI elements are displayed', () => {
    browser.call(() => eyes.open(browser));
    browser.call(() => eyes.check('Login Page', Target.window()));
    browser.call(() => eyes.close());
  });

  describe('entering', () => {
    it('empty credentials, an error is thrown', () => {
      new LoginPage().login('', '');
      browser.call(() => eyes.open(browser));
      browser.call(() => eyes.check('Empty Credentials', Target.window()));
      browser.call(() => eyes.close());
    });

    it('only password, an error is thrown', () => {
      new LoginPage().login('', 'a');
      browser.call(() => eyes.open(browser));
      browser.call(() => eyes.checkWindow('Only Password'));
      browser.call(() => eyes.close());
    });

    it('only username, an error is thrown', () => {
      new LoginPage().login('a', '');
      browser.call(() => eyes.open(browser));
      browser.call(() => eyes.checkWindow('Only Username'));
      browser.call(() => eyes.close());
    });

    it('valid credentials, the login should be succesful', () => {
      new LoginPage().login('James', 'Bond');
      browser.call(() => eyes.open(browser));
      browser.call(() => eyes.checkWindow('Dashboard'));
      browser.call(() => eyes.close());
    });
  });
});

describe('On the FinancialOverview page', () => {
  it('the sort of Amount column from Recent Transactions table works', () => {
    new LoginPage().open();
    new LoginPage().login('James', 'Bond');
    browser.call(() => eyes.open(browser));
    // Click header to sort
    new FinancialOverviewPage().transactions.amountColumnHeader();
    browser.call(() => eyes.check('After Sort', Target.window()));
    browser.call(() => eyes.close());
  });
});

describe('On the FinancialOverview page, clicking Compare Expenses link', () => {
  it('should display Expenses and Forescasts Comparison chart ', () => {
    new LoginPage().open('?showAd=true');
    new LoginPage().login('James', 'Bond');
    const financialOverviewPage = new FinancialOverviewPage();
    financialOverviewPage.topBar.compareExpenses();
    browser.call(() => eyes.open(browser));
    browser.call(() => eyes.check('2017/2018 chart', Target.window()));
    financialOverviewPage.chart.showDataForNextYear();
    browser.call(() => eyes.check('2017/2018/2019 chart', Target.window()));
    browser.call(() => eyes.close());
  });
});

describe('On the FinancialOverview page when using showAd=true to URL', () => {
  it('ad gifs should be displayed', () => {
    new LoginPage().open('?showAd=true');
    new LoginPage().login('James', 'Bond');
    const flashSaleGif1 = new FinancialOverviewPage().flashSaleGif1();
    const flashSaleGif2 = new FinancialOverviewPage().flashSaleGif2();
    browser.call(() => eyes.open(browser));
    browser.call(() =>
      eyes.check('Gifs', Target.window().layout(flashSaleGif1, flashSaleGif2))
    );
    browser.call(() => eyes.close());
  });
});
