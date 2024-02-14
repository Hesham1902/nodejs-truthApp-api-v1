# Messages

| Path                                         | Method   | Auth Required | Description                |
| -------------------------------------------- | -------- | ------------- | -------------------------- |
| `/api/message/anonymous/sendMsg/:recieverId` | `POST`   | NO            | Send a message anonymously |
| `/api/v1/messages/Auth/sendMsg/:recieverId`  | `POST`   | YES           | Send a message             |
| `/api/v1/messages/getSentMsgs`               | `GET`    | YES           | All sent messages          |
| `/api/v1/messages/getMessages`               | `GET`    | YES           | All received messages      |
| `/api/v1/messages/favMsgs`                   | `GET`    | YES           | All favorite messages      |
| `/api/v1/messages/getMessage/:id`            | `GET`    | YES           | Show messgae               |
| `/api/v1/messages/deleteMessage/:id`         | `DELETE` | YES           | Delete messgae             |
| `/api/v1/messages/toggleFav/:id`             | `PUT`    | YES           | Togle favorite state       |

### Documentation

- [Send Message (Unauth)](<./sendMessage(Unauth).md>)
- [Send Message (Auth)](<./sendMessage(Auth).md>)
- [All Sent Messages](./allSent.md)
- [All Received Messages](./allReceived.md)
- [All Favorite Messages ](./allfavorite.md)
- [Show Messgae ](./getMessage.md)
- [Delete Messgae ](./deleteMessage.md)
- [Togle Favorite ](./toggleFavorite.md)
