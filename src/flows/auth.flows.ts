import type { Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";

export class AuthFlows {
  constructor(private readonly page: Page) {}

  async registerNewUser(name: string, email: string, password: string) {
    const registerPage = new RegisterPage(this.page);
    await registerPage.open();
    await registerPage.register(name, email, password);
  }

  async loginWithCredentials(email: string, password: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.open(); // recomendo /login direto pra estabilidade
    await loginPage.login(email, password);
  }
}
