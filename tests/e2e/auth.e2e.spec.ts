import { test, expect } from '../../fixtures';
import { createRandomUser } from '../../src/utils/test-user.factory';

test('user can register and login using dynamic test user', async ({ authFlows, page }) => {
  const user = createRandomUser();

  await authFlows.registerNewUser(user.name, user.email, user.password);
  await expect(page.getByText(/please confirm your email/i)).toBeVisible();

  await authFlows.loginWithCredentials(user.email, user.password);
  await expect(page.getByText(/dashboard|account/i)).toBeVisible();
});

