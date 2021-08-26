import  firebase  from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC-Pw3CsD1iToaAsei0mbuu6Ik3NWw4gsQ",
    authDomain: "clocker-ec16a.firebaseapp.com",
    projectId: "clocker-ec16a",
    storageBucket: "clocker-ec16a.appspot.com",
    messagingSenderId: "194522859885",
    appId: "1:194522859885:web:7f9470af4932c8be4a3264",
    measurementId: "G-186SFZT2G3"
  };
  
  // Initialize Firebase
  export default  firebase = firebase.apps.length 
    ? firebase.app() 
    : firebase.initializeApp(firebaseConfig)