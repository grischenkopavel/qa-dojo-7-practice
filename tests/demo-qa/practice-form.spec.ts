import { test, expect } from '@playwright/test';

import {
  getAllPracticeFormLocators,
  fillPracticeFormAll,
  fillPracticeFormRequiredOnly,
  fillPracticeFormNotRequiredOnly,
} from '../../app/demo-qa/ui/practice-form.ts';

test.describe(
  'Submit Student Registration Form with three different data types',
  { tag: ['@practice-form'] },
  async () => {
    const allInputData = {
      firstName: 'Pavlo',
      lastName: 'Hryshchenko',
      email: 'pg@gm.com',
      gender: 'Male',
      mobile: 3805015555,
      dateOfBirth: '17 Dec 2000',
      subject: 'Maths',
      hobbies: 'Sports',
      currentAddress: 'Somewhere',
      state: 'Rajasthan',
      city: 'Jaipur',
      filePath: './test-data/demo-qa/API-and-UI-Together.png',
    };
    const requiredInputData = {
      firstName: 'Kate',
      lastName: 'Robinson',
      gender: 'Female',
      mobile: 3809516666,
    };
    const notRequiredInputData = {
      email: 'pg@gm.com',
      dateOfBirth: '17 Dec 2021',
      subject: 'Maths',
      hobbies: 'Reading',
      currentAddress: 'Somewhere',
      state: 'Rajasthan',
      city: 'Jaipur',
    };
    
    test.beforeEach(
      'Navigate to Student Registration Form page',
      async ({ page }) => {
        page.goto('/automation-practice-form');

        await expect(page).toHaveURL('/automation-practice-form');
      }
    );

    test(
      'DQ-practice-form:0001. All input data',
      {
        annotation: {
          type: 'description',
          description:
            'Submit with Student Registration Form with all data. Successful submission',
        },
      },
      async ({ page }) => {
        await fillPracticeFormAll(page, allInputData);

        await expect(
          page.getByRole('dialog', { name: 'Thanks for submitting the form' })
        ).toBeInViewport();
      }
    );
    test(
      'DQ-practice-form:0002. Required data only',
      {
        annotation: {
          type: 'description',
          description:
            'Submit with Student Registration Form with required data. Successful submission',
        },
      },
      async ({ page }) => {
        await fillPracticeFormRequiredOnly(page, requiredInputData);
               
        await expect(
          page.getByRole('dialog', { name: 'Thanks for submitting the form' })
        ).toBeInViewport();
      }
    );
    test(
      'DQ-practice-form:0003. Non-required data only',
      {
        annotation: {
          type: 'description',
          description:
            'Submit with Student Registration Form with non required data. No form submission',
        },
      },
      async ({ page }) => {
        await fillPracticeFormNotRequiredOnly(page, notRequiredInputData);
               
        await expect(
          page.getByRole('dialog', { name: 'Thanks for submitting the form' })
        ).not.toBeInViewport();
      }
    );
  }
);