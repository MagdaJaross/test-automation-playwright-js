const { faker } = require('@faker-js/faker');

export class NewOrderPage {
    constructor(page) {
        this.page = page;
        this.title = this.page.locator('h1');
        this.orderFormHeading = this.page.locator('.card-body').locator('h3');
        this.orderForm = this.page.locator('.card-body');
        this.idInput = this.page.getByLabel('IČO');
        this.companyNameField = this.page.getByLabel('Odběratel');
        this.companyAddressField = this.page.getByLabel('Úplná adresa');
        this.responsiblePersonField = this.page.getByLabel('Zastoupena');
        this.nameInput = this.page.getByLabel('Jméno a příjmení');
        this.phoneInput = this.page.getByLabel('Telefon');
        this.emailInput = this.page.getByLabel('email');
        this.primestskyTaborOption = this.page.getByRole('tab', { name: 'Příměstský tábor' });
        this.saveButton = this.page.getByRole('button', { name: 'Uložit objednávku' });
        this.numberOfChildrenInput = this.page.getByRole('spinbutton', { name: 'Počet dětí' });
        this.childrensAge = this.page.getByRole('textbox', { name: 've věku' });
        this.numberOfTeachers = this.page.getByRole('spinbutton', { name: 'Počet pedagogického doprovodu' });
        this.toastMessage = this.page.locator('.toast-message');
        this.noticeAresFails = this.page.getByText('Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně');
        this.successNotice = this.page.getByText('Objednávka byla úspěšně uložena', { exact: true });
        this.sussessAnnouncement = this.page.getByText('Děkujeme za objednávku Objedn');
    }

    async fillOrderFormByRealDates() {
        await this.idInput.fill('70631735');
        await this.idInput.press('Tab');
        await this.companyNameField.fill('Základní škola a mateřská škola Ostrava-Hrabůvka, Mitušova 16, příspěvková organizace');
        await this.companyAddressField.fill('Mitušova 1506/16, Hrabůvka, 70030 Ostrava');
        await this.responsiblePersonField.fill('Klára Malá');
        await this.nameInput.fill('Tomáš Kratina');
        await this.phoneInput.fill('123456789');
        await this.emailInput.fill('skola.mitus@ova.org');
    }

    async fillPrimestskyTaborValues() {
        await this.numberOfChildrenInput.fill('20');
        await this.childrensAge.fill('10');
        await this.numberOfTeachers.fill('3');
    }

    async fillRandomDates(startDateSelector, endDateSelector, daysToAdd) {
        // Generování náhodného data v budoucnosti, maximálně 365 dní dopředu
        const randomFutureDate = faker.date.soon({ days: 365, refDate: Date.now() });

        // Formátování data na DD.MM.YYYY
        const formattedDate = randomFutureDate.toLocaleDateString('cs-CZ', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        console.log(formattedDate);

        // Přidání x dnů k prvnímu datu (délka pobytu)
        const futureDatePlusXDays = new Date(randomFutureDate);
        futureDatePlusXDays.setDate(futureDatePlusXDays.getDate() + daysToAdd);
        const formattedDatePlusXDays = futureDatePlusXDays.toLocaleDateString('cs-CZ', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        console.log(formattedDatePlusXDays);

        // Vyplnění textových polí náhodnými daty
        await this.page.fill(startDateSelector, formattedDate);
        await this.page.fill(endDateSelector, formattedDatePlusXDays);
    }

    async saveOrder() {
        await this.saveButton.click();
    }
}






