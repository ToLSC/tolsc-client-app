import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HistoryScreenComponent from '../src/screens/appScreens/historyScreen/HistoryScreenComponent';
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

describe('HistoryScreenComponent', () => {
    test('renders correctly', () => {
        const tree = renderer.create(
            <ThemeContext.Provider value={mockTheme}>
                <AccountContext.Provider value={mockAuth}>
                    <HistoryScreenComponent />
                </AccountContext.Provider>
            </ThemeContext.Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
