import { test } from "@playwright/test";

test("should open registration page", async ({ page }) => {
    await page.goto("/registrace");
    console.log(await page.title());
    await page.screenshot({ path: "registration_page.png"})
});

test("homework2 - locators", async ({ page }) => {
    await page.goto("/registrace");
    await page.getByLabel("Jméno a příjmení").screenshot({ path: 'label_name.png'});
    //await page.locator('#name').screenshot({ path: 'css_id_name.png'});

    await page.getByLabel('email').screenshot({ path: 'label_email.png'});
    //await page.locator('#email').screenshot({ path: 'css_id_email.png'});

    await page.getByLabel('Heslo').screenshot({ path: 'label_heslo.png'});
    //await page.locator('input#password').screenshot({ path: 'css_input_heslo.png'});

    await page.getByLabel('Kontrola hesla').screenshot({ path: 'label_kontrola.png'});
    //await page.locator('[name*="confir"]').screenshot({ path: 'css_kontrola.png'});

    await page.getByText('Zaregistrovat').screenshot({ path: 'text_zaregistrovat.png'});
    //await page.locator('.btn-primary').screenshot({ path: 'css_register_button.png'});
});