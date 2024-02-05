import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserComponent from "./UserComponent";

const generateRandomUser = () => ({
  name: `Test User ${Math.floor(Math.random() * 1000)}`,
  age: Math.floor(Math.random() * (99 - 18 + 1)) + 18,
});

jest.mock("../slices/api", () => ({
  useGetUserQuery: jest.fn(),
}));

const mockUser = generateRandomUser();

describe("UserComponent", () => {
  test("renders user information with mock data", async () => {
    const mockUseGetUserQuery = jest.fn();
    mockUseGetUserQuery.mockReturnValue({
      data: mockUser,
      isError: false,
      isLoading: false,
    });

    require("../slices/api").useGetUserQuery = mockUseGetUserQuery;
    render(<UserComponent />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(screen.getByText("User Information")).toBeInTheDocument();
    expect(screen.getByText(`Name: ${mockUser.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Age: ${mockUser.age}`)).toBeInTheDocument();
  });
});
