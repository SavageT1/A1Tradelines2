const fs = require('fs');
const path = require('path');

const cssPath = path.join(process.cwd(), 'client', 'src', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css
  .replace('@apply btn-neon ', '@apply ')
  .replace('@apply btn-ghost ', '@apply ')
  .replace('@apply glass-panel ', '@apply ');

fs.writeFileSync(cssPath, css);
console.log('Tailwind @apply compatibility patch applied.');
