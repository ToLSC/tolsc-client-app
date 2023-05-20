describe('History Tests', () => {
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

    it('should display history video list', async () => {
        await element(by.id('historyOpt')).tap();
        await expect(element(by.id('historyScreen'))).toBeVisible();
        await expect(element(by.id('historyList'))).toBeVisible();
    });

    it('should display a video in history', async () => {
        await element(by.id('historyOpt')).tap();
        await expect(element(by.id('historyScreen'))).toBeVisible();
        await expect(element(by.id('historyList'))).toBeVisible();
        await element(by.id('expandButton')).tap();
        await waitFor(element(by.id('videoPlayerComponent')))
            .toBeVisible()
            .withTimeout(25000);
    });

});