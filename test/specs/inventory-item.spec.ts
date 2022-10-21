import LoginPage from '@/page_objects/login-page';
import InventoryPage from '@/page_objects/inventory-page';
import CartPage from '@/page_objects/cart-page';
import inventoryItemPage from '@/page_objects/inventory-item-page';

describe('Cart Functionality:: ', ()=>{
    beforeEach( async ()=> {
      await LoginPage.open('');
      await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');
    });
  
    afterEach(async ()=>{
      await browser.execute('window.localStorage.clear()');
    });

    it('should allow a user to add an item to the cart and checkout', async () => {
        await InventoryPage.goToItemInventoryPage("Sauce Labs Bike Light");
        await inventoryItemPage.addToCart("Sauce Labs Bike Light");

        await InventoryPage.goToCart();

        await CartPage.checkout();
        await CartPage.fillOutCheckoutForm("Standard", "User", "0000");
        await CartPage.continueCheckout();
        await CartPage.finishCheckout();

        expect('THANK YOU FOR YOUR ORDER').toBeDisplayed();
    });
});