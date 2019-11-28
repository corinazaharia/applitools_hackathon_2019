export default class Transactions {
  constructor() {
    $('#transactionsTable').waitForDisplayed();
  }

  amountColumnHeader() {
    $('#amount').click();
  }

  getTableData() {
    const tableElements = $$('tbody>tr');
    const tableData: string[][] = [];
    tableElements.forEach((tableRow: any) => {
      const rowValues: string[] = [];
      tableRow.$$('td').forEach((cell) => {
        if (cell !== undefined) {
          rowValues.push(cell.getText());
        }
      });
      tableData.push(rowValues);
    });
    return tableData;
  }

  getAmounts() {
    const amounts = $$('.text-right.bolder.nowrap');
    const amountsValue: number[] = [];
    amounts.forEach((amount: any) => {
      const amountText = amount.getText();
      // Convert to number
      amountsValue.push(
        Number(
          amountText
            .replace(' ', '')
            .replace('USD', '')
            .replace(',', '')
        )
      );
    });
    return amountsValue;
  }
  amountsAscSort() {
    return this.getAmounts().sort((a, b) => a - b);
  }
}
