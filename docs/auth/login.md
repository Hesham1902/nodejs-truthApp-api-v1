# Login

**URL** : `/api/auth/login`

**METHOD** : `POST`

#### Body:

```json
{
  "email": "...",
  "password": "..."
}
```

#### Success Response:

**code** : **`200`**

```Json
{
    "status": "Success",
    "user": {
        "profilePic": {
            "public_id": null,
            "secure_url": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        "_id": "65cc9b0f1e97152313b222eb",
        "userName": "hesham1902",
        "email": "heshammaher@outlook.com",
        "password": "$2a$12$9qE.mBiclJMHH8VcsHa5pu7e1M1cV6nJ.ojDVwW..9d9R7X6xjKaq",
        "gender": "male",
        "isConfirmed": true,
        "role": "user",
        "createdAt": "2024-02-14T10:50:55.112Z",
        "updatedAt": "2024-02-14T10:57:05.109Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNjVjYzliMGYxZTk3MTUyMzEzYjIyMmViIiwiaWF0IjoxNzA3OTA4MzgxLCJleHAiOjE3MDc5MTE5ODF9.nKPdoNsooth1Zv7-fTYowaJK1OVlAhRwOUBh4AKrsAw"
}
```

#### Fail Response:

**code** : **`400`**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "You must enter an E-mail",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "",
      "msg": "Enter a valid email address",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "",
      "msg": "password required",
      "path": "password",
      "location": "body"
    }
  ]
}
```

```json
{
  "status": "error",
  "message": "Wrong email or password"
}
```
