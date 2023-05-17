describe('Register action test', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should be able to navigate to registration screen', async () => {
        await element(by.id('toRegisterButton')).tap();
        await expect(element(by.id('registerScreen'))).toBeVisible();
    });

    it('should be able to register', async () => {
        await element(by.id('toRegisterButton')).tap();
        await element(by.id('nameInput')).typeText('John Cena\n');
        await element(by.id('scrollView')).scrollTo('bottom');
        await element(by.id('emailInput')).typeText('test@example.com\n');
        await element(by.id('passwordInput')).typeText('testpassword14*A\n');
        await element(by.id('registerButton')).tap();
        await expect(element(by.id('translatorScreen'))).toBeVisible();
    });

    it('should not be able to register, insecure password', async () => {
        await element(by.id('settingsOpt')).tap();
        await element(by.id('logoutButton')).tap();
        await expect(element(by.id('loginScreen'))).toBeVisible();
        await element(by.id('toRegisterButton')).tap();
        await element(by.id('nameInput')).typeText('Bad Cena\n');
        await element(by.id('emailInput')).typeText('test@badexample.com\n');
        await element(by.id('passwordInput')).typeText('a\n');
        await element(by.id('registerButton')).tap();
        await expect(element(by.text('Contraseña inválida. Esta debe tener mínimo 8 caracteres, incluyendo al menos un símbolo y una letra en mayúscula.'))).toBeVisible();
    });
});
