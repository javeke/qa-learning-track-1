
// All imports go here

// Importing Base Page Object
import BasePage from './page';

/**
 * Page containing specific selectors and methods for a specific page
 */
class InventoryItemPage extends BasePage {
  /**
     * Selectors
     * Define selectors in this section using getter methods
     */

  get backToProductsButton() {
    return $('#back-to-products');
  }

    /**
     * Functions
     * Define functions for different methods that can be carried out on the page
     */

  async backToProducts() {
    await this.backToProductsButton.click();
  }

  async addToCart(itemName: string) {
    const buttonId = this.convertNameToSelector('#add-to-cart', itemName);
    await $(buttonId).click();
  }

  async removeFromCart(itemName: string) {
    const buttonId = this.convertNameToSelector('#remove', itemName);
    await $(buttonId).click();
  }
}

export default new InventoryItemPage();
