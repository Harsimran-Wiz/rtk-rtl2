import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import UserComponent from "./UserComponent";

const generateRandomUser = () => ({
  name: `Test User ${Math.floor(Math.random() * 1000)}`,
  age: Math.floor(Math.random() * (99 - 18 + 1)) + 18,
});

const renderWithRedux = (
  component,
  {
    initialState = { user: { data: generateRandomUser() } },
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

test("renders user information correctly", () => {
  const userData = generateRandomUser();
  const { getByText } = renderWithRedux(<UserComponent />, {
    initialState: { user: { data: userData } },
  });

  expect(getByText(`Name: ${userData.name}`)).toBeInTheDocument();
  expect(getByText(`Age: ${userData.age}`)).toBeInTheDocument();
});
