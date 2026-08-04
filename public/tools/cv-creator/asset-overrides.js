ASSET_SOURCES['awesome-cv.cls'] = 'https://gist.githubusercontent.com/stifmeister1989/52bb651d12617f0c8738810d325a899a/raw/awesome-cv.cls';
ASSET_SOURCES['res.cls'] = 'https://gist.githubusercontent.com/hawkw/9352676/raw/res.cls';

const sourceSansCommit = '778e10a';
for (const file of [
  'SourceSansPro-Bold.otf',
  'SourceSansPro-BoldIt.otf',
  'SourceSansPro-It.otf',
  'SourceSansPro-Light.otf',
  'SourceSansPro-LightIt.otf',
  'SourceSansPro-Regular.otf',
  'SourceSansPro-Semibold.otf',
  'SourceSansPro-SemiboldIt.otf',
]) {
  ASSET_SOURCES[`fonts/${file}`] =
    `https://raw.githubusercontent.com/adobe-fonts/source-sans-pro/${sourceSansCommit}/OTF/${file}`;
}
