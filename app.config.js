module.exports = {
  name: 'Airbnb',
  version: process.env.MY_CUSTOM_PROJECT_VERSION || '1.0.0',
  extra: {
    fact: 'kittens are cool',
    clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
};
