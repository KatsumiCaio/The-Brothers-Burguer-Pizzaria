import { test, expect } from '@playwright/test';

test.describe('The Brothers - Fluxo de Cardápio & Carrinho', () => {
  test('deve carregar a página principal e exibir os pilares da casa', async ({ page }) => {
    await page.goto('/');

    // Verifica título e cabeçalho
    await expect(page.locator('text=The Brothers')).toBeVisible();
    await expect(page.locator('text=Cardápio & Pedidos')).toBeVisible();
  });

  test('deve filtrar categorias no cardápio interativo', async ({ page }) => {
    await page.goto('/');

    // Clica na categoria Pizzas
    const pizzaTab = page.locator('button:has-text("Pizzas")');
    if (await pizzaTab.isVisible()) {
      await pizzaTab.click();
      await expect(page.locator('text=Pizza')).toBeVisible();
    }
  });

  test('deve abrir o modal de reservas do Rodízio', async ({ page }) => {
    await page.goto('/');

    const reserveButton = page.locator('button:has-text("Reservar Mesa")').first();
    if (await reserveButton.isVisible()) {
      await reserveButton.click();
      await expect(page.locator('#reservation-modal-overlay')).toBeVisible();
    }
  });
});
