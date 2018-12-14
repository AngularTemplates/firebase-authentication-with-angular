// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBdn30gInaB7lBZGSP3YUGppdF0qyGjmbM',
    authDomain: 'mms-12345.firebaseapp.com',
    databaseURL: 'https://mms-12345.firebaseio.com',
    projectId: 'mms-12345',
    storageBucket: 'mms-12345.appspot.com',
    messagingSenderId: '545875298292'
  }
};
