import { test, expect } from '../../fixtures';
import { createRandomUser } from '../../src/utils/test-user.factory';

test.describe('Register E2E', () => {

  test('user can register a new account (UI + API validation)', async ({ authFlows, page }) => {
    const user = createRandomUser();

    const [registerResponse] = await Promise.all([
      page.waitForResponse((res) =>
        res.url().includes('/register') &&
        res.request().method() === 'POST'
      ),
      authFlows.registerNewUser(user.name, user.email, user.password),
    ]);

    expect(registerResponse.status()).toBe(200);

    const payload = registerResponse.request().postDataJSON();
    expect(payload).toEqual({
      name: user.name,
      email: user.email,
      username: user.email,
      password: user.password,
    });

    const responseBody = await registerResponse.json();
    expect(responseBody).toHaveProperty('jwt');
    expect(responseBody).toHaveProperty('user');
    expect(responseBody.user.email).toBe(user.email.toLowerCase());
  });

  test('should return 400 and display UI error when password is too short', async ({ authFlows, page }) => {
    const user = createRandomUser();
    user.password = '123';

    const [registerResponse] = await Promise.all([
      page.waitForResponse((res) =>
        res.url().includes('/register') &&
        res.request().method() === 'POST'
      ),
      authFlows.registerNewUser(user.name, user.email, user.password),
    ]);

    expect(registerResponse.status()).toBe(400);

    const payload = registerResponse.request().postDataJSON();
    expect(payload).toEqual({
      name: user.name,
      email: user.email,
      username: user.email,
      password: user.password,
    });

    const responseBody = await registerResponse.json();
    const serializedBody = JSON.stringify(responseBody).toLowerCase();
    expect(serializedBody).toContain('password');
    expect(serializedBody).toContain('6');

    await expect(page.getByRole('status')).toContainText(/password must be at least/i);
  });

});
