import { test, expect } from "@playwright/test";
import { generateRandomEmail } from "../tests/random";
const { faker } = require('@faker-js/faker');
const { checkRegistrationForm, fillPassword } = require('../tests/utils.js');

test('go to the registration form', async ({ page }) => {
    await page.goto('/prihlaseni');
    await page.getByText('Registrujte se').click();

    await expect(page.locator('h1')).toHaveText('Registrace');
    await checkRegistrationForm(page);
});

test.describe('Registration', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/registrace');
        await checkRegistrationForm(page);
    });

    //test uses only changed email address for another run (it is enough for a new successful registration)
    test("valid registration 1", async ({ page }) => {

        const nameInput = page.getByLabel('Jméno a příjmení');
        const emailInput = page.getByLabel('Email');
        const registerButton = page.getByRole('button', { name: 'Zaregistrovat' });
        const heading = page.locator('h1');
        const randomEmail = generateRandomEmail();

        await nameInput.fill('Tomáš Nový');
        //await expect(page.locator('input#name')).toHaveText('Tomáš Nový');
        await emailInput.fill(randomEmail);
        //await expect(emailInput).toHaveText(randomEmail);
        console.log(randomEmail);
        await fillPassword(page);
        await registerButton.click();

        const currentNewUserName = page
            .locator('.navbar-right')
            .locator('strong');
        await expect(currentNewUserName).toHaveText('Tomáš Nový');
        await expect(heading).toHaveText('Přihlášky');
    });

    //test uses different fake names and email addresses for each run
    test("valid registration 2", async ({ page }) => {

        const nameInput = page.getByLabel('Jméno a příjmení');
        const emailInput = page.getByLabel('Email');
        const registerButton = page.getByRole('button', { name: 'Zaregistrovat' });
        const heading = page.locator('h1');

        const randomName = faker.person.fullName();
        await nameInput.fill(randomName);
        console.log(randomName);

        const randomEmail = faker.internet.email();
        await emailInput.fill(randomEmail);
        console.log(randomEmail);

        await fillPassword(page);

        await registerButton.click();
        const currentNewUserName = page
            .locator('.navbar-right')
            .locator('strong');
        await expect(currentNewUserName).toHaveText(randomName);
        await expect(heading).toHaveText('Přihlášky');
    });

    test("should not register with an existing email", async ({ page }) => {

        //first registration + logout -> get certain email
        const nameInput = page.getByLabel('Jméno a příjmení');
        const emailInput = page.getByLabel('Email');
        const registerButton = page.getByRole('button', { name: 'Zaregistrovat' });
        const logoutButton = page.locator('#logout-link');

        let randomName = faker.person.fullName();
        await nameInput.fill(randomName);
        console.log(randomName);

        const randomEmail = faker.internet.email();
        await emailInput.fill(randomEmail);
        console.log(randomEmail);

        await fillPassword(page);

        await registerButton.click();

        await page.getByRole('button', { name: randomName }).click();
        await logoutButton.click();

        //another registration with currently used email
        await page.goto('/registrace');

        randomName = faker.person.fullName();
        await nameInput.fill(randomName);  //vyplní nově vygenerované jméno
        console.log(randomName);
        await emailInput.fill(randomEmail);  //použije stejný email jako při registraci výše
        console.log(randomEmail);

        await fillPassword(page);
        await registerButton.click();

        const toastMessage = page.locator('.toast-message');
        const fieldError = page.locator('.invalid-feedback').locator('strong');
        //ověří chybové hlášky
        await expect(toastMessage).toBeVisible();
        await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
        await expect(fieldError).toBeVisible();
        await expect(fieldError).toHaveText("Účet s tímto emailem již existuje");
        //await expect(page.getByText('Účet s tímto emailem již')).toBeVisible();
        await checkRegistrationForm(page); //ověří, že je stále na stránce registrace
    });

    test("should not register with non-valid password (only numbers)", async ({ page }) => {

        const nameInput = page.getByLabel('Jméno a příjmení');
        const emailInput = page.getByLabel('Email');
        const passwordInput = page.getByLabel('heslo');
        const controlPasswordInput = page.getByLabel('Kontrola hesla');
        const registerButton = page.getByRole('button', { name: 'Zaregistrovat' });

        const randomName = faker.person.fullName();
        await nameInput.fill(randomName);
        console.log(randomName);

        const randomEmail = faker.internet.email();
        await emailInput.fill(randomEmail);
        console.log(randomEmail);

        const onlyNumbersPassword = '785634';
        await passwordInput.fill(onlyNumbersPassword);
        await controlPasswordInput.fill(onlyNumbersPassword);
        await registerButton.click();

        const toastMessage = page.locator('.toast-message');
        const fieldError = page.locator('.invalid-feedback').locator('strong');
        //ověří chybové hlášky
        await expect(toastMessage).toBeVisible();
        await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
        await expect(fieldError).toBeVisible();
        await expect(fieldError).toHaveText("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");
        await checkRegistrationForm(page); //ověří, že je stále na stránce registrace
    });
});
