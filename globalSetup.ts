import { chromium, expect, type FullConfig } from '@playwright/test';
import { SignUp } from './app/conduit/ui/SignUpPage';
import { SignIn } from './app/conduit/ui/SignInPage';
import { HomePage } from './app/conduit/ui/HomePage';
import { LoggedOutPage } from './app/conduit/ui/LoggedOutPage/LoggedOutPage';

async function globalSetup(config: FullConfig) {
  console.log('---Global setup start---');
 
  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: 'https://demo.learnwebdriverio.com',
  });
  const page = await context.newPage();
  const loggedOutPage: LoggedOutPage = new LoggedOutPage(page);
  const signInPage: SignIn = new SignIn(page);
  const signUpPage: SignUp = new SignUp(page);
  const homePage: HomePage = new HomePage(page);

  await page.goto(`/`);
  await loggedOutPage.clickSignInLink();
  await signInPage.signIn(process.env.EMAIL!, process.env.PASSWORD!);

  try {
    await expect(await homePage.getNewArticleLink()).toBeVisible();
    console.log('Success login');
    await context.storageState({ path: './storageState.json' });
  } catch (e) {
    console.log('Login failed. Running sign up flow');
    await loggedOutPage.clickSignUpLink();
    await signUpPage.signUp(
      process.env.USERNAME!,
      process.env.EMAIL!,
      process.env.PASSWORD!
    );
    await expect(await homePage.getNewArticleLink()).toBeVisible();
    await context.storageState({ path: './storageState.json' });
  }
  console.log('---Global setup end---');
}

export default globalSetup;
