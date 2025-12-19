import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base/BasePage';

export class HomePage extends BasePage {
  private settingsLink: Locator = this.page.getByRole('link', {
    name: 'Settings',
  });
  private newArticleLink: Locator = this.page.getByRole('link', {
    name: 'New Article',
  });
  private homeLink: Locator = this.page.getByRole('link', {
    name: 'Home',
  });
  //TODO deal with name: 'pavlo'
  private userProfileLink: Locator = this.page.getByRole('link', {
    name: 'pavlo',
  });

  constructor(page: Page) {
    super(page);
  }

  getSettingsLink = async () => {
    return this.settingsLink;
  };

  getNewArticleLink = async () => {
    return this.newArticleLink;
  };

  clickSettingsLink = async () => {
    await this.settingsLink.click();
  };
}
