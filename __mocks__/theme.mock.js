export const mockThemeContext = () => {
    return {
        darkThemeEnabled: true,
        setDarkThemeEnabled: jest.fn(),
        changeThemeContext: jest.fn(),
    }
};
