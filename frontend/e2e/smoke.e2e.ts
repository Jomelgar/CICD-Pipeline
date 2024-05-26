import puppeteer from "puppeteer";

async function main() {
  try {
    const url = process.env.TEST_URL;
    if (!url) throw Error("No TEST_URL defined.");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Your smoke test logic goes here

    await browser.close();
    console.log("Smoke test passed.");
    process.exit(0);
  } catch (err) {
    console.error("An error occurred:", err);
    process.exit(1);
  }
}

main();
