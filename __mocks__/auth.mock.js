export const mockAuthContext = () => {
    return {
        user: {
            name: 'John',
            email: 'john@test.com',
            displayName: 'John'
        },
        setUser: jest.fn(),
        auth: {
            onAuthStateChanged: jest.fn(),
        },
        database: {
            ref: jest.fn(),
            get: jest.fn(() => Promise.resolve({})),
            push: jest.fn(),
            remove: jest.fn(),
        },
        setLoginStatus: jest.fn(),
        history: undefined,
        favorites: undefined,
        addHistoryHandler: jest.fn(),
        addFavoriteHandler: jest.fn(),
        deleteFavoriteHandler: jest.fn(),
        getHistoryData: jest.fn(),
        getFavoriteData: jest.fn(),
    }
}