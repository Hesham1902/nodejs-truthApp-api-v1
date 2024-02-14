# All Sent Messages

**URL** : `/api/v1/messages/getSentMsgs`

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
    "result": 1,
    "paginationResult": {
        "currentPage": 1,
        "limit": 1,
        "numOfPages": 2,
        "nextPage": 2
    },
    "messages": [
        {
            "_id": "65ccac8b7da82ce56460d943",
            "content": "Test msg Authenticated!",
            "sender": {
                "userName": "hesham1902"
            },
            "recipient": {
                "userName": "user1"
            },
            "isFavourite": false
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

```json
{
  "status": "fail",
  "message": "Invalid token, please login again.."
}
```
