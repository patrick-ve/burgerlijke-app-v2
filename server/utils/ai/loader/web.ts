import {
  Browser,
  Page,
  Response,
  PlaywrightWebBaseLoader,
} from 'langchain/document_loaders/web/playwright';

export const generateDocumentFromWebPage = async (
  url: string
): Promise<string> => {
  const textLoader = new PlaywrightWebBaseLoader(url, {
    launchOptions: {
      headless: true,
    },
    gotoOptions: {
      waitUntil: 'domcontentloaded',
    },
    async evaluate(
      page: Page,
      browser: Browser,
      response: Response | null
    ) {
      if (response?.status() !== 200) {
        throw new Error('Site is unreachable.');
      }

      const result = await page.evaluate(() => {
        return document.body.innerText;
      });

      return result;
    },
  });

  const docs = await textLoader.load();
  const pageContent = docs[0].pageContent.replace(/\n/g, ' ');

  return pageContent;
};
