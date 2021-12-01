# Chat room task

### In the next exercise we will build a chat room Which will rely on [SSE](https://ably.com/topic/server-sent-events)

## Requirements:

### The chat room will allow several participants to talk to each other and with the help of SSE the messages will be transmitted from one user through the server and to all participants

1. Create a **login screen** and a **chat screen**
2. The **login screen** Will contain an entry form (asking only for username is the minimum requirement - look at the bonus section to see more options).
3. The **chat screen** Will contain the chat.
4. Use [React-router](https://reactrouter.com/docs/en/v6/getting-started/tutorial "Tutorial") to enable switching between **login screen** and **chat screen**
5. After a user login, an event is sent to the server for initial connection and this message is published to all other participants.
6. When a user disconnect the server will send a disconnection event that will inform all participants.

### Chat screen

1. divided to:

- Text writing area.
- Area of ​​previous messages (like chat on WhatsApp).
- Updated list of participants (like zoom).

2. When a message is sent from one of the participants it will reach the server and be published live to all those users who are currently connected to the server
3. When a participant enters or leaves the chat room (his connection to the server is terminated) the server will update the other participants with a message (as in WhatsApp)
4. Messages coming from the server will be displayed in the designated area with the _time_ they were sent and the _name of the author_.

### Login screen

1. Create a form for user input
2. The minimum requirement is to take a username, in the bonus section you can see more complex ways.

## Bonus:

1. Use jwt To assign a token to a user.
2. Create auth middleware and check the token before you allow the user to enter the chat room
3. Use private route to redirect a user without a valid token.

- It is more important to us at this point that you practice React, move on to the following bonuses only after you feel in control of React in this exercise.

4. When a user enters a chat room he will get the message history of the room.
5. Clicking on a username sends a message only to it specifically
6. Gray _V_ when the message successfully reached the server. 2 gray _V_ when the message reached all participants.
7. Do only after all the other bonuses - create different rooms and option to be admin of a room.
