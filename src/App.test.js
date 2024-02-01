import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import App from "./App.js";

const generateRandomUser = () => ({
  name: `Test User ${Math.floor(Math.random() * 1000)}`,
  age: Math.floor(Math.random() * (99 - 18 + 1)) + 18,
});

const renderWithRedux = (
  component,
  {
    initialState = { user: { data: {} } },
    store = configureStore({
      reducer: { user: userReducer },
      preloadedState: initialState,
    }),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

test("fetches user information and displays it", async () => {
  const mockData = generateRandomUser();
  const { getByText } = renderWithRedux(<App />, {
    initialState: { user: { data: mockData } },
  });

  // Mock the fetch function
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  await waitFor(() => {
    expect(getByText(`Name: ${mockData.name}`)).toBeInTheDocument();
    expect(getByText(`Age: ${mockData.age}`)).toBeInTheDocument();
  });

  // Clean up
  delete global.fetch;

});

test("handles API error", async () => {

  // Mock the fetch function to simulate an API error
  global.fetch = jest.fn().mockRejectedValueOnce(new Error("API error"));


  // Clean up
  delete global.fetch;
});
