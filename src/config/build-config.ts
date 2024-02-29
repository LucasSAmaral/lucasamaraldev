import fs from 'fs/promises';
import mergeOptions from 'merge-options';

const buildConfigObject = async () => {
  const portugueseLocale = JSON.parse(await fs.readFile('src/config/locale/pt-br.json', 'utf8'));

  const englishLocale = JSON.parse(await fs.readFile('src/config/locale/en-us.json', 'utf8'));

  const commonLocale = JSON.parse(
    await fs.readFile('src/config/locale/common-locale.json', 'utf8'),
  );

  const menuConfig = JSON.parse(await fs.readFile('src/config/menu-config.json', 'utf8'));

  const appConfig = JSON.parse(await fs.readFile('src/config/app-config.json', 'utf8'));

  const configAndLocaleMerged = mergeOptions(
    menuConfig,
    appConfig,
    commonLocale,
    portugueseLocale,
    englishLocale,
  );

  await fs.writeFile('generated-config.json', JSON.stringify(configAndLocaleMerged, null, 2));
};

buildConfigObject();
