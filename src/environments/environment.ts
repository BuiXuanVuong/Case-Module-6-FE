// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  LIKE: 'http://localhost:8080/api/',
  URL: 'http://localhost:8080/users',
  API_URL: ' http://localhost:8080/status',
  BASE_URL: 'http://localhost:8080',
  firebaseConfig : {
    apiKey: 'AIzaSyCySnyjBvPR41CLIAz2Yin5kGgsj9xBOus',
    authDomain: 'module6-33cf7.firebaseapp.com',
    databaseURL: 'https://module6-33cf7-default-rtdb.firebaseio.com/',
    projectId: 'module6-33cf7',
    storageBucket: 'module6-33cf7.appspot.com',
    messagingSenderId: '904561255500',
    appId: '1:904561255500:web:5e18dbba4bcbd556ca80e9',
    measurementId: 'G-MZ99R5D10M'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
