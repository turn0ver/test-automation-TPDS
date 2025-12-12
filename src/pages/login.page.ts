import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage{
  constructor(page: Page) {
    super(page);
  }

  emailInput(): Locator {
    return this.page.getByLabel(/email/i).or(this.page.locator("#email"));
  }

  passwordInput(): Locator {
    return this.page.getByLabel(/password/i).or(this.page.locator("#password"));
  }

  submitButton(): Locator {
    return this.page.getByRole("button", { name: /login/i });
  }

  async open() {
    await this.goto("/login");
    await expect(this.page).toHaveURL(/\/login/i, { timeout: 10000 });
    await this.waitUntilReady();
  }

  async openFromHeader() {
    await this.page
      .getByRole("button", { name: /login or register/i })
      .or(this.page.getByRole("link", { name: /login|register/i }))
      .click();
  
    await expect(this.page).toHaveURL(/\/login/i, { timeout: 10000 });
  
    await this.waitUntilReady();
  }

  async waitUntilReady() {
    await expect(this.page).toHaveURL(/\/login/i, { timeout: 10000 });
  
    await expect(
      this.page.getByRole("button", { name: /login/i })
    ).toBeVisible({ timeout: 10000 });
  
    await expect(this.emailInput()).toBeVisible({ timeout: 10000 });
    await expect(this.passwordInput()).toBeVisible({ timeout: 10000 });
  }

  async fillEmail(email: string) {
    await this.emailInput().fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput().fill(password);
  }

  async submit() {
    await Promise.all([
      this.page.waitForLoadState("networkidle").catch(() => {}),
      this.submitButton().click(),
    ]);
  }

  async login(email: string, password: string) {
    await this.waitUntilReady();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async expectLoggedIn() {
    await expect(
      this.page.getByRole("button", { name: /login or register/i })
    ).toBeHidden({ timeout: 10000 });
  }

  async expectLoginError() {
    await expect(this.page.getByRole("status")).toBeVisible({ timeout: 10000 });
  }

  async isLoaded() {
    await expect(this.emailInput()).toBeVisible();
    await expect(this.passwordInput()).toBeVisible();
    await expect(this.submitButton()).toBeVisible();
  }
}
