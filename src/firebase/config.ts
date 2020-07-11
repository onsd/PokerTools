import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDN8zU9m0YIlZr8sGGrDoUgo_4nV56pgUI",
    authDomain: "poker-app-64e84.firebaseapp.com",
    databaseURL: "https://poker-app-64e84.firebaseio.com",
    projectId: "poker-app-64e84",
    storageBucket: "poker-app-64e84.appspot.com",
    messagingSenderId: "314231463716",
    appId: "1:314231463716:web:9f5fb81241525cf0919db1",
    measurementId: "G-TD1QK838SG"
};

firebase.initializeApp(firebaseConfig);
export default firebase