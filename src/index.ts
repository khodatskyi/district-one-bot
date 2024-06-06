import { runBot } from "./bot/bot";

(async () => {
  try {
    await runBot();
  } catch (error) {
    console.error("Error running bot:", error);
  }
})();
