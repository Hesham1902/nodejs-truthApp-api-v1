# Send Message (Auth)

Sending message to specific user

**URL** : `/api/v1/messages/Auth/sendMsg/recieverId`

**METHOD** : `POST`

**Auth required** : YES

#### Headers:

```json
{
  "Auth": "<BEARER>__<TOKEN>"
}
```

#### Body:

```json
{
  "content": "Test msg Authenticated!"
}
```

#### Success Response:

**code** : **`201`**

```Json
{
    "status": "Message Sent Successfully",
    "message": {
        "content": "Test msg you Auth",
        "sender": "65cc9b0f1e97152313b222eb",
        "recipient": "65cc8859048e2bae9379e1a2",
        "isFavourite": false,
        "_id": "65ccadb47da82ce56460d94c",
        "__v": 0
    }
}
```

#### Fail Response:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "65cc9b0f1e97152313b222eb",
      "msg": "you can't send yourself a message",
      "path": "recieverId",
      "location": "params"
    }
  ]
}
```

```json
{
  "status": "fail",
  "message": "Invalid token, please login again.."
}
```

```json
{
  "status": "fail",
  "message": "You must login to get access to this route"
}
```

```json
{
  "status": "fail",
  "message": "Check you mail and verify your account"
}
```
