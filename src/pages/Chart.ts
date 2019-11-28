export default class Chart {
  constructor() {
    $('#canvas').waitForDisplayed();
  }

  showDataForNextYear() {
    $('#addDataset').click();
  }

  months() {
    return browser.execute(
      () => (window as any).barChartData.labels as string[]
    );
  }

  years() {
    return browser.execute(() => {
      const years: number[] = [];
      (window as any).barChartData.datasets.forEach((dataset: any) => {
        years.push(Number(dataset.label));
      });
      return years;
    });
  }

  colorsBars() {
    return browser.execute(() => {
      const colors: string[] = [];
      (window as any).barChartData.datasets.forEach((dataset: any) => {
        colors.push(String(dataset.backgroundColor));
        colors.push(String(dataset.borderColor));
      });
      return colors;
    });
  }

  statisticsData() {
    return browser.execute(() => {
      const statistics: number[] = [];
      (window as any).barChartData.datasets.forEach((year: any) => {
        for (let i = 0; i < (window as any).barChartData.labels.length; i++) {
          statistics.push(Number(year.data[i]));
        }
      });
      return statistics;
    });
  }
}
