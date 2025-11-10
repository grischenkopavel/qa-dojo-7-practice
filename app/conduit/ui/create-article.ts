import { Page, Locator } from '@playwright/test';

export function getCreateArticleFormLocators(page: Page) {
  const newArticleButtonLocator: Locator = page.getByRole('link', {
    name: 'New Article',
  });
  const articleTileTextBoxLocator: Locator = page.getByRole('textbox', {
    name: 'Article Title',
  });
  const articleDescriptionTextBoxLocator: Locator = page.getByRole('textbox', {
    name: "What's this article about?",
  });
  const articleContentTextBoxLocator: Locator = page.getByRole('textbox', {
    name: 'Write your article', 
  });
  const articleTagsTextBoxLocator: Locator = page.getByRole('textbox', {
    name: 'Enter tags',
  });
  const publishArticleButtonLocator: Locator = page.getByRole('button', {
    name: 'Publish Article',
  });

  return {
    newArticleButtonLocator,
    articleTileTextBoxLocator,
    articleDescriptionTextBoxLocator,
    articleContentTextBoxLocator,
    articleTagsTextBoxLocator,
    publishArticleButtonLocator,
  };
}

export async function clickNewArticleButton(page: Page) {
  await getCreateArticleFormLocators(page).newArticleButtonLocator.click();
}

export async function fillArticleTitle(page: Page, title: string) {
  await getCreateArticleFormLocators(page).articleTileTextBoxLocator.fill(
    title
  );
}

export async function fillArticleDescription(page: Page, description: string) {
  await getCreateArticleFormLocators(
    page
  ).articleDescriptionTextBoxLocator.fill(description);
}

export async function fillArticleContent(page: Page, content: string) {
  await getCreateArticleFormLocators(page).articleContentTextBoxLocator.fill(
    content
  );
}

export async function fillArticleTags(page: Page, tags: string) {
  await getCreateArticleFormLocators(page).articleTagsTextBoxLocator.fill(tags);
}

export async function clickPublishArticleButton(page: Page) {
  await getCreateArticleFormLocators(page).publishArticleButtonLocator.click();
}

export async function createArticle(
  page: Page,
  title: string,
  description: string,
  content: string,
  tags: string
) {
  await clickNewArticleButton(page);
  await fillArticleTitle(page, title);
  await fillArticleDescription(page, description);
  await fillArticleContent(page, content);
  await fillArticleTags(page, tags);
  await clickPublishArticleButton(page);
}
