let firebaseConfig = {
    apiKey: "AIzaSyB_HRNxCH2uOKsHfaXkolyzmnrykq_CWMw",
    authDomain: "tom-website-1ba23.firebaseapp.com",
    projectId: "tom-website-1ba23",
    storageBucket: "tom-website-1ba23.appspot.com",
    messagingSenderId: "555153773493",
    appId: "1:555153773493:web:65de83d292391aafdd3ffc"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the Firestore database
  let db = firebase.firestore();