# Delete Message

**URL** : `/api/v1/message/deleteMessage/:id`

**METHOD** : `DELETE`

**Auth required** : YES

#### Headers:

```json
{
  "Auth": "<BEARER>__<TOKEN>"
}
```

#### Success Response:

**code** : **`204`**

```Json
No Response
```

#### Fail Response:

**code** : **`400`**

```json
{
  "status": "fail",
  "code": 400,
  "message": "Invalid message id format"
}
```

**code** : **`401`**

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
  "status": "fail",
  "code": 404,
  "message": "Message not found"
}
```
