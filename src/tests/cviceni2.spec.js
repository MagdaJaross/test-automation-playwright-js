import { test } from "@playwright/test";

test("find element and make screenshot", async ({ page }) => {
    await page.goto("/prihlaseni");
    await page.locator('form').screenshot({ path: 'css_tag_form.png'});
    await page.locator('input').nth(1).screenshot({ path: 'css_tag_input2nd.png'});
    await page.locator('#email').screenshot({ path: 'css_id_email.png'});
    await page.locator('#password').screenshot({ path: 'css_id_password.png'});
    await page.locator('.btn-primary').screenshot({ path: 'css_class_btn_prihlasit.png'});
    await page.locator('[type="password"]').screenshot({ path: 'css_atribut_type_password.png'});
    await page.locator('[name*="ass"]').screenshot({ path: 'css_atribut_contains_ass.png'});
    await page.locator('[type$="word"]').screenshot({ path: 'css_atribut_ending_word.png'});
    await page.locator('[type^="pass"]').screenshot({ path: 'css_atribut_begins_pass.png'});
    await page.locator('input#email').screenshot({ path: 'css_mix_input_and_id.png'});
    await page.locator('input[type="password"]').screenshot({ path: 'css_mix_tag_and_atribut_type_password.png'});
    await page.locator('button.btn-primary').screenshot({ path: 'css_mix_tag_and_class.png'});
    await page.locator('div').locator('form').locator('input[type$="word"]').screenshot({ path: 'css_chain.png'});
});

test("Playwright locators", async ({ page }) => {
    await page.goto("/prihlaseni");
    await page.getByRole('heading',{ level:1 }).screenshot({ path: 'pw_byRole_heading.png'});
    await page.getByLabel('email').screenshot({ path: 'pw_byLabel_email.png'});
    await page.getByText("Zapomněli jste své heslo?").screenshot({ path: 'pw_byText_forgottenPassword.png'});
});