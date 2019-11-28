import FinancialOverviewPage from 'src/pages/FinancialOverviewPage';
import LoginPage from 'src/pages/LoginPage';

declare let assert;

describe('1. On the Login page', () => {
  beforeEach(() => new LoginPage().open());
  const loginPage = new LoginPage();
  it('title should be Login Form', () => {
    assert.equal(loginPage.loginTitle(), 'Login Form');
  });
  it('logo should be displayed', () => {
    assert.isTrue(loginPage.logo.isDisplayed());
  });
  it('placeholders text for username/password inputs should be Enter your username/Enter your password', () => {
    assert.equal(loginPage.usernamePlaceholder, 'Enter your username');
    assert.equal(loginPage.passwordPlaceholder, 'Enter your password');
  });
  it('username/passowrd icons should be displayed', () => {
    assert.isTrue(loginPage.userIcon.isDisplayed());
    assert.isTrue(loginPage.fingerPrintIcon.isDisplayed());
  });
  it('labels should have correspondent text', () => {
    const labels = loginPage.labels;
    assert.equal(labels[0].getText(), 'Username');
    assert.equal(labels[1].getText(), 'Password');
    assert.equal(labels[2].getText(), 'Remember Me');
  });
  it('Remember Me check-box is displayed', () => {
    // NOTE: There is no element in the DOM to check if the input is checked or unchecked - so this assert is missing
    assert.isTrue(loginPage.rememberMeCheckBox.isDisplayed());
  });
  it('social media elements contain the corespondent names of the icons', () => {
    const socialMedia = loginPage.socialMedia;
    assert.equal(socialMedia.length, 3);
    assert.isTrue(socialMedia[0].getAttribute('src').includes('twitter'));
    assert.isTrue(socialMedia[1].getAttribute('src').includes('facebook'));
    assert.isTrue(socialMedia[2].getAttribute('src').includes('linkedin'));
  });
  it('text of logIn button should be Log In', () => {
    assert.equal(loginPage.loginButton.getText(), 'Log In');
  });

  describe('2. entering', () => {
    it('empty credentials, an error is thrown', () => {
      new LoginPage().login('', '');
      assert.equal(
        new LoginPage().alert(),
        'Both Username and Password must be present'
      );
    });

    it('only password, an error is thrown', () => {
      new LoginPage().login('', 'a');
      assert.equal(new LoginPage().alert(), 'Username must be present');
    });

    it('only username, an error is thrown', () => {
      new LoginPage().login('a', '');
      assert.equal(new LoginPage().alert(), 'Password must be present');
    });

    it('valid credentials, the login should be succesful', () => {
      new LoginPage().login('James', 'Bond');
      assert.isTrue(
        new FinancialOverviewPage().isDisplayed(),
        'Something went wrong with loging in to the app'
      );
    });
  });
});

describe('3. On the FinancialOverview page', () => {
  before(() => {
    new LoginPage().open();
    new LoginPage().login('James', 'Bond');
  });
  it('the sort of Amount column from Recent Transactions table works', () => {
    const financialOverviewPage = new FinancialOverviewPage();
    // Click header to sort the column Amounts
    financialOverviewPage.transactions.amountColumnHeader();
    const amountsAscFromTable = financialOverviewPage.transactions.getAmounts();
    // Sort the values from Amounts column and compare them with the values from the sorted column
    const amountsAsc = financialOverviewPage.transactions.amountsAscSort();
    assert.sameOrderedMembers(
      amountsAscFromTable,
      amountsAsc,
      'Amount column is not correctly sorted'
    );
  });
  it('after sorting Recent Transactions table by amount, the data is preserved', () => {
    const financialOverviewPage = new FinancialOverviewPage();
    // Get all the data table before sorting
    const dataBeforeSort = financialOverviewPage.transactions.getTableData();
    // Click header to sort the column Amounts
    financialOverviewPage.transactions.amountColumnHeader();
    // Get all the data table after sorting
    const dataAfterSort = financialOverviewPage.transactions.getTableData();
    assert.notSameOrderedMembers(
      dataBeforeSort,
      dataAfterSort,
      'The data is not intact after sorting'
    );
  });
});

describe('4. On the FinancialOverview page, clicking Compare Expenses link', () => {
  beforeEach(() => {
    new LoginPage().open();
    new LoginPage().login('James', 'Bond');
  });
  it('should display Expenses and Forescasts Comparison chart with correct months', () => {
    const financialOverviewPage = new FinancialOverviewPage();
    // Colected data from https://demo.applitools.com/hackathonChart.html
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ];
    financialOverviewPage.topBar.compareExpenses();
    const initialMonths = financialOverviewPage.chart.months();
    assert.sameDeepOrderedMembers(
      months,
      initialMonths,
      'The initial list of months is not the right one'
    );
    financialOverviewPage.chart.showDataForNextYear();
    const afterMonths = financialOverviewPage.chart.months();
    assert.sameDeepOrderedMembers(
      initialMonths,
      afterMonths,
      'The list of months is different for different years'
    );
  });

  it('should display Expenses and Forescasts Comparison chart with correct years', () => {
    const financialOverviewPage = new FinancialOverviewPage();
    financialOverviewPage.topBar.compareExpenses();
    // Colected data from https://demo.applitools.com/hackathonChart.html
    const years = [2017, 2018];
    const initialYears = financialOverviewPage.chart.years();
    assert.sameDeepOrderedMembers(
      years,
      initialYears,
      'The initial list of years is not the right one'
    );
    financialOverviewPage.chart.showDataForNextYear();
    const afterYears = financialOverviewPage.chart.years();
    assert.includeOrderedMembers(afterYears, initialYears);
  });

  it('should display Expenses and Forescasts Comparison chart with correct colors of the bars', () => {
    const financialOverviewPage = new FinancialOverviewPage();
    financialOverviewPage.topBar.compareExpenses();
    // Colected data from https://demo.applitools.com/hackathonChart.html
    const colors = [
      'rgba(255, 99, 132, 0.5)',
      'rgb(255, 99, 132)',
      'rgba(54, 162, 235, 0.5)',
      'rgb(54, 162, 235)'
    ];
    const initialColors = financialOverviewPage.chart.colorsBars();
    assert.sameDeepOrderedMembers(
      colors,
      initialColors,
      'The initial list of colors is not the right one'
    );
    financialOverviewPage.chart.showDataForNextYear();
    const afterColors = financialOverviewPage.chart.colorsBars();
    assert.includeOrderedMembers(afterColors, initialColors);
  });

  it('should display Expenses and Forescasts Comparison chart with correct statistic data', () => {
    const financialOverviewPage = new FinancialOverviewPage();
    // Colected data from https://demo.applitools.com/hackathonChart.html
    const statisticData = [
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      8,
      9,
      -10,
      10,
      40,
      60,
      40
    ];
    financialOverviewPage.topBar.compareExpenses();
    const initialStatisticsData = financialOverviewPage.chart.statisticsData();
    assert.sameDeepOrderedMembers(
      statisticData,
      initialStatisticsData,
      'The initial list of statistic data is not the right one'
    );
    financialOverviewPage.chart.showDataForNextYear();

    const afterStatisticsData = financialOverviewPage.chart.statisticsData();
    assert.includeOrderedMembers(afterStatisticsData, initialStatisticsData);
  });
});

describe('5. On the FinancialOverview page when using showAd=true to URL', () => {
  before(() => {
    new LoginPage().open('?showAd=true');
    new LoginPage().login('James', 'Bond');
  });

  it('ad gif1 should be displayed', () =>
    assert.isTrue(
      new FinancialOverviewPage().flashSaleGif1().isDisplayed(),
      'Gif1 is missing'
    ));

  it('ad gif2 should be displayed', () =>
    assert.isTrue(
      new FinancialOverviewPage().flashSaleGif2().isDisplayed(),
      'Gif2 is missing'
    ));
});
