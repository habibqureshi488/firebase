var credentials;
var active_id;



// function flogin() {

//   document.getElementById("formid2").addEventListener("click", function (event) {
//     event.preventDefault();
//   }
//   )

//   var lemail = document.getElementById("logemail").value;
//   var lpass = document.getElementById("logpass").value;
//   credentials = JSON.parse(localStorage.users);


//   if (!(lemail == '')) {
//     if (!(lemail.includes('@') == true)) {
//       swal({
//         title: "Invalid Email!",
//         text: "Email Must Contain @ ",
//         icon: "warning",
//         button: "OK",
//       });
//       return false;
//     }
//   } else {
//     swal({
//       title: "Empty Field !",
//       text: "Enter your Email Please",
//       icon: "warning",
//       button: "OK",
//     });
//     return false;
//   }


//   if (!(lpass == '')) {
//     if (!(lpass.length >= 8)) {
//       swal({
//         title: "Too short !!",
//         text: "Password Must Contain 8 Chracters",
//         icon: "warning",
//         button: "OK",
//       });
//       return false;
//     }
//   } else {
//     swal({
//       title: "Empty Field !",
//       text: "Enter your Password Please",
//       icon: "warning",
//       button: "OK",
//     });
//     return false;
//   }


//    var index = credentials.findIndex(item => item.email === lemail);
//   if (!(index == -1)) {
//     var index2 = credentials.findIndex(item => item.password === lpass);
//     if (!(index2 == -1)) {
//       swal({
//         title: "Welcome" + ' ' + credentials[index].firstname.toUpperCase(),
//         text: "You have Successfully logged In",
//         icon: "success",
//         button: "OK",
//       });
//       active_id= credentials[index].user_id
//       localStorage.setItem('active_id',active_id);

//     } else {
//       swal({
//         title: "Incorrect Password",
//         text: "Password Doesn't Match",
//         icon: "error",
//         button: "OK",
//       });
//       return;

//     }
//   } else {
//     swal({
//       title: "Invalid Email!",
//       text: "User Doesn't Found",
//       icon: "error",
//       button: "OK",
//     });
//     return;
//   }

//   document.getElementById("logemail").value = '';
//   document.getElementById("logpass").value = '';
//   location.replace(location.href="dashboard/dashboard.html");
// }
document.getElementById("page").addEventListener("click",function(){

  location.replace(location.href="signup/signup.html");

})





document.getElementById("formid2").addEventListener("click", function (event) {
  event.preventDefault();
})

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { signInWithPopup, GoogleAuthProvider }from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; 
import { getFirestore, doc,setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGZ0DO9DHXhCT1vgXTUBobgQCs9TyyWCo",
  authDomain: "todo-app-691b5.firebaseapp.com",
  projectId: "todo-app-691b5",
  storageBucket: "todo-app-691b5.appspot.com",
  messagingSenderId: "456837253079",
  appId: "1:456837253079:web:cbf2c2b333834965112d92",
  measurementId: "G-BRQVF32P1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth();
const db = getFirestore(app);
const auth = getAuth();





onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    location.replace(location.href="dashboard/dashboard.html");

  } else {

    console.log(user)
    // User is signed out
    // ...
  }
});



















// FOR SIGN - IN







let login_btn=document.getElementById("login_btn")
login_btn.addEventListener("click",function(){

  var email = document.getElementById("logemail").value;
 var password = document.getElementById("logpass").value;
  // const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // onValue(ref(db , `users/${user.uid}`),(data)=>{
    //   console.log("data =>",data.val());
      location.replace(location.href="dashboard/dashboard.html");
    // })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error",errorMessage)

  });
  document.getElementById("logemail").value = '';
  document.getElementById("logpass").value = '';
  


});

        // FOR GOOGLE SIGN-IN


document.getElementById("google").addEventListener("click",function(){
  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(async(result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
     
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      console.log(user.photoURL,user.email,user.displayName,user.userName);
      await setDoc(doc(db, "USERS",user.uid), {
        displayName:user.displayName,
        email:user.email,
        photo:user.photoURL,
  
      });
      location.replace(location.href="dashboard/dashboard.html");
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });


});



