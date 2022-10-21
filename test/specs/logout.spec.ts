// All imports go here
import LoginPage from '@/page_objects/login-page';
import InventoryPage from '@/page_objects/inventory-page';

describe('Logout Functionality:: ', () => {
  beforeEach( async ()=> {
    await LoginPage.open('');
    await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');
  });

  afterEach(async ()=>{
    await browser.execute('window.localStorage.clear()');
  });

  it('should logout the currently authenticated user', async () => {
    await InventoryPage.logout();

    expect(await LoginPage.btnSubmit).toBeDisplayed();
  });
});
