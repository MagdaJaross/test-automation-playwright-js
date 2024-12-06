import { test, expect } from "@playwright/test";
import { generateRandomEmail } from "../fixtures/random";
const { faker } = require('@faker-js/faker');


test("should open registration page", async ({ page }) => {
    await page.goto("/prihlaseni");
    await page.getByText("Registrujte se").click();
    await expect(page.locator('h1')).toHaveText("Registrace");
    await expect(page.getByRole('button', { name: "Zaregistrovat" })).toBeVisible();
});

test("valid new registration", async ({ page }) => {
    await page.goto("/registrace");
    await page.getByLabel('Jméno a příjmení').fill("Tomáš Nový");
    await page.getByLabel('Email').fill(generateRandomEmail());
    console.log(generateRandomEmail());
    await page.getByLabel('heslo').fill("noveHeslo1");
    await page.getByLabel('Kontrola hesla').fill("noveHeslo1");

    await page.getByRole('button', { name: "Zaregistrovat" }).click();
    await page.waitForLoadState();
    const currentNewUser = page
        .locator(".navbar-right")
        .locator("strong")
        .textContent();
    console.log("Current user name: " + await currentNewUser);
    await expect(page.locator('.navbar-right').locator('strong')).toHaveText('Tomáš Nový');
});

test("new registration with faker", async ({ page }) => {
    await page.goto("/registrace");
    const randomName = faker.person.fullName();
    await page.getByLabel('Jméno a příjmení').fill(randomName);
    const randomEmail = faker.internet.email();
    await page.getByLabel('Email').fill(randomEmail);
    console.log(randomEmail);
    await page.getByLabel('heslo').fill("noveHeslo1");
    await page.getByLabel('Kontrola hesla').fill("noveHeslo1");

    await page.getByRole('button', { name: "Zaregistrovat" }).click();
    await page.waitForLoadState();
    const currentNewUser = page
        .locator(".navbar-right")
        .locator("strong")
        .textContent();
    console.log("Current user name: " + await currentNewUser);
    await expect(page.locator('.navbar-right').locator('strong')).toHaveText(randomName);
});


