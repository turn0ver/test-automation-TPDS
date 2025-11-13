import { BasePage } from './base.page';
import { Page, expect } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  emailInput() {
    return this.page.locator('#email');
  }

  passwordInput() {
    return this.page.locator('#password');
  }

  submitButton() {
    return this.page.getByRole('button', { name: /login/i });
  }

  // Actions
  async fillEmail(value: string) {
    await this.emailInput().fill(value);
  }

  async fillPassword(value: string) {
    await this.passwordInput().fill(value);
  }

  async submit() {
    await this.submitButton().click();
  }

  // Navigation
  async open() {
    await this.goto('/login');
  }

  // UI Validation
  async isLoaded() {
    await expect(this.emailInput()).toBeVisible();
    await expect(this.passwordInput()).toBeVisible();
    await expect(this.submitButton()).toBeVisible();
  }
}
