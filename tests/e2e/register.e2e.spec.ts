import { test, expect } from '../../fixtures';
import { createRandomUser } from '../../src/utils/test-user.factory';

test.describe('Register E2E', () => {

  // ------------------------------------------------------------
  // SCENARIO 1 — Successful registration
  // ------------------------------------------------------------
  test('user can register a new account (UI + API validation)', async ({ authFlows, page }) => {
    const user = createRandomUser();

    // Wait for the API request AND execute the UI flow at the same time
    const [registerResponse] = await Promise.all([
      page.waitForResponse((res) =>
        res.url().includes('/register') &&
        res.request().method() === 'POST'
      ),
      authFlows.registerNewUser(user.name, user.email, user.password),
    ]);

    // API should return 200 OK
    expect(registerResponse.status()).toBe(200);

    // Validate the request payload sent by the frontend
    const payload = registerResponse.request().postDataJSON();
    expect(payload).toEqual({
      name: user.name,
      email: user.email,
      username: user.email, // frontend sends username = email
      password: user.password,
    });

    // Validate the response body
    const responseBody = await registerResponse.json();
    expect(responseBody).toHaveProperty('jwt');
    expect(responseBody).toHaveProperty('user');
    expect(responseBody.user.email).toBe(user.email.toLowerCase());

    // Validate success UI feedback
    // I put this text expected just to generate a screenshot with the failure
    await expect(page.getByText(/success|welcome|verify/i)).toBeVisible();
  });


  // ------------------------------------------------------------
  // SCENARIO 2 — Registration fails with password < 6 characters
  // ------------------------------------------------------------
  test('should return 400 and display UI error when password is too short', async ({ authFlows, page }) => {
    const user = createRandomUser();
    user.password = '123'; // invalid password

    // Wait for the API request triggered by the registration form
    const [registerResponse] = await Promise.all([
      page.waitForResponse((res) =>
        res.url().includes('/register') &&
        res.request().method() === 'POST'
      ),
      authFlows.registerNewUser(user.name, user.email, user.password),
    ]);

    // API should return a 400 Bad Request
    expect(registerResponse.status()).toBe(400);

    // Verify the payload sent by the frontend
    const payload = registerResponse.request().postDataJSON();
    expect(payload).toEqual({
      name: user.name,
      email: user.email,
      username: user.email,
      password: user.password,
    });

    // Validate the error message returned by the API
    const responseBody = await registerResponse.json();
    const serializedBody = JSON.stringify(responseBody).toLowerCase();

    expect(serializedBody).toContain('password');
    expect(serializedBody).toContain('6');

    // Validate UI error message shown to the user
    await expect(
      page.getByText(/password must be at least/i)
    ).toBeVisible();
  });

});
