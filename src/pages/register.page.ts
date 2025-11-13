import { BasePage } from './base.page';
import { Page, expect } from '@playwright/test';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  nameInput() {
    return this.page.locator('#name');
  }

  emailInput() {
    return this.page.locator('#email');
  }

  passwordInput() {
    return this.page.locator('#password');
  }

  confirmPasswordInput() {
    return this.page.locator('#confirm-password');
  }

  submitButton() {
    return this.page.getByRole('button', { name: /register|create account|sign up/i });
  }

  // Actions
  async fillName(value: string) {
    await this.nameInput().fill(value);
  }

  async fillEmail(value: string) {
    await this.emailInput().fill(value);
  }

  async fillPassword(value: string) {
    await this.passwordInput().fill(value);
  }

  async fillConfirmPassword(value: string) {
    await this.confirmPasswordInput().fill(value);
  }

  async submit() {
    await this.submitButton().click();
  }

  // Navigation
  async open() {
    await this.goto('/register');
  }

  // UI Validation
  async isLoaded() {
    await expect(this.nameInput()).toBeVisible();
    await expect(this.emailInput()).toBeVisible();
    await expect(this.passwordInput()).toBeVisible();
    await expect(this.confirmPasswordInput()).toBeVisible();
  }
}
