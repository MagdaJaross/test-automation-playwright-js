import { test, expect } from '@playwright/test';
const { faker } = require('@faker-js/faker');
import { NewOrderPage } from './pages/newOrder.page';
import { LoginPage } from './pages/login.page';
import { checkOrderForm } from '../utils.js';


test('open new order form for teacher', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.forTeachersFolder.click();
    await loginPage.orderForSchoolOption.click();

    await checkOrderForm(page);
});


test.describe('New school event order', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.openNewOrder();
    });

    test('after filling in the ID number, data about the customer is automatically loaded', async ({ page }) => {
        const newOrderPage = new NewOrderPage(page);

        await checkOrderForm(page);
        await newOrderPage.idInput.focus();
        await newOrderPage.idInput.fill('25826654');
        await newOrderPage.idInput.press('Enter');

        try {
            // Ověření, že pole byla automaticky vyplněna podle IČO správně
            await expect(newOrderPage.companyNameField).toHaveText('KVADOS, a.s.');
            await expect(newOrderPage.companyAddressField).toHaveText('Pivovarská 4/10, Moravská Ostrava, 70200 Ostrava');

        } catch (error) {

            console.log(error);
            // Ověření, že se zobrazila chybová hláška 
            await expect(newOrderPage.toastMessage).toBeVisible();
            await expect(newOrderPage.noticeAresFails).toBeVisible();
        }
    });

    test('correctly filled order for "příměstský tábor" can be sent', async ({ page }) => {
        const newOrderPage = new NewOrderPage(page);

        await checkOrderForm(page);
        await newOrderPage.fillOrderFormByRealDates();

        // Použití metody pro vyplnění náhodných dat 
        await newOrderPage.fillRandomDates('#start_date_1', '#end_date_1', 5);

        // Otevření a vyplnění záložky "Příměstský tábor"
        await newOrderPage.primestskyTaborOption.click();
        await expect(newOrderPage.saveButton).toBeVisible();
        await newOrderPage.fillPrimestskyTaborValues();

        await newOrderPage.saveOrder();
        await expect(newOrderPage.toastMessage).toBeVisible();
        await expect(newOrderPage.successNotice).toBeVisible();
        await expect(newOrderPage.sussessAnnouncement).toBeVisible();
    });

    test('the order cannot be sent if any of the required information is missing', async ({ page }) => {
        //nevyplněné pole: (organizace) zastoupena: (kým)
        const newOrderPage = new NewOrderPage(page);

        await checkOrderForm(page);

        await newOrderPage.idInput.fill('70631735');
        await newOrderPage.idInput.press('Tab');
        await newOrderPage.companyNameField.fill('Základní škola a mateřská škola Ostrava-Hrabůvka, Mitušova 16, příspěvková organizace');
        await newOrderPage.companyAddressField.fill('Mitušova 1506/16, Hrabůvka, 70030 Ostrava');
        //await newOrderPage.responsiblePersonField.fill('Klára Malá');
        await newOrderPage.nameInput.fill('Tomáš Kratina');
        await newOrderPage.phoneInput.fill('123456789');
        await newOrderPage.emailInput.fill('skola.mitus@ova.org');

        await newOrderPage.fillRandomDates('#start_date_1', '#end_date_1', 7);

        // Otevře a vyplní záložku "Příměstský tábor"
        await newOrderPage.primestskyTaborOption.click();
        await expect(newOrderPage.saveButton).toBeVisible();
        await newOrderPage.fillPrimestskyTaborValues();

        await newOrderPage.saveOrder();  //pokus o uložení nekompletní objednávky
        await expect(newOrderPage.responsiblePersonField).toBeFocused();
        await checkOrderForm(page);
    });
});

