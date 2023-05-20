describe('Favorite Tests', () => {
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

    it('should select a history registry as favorite', async () => {
        await element(by.id('historyOpt')).tap();
        await expect(element(by.id('historyScreen'))).toBeVisible();
        await expect(element(by.id('historyList'))).toBeVisible();
        await element(by.id('favoriteButton')).tap();
    });

    it('should display favorite video list', async () => {
        await element(by.id('historyOpt')).tap();
        await expect(element(by.id('historyScreen'))).toBeVisible();
        await expect(element(by.id('favoritesList'))).toBeVisible();
    });

    it('should display a favorite video', async () => {
        await element(by.id('historyOpt')).tap();
        await expect(element(by.id('historyScreen'))).toBeVisible();
        await expect(element(by.id('favoritesList'))).toBeVisible();
        await element(by.id('expandButton')).atIndex(0).tap();
        await waitFor(element(by.id('videoPlayerComponent')).atIndex(0))
            .toBeVisible()
            .withTimeout(25000);
    });

});