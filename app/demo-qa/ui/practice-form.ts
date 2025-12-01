import { Page } from '@playwright/test';

interface IStudentData {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  mobile?: number;
  dateOfBirth?: string;
  subject?: string;
  hobbies?: string;
  currentAddress?: string;
  state?: string;
  city?: string;
  filePath?: string;
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
  const selectPictureLocator = page.locator('#uploadPicture');
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
    selectPictureLocator,
    submitButtonLocator,
  };
}

export async function genderRadio(page: Page, gender: string) {
  const practiceFormLocators = getAllPracticeFormLocators(page);
  if (gender === 'Male') {
    await practiceFormLocators.genderMaleRadioLocator.check({
      force: true,
    });
    return;
  }
  if (gender === 'Female') {
    await practiceFormLocators.genderFemaleRadioLocator.check({
      force: true,
    });
    return;
  }
  if (gender === 'Other') {
    await practiceFormLocators.genderOtherRadioLocator.check({
      force: true,
    });
    return;
  } else {
    throw new Error(`Wrong input: ${gender}`);
  }
}
export async function hobbiesCheckbox(page: Page, hobbies: string) {
  const practiceFormLocators = getAllPracticeFormLocators(page);
  if (hobbies === 'Sports') {
    await practiceFormLocators.hobbiesSportsLocator.check({
      force: true,
    });
  }
  if (hobbies === 'Reading') {
    await practiceFormLocators.hobbiesReadingLocator.check({
      force: true,
    });
  }
  if (hobbies === 'Music') {
    await practiceFormLocators.hobbiesMusicLocator.check({
      force: true,
    });
  } else if (hobbies != 'Sports' && hobbies != 'Reading' && hobbies != 'Music') {
    throw new Error(`Wrong input: ${hobbies}`);
  }
}

export async function uploadPicture(page: Page, filePath: string){
 const practiceFormLocators = getAllPracticeFormLocators(page);
 await practiceFormLocators.selectPictureLocator.click();
 await practiceFormLocators.selectPictureLocator.setInputFiles(filePath);
 //await page.getByRole('button', { name: 'Submit' }).click();
}

export async function fillPracticeFormAll(
  page: Page,
  studentData: IStudentData
) {
  const practiceFormLocators = getAllPracticeFormLocators(page);

  await practiceFormLocators.firstNameLocator.fill(studentData.firstName!);
  await practiceFormLocators.lastNameLocator.fill(studentData.lastName!);
  await practiceFormLocators.emailLocator.fill(studentData.email!);
  await genderRadio(page, studentData.gender!);
  await practiceFormLocators.mobileNumberLocator.fill(
    studentData.mobile!.toString()
  );
  await practiceFormLocators.dateOfBirthLocator.fill(studentData.dateOfBirth!);
  await practiceFormLocators.dateOfBirthLocator.press('Enter');
  await practiceFormLocators.subjectLocator.fill(studentData.subject!);
  await practiceFormLocators.subjectLocator.press('Enter');
  await hobbiesCheckbox(page, studentData.hobbies!);
  await practiceFormLocators.currentAddressLocator.fill(
    studentData.currentAddress!
  );
  await practiceFormLocators.stateLocator.click();
  await page.getByText(`${studentData.state}`, { exact: true }).click();
  await practiceFormLocators.cityLocator.click();
  await page.getByText(`${studentData.city}`, { exact: true }).click();
  await uploadPicture(page, studentData.filePath!);
  await practiceFormLocators.submitButtonLocator.click();
}

export async function fillPracticeFormRequiredOnly(
  page: Page,
  studentData: IStudentData
) {
  const practiceFormLocators = getAllPracticeFormLocators(page);
  await practiceFormLocators.firstNameLocator.fill(studentData.firstName!);
  await practiceFormLocators.lastNameLocator.fill(studentData.lastName!);
  await genderRadio(page, studentData.gender!);
  await practiceFormLocators.mobileNumberLocator.fill(
    studentData.mobile!.toString()
  );
  await practiceFormLocators.submitButtonLocator.click();
}
export async function fillPracticeFormNotRequiredOnly(
  page: Page,
  studentData: IStudentData
) {
  const practiceFormLocators = getAllPracticeFormLocators(page);
  await practiceFormLocators.emailLocator.fill(studentData.email!);
  await practiceFormLocators.dateOfBirthLocator.fill(studentData.dateOfBirth!);
  await practiceFormLocators.dateOfBirthLocator.press('Enter');
  await practiceFormLocators.subjectLocator.fill(studentData.subject!);
  await practiceFormLocators.subjectLocator.press('Enter');
  await hobbiesCheckbox(page, studentData.hobbies!);
  await practiceFormLocators.currentAddressLocator.fill(
    studentData.currentAddress!
  );
  await practiceFormLocators.stateLocator.click();
  await page.getByText(`${studentData.state}`, { exact: true }).click();
  await practiceFormLocators.cityLocator.click();
  await page.getByText(`${studentData.city}`, { exact: true }).click();
  await practiceFormLocators.submitButtonLocator.click();
}
