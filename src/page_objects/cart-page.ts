
// All imports go here

// Importing Base Page Object
import BasePage from './page';

/**
 * Page containing specific selectors and methods for a specific page
 */
class CartPage extends BasePage {
  /**
     * Selectors
     * Define selectors in this section using getter methods
     */

  get continueShoppingButton() {
    return $('#continue-shopping');
  }

  get checkoutButton() {
    return $('#checkout');
  }

  get firstNameInputField() {
    return $('#first-name');
  }

  get lastNameInputField() {
    return $('#last-name');
  }

  get postalCodeInputField() {
    return $('#postal-code');
  }

  get continueCheckoutButton() {
    return $('#continue');
  }

  get finishCheckoutButton() {
    return $('#finish');
  }

  get flash() {
    return $('div.error-message-container > h3').getText();
  }

    /**
     * Functions
     * Define functions for different methods that can be carried out on the page
     */

  async removeItemFromCart(itemName: string) {
    const buttonId = this.convertNameToSelector('#remove', itemName);
    await $(buttonId).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async fillOutCheckoutForm(firstName = "", lastName = "", postalCode = "") {
    await this.firstNameInputField.setValue(firstName);
    await this.lastNameInputField.setValue(lastName);
    await this.postalCodeInputField.setValue(postalCode);
  }

  async continueCheckout() {
    await this.continueCheckoutButton.click();
  }
  
  async finishCheckout() {
    await this.finishCheckoutButton.click();
  }
}

export default new CartPage();
