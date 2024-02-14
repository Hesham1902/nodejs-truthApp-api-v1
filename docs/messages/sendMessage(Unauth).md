# Send Message (Auth)

Sending message to specific user

**URL** : `/api/v1/messages/anonymous/sendMsg/:recieverId`

**METHOD** : `POST`

**Auth required** : NO

#### Body:

```json
{
  "content": "testing 1 message from Anon"
}
```

#### Success Response:

**code** : **`201`**

```Json
{
    "status": "Message Sent Successfully",
    "message": {
        "content": "testing 1 message from Anon",
        "recipient": "65cc8859048e2bae9379e1a2",
        "isFavourite": false,
        "_id": "65ccab584e0bb29f9b27b92f",
        "__v": 0
    }
}

```

#### Fail Response:

**code** : **`404`**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "65c628d0ff0f4acb874930c2",
      "msg": "This username: \"65c628d0ff0f4acb874930c2\" not exist",
      "path": "recieverId",
      "location": "params"
    }
  ]
}
```
