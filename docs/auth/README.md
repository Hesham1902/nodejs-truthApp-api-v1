# Authentication

| Path                                    | Method | Description                                              |
| --------------------------------------- | ------ | -------------------------------------------------------- |
| `/api/v1/auth/signup`                   | `POST` | Create a new user account.                               |
| `/api/v1/auth/verifyEmail/:verifyToken` | `GET`  | Verify the user's email with a verification token.       |
| `/api/v1/auth/login`                    | `POST` | User login.                                              |
| `/api/auth/forgotPassword`              | `POST` | Send a password reset code to the user's email.          |
| `/api/auth/password-reset/`             | `PUT`  | Reset user password with a valid reset code in the body. |

### Documentation

- [Signup](./signup.md)
- [Verify Email](./verifyEmail.md)
- [Login](./login.md)
- [Password Reset Link](./sendPasswordResetCode.md)
- [Reset Password ](./resetPassword.md)
