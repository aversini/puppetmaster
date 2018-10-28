/* eslint array-callback-return: 0 */
const puppeteer = require('puppeteer');
const userConfig = require(process.env.PUPPETMASTER_CONFIG ||
  '../config/example.config');

const TEST_PAGE_HEIGHT = 2018;
const TEST_PAGE_WIDTH = 1024;
let totalTest = 0;

describe('Visual tests + Puppeteer', () => {
  let browser;
  beforeAll(async () => {
    browser = await puppeteer.launch();
  });
  afterAll(async () => {
    await browser.close();
  });

  it('loads test url correctly', async () => {
    const page = await browser.newPage();
    page.once('response', (response) => {
      expect(response.ok()).toBe(true);
      expect(response.url()).toBe(userConfig.baseUrl);
    });
    await page.goto(`${userConfig.baseUrl}`);
  });

  // Generate Visual tests based on the pages
  userConfig.pages.map((testPage) => {
    it(`Visual test for ${testPage.name}`, async () => {
      const page = await browser.newPage();

      /*
       * Set the viewport long and wide enough to avoid snapshot
       * missing part of the rendered page.
       */
      if (testPage.height) {
        page.setViewport({
          width: testPage.width || TEST_PAGE_WIDTH,
          height: testPage.height || TEST_PAGE_HEIGHT
        });
      }

      // Navigate to testPage route
      if (testPage.urlPath) {
        await page.goto(`${userConfig.baseUrl}${testPage.urlPath}`);
      }

      // run specific testPage action
      if (testPage.action) {
        await testPage.action(page);
      }

      // Take screenshot
      const image = await page.screenshot();

      // Compare screenshot with previous snapshot
      totalTest++;
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: `${testPage.name}`,
        path: `tmp/${testPage.name}-${totalTest}.snap.png`
      });
    });
  });
});
