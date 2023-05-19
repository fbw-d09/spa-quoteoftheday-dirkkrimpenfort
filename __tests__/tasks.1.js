const puppeteer = require('puppeteer');
const path = require('path');
const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) {}
  done();
});

describe('Quote Generator', () => {
  it("'Random Quote' button as `button` or `input` is present", async () => {
    const button = await page.$(
      'button, input[type="submit"], input[type="button"]'
    );
    expect(button).toBeTruthy()
  });
  it(`New quote is generated when button is clicked`, async () => {
    const pageContent = await page.$eval('body', (el) => el.textContent);
    const button = await page.$(
      'button, input[type="submit"], input[type="button"]'
    );
    await button.click({ clickCount: 3 });
    const pageContentAfterClick = await page.$eval('body', (el) => el.textContent);
    expect(pageContentAfterClick).not.toBe(pageContent);
  });
});
