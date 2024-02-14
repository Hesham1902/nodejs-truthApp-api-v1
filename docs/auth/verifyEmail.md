# Verify Email

There is a link sent to user email when signing up which is to confirm the account and update the `isConfirmed` status to `true`

**URL** : `/api/v1/auth/verifyEmail/:verifyToken`

**METHOD** : `GET`

#### Success Response:

**code** : **`200`**

```Json

{
    "status": "Success",
    "message": "Email verified successfully"
}

```

#### Fail Response:

**code** : **`400`**

```json
{
  "status": "fail",
  "message": "User already verified"
}
```

**code** : **`404`**

```json
{
  "status": "fail",
  "message": "User not found"
}
```
