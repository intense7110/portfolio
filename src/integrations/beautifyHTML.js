import { exec } from 'child_process';
import config from '../site-config.js';

if (!config.build.html.minify) {
  exec('npm run format');
}
