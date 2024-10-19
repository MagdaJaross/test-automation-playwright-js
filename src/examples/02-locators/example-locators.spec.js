import {test} from "@playwright/test";

/**
 * Lesson 2: Locators
 *
 * Example HTML (simplified)
 *
 * <div class="card-body">
 *     <form method="POST" action="https://...">
 *         <label for="email">Email</label>
 *         <input id="email" type="email" name="email" value="">
 *         <label for="password">Password</label>
 *         <input id="password" type="password" name="password">
 *         <button type="submit" class="btn btn-primary">Přihlásit</button>
 *         <a class="btn btn-link" href="https://...">Zapomněli jste své heslo?</a>
 *     </form>
 * </div>
 */

test.describe('Locators', async () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/prihlaseni');
    });

    test.describe('CCS locators', async () => {

        test('tag locators', async ({ page }) => {
            const h1TagLocator = page.locator("h1");
            console.log(await h1TagLocator.innerHTML());

            const formTagLocator = page.locator("form");
            console.log(await formTagLocator.innerHTML());

            /*
             There are multiple input tags on the page, we need to use nth() to select the correct one
             */
            const inputTagLocator0 = page.locator("input").nth(0);
            console.log(await inputTagLocator0.innerHTML());

            const inputTagLocator1 = page.locator("input").nth(1);
            console.log(await inputTagLocator1.innerHTML());
        })

        test("id locators", async ({ page }) => {
            const idEmailLocator = page.locator("#email");
            console.log(await idEmailLocator.innerHTML());

            const idPasswordLocator = page.locator("#password");
            console.log(await idPasswordLocator.innerHTML());
        });

        test("class locators", async ({ page }) => {
            const classLocator = page.locator(".btn-primary");
            console.log(await classLocator.innerHTML());
        });

        test("attribute locators", async ({ page }) => {

            const typeAttributeLocator = page.locator('[type="password"]');
            console.log(await typeAttributeLocator.innerHTML());

            // attribute containing text
            const attributeContainingTextLocator = page.locator('[type*="ass"]');
            console.log(await attributeContainingTextLocator.innerHTML());

            // attribute ending with text
            const attributeEndingWithTextLocator = page.locator('[type$="word"]');
            console.log(await attributeEndingWithTextLocator.innerHTML());

            // attribute strting with text
            const attributeStartingWithTextLocator = page.locator('[type^="pass"]');
            console.log(await attributeStartingWithTextLocator.innerHTML());

        });


        test("combined locators", async ({ page }) => {
            const tagAndIdLocator = page.locator('input#email');
            console.log(await tagAndIdLocator.innerHTML());

            const tagAndAttributeLocator = page.locator('input[type="password"]');
            console.log(await tagAndAttributeLocator.innerHTML());

            const tagAndClassLocator = page.locator('button.btn-primary');
            console.log(await tagAndClassLocator.innerHTML());
        })

        test("chaining locators", async ({ page }) => {
            const locator = page
                .locator("div")
                .locator("form")
                .locator('input[type$="word"]');
            console.log(await locator.innerHTML());
        })
    });

    test.describe("Playwright locators", async () => {

        test("getByRole", async ({ page }) => {
            const locator = page.getByRole("heading", { level: 1 });
            console.log(await locator.innerHTML());
        });

        test("getByText", async ({ page }) => {
            const locator = page.getByText("Zapomněli jste své heslo?");
            console.log(await locator.innerHTML());
        });

        test("getByLabel", async ({ page }) => {
            const locator = page.getByLabel("Email");
            console.log(await locator.innerHTML());
        });

        test("getByAltText", async ({ page }) => {
            const locator = page.getByAltText("Domů");
            console.log(await locator.innerHTML());
        });

    });
});
