import {
  Browser,
  Page,
  Response,
  PlaywrightWebBaseLoader,
} from 'langchain/document_loaders/web/playwright';
import { Document } from 'langchain/dist/document';

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
        ['nav', 'header', 'footer'].forEach((tag) => {
          [...document.body.getElementsByTagName(tag)].forEach(
            (element) => {
              element.remove();
            }
          );
        });
        return document.body.innerText;
      });

      return result;
    },
  });

  const docs: Document[] = await textLoader.load();
  const pageContent = docs[0].pageContent.replace(/\n/g, ' ');

  return pageContent;
};
