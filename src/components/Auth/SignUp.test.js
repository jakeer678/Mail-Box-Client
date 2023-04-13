import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
import userEvent from "@testing-library/user-event";

describe("SignUp component", () => {
  test("render label of SignUp", () => {
    //Arrange
    render(<SignUp />);
    //Act---

    const signedUp = screen.getByText("Email");
    expect(signedUp).toBeInTheDocument();
  });

  test("render if the Sign Up button is not clicked", () => {
    //Arrange
    render(<SignUp />);
    //Act
    const outPutElement = screen.getByText("signUp", { exact: false });
    expect(outPutElement).toBeInTheDocument();
  });
  test("If the signup Button is clicked", () => {
    render(<SignUp />);
    //Act

    const buttonElement = screen.getByRole("button");
    userEvent(buttonElement).toBeInTheDocument();
  });
});
