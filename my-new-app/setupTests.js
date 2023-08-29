// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('./path-to-module', () => {
    return {
      // Mock implementation
    };
  });
  
  // Set up environment variables
  process.env.REACT_APP_API_KEY = 'your-api-key';
  
