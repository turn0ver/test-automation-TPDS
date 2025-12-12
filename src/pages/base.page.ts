import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected byTestId(id: string): Locator {
    return this.page.getByTestId(id);
  }

  async goto(path: string) {
    const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';
    await this.page.goto(`${baseUrl}${path}`);
  }

  async expectUrlContains(fragment: string | RegExp) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }
}
