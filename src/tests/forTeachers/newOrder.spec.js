import { test, expect } from '@playwright/test';
const { faker } = require('@faker-js/faker');
//import { NewOrderPage } from './pages/newOrder.page';



test('open new order form for teacher', async ({ page }) => {
    await page.goto('/prihlaseni');
    await page.getByText('Pro učitelé').click();
    await page.getByText('Objednávka pro MŠ/ZŠ').click();

    await expect(page.locator('h1')).toHaveText('Nová objednávka');
    await expect(page.locator('.card-body').locator('h3')).toHaveText('Objednávka akce');
    await expect(page.locator('.card-body')).toBeEnabled();

});


test('after filling in the ID number, data about the customer is automatically loaded', async ({ page }) => {
    await page.goto('/objednavka/pridat');
    await expect(page.locator('h1')).toHaveText('Nová objednávka');
    await page.getByLabel('IČO').focus();
    await page.getByLabel('IČO').fill('25826654');
    await page.getByLabel('IČO').press('Enter');

    try {
        // Ověření, že pole byla automaticky vyplněna 
        await expect(page.getByLabel('Odběratel')).toHaveText('KVADOS, a.s.');
        await expect(page.getByLabel('Úplná adresa')).toHaveText('Pivovarská 4/10, Moravská Ostrava, 70200 Ostrava');

    } catch (error) {

        console.log(error);
        // Ověření, že se zobrazila chybová hláška 
        await expect(page.locator('.toast-message')).toBeVisible();
        await expect(page.getByText('Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně')).toBeVisible();
    }

});


test('correctly filled order for "příměstský tábor" can be sent', async ({ page }) => {
    await page.goto('/objednavka/pridat');
    await expect(page.locator('h1')).toHaveText('Nová objednávka');
    await expect(page.locator('.card-body').locator('h3')).toHaveText('Objednávka akce');
    await expect(page.locator('.card-body')).toBeEnabled();

    await page.getByLabel('IČO').fill('70631735');
    await page.getByLabel('IČO').press('Tab');
    await page.getByLabel('Odběratel').fill('Základní škola a mateřská škola Ostrava-Hrabůvka, Mitušova 16, příspěvková organizace');
    await page.getByLabel('Úplná adresa').fill('Mitušova 1506/16, Hrabůvka, 70030 Ostrava');
    await page.getByLabel('Zastoupena').fill('Klára Malá');
    await page.getByLabel('Jméno a příjmení').fill('Tomáš Kratina');
    await page.getByLabel('Telefon').fill('123456789');
    await page.getByLabel('email').fill('skola.mitus@ova.org');

    // Generování náhodného data v budoucnosti, maximálně 365 dní dopředu
    const randomFutureDate = faker.date.soon({ days: 365, refDate: Date.now() });

    // Formátování data na DD.MM.YYYY
    const formattedDate = randomFutureDate.toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    console.log(formattedDate);

    // Přidání např. 7 dnů k prvnímu datu (délka pobytu)
    const futureDatePlusXDays = new Date(randomFutureDate);
    futureDatePlusXDays.setDate(futureDatePlusXDays.getDate() + 7);
    const formattedDatePlusXDays = futureDatePlusXDays.toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    console.log(formattedDatePlusXDays);

    // Vyplnění textových polí náhodnými daty
    await page.fill('#start_date_1', formattedDate);
    await page.fill('#end_date_1', formattedDatePlusXDays);

    // Kliknutí na záložku "Příměstský tábor"
    await page.getByRole('tab', { name: 'Příměstský tábor' }).click();
    await expect(page.getByRole('button', { name: 'Uložit objednávku' })).toBeVisible();
    await page.getByRole('spinbutton', { name: 'Počet dětí' }).fill('10');
    await page.getByRole('textbox', { name: 've věku' }).fill('10');
    await page.getByRole('spinbutton', { name: 'Počet pedagogického doprovodu' }).fill('3');

    await page.getByRole('button', { name: 'Uložit objednávku' }).click();
    await expect(page.locator('.toast-message')).toBeVisible();
    await expect(page.getByText('Objednávka byla úspěšně uložena', { exact: true })).toBeVisible();
});



test('the order cannot be sent if any of the required information is missing', async ({ page }) => {
    await page.goto('/objednavka/pridat');
    await expect(page.locator('h1')).toHaveText('Nová objednávka');
    await expect(page.locator('.card-body').locator('h3')).toHaveText('Objednávka akce');
    await expect(page.locator('.card-body')).toBeEnabled();

    await page.getByLabel('IČO').fill('70631735');
    await page.getByLabel('IČO').press('Tab');
    await page.getByLabel('Odběratel').fill('Základní škola a mateřská škola Ostrava-Hrabůvka, Mitušova 16, příspěvková organizace');
    await page.getByLabel('Úplná adresa').fill('Mitušova 1506/16, Hrabůvka, 70030 Ostrava');
    //await page.getByLabel('Zastoupena').fill('Klára Malá');
    await page.getByLabel('Jméno a příjmení').fill('Tomáš Kratina');
    await page.getByLabel('Telefon').fill('123456789');
    await page.getByLabel('email').fill('skola.mitus@ova.org');

    // Generování náhodného data v budoucnosti, maximálně 365 dní dopředu
    const randomFutureDate = faker.date.soon({ days: 365, refDate: Date.now() });

    // Formátování data na DD.MM.YYYY
    const formattedDate = randomFutureDate.toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    console.log(formattedDate);

    // Přidání např. 7 dnů k prvnímu datu (délka pobytu)
    const futureDatePlusXDays = new Date(randomFutureDate);
    futureDatePlusXDays.setDate(futureDatePlusXDays.getDate() + 7);
    const formattedDatePlusXDays = futureDatePlusXDays.toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    console.log(formattedDatePlusXDays);

    // // Vyplnění textových polí náhodnými daty
    await page.fill('#start_date_1', formattedDate);
    await page.fill('#end_date_1', formattedDatePlusXDays);

    // Kliknutí na záložku "Příměstský tábor"
    await page.getByRole('tab', { name: 'Příměstský tábor' }).click();
    await expect(page.getByRole('button', { name: 'Uložit objednávku' })).toBeVisible();
    await page.getByRole('spinbutton', { name: 'Počet dětí' }).fill('10');
    await page.getByRole('textbox', { name: 've věku' }).fill('10');
    await page.getByRole('spinbutton', { name: 'Počet pedagogického doprovodu' }).fill('3');

    await page.getByRole('button', { name: 'Uložit objednávku' }).click();
    await expect(page.getByLabel('Zastoupena')).toBeFocused();
    await expect(page.locator('h1')).toHaveText('Nová objednávka');
    await expect(page.locator('.card-body').locator('h3')).toHaveText('Objednávka akce');
    await expect(page.locator('.card-body')).toBeEnabled();

});



