const path = require('path');
const puppeteer = require('puppeteer');

const browserWSEndpoint = process.env.wsURL || null;

(async() => {

  if (!browserWSEndpoint) {
    const browser = await puppeteer.launch({
      handleSIGINT: false, // so Chrome doesn't exit when we quit Node.
      headless: false // to see what's happening
    });

    console.log('1. Quit this script (cmd/ctrl+C).');
    console.log('2. Chrome will still be running.');
    console.log('4. Re-return the script with:');
    console.log(`   wsURL=${browser.wsEndpoint()} node ${path.basename(__filename)}`);
    console.log('5. Puppeteer will reconnect to the existing Chrome instead of launching a new browser.');

    return;
  }

  console.log('Reconnecting to existing Chrome....');
  const browser = await puppeteer.connect({browserWSEndpoint});
  const page = await browser.newPage();
  await page.goto('https://example.com');

  console.log(`Page title:`, await page.title());

  await browser.close();
})();
