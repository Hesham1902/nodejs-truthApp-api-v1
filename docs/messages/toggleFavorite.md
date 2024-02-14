# Toggle Favorite Status

if message favorite status = `true` becomes `false` and vice versa

**URL** : `api/message/v1/toggleFav/:id`

**METHOD** : `PUT`

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
    "status": "success",
    "isFavourite": true
}
```

```json
{
  "status": "success",
  "isFavourite": false
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
  "status": "fail",
  "message": "You must login to get access to this route"
}
```

**code** : **`403`**

```json
{
  "status": "fail",
  "message": "Not authorized to toggle this message"
}
```

**code** : **`404`**

```json
{
  "status": "fail",
  "message": "Message not found"
}
```
