import { test as base } from '@playwright/test';
import { LoginPage } from './src/pages/login.page';
import { RegisterPage } from './src/pages/register.page';
import { AuthFlows } from './src/flows/auth.flows';

type Fixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  authFlows: AuthFlows;
};

export const testUsers = [
  { email: 'user1+e2e@demo.test', password: 'Pass123!' },
  { email: 'user2+e2e@demo.test', password: 'Pass123!' },
  { email: 'user3+e2e@demo.test', password: 'Pass123!' },
  { email: 'user4+e2e@demo.test', password: 'Pass123!' },
  { email: 'user5+e2e@demo.test', password: 'Pass123!' },
];


export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  authFlows: async ({ page }, use) => {
    await use(new AuthFlows(page));
  },
});

export const expect = test.expect;
