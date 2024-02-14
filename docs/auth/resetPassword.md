# Reset Password

**URL** : `/api/v1/auth/resetPassword`

**METHOD** : `POST`

#### Body:

```json
{
  "newPassword": "...",
  "confirmPassword": "...",
  "resetCode": "..."
}
```

#### Success Response:

**code** : **`200`**

```Json
{
    "status": "Success",
    "message": "password updated successfully"
}

```

#### Fail Response:

**code** : **`400`**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "test12",
      "msg": "incorrect confirm new password",
      "path": "newPassword",
      "location": "body"
    }
  ]
}
```

```json
{
  "status": "fail",
  "message": "Invalid or expired code"
}
```
