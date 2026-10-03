import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root
const projectRoot = path.resolve(__dirname, '../../');

const reportPath = path.join(
    projectRoot,
    'allure-report'
);

const logoSource = path.join(
    projectRoot,
    'src',
    'allure',
    'assets',
    'company-logo.png'
);

const logoDestination = path.join(
    reportPath,
    'company-logo.png'
);

const indexFile = path.join(
    reportPath,
    'index.html'
);

// Check report folder
if (!fs.existsSync(reportPath)) {
    console.error('❌ allure-report folder does not exist.');
    process.exit(1);
}

// Check logo
if (!fs.existsSync(logoSource)) {
    console.error('❌ Company logo not found:', logoSource);
    process.exit(1);
}

// Check index.html
if (!fs.existsSync(indexFile)) {
    console.error('❌ index.html not found inside allure-report.');
    process.exit(1);
}

// Copy logo
fs.copyFileSync(
    logoSource,
    logoDestination
);

console.log('✅ Company logo copied to Allure report.');

// Read index.html
let html = fs.readFileSync(
    indexFile,
    'utf8'
);

// Logo CSS + HTML
const logoHtml = `
<style>
.company-logo-container {
    position: fixed;
    top: 10px;
    left: 20px;
    z-index: 9999;
    background: white;
    padding: 5px 10px;
    border-radius: 4px;
}

.company-logo {
    height: 40px;
    width: auto;
}
</style>

<div class="company-logo-container">
    <img
        src="company-logo.png"
        class="company-logo"
        alt="Company Logo"
    />
</div>
`;

// Add logo before </head>
html = html.replace(
    '</head>',
    `${logoHtml}</head>`
);

// Save modified report
fs.writeFileSync(
    indexFile,
    html,
    'utf8'
);

console.log('✅ Allure report customized successfully.');