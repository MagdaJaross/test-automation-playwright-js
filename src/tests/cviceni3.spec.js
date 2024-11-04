import { test } from "@playwright/test";
import { username, password } from "../fixtures/fixtures";


test( "exercise1 - work with elements", async ({ page }) => {
    await page.goto('/prihlaseni');

    /* find elements/inputs for an email and password on the login page and check that the inputs are visible and enabled*/
    console.log(await page.getByLabel('email').isVisible());
    console.log(await page.getByLabel('heslo').isVisible());
    console.log(await page.getByLabel('email').isEnabled());
    console.log(await page.getByLabel('heslo').isEnabled());

    /* find a submit button and write its text to the console*/
    console.log(await page.getByRole('button', { name: 'Přihlásit'}).textContent());

    /* find a link for "Zapomněli jste své heslo?" and write value of its attribute href*/
    console.log(await page.getByRole('link', { name: 'Zapomněli jste své heslo?'}).getAttribute('href'));

    /* login to the app*/
    await page.getByLabel('email').fill(username);
    await page.getByLabel('heslo').fill(password);
    await page.getByRole('button', { name: 'Přihlásit'}).click();

    /* find an element, which contains whole logged user name, and write it in the console*/
       console.log(await page.locator('.navbar-right').getByText("Lišák Admin").textContent());

});

test( "exercise2 - finding more elements", async ({ page }) => {

    /*login to the app*/
    await page.goto('/prihlaseni');
    await page.getByLabel('email').fill(username);
    await page.getByLabel('heslo').fill(password);
    await page.getByRole('button', { name: 'Přihlásit'}).click();

    /* click on a link "Přihlášky"*/
    await page.getByRole('link', { name: 'Přihlášky'}).click();

    /* write page name*/
    console.log(await page.locator('h1').textContent());
 
    /* find all rows of the application table and write the content*/
    await page.locator('div').locator('table').locator('tbody').screenshot({ path: 'tabulka.png'});
    console.log(await page.locator('tbody').textContent());

    /*write number of table rows*/
    console.log(await page.locator('tbody').getByRole('row').count());
    console.log(await page.getByRole('status').textContent());

});

test.only("exercise3 - search", async ({ page }) => {
    await page.goto('/prihlaseni');
    await page.getByLabel('email').fill(username);
    await page.getByLabel('heslo').fill(password);
    await page.getByRole('button', { name: 'Přihlásit'}).click();

    /* go to the Přihlášky page and count the rows*/  
    await page.getByRole('link', { name: 'Přihlášky'}).click();   
    await page.locator('tbody').waitFor();
    console.log(await page.locator('tbody').getByRole('row').count());
    /*search "Elena" keyword*/
    await page.getByLabel('hledat').fill('Elena');
    /*count selected rows and write them*/
    await page.getByText('Provádím...').waitFor({ state: 'hidden'});  
    console.log(await page.locator('tbody').getByRole('row').count());
    console.log(await page.locator('tbody').textContent());


});