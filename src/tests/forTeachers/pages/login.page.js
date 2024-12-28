export class LoginPage {

    constructor(page) {
        this.page = page; // alternativa: this.loginPage = page;
        this.emailField = this.page.getByLabel("Email");
        this.passwordField = this.page.getByLabel("Heslo");
        this.loginButton = this.page.getByRole("button", { name: "Přihlásit" });
        this.toast = this.page.locator(".toast-message");
        this.fieldError = this.page.locator(".invalid-feedback");
        this.navbarRight = this.page.locator(".navbar-right");
        this.logoutLink = this.page.locator("#logout-link");
        this.usernameDropdown = this.navbarRight.locator("[data-toggle='dropdown']");
        this.forTeachersFolder = this.page.getByText('Pro učitelé');
        this.orderForSchoolOption = this.page.getByText('Objednávka pro MŠ/ZŠ');
    }

    async open() {
        await this.page.goto('/prihlaseni');
    }

    async openNewOrder() {
        await this.page.goto('/objednavka/pridat');
    }

    async login(username, password) {
        await this.emailField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}