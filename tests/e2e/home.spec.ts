import { test, expect } from '@playwright/test'

test('home page renders the hero and philosophy grid', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('team leader')
  await expect(page.getByText('I really love what I do.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How do I lead my teams?' })).toBeVisible()
})

test('clicking a featured work tile shows the demo-content notice', async ({ page }) => {
  await page.goto('/')
  // Tile content periodically cross-fades to a different case study, so a
  // click landing mid-fade can hit a momentarily-transparent image; force
  // bypasses Playwright's stability check for that edge case.
  await page.locator('a[href*="#/work/"]').first().click({ force: true })
  await expect(page).toHaveURL(/#\/work\//)
  await expect(page.getByRole('heading', { name: 'Process', exact: true })).toBeVisible()
  await expect(page.getByText(/demo content/i)).toBeVisible()
})

test('career journey page lists the timeline', async ({ page }) => {
  await page.goto('/#/career-journey')
  await expect(page.getByRole('heading', { name: 'My career journey' })).toBeVisible()
  await expect(page.getByText('Sony Mexico')).toBeVisible()
})
