import { test, expect } from '@playwright/test';

test.describe(
  'Work with cookie',
  {
    tag: ['@cookie'],
    annotation: {
      type: 'description',
      description: 'Example of CRUD operations on cookies from zara.com.uk',
    },
  },
  () => {
    let cookies = [];
    let cookiesLength = 0;
    let newCookiesLength = 0;
    const newCookie = {
      name: 'zara',
      value: 'testCookie',
      domain: '.zara.com',
      path: '/',
    };

    const cookieToUpdate = {
      name: 'CookiesConsent',
      value: 'UA',
      domain: '.zara.com',
      path: '/uk',
    };

    test.beforeEach('Navigate to zara.com.uk', async ({ page }) => {
      await page.goto('https://www.zara.com/uk/');
      await page.getByRole('button', { name: 'Accept All Cookies' }).click();
      await page
        .getByRole('button', { name: 'Yes, continue on United' })
        .click();
    });

    test(
      'Get all cookie',
      {
        annotation: {
          type: 'description',
          description:
            'Get all cookies from zara.com.uk and store into array. Array length should be > 0',
        },
      },
      async ({ context }) => {
        cookies = await context.cookies();
        cookiesLength = cookies.length;

        expect(cookies).toBeTruthy();
        expect(cookiesLength).toBeGreaterThan(0);
      }
    );

    test('Add cookie', async ({ context }) => {
      cookies = await context.cookies();
      cookiesLength = cookies.length;

      await context.addCookies([newCookie]);
      cookies = await context.cookies();
      newCookiesLength = cookies.length;

      expect(newCookiesLength).toBe(cookiesLength + 1);
    });

    test(
      'Update cookie',
      {
        annotation: {
          type: 'description',
          description:
            'Flow to update cookie: get cookie -> update - > clear -> add updated',
        },
      },
      async ({ context }) => {
        cookies = await context.cookies();

        const updatedCookies = cookies.map((cookie) => {
          if (cookie.name === cookieToUpdate.name) {
            cookie.value = cookieToUpdate.value;
          }
          return cookie;
        });

        await context.clearCookies();
        await context.addCookies(updatedCookies);
        cookies = await context.cookies();

        const updatedCookie = cookies.filter((cookie) => {
          return cookie.name === cookieToUpdate.name;
        });

        expect(updatedCookie[0].value).toBe(cookieToUpdate.value);
      }
    );

    test('Clear all cookies', async ({ context }) => {
      cookies = await context.cookies();
      cookiesLength = cookies.length;
      await context.clearCookies();

      const newCookie = await context.cookies();
      newCookiesLength = newCookie.length;

      expect(newCookiesLength).toBe(0);
    });

    test('Clear specific cookie', async ({ context }) => {
      cookies = await context.cookies();
      cookiesLength = cookies.length;
      await context.clearCookies({ name: 'CookiesConsent' });

      const newCookie = await context.cookies();
      newCookiesLength = newCookie.length;

      expect(newCookiesLength).toBe(cookiesLength - 1);
    });
  }
);
