# All Favorite Messages

**URL** : `/api/v1/messages/favMsgs`

**METHOD** : `GET`

**Auth required** : YES

#### Headers:

```json
{
  "Auth": "<BEARER>__<TOKEN>"
}
```

#### Query params:

```json
{
  "limit": <NUMBER>,
  "page": <NUMBER>,
  "sort": ,// <1> or <-1>  1 => ASC  -1 => DESC
  "keyword": , // search with keyword
  "fields": //select fields to get
}
```

#### Success Response:

**code** : **`200`**

```Json
{
    "status": "Successful",
    "Liked Messages": [
        {
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
    ]
}
```

#### Fail Response:

**code** : **`401`**

```json
{
  "status": "fail",
  "message": "You must login to get access to this route"
}
```
