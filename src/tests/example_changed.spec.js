import { test } from "@playwright/test";

test("should open login page", async ({ page }) => {
    await page.goto("/prihlaseni");
    console.log(await page.title());
    console.log("This is my first Playwright test");
    await page.setViewportSize({ width: 300, height: 800});
    await page.screenshot({ path: "login_page_300x800.png"});
    await page.setViewportSize({ width: 1200, height: 500});
    await page.screenshot({ path: "login_page_1200x500.png"});
});
