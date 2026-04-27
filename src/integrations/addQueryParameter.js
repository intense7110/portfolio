import { sync as globSync } from 'glob';
import fs from 'fs';
import config from '../site-config.js';

const { root, css, js } = config.build;

const generateTimestamp = () => {
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  return `${pad(now.getFullYear() % 100)}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
};

const escapeRegex = str => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

const addQueryParameter = (path, timestamp) => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${normalized}?ver=${timestamp}`;
};

const updateHtml = () => {
  const timestamp = generateTimestamp();

  let cssRegex   = null;
  let newCssPath = '';

  if (css.queryParameter) {
    newCssPath = addQueryParameter(css.path, timestamp);
    const cssPathEscaped = escapeRegex(css.path);
    cssRegex = new RegExp(`(<link\\s+rel=["']stylesheet["']\\s+href=["'])(/?${cssPathEscaped})(\\?ver=\\d+)?(["'])`, 'g');
  }

  let jsRegex   = null;
  let newJsPath = '';

  if (js.queryParameter) {
    newJsPath = addQueryParameter(js.path, timestamp);
    const jsPathEscaped = escapeRegex(js.path);
    jsRegex = new RegExp(`(<script\\s+type=["']module["']\\s+src=["'])(/?${jsPathEscaped})(\\?ver=\\d+)?(["'])(\\s*>\\s*<\\/script>)`, 'g');
  }

  const files = globSync(`${root}/**/*.html`);

  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let updatedContent = content;

    if (cssRegex) {
      updatedContent = updatedContent.replace(cssRegex, (_, start, path, ver, quote) => {
        return `${start}${newCssPath}${quote}`;
      });
    }

    if (jsRegex) {
      updatedContent = updatedContent.replace(jsRegex, (_, start, path, ver, quote, endTag) => {
        return `${start}${newJsPath}${quote}${endTag}`;
      });
    }

    if (updatedContent !== content) {
      fs.writeFileSync(file, updatedContent, 'utf-8');
    }
  });
};

updateHtml();
