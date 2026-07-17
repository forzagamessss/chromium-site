const fs = require('fs');
const path = require('path');

const root = __dirname;
const packagePath = path.join('com', 'chromium', 'e621', 'client');
const javaDir = path.join(root, 'android', 'app', 'src', 'main', 'java', packagePath);
const templateDir = path.join(root, 'native', 'android');
const manifestPath = path.join(root, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
const buildGradlePath = path.join(root, 'android', 'app', 'build.gradle');

fs.mkdirSync(javaDir, { recursive: true });

for (const filename of ['MainActivity.java', 'MediaDownloaderPlugin.java']) {
  fs.copyFileSync(path.join(templateDir, filename), path.join(javaDir, filename));
}

const mainActivityPath = path.join(javaDir, 'MainActivity.java');
const mainActivity = fs.readFileSync(mainActivityPath, 'utf8');
const registerIndex = mainActivity.indexOf('registerPlugin(MediaDownloaderPlugin.class)');
const superIndex = mainActivity.indexOf('super.onCreate(savedInstanceState)');

if (registerIndex === -1 || superIndex === -1 || registerIndex > superIndex) {
  throw new Error('MediaDownloaderPlugin must be registered before super.onCreate().');
}

let manifest = fs.readFileSync(manifestPath, 'utf8');
const storagePermission = [
  '    <uses-permission',
  '        android:name="android.permission.WRITE_EXTERNAL_STORAGE"',
  '        android:maxSdkVersion="28" />'
].join('\n');

if (!manifest.includes('android.permission.WRITE_EXTERNAL_STORAGE')) {
  manifest = manifest.replace(
    /(<uses-permission android:name="android\.permission\.INTERNET"\s*\/>)/,
    `$1\n${storagePermission}`
  );
}

fs.writeFileSync(manifestPath, manifest);

let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');
buildGradle = buildGradle
  .replace(/versionCode\s+\d+/, 'versionCode 2')
  .replace(/versionName\s+"[^"]+"/, 'versionName "1.0.1"');
fs.writeFileSync(buildGradlePath, buildGradle);

console.log('Android native downloader configured.');
