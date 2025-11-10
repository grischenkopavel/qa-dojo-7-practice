import { Page } from '@playwright/test';

interface IStudentData {
  firstName: string;
  lastName: string;
  email?: string;
  gender: string;
  mobile: number;
  dateOfBirth?: string;
  subject?: string;
  hobbies?: string;
  currentAddress?: string;
}

export function getAllPracticeFormLocators(page: Page) {
  const firstNameLocator = page.getByRole('textbox', { name: 'First Name' });
  const lastNameLocator = page.getByRole('textbox', { name: 'Last Name' });
  const emailLocator = page.getByRole('textbox', {
    name: 'name@example.com',
  });
  const genderMaleRadioLocator = page.locator(
    '[id ^= "gender-radio"][value = "Male"]'
  );
  const genderFemaleRadioLocator = page.locator(
    '[id ^= "gender-radio"][value = "Female"]'
  );
  const genderOtherRadioLocator = page.locator(
    '[id ^= "gender-radio"][value = "Other"]'
  );
  const mobileNumberLocator = page.getByRole('textbox', {
    name: 'Mobile Number',
  });
  const dateOfBirthLocator = page.locator('[id="dateOfBirthInput"]');
  const subjectLocator = page.locator('[id="subjectsInput"]');
  const hobbiesSportsLocator = page.locator('[id="hobbies-checkbox-1"]');
  const hobbiesReadingLocator = page.locator('[id="hobbies-checkbox-2"]');
  const hobbiesMusicLocator = page.locator('[id="hobbies-checkbox-3"]');
  const currentAddressLocator = page.getByRole('textbox', {
    name: 'Current Address',
  });
  const stateLocator = page.locator('[id="state"]');
  const cityLocator = page.locator('[id="city"]');
  const submitButtonLocator = page.getByRole('button', { name: 'Submit' });

  return {
    firstNameLocator,
    lastNameLocator,
    emailLocator,
    genderMaleRadioLocator,
    genderFemaleRadioLocator,
    genderOtherRadioLocator,
    mobileNumberLocator,
    dateOfBirthLocator,
    subjectLocator,
    hobbiesSportsLocator,
    hobbiesReadingLocator,
    hobbiesMusicLocator,
    currentAddressLocator,
    stateLocator,
    cityLocator,
    submitButtonLocator,
  };
}

export async function genderRadio(page: Page, gender: string) {
  if (gender === 'Male') {
    await getAllPracticeFormLocators(page).genderMaleRadioLocator.check({
      force: true,
    });
    return;
  }
  if (gender === 'Female') {
    await getAllPracticeFormLocators(page).genderFemaleRadioLocator.check({
      force: true,
    });
    return;
  }
  if (gender === 'Other') {
    await getAllPracticeFormLocators(page).genderOtherRadioLocator.check({
      force: true,
    });
    return;
  } else {
    throw new Error(`Wrong input: ${gender}`);
  }
}

export async function fillPracticeFormAll(
  page: Page,
  studentData: IStudentData
) {
  await getAllPracticeFormLocators(page).firstNameLocator.fill(
    studentData.firstName
  );
  await getAllPracticeFormLocators(page).lastNameLocator.fill(
    studentData.lastName
  );
  await getAllPracticeFormLocators(page).emailLocator.fill(studentData.email!);
  await genderRadio(page, studentData.gender);
  await getAllPracticeFormLocators(page).mobileNumberLocator.fill(
    studentData.mobile.toString()
  );
  await getAllPracticeFormLocators(page).dateOfBirthLocator.fill(
    studentData.dateOfBirth!
  );
  await getAllPracticeFormLocators(page).dateOfBirthLocator.press('Enter');
  await getAllPracticeFormLocators(page).subjectLocator.fill(
    studentData.subject!
  );
  await getAllPracticeFormLocators(page).subjectLocator.press('Enter');
  await getAllPracticeFormLocators(page).hobbiesSportsLocator.check({
    force: true,
  });
  await getAllPracticeFormLocators(page).currentAddressLocator.fill(
    studentData.currentAddress!
  );
  await getAllPracticeFormLocators(page).submitButtonLocator.click();
}

export async function fillPracticeFormRequiredOnly(
  page: Page,
  studentData: IStudentData
) {
  await getAllPracticeFormLocators(page).firstNameLocator.fill(
    studentData.firstName
  );
  await getAllPracticeFormLocators(page).lastNameLocator.fill(
    studentData.lastName
  );
  await genderRadio(page, studentData.gender);
  await getAllPracticeFormLocators(page).mobileNumberLocator.fill(
    studentData.mobile.toString()
  );
  await getAllPracticeFormLocators(page).submitButtonLocator.click();
}
