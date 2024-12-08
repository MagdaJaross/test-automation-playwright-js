import { test, expect } from "@playwright/test";
import { generateRandomEmail } from "../fixtures/random";
const { faker } = require('@faker-js/faker');


test("go to the registration form", async ({ page }) => {
    await page.goto('/prihlaseni');
    await page.getByText('Registrujte se').click();

    const nameInput = page.getByLabel('Jméno a příjmení');
    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('heslo');
    const controlPasswordInput = page.getByLabel('Kontrola hesla');
    const registerButton = page.getByRole('button', { name: 'Zaregistrovat' });

    await expect(page.locator('h1')).toHaveText('Registrace');
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(controlPasswordInput).toBeVisible();
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeEnabled();
});


//test uses only changed email address for another run (it is enough for a new successful registration)
test("valid registration 1", async ({ page }) => {
    await page.goto('/registrace');

    const nameInput = page.getByLabel('Jméno a příjmení');
    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('heslo');
    const controlPasswordInput = page.getByLabel('Kontrola hesla');
    const registerButton = page.getByRole('button', { name: 'Zaregistrovat' });
    const heading = page.locator('h1');


    await nameInput.fill('Tomáš Nový');
    await emailInput.fill(generateRandomEmail());
    await passwordInput.fill('noveHeslo1');
    await controlPasswordInput.fill('noveHeslo1');
    await registerButton.click();

    const currentNewUserName = page
        .locator('.navbar-right')
        .locator('strong');
    await expect(currentNewUserName).toHaveText('Tomáš Nový');
    await expect(heading).toHaveText('Přihlášky');

});


//test uses different fake names and email addresses for each run
test("valid registration 2", async ({ page }) => {
    await page.goto('/registrace');

    const nameInput = page.getByLabel('Jméno a příjmení');
    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('heslo');
    const controlPasswordInput = page.getByLabel('Kontrola hesla');
    const registerButton = page.getByRole('button', { name: 'Zaregistrovat' });
    const heading = page.locator('h1');

    const randomName = faker.person.fullName();
    await nameInput.fill(randomName);

    const randomEmail = faker.internet.email();
    await emailInput.fill(randomEmail);

    await passwordInput.fill('noveHeslo1');
    await controlPasswordInput.fill('noveHeslo1');

    await registerButton.click();
    const currentNewUserName = page
        .locator('.navbar-right')
        .locator('strong');
    await expect(currentNewUserName).toHaveText(randomName);
    await expect(heading).toHaveText('Přihlášky');

});

test("should not register with an existing email", async ({ page }) => {

    //first registration + logout -> get email
    await page.goto('/registrace');

    const nameInput = page.getByLabel('Jméno a příjmení');
    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('heslo');
    const controlPasswordInput = page.getByLabel('Kontrola hesla');
    const registerButton = page.getByRole('button', { name: 'Zaregistrovat' });
    const logoutButton = page.locator('#logout-link');

    var randomName = faker.person.fullName();
    await nameInput.fill(randomName);

    const randomEmail = faker.internet.email();
    await emailInput.fill(randomEmail);

    await passwordInput.fill('noveHeslo1');
    await controlPasswordInput.fill('noveHeslo1');

    await registerButton.click();

    await page.getByRole('button', { name: randomName }).click();
    await logoutButton.click();

    //another registration with currently used email
    await page.goto('/registrace');

    randomName = faker.person.fullName();
    await nameInput.fill(randomName);  //vyplním nově vygenerované jméno
    await emailInput.fill(randomEmail);  //použiju stejný email jako při registraci výše
    await passwordInput.fill('noveHeslo1');
    await controlPasswordInput.fill('noveHeslo1');
    await registerButton.click();


    await expect(page).toHaveURL(/.*registrace/); //ověřím, že jsem stále na stránce registrace
    const toastMessage = page.locator('.toast-message');
    const fieldError = page.locator('.invalid-feedback').locator('strong');
    //ověřím chybové hlášky
    await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
    await expect(fieldError).toHaveText("Účet s tímto emailem již existuje");
    //await expect(page.getByText('Účet s tímto emailem již')).toBeVisible();

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(controlPasswordInput).toBeVisible();
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeEnabled();
});


test("should not register with non-valid password (only numbers)", async ({ page }) => {
    await page.goto('/registrace');

    const nameInput = page.getByLabel('Jméno a příjmení');
    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('heslo');
    const controlPasswordInput = page.getByLabel('Kontrola hesla');
    const registerButton = page.getByRole('button', { name: 'Zaregistrovat' });

    const randomName = faker.person.fullName();
    await nameInput.fill(randomName);

    const randomEmail = faker.internet.email();
    await emailInput.fill(randomEmail);

    const onlyNumbersPassword = '785634';
    await passwordInput.fill(onlyNumbersPassword);
    await controlPasswordInput.fill(onlyNumbersPassword);
    await registerButton.click();

    await expect(page).toHaveURL(/.*registrace/); //ověřím, že jsem stále na stránce registrace
    const toastMessage = page.locator('.toast-message');
    const fieldError = page.locator('.invalid-feedback').locator('strong');
    //ověřím chybové hlášky
    await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
    await expect(fieldError).toHaveText("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(controlPasswordInput).toBeVisible();
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeEnabled();

});
