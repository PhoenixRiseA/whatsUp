import { render, screen } from "@testing-library/react";
import AuthForm from "./AuthForm";
import userEvent from "@testing-library/user-event";
describe("Sign in/ Sign up component", () => {
  // test('receives id token if test succeeds', async () =>{
  //     window.fetch = jest.fn();
  //     window.fetch.mockResolvedValueOnce({
  //         json: async () => [{idToken: 'unique'}],
  //     });
  //     render(<AuthForm/>);
  //     const buttonElement = await screen.findAllByRole('button')
  //     expect(buttonElement).not.toBeInTheDocument;
  // });
  test("renders Your Username/Email as a text ", () => {
    //Arrange
    render(<AuthForm />);

    //Act
    //Nothing

    //Assert
    const emailElement = screen.getByText("Your Username/Email");
    expect(emailElement).toBeInTheDocument();
  });
  test("renders confirm password as a text ", () => {
    //Arrange
    render(<AuthForm />);

    //Act
    //Nothing

    //Assert
    const passwordElement = screen.getByText("Password");
    expect(passwordElement).toBeInTheDocument();
  });
  test("renders sign up as a text ", () => {
    //Arrange
    render(<AuthForm />);

    //Act
    //Nothing

    //Assert
    const signUpElement = screen.getByText("Sign Up");
    expect(signUpElement).toBeInTheDocument();
  });
  test("renders sign in as a text ", () => {
    //Arrange
    render(<AuthForm />);

    //Act
    //Nothing

    //Assert
    const signInElement = screen.getByText("Sign In");
    expect(signInElement).toBeInTheDocument();
  });

  test("renders create new account as a text ", () => {
    //Arrange
    render(<AuthForm />);

    //Act
    //Nothing

    //Assert
    const accountElement = screen.getByText("Create new account");
    expect(accountElement).toBeInTheDocument();
  });

  //   test("renders sign up when create new account is clicked", () => {
  //     //Arrange
  //     render(<AuthForm />);

  //     //Act
  //     const buttonElement = screen.getAllByRole("button", {
  //       name: /Create new account/i,
  //     });
  //     userEvent.click(buttonElement);

  //     const outputElement = screen.getByText("Sign In");
  //     expect(outputElement).toBeInTheDocument();
  //   });
});
