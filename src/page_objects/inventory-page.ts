
// All imports go here

// Importing Base Page Object
import BasePage from './page';

/**
 * Page containing specific selectors and methods for a specific page
 */
class InventoryPage extends BasePage {
  /**
     * Selectors
     * Define selectors in this section using getter methods
     */


  get menuButton() {
    return $('#react-burger-menu-btn'); 
  }

  get logoutButton() {
    return $('#logout_sidebar_link');
  }
  
  get cartButton() {
    return $('#shopping_cart_container');
  }

  get cartBadgeText() {
    return $('#shopping_cart_container').getText();
  }

  get sortSelectDropdown() {
    return $('select[data-test="product_sort_container"]');
  }

  get firstInventoryItemName() {
    return $('.inventory_item:first-child .inventory_item_name').getText();
  }

  get lastInventoryItemName() {
    return $('.inventory_item:last-child .inventory_item_name').getText();
  }

    /**
     * Functions
     * Define functions for different methods that can be carried out on the page
     */

  async goToItemInventoryPage(itemName: string) {
    await $(`.inventory_item img[alt="${itemName}"]`).click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutButton.waitForClickable();
    await this.logoutButton.click();
  }

  async addItemToCart(itemName: string) {
    const buttonId = this.convertNameToSelector('#add-to-cart', itemName);
    await $(buttonId).click();
  }

  async goToCart() {
    await this.cartButton.click();
  }

  async sortByName(ascending = true) {
    if(ascending){
      await this.sortSelectDropdown.selectByVisibleText('Name (A to Z)');
      return;
    }
    await this.sortSelectDropdown.selectByVisibleText('Name (Z to A)');
  }

  async sortByPrice(ascending = true) {
    if(ascending){
      await this.sortSelectDropdown.selectByVisibleText('Price (low to high)');
      return;
    }
    await this.sortSelectDropdown.selectByVisibleText('Price (high to low)');
  }
}

export default new InventoryPage();
