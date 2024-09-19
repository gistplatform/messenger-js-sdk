# Welcome to @gistplatform/messenger-js-sdk 👋

> JS wrapper for easy use of our Messenger Client API on various commonly used web frameworks

### 🏠 [Website](https://getgist.com/)

### 📚 [Developer Docs](https://developers.getgist.com/)

---

### 📂 Table of Contents

- [Installation](#installation)
  - [React](#react)
  - [Angular](#angular)
  - [Vue](#vue)
  - [Ember](#ember)
- [Common methods](#methods)
- [Common Events](#events)

## Installation

```sh
$ npm install @gistplatform/messenger-js-sdk
```

or

```sh
yarn add @gistplatform/messenger-js-sdk
```

### React

- Import the package on every page that should display the messenger or on a common component used by them.

```javascript
import Gist from "@gistplatform/messenger-js-sdk";
```

**If you have a React Remix project**, please install Gist via the named export like this:
```javascript
import { Gist } from "@gistplatform/messenger-js-sdk";
```

- Then call the imported function in the component render cycle with the correct parameters.
  **This must be done on the client's side.**

```javascript
// ...
export default MyPage = () => {
  Gist({
    app_id: constants.gist_app_id,
    user_id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt,
  });
  // ...
};
```

The package keeps track of any instances needed internally, therefore re-renders due to DOM changes won't trigger re-boot of the messenger.

### Angular

- Import the package on every page that should display the messenger or on a common component used by them.

```javascript
import Gist from "@gistplatform/messenger-js-sdk";
```

- Then call the imported function in the component render cycle with the correct parameters.

```javascript
// ...
export class MyPage {
  constructor() {
    Gist({
      app_id: constants.gist_app_id,
      user_id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
    });
  }
  // ...
}
```

The package keeps track of any instances needed internally, therefore re-renders due to DOM changes won't trigger re-boot of the messenger.

### Vue

- Simply import the package and call the function on every page that should display the messenger or on a common component used by them.

```javascript
<script setup>
import Gist from "@gistplatform/messenger-js-sdk";
Gist({
  app_id: constants.gist_app_id,
  user_id: user.id,
  name: user.name,
  email: user.email,
  created_at: user.createdAt,
});
</script>
```

### Ember

- Simply import the package and call the function on every page that should display the messenger or on a common component used by them.

```javascript
import Gist from "@gistplatform/messenger-js-sdk";
Gist({
  app_id: constants.gist_app_id,
  user_id: user.id,
  name: user.name,
  email: user.email,
  created_at: user.createdAt,
});
```

- If you want the messenger on the every page, it is possible by doing this call on the Application level.

## Methods

All methods described below can only be called **after calling the initialization method `Gist({...})`**.

### `hide`

```JavaScript
import { hide } from '@gistplatform/messenger-js-sdk';
// ...
hide()
```

You can hide the Gist Messenger widget using the hide() method. This method is useful if you want to hide the chat messenger by default on a page and only display it when an event is triggered by your users, such as clicking a link or a button.

---

### `show`

```JavaScript
import { show } from '@gistplatform/messenger-js-sdk';
// ...
show()
```

To display the Messenger widget on a specific page, you can use the show() method. Typically, it's called after Messenger is hidden using hide() method that allows you to show Messenger only on specific pages of your website, such as your app or member login area.
---

### `open`

```JavaScript
import { open } from '@gistplatform/messenger-js-sdk';
// ...
open()
```

You can open the Gist Messenger widget to the last screen the user was on if it is currently closed.
---

### `close`

```JavaScript
import { close } from '@gistplatform/messenger-js-sdk';
// ...
close()
```

You can close the Messenger widget if it is currently open.
---

### `showLauncher`

```JavaScript
import { showLauncher } from '@gistplatform/messenger-js-sdk';
// ...
showLauncher()
```

The Messenger Launcher is a small icon that users can click to open the Messenger widget. It will not affect the main Messenger panel.
---

### `hideLauncher`

```JavaScript
import { hideLauncher } from '@gistplatform/messenger-js-sdk';
// ...
hideLauncher()
```

If the Messenger Launcher is currently visible, you can hide it. It will not affect the main Messenger panel.
---

### `chat`

```JavaScript
import { chat } from '@gistplatform/messenger-js-sdk';
// ...
chat("sidebar");
```
You can change the layout of the Messenger widget using the `chat()` method. The available options are `"sidebar"` and `"standard"`.
---


### `shutdown`

```JavaScript
import { shutdown } from '@gistplatform/messenger-js-sdk';
// ...
shutdown()
```

If you're using the identify method to track your logged-in users, you should call the Gist shutdown method to clear the users' conversations and identity when they log out of your application. This ensures the next person using the computer doesn't see any previous history.

**Deleting cookies**

If you need to delete cookies created by the Messenger but are unable to use this method (e.g. because our JavaScript hasn’t been loaded), all cookies are prefixed with gist- and are created on your domain.
---

### `onUnreadCountChange`

```JavaScript
import { onUnreadCountChange } from '@gistplatform/messenger-js-sdk';
// ...
onUnreadCountChange(function(e) {
  console.log(window.gistUnreadCount); // prints out the unread message count
});
```

The onUnreadCountChange event is triggered when a new incoming message arrives, and the unread messages count changes for the visitor. You can register a function that will be called immediately whenever the current number of unread messages changes.


You can use the window.gistUnreadCount variable to update your custom unread counter or badge.
---

### `navigate`

```JavaScript
import { navigate } from '@gistplatform/messenger-js-sdk';
// ...
navigate("home"); // Welcome screen
navigate("conversations"); // Previous Conversations screen
navigate("newConversation"); // Message screen
navigate("newConversation", "insert text"); // Message screen
navigate("articles"); // Search screen
navigate("articles?q=insert-test-here"); // Search screen
```

You can programmatically switch to specific screens within Messenger using the available routes.
---

### `trigger`

```JavaScript
import { trigger } from '@gistplatform/messenger-js-sdk';
// ...
trigger('survey', SURVEY_ID); // Trigger Survey
trigger('form', FORM_ID); // Trigger Form
trigger('chat', CHAT_ID); // Trigger Chat
trigger('post', POST_ID); // Trigger Post
trigger('bot', BOT_ID); // Trigger Bot
trigger('tour', TOUR_ID); // Trigger Tour
```

You can trigger any of the outbound messages, such as Surveys, Forms, Chat, Post and Bot messages, when your visitors click a link using the Trigger API.

Replace SURVEY_ID, FORM_ID, CHAT_ID, POST_ID, BOT_ID and TOUR_ID from above with the ID of the messages. You can find them within the URL on the editor page when you open it in your workspace.
---

### `openArticle`

```JavaScript
import { chat } from '@gistplatform/messenger-js-sdk';
// ...
openArticle('ARTICLE_ID'); // Open Article in Messenger
openArticle('ARTICLE_ID', 'sidebar'); // Open Article in a sidebar
```

You can use the chat('article') method to open the Article within Messenger or in a sidebar. This is helpful when your trigger is something other than a link or a button or when you’d like the article to show up automatically using your own custom logic.

Note: If the Messenger is closed when this method is called, it will also open the Messenger automatically.
---

## Events

### `onChatReady`

```JavaScript
import { onChatReady } from '@gistplatform/messenger-js-sdk';
// ...
onChatReady(function(e) {
  // your code goes here
});
```

The ready event indicates that Gist Messenger is ready for use.

---

## Messenger Events

If you want to listen for the Messenger window opening or closing to perform any event or visual updates on your site, you can use the onMessengerOpened and onMessengerClosed events.

### `onMessengerOpened`

```JavaScript
import { onMessengerOpened } from '@gistplatform/messenger-js-sdk';
// ...
onMessengerOpened(function(e) {
  // your code goes here
});
```

### `onMessengerClosed`

```JavaScript
import { onMessengerClosed } from '@gistplatform/messenger-js-sdk';
// ...
onMessengerClosed(function(e) {
  // your code goes here
});
```

---

## Conversation Events

### `onConversationStarted`

```JavaScript
import { onConversationStarted } from '@gistplatform/messenger-js-sdk';
// ...
onConversationStarted(function(e) {
  // your code goes here
});
```

The onConversationStarted event fires when the user starts a new chat conversation in Messenger.

### `onConversationOpened`

```JavaScript
import { onConversationOpened } from '@gistplatform/messenger-js-sdk';
// ...
onConversationOpened(function(e) {
  // your code goes here
});
```

The onConversationOpened event is triggered when the user selects a conversation from their history in the Messenger.

### `onConversationFeedback`

```JavaScript
import { onConversationFeedback } from '@gistplatform/messenger-js-sdk';
// ...
onConversationFeedback(function(e) {
  // your code goes here
});
```

The onConversationFeedback event is triggered when the user submits their feedback on a conversation they had with your team. This event passes the conversationId and rating object as payload.

---

## Message Events

### `onMessageSent`

```JavaScript
import { onMessageSent } from '@gistplatform/messenger-js-sdk';
// ...
onMessageSent(function(e) {
  // your code goes here
});
```

The onMessageSent event fires when the user replies to a conversation.

### `onMessageReceived`

```JavaScript
import { onMessageReceived } from '@gistplatform/messenger-js-sdk';
// ...
onMessageReceived(function(e) {
  // your code goes here
});
```

The onMessageReceived event fires when the user receives a reply to a conversation from a teammate.

Both these conversation events pass the conversationId and message as payload.

---

## Email Captured

### `onEmailCaptured`

```JavaScript
import { onEmailCaptured } from '@gistplatform/messenger-js-sdk';
// ...
onEmailCaptured(function(e) {
  // your code goes here
});
```

The onEmailCaptured event fires when the user enters their email address in the Messenger.

---

## GDPR consent

### `onGDPRClicked`

```JavaScript
import { onGDPRClicked } from '@gistplatform/messenger-js-sdk';
// ...
onGDPRClicked(function(e) {
  // your code goes here
});
```

The onGDPRClicked event fires when the user clicks on the yes or no consent buttons as part of the form prior to starting a conversation. This event passes the email, accepted and visitorId as a payload.

---

## Meeting Events

### `onMeetingRequested`

```JavaScript
import { onMeetingRequested } from '@gistplatform/messenger-js-sdk';
// ...
onMeetingRequested(function(e) {
  // your code goes here
});
```

The onMeetingRequested event fires when a meeting request has been pushed to a conversation when a bot flow triggers it or when a member of your team shares a calendar to a conversation.

This event passes the conversationId as payload.

### `onMeetingBooked`

```JavaScript
import { onMeetingBooked } from '@gistplatform/messenger-js-sdk';
// ...
onMeetingBooked(function(e) {
  // your code goes here
});
```

The onMeetingBooked event fires when the user books a meeting with a member of your team.

This event passes the conversationId as payload.

---

## In-App Message Events

### `onTriggeredMessageFired`

```JavaScript
import { onTriggeredMessageFired } from '@gistplatform/messenger-js-sdk';
// ...
onTriggeredMessageFired(function(e) {
  // your code goes here
});
```

The onTriggeredMessageFired event is triggered when the in-app message is shown to your visitor.

### `onTriggeredMessageClicked`

```JavaScript
import { onTriggeredMessageClicked } from '@gistplatform/messenger-js-sdk';
// ...
onTriggeredMessageClicked(function(e) {
  // your code goes here
});
```

The onTriggeredMessageClicked event is triggered when the user interacts with an in-app message by clicking on the message.

### `onTriggeredMessageDismissed`

```JavaScript
import { onTriggeredMessageDismissed } from '@gistplatform/messenger-js-sdk';
// ...
onTriggeredMessageDismissed(function(e) {
  // your code goes here
});
```

The onTriggeredMessageDismissed event is triggered when the in-app message is closed by your visitor by clicking on the close button next to the message.

These in-app message events pass the conversationId, message and assistantId as payload.

---

## Chatbot Events

### `onChatbotFired`

```JavaScript
import { onChatbotFired } from '@gistplatform/messenger-js-sdk';
// ...
onChatbotFired(function(e) {
  // your code goes here
});
```

The onChatbotFired event is triggered when the welcome message of the chatbot is shown to your visitor.

### `onChatbotButtonClicked`

```JavaScript
import { onChatbotButtonClicked } from '@gistplatform/messenger-js-sdk';
// ...
onChatbotButtonClicked(function(e) {
  // your code goes here
});
```

The onChatbotButtonClicked event fires when the user clicks on a button in chat as a response to a bot question.

These bot events pass the conversationId, buttonText, buttonId, questionId and createdAt as payload.

---

## Article Events

### `onArticleViewed`

```JavaScript
import { onArticleViewed } from '@gistplatform/messenger-js-sdk';
// ...
// Triggers when an article has been viewed
onArticleViewed(function(e) {
  // your code goes here
});
```

The onArticleViewed event is triggered when a user views an article within Messenger. This event passes articleId, articleTitle, articleUrl and authorId as payload.

### `onArticleSearched`

```JavaScript
import { onArticleSearched } from '@gistplatform/messenger-js-sdk';
// ...
// Triggers when an article has been searched
onArticleSearched(function(e) {
  // your code goes here
});
```
The onArticleSearched event is triggered when a user searches for an article in the Messenger. This event passes searchTerm and resultsCount as payload.

### `onArticleFeedback`

```JavaScript
import { onArticleFeedback } from '@gistplatform/messenger-js-sdk';
// ...
// Triggers when feedback has been left for an article
onArticleFeedback(function(e) {
  // your code goes here
});
```

The onArticleFeedback event is triggered when a visitor leaves feedback on any article. This event passes articleId and rating object as payload.
---