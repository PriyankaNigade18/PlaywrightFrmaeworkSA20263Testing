import { createAllureEnvironment } from './src/allure/create-allure-environment.js'

async function globalSetup() {
    console.log("===== GLOBAL SETUP STARTED =====");

    createAllureEnvironment();

    console.log("===== ALLURE ENVIRONMENT FILE CREATED =====");
}

export default globalSetup;