module.exports = {
    getNameInput: (page) => page.getByLabel('Jméno a příjmení'),
    getEmailInput: (page) => page.getByLabel('Email'),
    getPasswordInput: (page) => page.getByLabel('Heslo'),
    getControlPasswordInput: (page) => page.getByLabel('Kontrola hesla'),
    getRegisterButton: (page) => page.getByRole('button', { name: 'Zaregistrovat' }),
    nameInput: (page) => selectors.getNameInput(page)
};
