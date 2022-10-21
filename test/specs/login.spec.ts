import LoginPage from '@/page_objects/login-page';

describe('Login Functionality:: ', () => {

  beforeEach(async ()=>{
    await LoginPage.open('');
  });

  afterEach(async () => {
    await browser.execute('window.localStorage.clear()');
  });

  
  it('should login with valid credentials', async () => {

   await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');

   const actualUrl = await browser.getUrl();
   
   expect(actualUrl).toContain("/inventory.html");
  });

  
  it('should not login with invalid credentials', async () => {
    const errorText = "Username and password do not match any user in this service";
 
    await LoginPage.loginWithCredentials('problem_ser', 'random_password');

    const actualText = await LoginPage.flash;

    expect(actualText).toContain(errorText);
   });

   
   it('should not allow empty username field', async () => {
    const errorText = "Username is required";
 
    await LoginPage.loginWithCredentials('', 'random_password');

    const actualText = await LoginPage.flash;

    expect(actualText).toContain(errorText);
   });

   
   it('should not allow empty password field', async () => {
    const errorText = "Password is required";

    await LoginPage.loginWithCredentials('problem_user', '');

    const actualText = await LoginPage.flash;

    expect(actualText).toContain(errorText);
   });

   it('should fail', () => {
    expect(1+1).toBe(3);
   });
})
