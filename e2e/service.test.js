describe('Service test', () => {
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

    it('should be able to get a response of the service', async () => {
        await element(by.id('textInput')).typeText('Hola Mateo');
        await element(by.id('translateButton')).tap();
        await waitFor(element(by.id('videoPlayerComponent')))
            .toBeVisible()
            .withTimeout(25000);
    });
});
