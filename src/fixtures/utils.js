const { expect } = require('@playwright/test');
const selectors = require('./selectors');

async function checkRegistrationForm(page) {
    const nameInput = selectors.getNameInput(page);
    const emailInput = selectors.getEmailInput(page);
    const passwordInput = selectors.getPasswordInput(page);
    const controlPasswordInput = selectors.getControlPasswordInput(page);
    const registerButton = selectors.getRegisterButton(page);

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(controlPasswordInput).toBeVisible();
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeEnabled();
}


async function fillPassword(page) {
    const passwordInput = selectors.getPasswordInput(page);
    const controlPasswordInput = selectors.getControlPasswordInput(page);

    await passwordInput.fill('noveHeslo1');
    await controlPasswordInput.fill('noveHeslo1');
}

module.exports = { checkRegistrationForm, fillPassword };

