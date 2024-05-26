import puppeteer from "puppeteer";

async function main() {
  try {
    const url = process.env.TEST_URL;
    if (!url) throw Error("No TEST_URL defined.");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('error', (err) => {
      console.error('Page error:', err);
      process.exit(1);
    });
    await page.goto(url);
    const selector = "#page-title";
    await page.waitForSelector(selector);
    let element = await page.$(selector);
    if (!element) throw new Error("Element not found on page.");
    let value = await element.evaluate((el: any) => el.textContent);
    if (!value) throw new Error("Element had no value.");
    await browser.close();
    const found = value.toLowerCase().indexOf("anyhasher") > -1;
    if (!found) {
      console.log(value);
      throw new Error("Smoke test failed.");
    }
    console.log("Smoke test passed.");
    process.exit(0);
  } catch (err) {
    console.error('An error occurred:', err);
    process.exit(1);
  }
}

main();
