describe('General Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have login button', async () => {
    await expect(element(by.id('loginButton'))).toBeVisible();
  });

  it('should be able to navigate to registration screen', async () => {
    await element(by.id('toRegisterButton')).tap();
    await expect(element(by.id('registerScreen'))).toBeVisible();
  });

  it('should be able to login with username and password', async () => {
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('testpassword14*A\n');
    await element(by.id('loginButton')).tap();
    await expect(element(by.id('translatorScreen'))).toBeVisible();
  });

  it('should be able to navigate to translator screen', async () => {
    await element(by.id('translatorOpt')).tap();
    await expect(element(by.id('translatorScreen'))).toBeVisible();
  });

  it('should be able to navigate to history screen', async () => {
    await element(by.id('historyOpt')).tap();
    await expect(element(by.id('historyScreen'))).toBeVisible();
  });

  it('should be able to navigate to settings screen', async () => {
    await element(by.id('settingsOpt')).tap();
    await expect(element(by.id('settingsScreen'))).toBeVisible();
  });

});
