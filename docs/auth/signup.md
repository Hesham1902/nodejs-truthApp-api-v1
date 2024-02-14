# Signup

**URL** : `/api/v1/auth/signup`

**METHOD** : `POST`

#### Body:

```json
{
  "username": "hesham1902",
  "email": "heshammaher@outlook.com",
  "gender": "male",
  "password": "test123",
  "confirmPassword": "test123"
}
```

#### Success Response:

**code** : **`201`**

```Json

{
    "status": "Success",
    "verifyToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiaGVzaGFtbWFoZXJAb3V0bG9vay5jb20iLCJpYXQiOjE3MDc5MDc4NTUsImV4cCI6MTcwNzkwODQ1NX0.7vGmMibtdHMhDMQiLL-ps-agpfHS84SwYIoMFUJTS1U",
    "user": {
        "userName": "hesham1902",
        "email": "heshammaher@outlook.com",
        "password": "$2a$12$9qE.mBiclJMHH8VcsHa5pu7e1M1cV6nJ.ojDVwW..9d9R7X6xjKaq",
        "profilePic": {
            "public_id": null,
            "secure_url": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        "gender": "male",
        "isConfirmed": false,
        "role": "user",
        "_id": "65cc9b0f1e97152313b222eb",
        "createdAt": "2024-02-14T10:50:55.112Z",
        "updatedAt": "2024-02-14T10:50:55.112Z",
        "__v": 0
    }
}

```

#### Fail Response:

**code** : **`400`**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "You must enter a username",
      "path": "username",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "You must enter an E-mail",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Enter a valid email address",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "password required",
      "path": "password",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Too short password",
      "path": "password",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "confirm new password required",
      "path": "confirmPassword",
      "location": "body"
    }
  ]
}
```

```json
{
  "errors": [
    {
      "type": "field",
      "value": "hesham1902",
      "msg": "This user is already registered",
      "path": "username",
      "location": "body"
    },
    {
      "type": "field",
      "value": "heshammaher@outlook.com",
      "msg": "This email is already registered",
      "path": "email",
      "location": "body"
    }
  ]
}
```
