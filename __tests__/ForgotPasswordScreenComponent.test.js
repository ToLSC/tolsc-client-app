import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ForgotPasswordScreenComponent from '../src/screens/loginScreens/forgotPasswordScreen/ForgotPasswordScreenComponent';
import { ThemeContext } from '../src/context/ThemeContext';
import { AccountContext } from '../src/context/AccountContext';
import renderer from 'react-test-renderer';
import { mockAuthContext } from '../__mocks__/auth.mock';
import { mockThemeContext } from '../__mocks__/theme.mock';
import { sendPasswordResetEmail } from 'firebase/auth'

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

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
  const { View } = require('react-native');
  return (props) => <View testID="Ionicons" {...props} />;
});

jest.mock('firebase/auth', () => {
  return {
    sendPasswordResetEmail: jest.fn().mockResolvedValue('Email sent correctly'),
  };
});

const mockNavigation = { navigate: jest.fn() };

const mockTheme = mockThemeContext();

const mockAuth = mockAuthContext();

describe('ForgotPasswordScreenComponent', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <ForgotPasswordScreenComponent />
        </AccountContext.Provider>
      </ThemeContext.Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('elements render correctly', () => {
    const { getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <ForgotPasswordScreenComponent />
        </AccountContext.Provider>
      </ThemeContext.Provider>
    );
    const emailInput = getByPlaceholderText('example@company.com');
    expect(emailInput).toBeTruthy();
  });

  test('updates email state when typing', () => {
    const { getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <ForgotPasswordScreenComponent />
        </AccountContext.Provider>
      </ThemeContext.Provider>
    );
    const emailInput = getByPlaceholderText('example@company.com');
    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('should call sendPasswordResetEmail when forgot password button is pressed', async () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <ForgotPasswordScreenComponent navigation={mockNavigation} />
        </AccountContext.Provider>
      </ThemeContext.Provider>
    );

    const emailInput = getByTestId('emailInput');
    const forgotPassButton = getByTestId('forgotPassButton');

    fireEvent.changeText(emailInput, 'johndoe@example.com');
    fireEvent.press(forgotPassButton);

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(expect.any(Object), 'johndoe@example.com');
  });
});
