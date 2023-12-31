
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc,setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


document.getElementById("body").addEventListener("click", function (event) {
    event.preventDefault();
  })
  
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
  const db = getFirestore(app);
  const auth = getAuth();

  
  
document.getElementById("submit").addEventListener("click",function(){
  
    var firstname = document.getElementById("firstnames").value;
    var lastname = document.getElementById("lastnames").value;
    var email = document.getElementById("signupemail").value;
    var password = document.getElementById("signuppass").value;
  
  
    createUserWithEmailAndPassword(auth, email, password,firstname,lastname)
    .then(async(userCredential) => {
      // Signed up 
      const user = userCredential.user;
      await setDoc(doc(db, "USERS",user.uid), {
        dispalyName:firstname+" "+lastname,
        email:email,
        photo:"URL",
      });  location.replace(location.href="../index.html"); 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error",errorMessage)
    
    });
     document.getElementById("firstnames").value = '';
    document.getElementById("lastnames").value = '';
    document.getElementById("username").value = '';
    document.getElementById("signupemail").value = '';
    document.getElementById("signuppass").value = '';
    document.getElementById("cpass").value = '';
  
    
  
  });

  document.getElementById("back").addEventListener("click",function(){
    location.replace(location.herf="../index.html");
   })