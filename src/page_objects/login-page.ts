 import BasePage from './page'

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends BasePage {
  /**
     * Selectors
     * Define selectors in this section using getter methods
     */

  
  get inputUsername() {
    return $('#user-name')
  }

  get inputPassword() {
    return $('#password')
  }
  
  get btnSubmit () { 
    return $('#login-button');
  }

  get flash() {
    return $('div.error-message-container > h3').getText();
  }

  // Functions

  /**
     * Login on the page using a username and password
     * @param {string} username .
     * @param {string}  password .
     */
  async loginWithCredentials(username: string, password: string) {
    await this.inputUsername.setValue(username)
    await this.inputPassword.setValue(password)
    await this.btnSubmit.click()
  }

}

export default new LoginPage();
