import { test, expect } from '../../fixtures';

test.describe('Login UI', () => {
  test('should display email, password and submit button', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.isLoaded();

    await expect(loginPage.emailInput()).toBeVisible();
    await expect(loginPage.passwordInput()).toBeVisible();
    await expect(loginPage.submitButton()).toBeVisible();
  });

  test('should show validation error when submitting empty form', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.isLoaded();

    await loginPage.submit();


    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });
});
