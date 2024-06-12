import { Page } from "puppeteer";

export const loginToSite = async (districtOnePage: Page) => {
  console.log("Пытаемся залогинится на сайт");

  await districtOnePage.setViewport({ width: 1280, height: 800 });
  await districtOnePage.goto("https://districtone.io/");
  await districtOnePage.waitForTimeout(6000);
  await districtOnePage.click(
    "button.MuiButton-root.MuiButton-fullWidth.MuiButton-variantOutlined.MuiButton-colorPrimary.MuiButton-sizeLg"
  );

  const newPagePromise = new Promise<Page>((resolve) =>
    districtOnePage.browser().once("targetcreated", async (target) => {
      const newPage = await target.page();
      if (newPage) {
        await newPage.waitForSelector('button[data-testid="page-container-footer-next"]');
        await newPage.click('button[data-testid="page-container-footer-next"]');
        await newPage.waitForTimeout(1000);
        await newPage.click('button[data-testid="page-container-footer-next"]');
        resolve(newPage);
      }
    })
  );
  await newPagePromise;
  console.log("Ждем пока появится страница");

  await districtOnePage.waitForSelector(".MuiModalDialog-root");
  await districtOnePage.click(
    ".flex.flex-col.mt-6.w-full .MuiButton-root.MuiButton-variantOutlined.MuiButton-colorPrimary.MuiButton-sizeLg.css-1knk0fd"
  );

  const newPagePromise2 = new Promise<Page>((resolve) =>
    districtOnePage.browser().once("targetcreated", async (target) => {
      const newPage = await target.page();
      if (newPage) {
        await newPage.waitForSelector('button[data-testid="page-container-footer-next"]');
        await newPage.click('button[data-testid="page-container-footer-next"]');
        resolve(newPage);
      }
    })
  );
  await newPagePromise2;
  console.log("Мы успешно авторизовались на сайте District One");

  await districtOnePage.waitForSelector(".nav-container");
  await districtOnePage.click(".nav-container .css-11m1087");
  await districtOnePage.waitForSelector('.css-1s5vdvw div[aria-label="Seva торгует | toolsUP - 3000💎CHECK PIN"]');
  await districtOnePage.click('.css-1s5vdvw div[aria-label="Seva торгует | toolsUP - 3000💎CHECK PIN"]');

  console.log("Мы успешно зашли в спейс Seva торгует");
};



