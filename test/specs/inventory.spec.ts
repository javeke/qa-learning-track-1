import LoginPage from '@/page_objects/login-page';
import InventoryPage from '@/page_objects/inventory-page';
import CartPage from '@/page_objects/cart-page';

describe('Inventory Functionality:: ', ()=>{
    beforeEach( async ()=> {
      await LoginPage.open('');
      await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');
    });
  
    afterEach(async ()=>{
      await browser.execute('window.localStorage.clear()');
    });
  
    it('should allow a user to add an item to the cart', async () => {
      await InventoryPage.addItemToCart('Sauce Labs Backpack');
      expect(await InventoryPage.cartBadgeText).toBe('1');
    });

    it('should allow a user to remove item from the cart', async ()=>{
      await InventoryPage.addItemToCart('Sauce Labs Backpack');
      await InventoryPage.goToCart();
      await CartPage.removeItemFromCart('Sauce Labs Backpack');

      expect(await InventoryPage.cartBadgeText).not.toExist();
    });

    it('should allow a user to sort inventory items by name in ascending order', async () => {
      await InventoryPage.sortByName();
      expect(await InventoryPage.firstInventoryItemName).toBe("Sauce Labs Backpack");
      expect(await InventoryPage.lastInventoryItemName).toBe("Test.allTheThings() T-Shirt (Red)");
    });

    it('should allow a user to sort inventory items by name in descending order', async () => {
      await InventoryPage.sortByName(false);
      expect(await InventoryPage.firstInventoryItemName).toBe("Test.allTheThings() T-Shirt (Red)");
      expect(await InventoryPage.lastInventoryItemName).toBe("Sauce Labs Backpack");
    });

    it('should allow a user to sort inventory items by price in ascending order', async () => {
      await InventoryPage.sortByPrice();
      expect(await InventoryPage.firstInventoryItemName).toBe("Sauce Labs Onesie");
      expect(await InventoryPage.lastInventoryItemName).toBe("Sauce Labs Fleece Jacket");
    });

    it('should allow a user to sort inventory items by price in descending order', async () => {
      await InventoryPage.sortByPrice(false);
      expect(await InventoryPage.firstInventoryItemName).toBe("Sauce Labs Fleece Jacket");
      expect(await InventoryPage.lastInventoryItemName).toBe("Sauce Labs Onesie");
    });
  });
  