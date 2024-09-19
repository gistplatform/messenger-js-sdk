import * as GistTypes from "./types";
import { init } from "./instance-manager";

// Declare global window property
declare global {
  interface Window {
    gist: any;
    gistSettings?: GistTypes.GistSettings;
  }
}

// Call Gist JS API methods
const callGistMethod = (method: string, ...args: any[]) => {
  if (typeof window !== "undefined" && window.gist) {
    if (typeof window.gist[method] === "function") {
      if (method === "identify" && args.length === 2) {
        // Handle the case with user_id
        window.gist[method](args[0], args[1]);
      } else if (method === "identify" && args.length === 1) {
          // Handle the case without user_id
          window.gist[method](args[0]);
      } else {
        // Handle other cases
        window.gist[method](...args);
      }
    } else {
      console.warn(`Gist method '${method}' is not available.`);
    }
  } else {
    console.warn("Gist is not available. Please ensure it's setup and running on client-side.");
  }
};

// Array to store all event listeners
let gistEventListeners: { eventName: string; listener: EventListener }[] = [];

// Setup Gist event listeners
const setupGistCallback = (eventName: string, callback: Function) => {
  if (typeof window !== "undefined") {
    const listener = ((event: CustomEvent) => {
      callback(event.detail);
    }) as EventListener;
    
    document.addEventListener(eventName, listener, false);
    gistEventListeners.push({ eventName, listener });
  } else {
    console.warn("Window is not available. Please ensure this is running on client-side.");
  }
};

// Remove all Gist event listeners
const removeAllGistEventListeners = () => {
  gistEventListeners.forEach(({ eventName, listener }) => {
    document.removeEventListener(eventName, listener);
  });
  gistEventListeners = [];
};

// Remove all Gist event listeners on route change
if (typeof window !== "undefined") {
  window.addEventListener("popstate", removeAllGistEventListeners);
}

export const Gist = (props: GistTypes.InitType) => {
  if (typeof props !== "object") {
    console.warn("Gist initializer called with invalid parameters.");
    return;
  }
  const { app_id, user_id, ...userArgs } = props;
  if (typeof window !== "undefined") {
    window.gistSettings = { app_id };
    init();
    
    // Call identify after initialization
    if (user_id) {
      callGistMethod("identify", user_id, userArgs);
    } else {
      callGistMethod("identify", userArgs);
    }
  }
};

export default Gist;

// Gist methods
export const trackEvent = (...args: any[]) => callGistMethod("track", ...args);
export const trackPageView = (...args: any[]) => callGistMethod("trackPageView", ...args);
export const shutdown = () => callGistMethod("shutdown");
export const hide = () => callGistMethod('chat', "hide");
export const show = () => callGistMethod('chat', "show");
export const open = () => callGistMethod('chat', "open");
export const close = () => callGistMethod('chat', "close");
export const showLauncher = () => callGistMethod('chat', "showLauncher");
export const hideLauncher = () => callGistMethod('chat', "hideLauncher");
export const chat = (layout: "sidebar" | "standard") => callGistMethod("chat", layout);
export const navigate = (route: string, text?: string) => callGistMethod("navigate", route, text);
export const trigger = (type: string, id: string) => callGistMethod("trigger", type, id);
export const openArticle = (id: string, layout: "sidebar" | "standard") => callGistMethod("chat", 'article', id, layout);

// Gist event listeners
export const onUnreadCountChange = (callback: Function) => setupGistCallback("onUnreadCountChange", callback);
export const onChatReady = (callback: Function) => setupGistCallback("onChatReady", callback);
export const onMessengerOpened = (callback: Function) => setupGistCallback("messenger:opened", callback);
export const onMessengerClosed = (callback: Function) => setupGistCallback("messenger:closed", callback);
export const onConversationStarted = (callback: Function) => setupGistCallback("conversation:started", callback);
export const onConversationOpened = (callback: Function) => setupGistCallback("conversation:opened", callback);
export const onConversationFeedback = (callback: Function) => setupGistCallback("conversation:feedback", callback);
export const onMessageSent = (callback: Function) => setupGistCallback("message:sent", callback);
export const onMessageReceived = (callback: Function) => setupGistCallback("message:received", callback);
export const onEmailCaptured = (callback: Function) => setupGistCallback("email:captured", callback);
export const onGDPRClicked = (callback: Function) => setupGistCallback("gdpr:clicked", callback);
export const onMeetingRequested = (callback: Function) => setupGistCallback("meeting:requested", callback);
export const onMeetingBooked = (callback: Function) => setupGistCallback("meeting:booked", callback);
export const onTriggeredMessageFired = (callback: Function) => setupGistCallback("triggeredMessage:fired", callback);
export const onTriggeredMessageClicked = (callback: Function) => setupGistCallback("triggeredMessage:clicked", callback);
export const onTriggeredMessageDismissed = (callback: Function) => setupGistCallback("triggeredMessage:dismissed", callback);
export const onChatbotFired = (callback: Function) => setupGistCallback("chatbot:fired", callback);
export const onChatbotButtonClicked = (callback: Function) => setupGistCallback("chatbot:buttonClicked", callback);
export const onArticleViewed = (callback: Function) => setupGistCallback("article:viewed", callback);
export const onArticleSearched = (callback: Function) => setupGistCallback("article:searched", callback);
export const onArticleFeedback = (callback: Function) => setupGistCallback("article:feedback", callback);