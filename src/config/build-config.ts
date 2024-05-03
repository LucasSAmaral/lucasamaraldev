import fs from 'fs/promises';
import mergeOptions from 'merge-options';

const buildConfigObject = async () => {
  const portugueseLocale = JSON.parse(await fs.readFile('src/config/locale/pt.json', 'utf8'));

  const englishLocale = JSON.parse(await fs.readFile('src/config/locale/en.json', 'utf8'));

  const commonLocale = JSON.parse(
    await fs.readFile('src/config/locale/common-locale.json', 'utf8'),
  );

  const navigationMenuConfig = JSON.parse(
    await fs.readFile('src/config/navigation-menu-config.json', 'utf8'),
  );

  const appConfig = JSON.parse(await fs.readFile('src/config/app-config.json', 'utf8'));

  const configAndLocaleMerged = mergeOptions(
    navigationMenuConfig,
    appConfig,
    commonLocale,
    portugueseLocale,
    englishLocale,
  );

  await fs.writeFile('generated-config.json', JSON.stringify(configAndLocaleMerged, null, 2));
};

buildConfigObject();
