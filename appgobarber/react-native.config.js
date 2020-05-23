module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [
    // copiar assets para o app nativo do android e ios
    // precisam ficar dentro do app nativo e não so como assets js
    './assets/fonts',
  ],
};

/** para finalizar fazer o processo de link
 * yarn react-native link
 */
