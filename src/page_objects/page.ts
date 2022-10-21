/**
* Main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class BasePage {
  /**
    * Opens a sub page of the page
    * @param {string} path of the sub page (e.g. /path/to/page.html)
    * @returns {string} This returns the base path
    */
  open(path: string) {
    return browser.url(`https://www.saucedemo.com/${path}`)
  }

  convertNameToSelector(prefix: string, elementName: string) : string {
    return elementName.toLowerCase().split(' ').reduce((prev, current) => `${prev}-${current}`, prefix);
  }
}
