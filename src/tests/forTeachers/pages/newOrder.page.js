export class HomePage{
    constructor(page) {
        this.page = page;   // alternativa: this.homePage = page;
    }
}

export class NewOrderPage{
    constructor(page) {
        this.page = page;
        this.forTeachersButton = 
        this.header = this.page.locator('.header');
        this.heading = this.page.getByRole('heading', {name: 'Objednávka akce'});
    }

    async functionName() {   //vzor
        console.log('funkce funguje');
    }
}


await page.getByRole('button', { name: 'Pro učitelé' }).click();
await page.locator('.dropdown-item').filter({ hasText: 'Objednávka pro MŠ/ZŠ' }).click()