import { test, expect, testUsers } from '../../fixtures';
import { AuthFlows } from '../../src/flows/auth.flows';

function hasAuthCookie(cookies: { name: string; value: string }[]) {
  const authCookieRegex = /(jwt|token|session|next-auth)/i;
  return cookies.some((c) => authCookieRegex.test(c.name) && c.value?.length > 0);
}

test.describe('Stress - concurrent logins', () => {
  test('multiple users can login concurrently via UI', async ({ browser }) => {
    const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';

    await Promise.all(
      testUsers.map(async (user) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
          const authFlows = new AuthFlows(page);

          await authFlows.loginWithCredentials(user.email, user.password);

          const cookies = await context.cookies(baseUrl);
          expect(
            hasAuthCookie(cookies),
            `No auth cookie found. Cookies: ${cookies.map((c) => c.name).join(', ')}`
          ).toBeTruthy();
        } finally {
          await context.close();
        }
      })
    );
  });
});
