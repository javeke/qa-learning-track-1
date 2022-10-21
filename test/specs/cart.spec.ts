import LoginPage from '@/page_objects/login-page';
import InventoryPage from '@/page_objects/inventory-page';
import CartPage from '@/page_objects/cart-page';

describe('Cart Functionality:: ', ()=>{
    beforeEach( async ()=> {
      await LoginPage.open('');
      await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');
    });
  
    afterEach(async ()=>{
      await browser.execute('window.localStorage.clear()');
    });
  
    it('should allow a user to add 4 items to the cart', async () => {
        await InventoryPage.addItemToCart('Sauce Labs Backpack');
        await InventoryPage.addItemToCart('Sauce Labs Bike Light');
        await InventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
        await InventoryPage.addItemToCart('Sauce Labs Fleece Jacket');
        expect(await InventoryPage.cartBadgeText).toBe('4');
    });

    it('should allow a user to remove 4 items from the cart', async ()=>{
        await InventoryPage.addItemToCart('Sauce Labs Backpack');
        await InventoryPage.addItemToCart('Sauce Labs Bike Light');
        await InventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
        await InventoryPage.addItemToCart('Sauce Labs Fleece Jacket');

        await InventoryPage.goToCart();

        await CartPage.removeItemFromCart('Sauce Labs Backpack');
        await CartPage.removeItemFromCart('Sauce Labs Bike Light');
        await CartPage.removeItemFromCart('Sauce Labs Bolt T-Shirt');
        await CartPage.removeItemFromCart('Sauce Labs Fleece Jacket');

        expect(await InventoryPage.cartBadgeText).not.toExist();
    });

    it('should allow a user to add an item to the cart then visit the cart and then continue shopping', async () => {
        await InventoryPage.addItemToCart('Sauce Labs Backpack');
        expect(await InventoryPage.cartBadgeText).toBe('1');
        await InventoryPage.goToCart();
        await CartPage.continueShopping();

        const actualUrl = await browser.getUrl();

        expect(actualUrl).toContain("/inventory.html");
    });

    it('should not allow a user to checkout items from the cart if no first name is present', async ()=>{
      await InventoryPage.addItemToCart('Sauce Labs Backpack');
      await InventoryPage.addItemToCart('Sauce Labs Bike Light');
      await InventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
      await InventoryPage.addItemToCart('Sauce Labs Fleece Jacket');

      await InventoryPage.goToCart();

      await CartPage.checkout();
      await CartPage.continueCheckout();
    
      expect(await CartPage.flash).toContain("First Name is required");
    });

    it('should not allow a user to checkout items from the cart if no last name is present', async ()=>{
      await InventoryPage.addItemToCart('Sauce Labs Backpack');
      await InventoryPage.addItemToCart('Sauce Labs Bike Light');
      await InventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
      await InventoryPage.addItemToCart('Sauce Labs Fleece Jacket');

      await InventoryPage.goToCart();

      await CartPage.checkout();

      await CartPage.fillOutCheckoutForm("Standard");

      await CartPage.continueCheckout();
    
      expect(await CartPage.flash).toContain("Last Name is required");
    });

    it('should not allow a user to checkout items from the cart if no postal code name is present', async ()=>{
      await InventoryPage.addItemToCart('Sauce Labs Backpack');
      await InventoryPage.addItemToCart('Sauce Labs Bike Light');
      await InventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
      await InventoryPage.addItemToCart('Sauce Labs Fleece Jacket');

      await InventoryPage.goToCart();

      await CartPage.checkout();

      await CartPage.fillOutCheckoutForm("Standard", "User");

      await CartPage.continueCheckout();
    
      expect(await CartPage.flash).toContain("Postal Code is required");
    });

    it('should allow a user to checkout items from the cart after filling out all information', async ()=>{
      await InventoryPage.addItemToCart('Sauce Labs Backpack');
      await InventoryPage.addItemToCart('Sauce Labs Bike Light');
      await InventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
      await InventoryPage.addItemToCart('Sauce Labs Fleece Jacket');

      await InventoryPage.goToCart();

      await CartPage.checkout();
      await CartPage.fillOutCheckoutForm("Standard", "User", "0000");
      await CartPage.continueCheckout();
      await CartPage.finishCheckout();

      expect('THANK YOU FOR YOUR ORDER').toBeDisplayed();
    });
  });
  