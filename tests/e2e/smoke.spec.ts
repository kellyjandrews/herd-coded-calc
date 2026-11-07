import { expect, test } from "@playwright/test";

test("calculator page renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Make room for a little math." })).toBeVisible();
  await expect(page.getByRole("region", { name: "Basic calculator" })).toBeVisible();
});

test("calculator adds numbers and clears its display", async ({ page }) => {
  await page.goto("/");
  const display = page.getByLabel("Calculator display");

  await page.getByRole("button", { name: "8" }).click();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "4" }).click();
  await page.getByRole("button", { name: "=" }).click();
  await expect(display).toHaveText("12");

  await page.getByRole("button", { name: "AC", exact: true }).click();
  await expect(display).toHaveText("0");
});

test("health endpoint is ok", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({ status: "ok" });
});
