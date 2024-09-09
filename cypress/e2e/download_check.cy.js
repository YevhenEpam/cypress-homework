describe('File Download Test', () => {
    it('downloads the EPAM Corporate Overview 2023 report', () => {
      cy.visit('/about');
      
      // Clears the download folder before beginning the download test
      cy.task('clearDownloads');

      cy.xpath('//span[contains(text(),"DOWNLOAD") and @class="button__content button__content--desktop"]').click();//todo: aboutPage.clickDownloadButton()
      cy.wait(5000);//todo: bad practice
      const downloadedFilename = 'cypress/downloads/EPAM_Corporate_Overview_Q4_EOY.pdf';
      cy.readFile(downloadedFilename).should('exist');
    });
  });