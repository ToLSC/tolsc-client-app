describe('Logout action test', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should be able to login with username and password', async () => {
        await element(by.id('emailInput')).typeText('test@example.com');
        await element(by.id('passwordInput')).typeText('testpassword14*A\n');
        await element(by.id('loginButton')).tap();
        await expect(element(by.id('translatorScreen'))).toBeVisible();
    });

    it('should logout', async () => {
        await element(by.id('settingsOpt')).tap();
        await element(by.id('logoutButton')).tap();
        await expect(element(by.id('loginScreen'))).toBeVisible();
    });
});
