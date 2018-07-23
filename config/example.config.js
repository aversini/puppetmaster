/**
 * Custom configuration.
 *
 * Available options are:
 * baseUrl (String) The base URL to test
 * pages (Array) An array of pages to test
 * pages.page (Object) Configuration for a single page
 * pages.page.name (String) Required A unique identifier for the testPage
 * pages.page.urlPath (String) Required A unique URL to append to the baseURL
 * pages.page.height (Number) The testPAge required viewport height
 * pages.page.width (Number) The testPAge required viewport width
 * pages.page.action (Function) An async function to execute before a screenshot can be taken
 *
 * The example below assumes the following:
 * - to test Button,
 *   - PuppetMaster needs to reach http://localhost:6060/#!/Button
 *   - And take a 1200x700 screenshot
 * - to test Panel
 *   - PuppetMaster needs to reach http://localhost:6060/#!/Panel
 *   - Execute a few custom action, e.g. click on a button with id="btnPanelHdrDock")
 *   - And take a screenshot with default width and 700px height viewport
 *
 */
module.exports = {
  baseUrl: 'http://localhost:6060/',
  pages: [
    {
      name: 'Button',
      urlPath: '#!/Button',
      height: 700,
      weight: 1200
    },
    {
      name: 'Panel',
      urlPath: '#!/Panel',
      height: 500,
      async action(p) {
        const btnSelector = '#btnPanelHdrDock';
        await p.waitForSelector(btnSelector);
        await p.click(btnSelector);
      }
    }
  ]
};
