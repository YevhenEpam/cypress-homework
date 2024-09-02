const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.epam.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    downloadsFolder: 'cypress/downloads', // Define where downloaded files should be stored
    setupNodeEvents(on, config) {
      // Implement a task to clear the downloads directory before each test.
      on('task', {
        clearDownloads() {
          const downloadsDir = config.downloadsFolder;
          fs.readdir(downloadsDir, (err, files) => {
            if (err) {
              // If error occurs log it and throw an exception
              console.log(err);
              throw err;
            }

            for (const file of files) {
              fs.unlink(path.join(downloadsDir, file), err => {
                if (err) {
                  // If error occurs during file deletion, log it and throw an exception
                  console.log(err);
                  throw err;
                }
              });
            }
          });
          return null; // return null to signal that the task is done
        }
      });
    },
  },
});
