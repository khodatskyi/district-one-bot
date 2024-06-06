import { Page } from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

export const setupMetaMask = async (metamaskPage: Page) => {
  console.log("Начинаем настройку MetaMask...");
  await metamaskPage.click("#onboarding__terms-checkbox");
  await metamaskPage.click('button[data-testid="onboarding-import-wallet"]');
  await metamaskPage.click('button[data-testid="metametrics-i-agree"]');

  console.log("Переходим к вводу сид-фразы.");
  const seedPhrase = process.env.SEED_PHRASE!;
  const seedWords = seedPhrase.split(" ");

  for (let i = 0; i < seedWords.length; i++) {
    const selector = `#import-srp__srp-word-${i}`;
    await metamaskPage.type(selector, seedWords[i]);
  }
  console.log("Сид-фраза введена.");

  await metamaskPage.click('button[data-testid="import-srp-confirm"]');
  await metamaskPage.type('input[data-testid="create-password-new"]', process.env.PASSWORD!);
  await metamaskPage.type('input[data-testid="create-password-confirm"]', process.env.PASSWORD!);
  await metamaskPage.click('input[data-testid="create-password-terms"]');
  await metamaskPage.click('button[data-testid="create-password-import"]');
  console.log("Кошелек импортирован.");

  await metamaskPage.waitForTimeout(2000);

  await metamaskPage.click('button[data-testid="onboarding-complete-done"]');
  await metamaskPage.click('button[data-testid="pin-extension-next"]');
  await metamaskPage.click('button[data-testid="pin-extension-done"]');
  await metamaskPage.click("button.mm-button-primary");
  console.log("Настройка MetaMask завершена.");
};
