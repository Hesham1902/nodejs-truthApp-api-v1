# Show Messgae

Get specific messages

**URL** : `/api/v1/messages/getMessage/:id`

**METHOD** : `GET`

**Auth required** : YES

#### Headers:

```json
{
  "Auth": "<BEARER>__<TOKEN>"
}
```

#### Success Response:

**code** : **`200`**

```Json
{
    "status": "Successful",
    "message": {
        "_id": "65ccadea7da82ce56460d954",
        "content": "Test msg you Auth",
        "sender": {
            "userName": "user1"
        },
        "recipient": {
            "userName": "hesham1902"
        },
        "isFavourite": true,
        "__v": 0
    }
}
```

#### Fail Response:

**code** : **`400`**

```json
{
  "status": "fail",
  "code": 401,
  "message": "Invalid message id"
}
```

**code** : **`401`**

```json
{
  "type": "field",
  "value": "ccadea7da82ce56460d954",
  "msg": "Invalid message id format",
  "path": "id",
  "location": "params"
}
```

```json
{
  "status": "fail",
  "message": "You must login to get access to this route"
}
```

**code** : **`403`**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "65ccac8b7da82ce56460d943",
      "msg": "No messages found for hesham1902 with this id",
      "path": "id",
      "location": "params"
    }
  ]
}
```

**code** : **`404`**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "64ccadea7da82ce56460d954",
      "msg": "No message found",
      "path": "id",
      "location": "params"
    }
  ]
}
```
