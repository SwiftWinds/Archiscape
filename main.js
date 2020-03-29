var firebaseConfig = {
    apiKey: "AIzaSyDOl8jUOlj3E2vf7feuELRM4tj9Y70kBSA",
    authDomain: "lahacks-70de2.firebaseapp.com",
    databaseURL: "https://lahacks-70de2.firebaseio.com",
    projectId: "lahacks-70de2",
    storageBucket: "lahacks-70de2.appspot.com",
    messagingSenderId: "724684122347",
    appId: "1:724684122347:web:5619f60fde8aa057daf6ae",
    measurementId: "G-TW1G530C4H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = '../main.html';
    }
});
var provider = new firebase.auth.GoogleAuthProvider();

function signUpWithGoogle() {
    console.log('hi');
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}
