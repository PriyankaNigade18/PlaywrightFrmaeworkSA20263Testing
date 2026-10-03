import fs from 'fs';
import path from 'path';

export function createAllureEnvironment() {

    const allureResultsPath = path.join(
        process.cwd(),
        'allure-results'
    );

    // Create allure-results folder if it does not exist
    if (!fs.existsSync(allureResultsPath)) {
        fs.mkdirSync(allureResultsPath, { recursive: true });
    }

    const environmentContent = `
Company=Beizz IT Tech
Application=SwagLab Application
Environment=${process.env.ENV || 'QA'}
Framework=Playwright
Browser=Chromium
Execution=GitHub Actions
Node Version=${process.version}
Git Branch=${process.env.GITHUB_REF_NAME || 'Local'}
Git Commit=${process.env.GITHUB_SHA || 'Local'}
Run Number=${process.env.GITHUB_RUN_NUMBER || 'Local'}
`;

    fs.writeFileSync(
        path.join(allureResultsPath, 'environment.properties'),
        environmentContent.trim()
    );

    console.log("Environment file created at:",
        path.join(allureResultsPath, 'environment.properties')
    );
}
