import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreenComponent from '../src/screens/loginScreens/loginScreen/LoginScreenComponent';
import { ThemeContext } from '../src/context/ThemeContext';
import { AccountContext } from '../src/context/AccountContext';
import renderer from 'react-test-renderer';
import { mockAuthContext } from '../__mocks__/auth.mock';
import { mockThemeContext } from '../__mocks__/theme.mock';
import { signInWithEmailAndPassword } from 'firebase/auth';

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

jest.mock('firebase/auth', () => {
  return {
    signInWithEmailAndPassword: jest.fn().mockResolvedValue('User logged succesfully'),
  };
});

const mockNavigation = { navigate: jest.fn() };

const mockTheme = mockThemeContext();

const mockAuth = mockAuthContext();

describe('LoginScreenComponent', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <LoginScreenComponent />
        </AccountContext.Provider>
      </ThemeContext.Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('elements render correctly', () => {
    const { getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <LoginScreenComponent />
        </AccountContext.Provider>
      </ThemeContext.Provider>
    );
    const emailInput = getByPlaceholderText('example@company.com');
    const passwordInput = getByPlaceholderText('Your password');
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  test('updates email and password state when typing', () => {
    const { getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={{ mockAuth }}>
          <LoginScreenComponent />
        </AccountContext.Provider>
      </ThemeContext.Provider>
    );
    const emailInput = getByPlaceholderText('example@company.com');
    const passwordInput = getByPlaceholderText('Your password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('testpassword');
  });

  it('should call signInWithEmailAndPassword when login button is pressed', async () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <LoginScreenComponent />
        </AccountContext.Provider>
      </ThemeContext.Provider>
    );

    const emailInput = getByTestId('emailInput');
    const passwordInput = getByTestId('passwordInput');
    const loginButton = getByTestId('loginButton');

    fireEvent.changeText(emailInput, 'johndoe@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(loginButton);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), 'johndoe@example.com', 'password');
  });

  it('should navigate to register screen after when create new account button is pressed', async () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AccountContext.Provider value={mockAuth}>
          <LoginScreenComponent navigation={mockNavigation} />
        </AccountContext.Provider>
      </ThemeContext.Provider>
    );
    
    const toRegisterButton = getByTestId('toRegisterButton');

    fireEvent.press(toRegisterButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('registerScreen');
  });
});
