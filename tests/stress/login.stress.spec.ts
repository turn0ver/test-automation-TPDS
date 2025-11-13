// tests/stress/login.stress.spec.ts
import { test, expect } from '@playwright/test';
import { testUsers } from '../../fixtures';
import { AuthFlows } from '../../src/flows/auth.flows';

test.describe('Stress - concurrent logins', () => {
  test('multiple users can login concurrently via UI', async ({ browser }) => {
    const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';

    await Promise.all(
      testUsers.map(async (user) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const authFlows = new AuthFlows(page);

        await authFlows.loginWithCredentials(user.email, user.password);

        await expect(page.getByText(/my account|logout|profile/i)).toBeVisible();

        await context.close();
      }),
    );
  });
});
