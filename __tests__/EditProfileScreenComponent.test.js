import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditProfileScreenComponent from '../src/screens/appScreens/userProfileScreen/components/EditProfileScreen/EditProfileScreenComponent';
import { ThemeContext } from '../src/context/ThemeContext';
import { AccountContext } from '../src/context/AccountContext';
import renderer from 'react-test-renderer';
import { mockAuthContext } from '../__mocks__/auth.mock';
import { mockThemeContext } from '../__mocks__/theme.mock';

jest.mock('react-native-safe-area-context', () => {
    const inset = { top: 0, right: 0, bottom: 0, left: 0 }
    return {
        SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
        SafeAreaConsumer: jest
            .fn()
            .mockImplementation(({ children }) => children(inset)),
        useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
    }
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@expo/vector-icons/Ionicons', () => {
    return {
        Ionicons: 'Icon',
    };
});

const mockTheme = mockThemeContext();

const mockAuth = mockAuthContext();

describe('EditProfileScreenComponent', () => {
    test('renders correctly', () => {
        const tree = renderer.create(
            <ThemeContext.Provider value={mockTheme}>
                <AccountContext.Provider value={mockAuth}>
                    <EditProfileScreenComponent />
                </AccountContext.Provider>
            </ThemeContext.Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('elements render correctly', () => {
        const { getByPlaceholderText } = render(
            <ThemeContext.Provider value={mockTheme}>
                <AccountContext.Provider value={mockAuth}>
                    <EditProfileScreenComponent />
                </AccountContext.Provider>
            </ThemeContext.Provider>
        );
        const fullName = getByPlaceholderText('Enter your full name');
        const emailInput = getByPlaceholderText('example@company.com');
        const passwordInput = getByPlaceholderText('Your password');
        expect(fullName).toBeTruthy();
        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
    });

    test('updates fullName, email and password state when typing', () => {
        const { getByPlaceholderText } = render(
            <ThemeContext.Provider value={mockTheme}>
                <AccountContext.Provider value={mockAuth}>
                    <EditProfileScreenComponent />
                </AccountContext.Provider>
            </ThemeContext.Provider>
        );
        const fullName = getByPlaceholderText('Enter your full name');
        const emailInput = getByPlaceholderText('example@company.com');
        const passwordInput = getByPlaceholderText('Your password');
        fireEvent.changeText(fullName, 'John Cena');
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'testpassword');
        expect(fullName.props.value).toBe('John Cena');
        expect(emailInput.props.value).toBe('test@example.com');
        expect(passwordInput.props.value).toBe('testpassword');
    });
});
