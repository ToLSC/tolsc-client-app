import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreenComponent from '../src/screens/loginScreens/registerScreen/RegisterScreenComponent';
import { ThemeContext } from '../src/context/ThemeContext';
import { AccountContext } from '../src/context/AccountContext';
import renderer from 'react-test-renderer';
import { mockAuthContext } from '../__mocks__/auth.mock';
import { mockThemeContext } from '../__mocks__/theme.mock';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue('User created successfully!'),
    updateProfile: jest.fn().mockResolvedValue('Profile updated successfully!')
  };
});

const mockNavigation = { navigate: jest.fn() };

const mockTheme = mockThemeContext();

const mockAuth = mockAuthContext();

describe('RegisterScreenComponent', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <RegisterScreenComponent />
        </AccountContext.Provider>
      </ThemeContext.Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('elements render correctly', () => {
    const { getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <RegisterScreenComponent />
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
          <RegisterScreenComponent />
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

  it('should call createUserWithEmailAndPassword and updateProfile when register button is pressed', async () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <RegisterScreenComponent navigation={mockNavigation} />
        </AccountContext.Provider>
      </ThemeContext.Provider>
    );

    const nameInput = getByTestId('nameInput');
    const emailInput = getByTestId('emailInput');
    const passwordInput = getByTestId('passwordInput');
    const registerButton = getByTestId('registerButton');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'johndoe@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(registerButton);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), 'johndoe@example.com', 'password');
  });
});
