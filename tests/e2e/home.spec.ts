import { test, expect } from '@playwright/test'

test('home page renders the hero and philosophy grid', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('team leader')
  await expect(page.getByText('I really love what I do.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How do I lead my teams?' })).toBeVisible()
})

test('navigating into a case study shows the demo-content notice', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /read case study/i }).first().click()
  await expect(page).toHaveURL(/#\/work\//)
  await expect(page.getByRole('heading', { name: 'Process', exact: true })).toBeVisible()
  await expect(page.getByText(/demo content/i)).toBeVisible()
})

test('career journey page lists the timeline', async ({ page }) => {
  await page.goto('/#/career-journey')
  await expect(page.getByRole('heading', { name: 'My career journey' })).toBeVisible()
  await expect(page.getByText('Sony Mexico')).toBeVisible()
})
