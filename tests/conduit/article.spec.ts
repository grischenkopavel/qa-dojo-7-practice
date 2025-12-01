import { test, expect, Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {
  getCreateArticleFormLocators,
  clickNewArticleButton,
  fillArticleTitle,
  fillArticleDescription,
  fillArticleContent,
  fillArticleTags,
  clickPublishArticleButton,
  createArticle,
} from '../../app/conduit/ui/create-article';
import { getLoginPageLocators, isLogin } from '../../app/conduit/ui/users.ts';
import {
  getRegisterPageLocators,
  createUser,
} from '../../app/conduit/ui/users.ts';

interface article {
  title: string;
  description: string;
  content: string;
  tag: string;
}

test.describe(
  'Create articles and verify them under the feed',
  { tag: ['@article'] },
  async () => {
    const {
      EMAIL = 'default@email.com',
      USER_NAME = 'Pavlo',
      PASSWORD = 'default_pass',
    } = process.env;

    const articles: article[] = [];
    const articlesCount: number = 2;

    for (let i = 0; i < articlesCount; i++) {
      let title = faker.music.artist();
      let description = faker.music.album();
      let content = faker.music.songName();
      const tag = 'qa-senpai-the-best';

      articles.push({ title, description, content, tag });
    }

    test('Create articles and verify them under the feed', async ({ page }) => {
      await test.step(`Login as an existing user: ${USER_NAME}`, async () => {
        if ((await isLogin(page, EMAIL, PASSWORD)) === false) {
          await createUser(page, USER_NAME, EMAIL, PASSWORD);
        }

        await expect(page).toHaveURL(`/`);
        await expect(page.locator('[href="/editor"]')).toBeVisible();
      });

      for (let article of articles) {
        await test.step(`Create article with title ${article.title}`, async () => {
          await createArticle(
            page,
            article.title,
            article.description,
            article.content,
            article.tag
          );
        });

        await test.step(`Check created article with title ${article.title}`, async () => {
          await expect(page.locator('[data-qa-id="article-title"]')).toHaveText(
            article.title
          );
          await expect(
            page.locator('[data-qa-id="article-body"]>p')
          ).toHaveText(article.content);
        });
      }

      await test.step('Newly created articles are present under the global feed', async () => {
        let isVisible = false;

        await page.goto('/', { waitUntil: 'load' });

        await expect(
          page
            .locator('[data-test="page-link-1"]')
            .getByRole('link', { name: '1' })
        ).toBeVisible();

        const pagesCount = await page.locator('.pagination li').count();

        expect(pagesCount).toBeGreaterThan(0);

        for (const articleToFind of articles) {
          await test.step(`Find article with title ${articleToFind.title}`, async () => {
            isVisible = false;
            for (let i = 1; i <= pagesCount; i++) {
              if (isVisible) {
                break;
              }

              await page
                .locator(`[data-test="page-link-${i}"]`)
                .getByRole('link', { name: `${i}` })
                .click();

              try {
                await expect(
                  page.getByRole('link', { name: articleToFind.title })
                ).toBeVisible({ timeout: 500 });

                isVisible = true;
              } catch (e) {}
            }
          });
        }
      });

      //TODO add logic to remove created articles
      await test.step.skip(`Remove created article with title {}`, async () => {
        await page.locator('[data-qa-id="article-delete"]').first().click();
      });
    });
  }
);

test.skip('Template', async ({ page }) => {
  const {
    EMAIL = 'default@email.com',
    USER_NAME = 'Pavlo',
    PASSWORD = 'default_pass',
  } = process.env;

  if ((await isLogin(page, EMAIL, PASSWORD)) === false) {
    await createUser(page, USER_NAME, EMAIL, PASSWORD);
  }

  await expect(page).toHaveURL(`/`);
  await expect(page.locator('[href="/editor"]')).toBeVisible();

  const articleTitles: Locator[] = await page
    .locator('[data-qa-type="preview-title"]')
    .all();

  for (const article of articleTitles) {
    console.log(await article.textContent());
  }
});

test.skip('Pagination', async ({ page }) => {
  const elementToFind = 'Demo Article';
  let isVisible = false;

  await page.goto('/', { waitUntil: 'load' });

  await expect(
    page.locator('[data-test="page-link-1"]').getByRole('link', { name: '1' })
  ).toBeVisible();

  const pagesCount = await page.locator('.pagination li').count();

  expect(pagesCount).toBeGreaterThan(0);

  for (let i = 1; i <= pagesCount; i++) {
    if (isVisible) {
      break;
    }

    await page
      .locator(`[data-test="page-link-${i}"]`)
      .getByRole('link', { name: `${i}` })
      .click();

    try {
      await expect(page.getByRole('link', { name: elementToFind })).toBeVisible(
        { timeout: 500 }
      );

      isVisible = true;
    } catch (e) {}
  }
});
