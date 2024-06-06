import puppeteer from "puppeteer";
import path from "path";
import { setupMetaMask } from "./metamask";
import { loginToSite, waitForMessageAndClick } from "../utils/helpers";

export const runBot = async () => {
  const extensionPath = path.resolve("C:/Users/dkhodatskyi/Desktop/Личное/Code/Scripts/District_One/metamask");
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`],
  });

  console.log("Wait loading 7 seconds");
  await new Promise((resolve) => setTimeout(resolve, 7000));

  const metamaskPage = (await browser.pages())[1];
  await setupMetaMask(metamaskPage);

  const DistrictOnePage = await browser.newPage();
  await loginToSite(DistrictOnePage);
  await waitForMessageAndClick(DistrictOnePage);

  await browser.close();
};
