import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';

export class AuthFlows {
  private loginPage: LoginPage;
  private registerPage: RegisterPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
    this.registerPage = new RegisterPage(page);
  }

  // High-level business action
  async loginWithCredentials(email: string, password: string) {
    await this.loginPage.open();
    await this.loginPage.isLoaded();
    await this.loginPage.fillEmail(email);
    await this.loginPage.fillPassword(password);
    await this.loginPage.submit();
  }

  async registerNewUser(name: string, email: string, password: string) {
    await this.registerPage.open();

    await this.registerPage.nameInput().fill(name);
    await this.registerPage.emailInput().fill(email);
    await this.registerPage.passwordInput().fill(password);
    await this.registerPage.confirmPasswordInput().fill(password);

    await this.registerPage.submitButton().click();
  }
}
