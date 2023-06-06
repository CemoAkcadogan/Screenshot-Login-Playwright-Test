const { test, expect } = require('@playwright/test');

test('Giriş yapma ve ekran görüntüsü alma', async ({ page }) => {
  await page.goto('http://18.232.8.230/');

  // Kullanıcı adı ve şifre alanlarını bulma ve doldurma
  const usernameInput = await page.$('#username');
  const passwordInput = await page.$('#password');

  await usernameInput.type('admin');
  await passwordInput.type('password');

  // Giriş düğmesine tıklama
  await page.evaluate(() => {
    const button = document.querySelector('button[onclick="login()"]');
    button.click();
  });

  // Giriş yapıldıktan sonra bir süre bekleyelim. Sayfanın yüklenmesi için
  await page.waitForLoadState();

  // Ekran görüntüsü alma ve kaydetme
  await page.screenshot({ path: 'screenshot.png' });
  console.log('Ekran görüntüsü kaydedildi: screenshot.png');

  // Ekran görüntüsündeki bazı özellikleri kontrol etmek için expect ifadeleri ekleyebilirsiniz
  // Örneğin, sayfanın başlığını kontrol etmek için:
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Login Ekrani');
});
