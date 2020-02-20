import React from "react";

const NewsletterContext = React.createContext(0);

const NewsletterProvider = NewsletterContext.Provider;
const NewsletterSubscriber = NewsletterContext.Subscriber;

export { NewsletterProvider, NewsletterSubscriber, NewsletterContext };
