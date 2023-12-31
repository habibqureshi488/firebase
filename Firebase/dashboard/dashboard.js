// var todos=localStorage.getItem("todos").split(",")
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection, addDoc, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyBGZ0DO9DHXhCT1vgXTUBobgQCs9TyyWCo",
  authDomain: "todo-app-691b5.firebaseapp.com",
  projectId: "todo-app-691b5",
  storageBucket: "todo-app-691b5.appspot.com",
  messagingSenderId: "456837253079",
  appId: "1:456837253079:web:cbf2c2b333834965112d92",
  measurementId: "G-BRQVF32P1G"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();




// onAuthStateChanged(auth,async (user) => {
//     if (user) {
//       console.log(user)


//       const docRef = doc(db, "todos", user.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//         todos_object=docSnap.data();
//         console.log("mmmm",todos_object)

//       } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//       }










//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/auth.user


//     } else {
//       location.replace(location.href="../index.html");
//     }
//   });





document.getElementById("logout").addEventListener("click", function () {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("signout sucessfully");

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error", errorMessage)
  });


  // location.replace(location.href="../index.html");

})




















// createUserWithEmailAndPassword(auth, email, password,firstname,lastname)
// .then(async(userCredential) => {
//   // Signed up 
//   const user = userCredential.user;
//   await setDoc(doc(db, "USERS",user.uid), {
//     dispalyName:firstname+" "+lastname,
//     email:email,
//     photo:"URL",
//   }); 
//    location.replace(location.href="../index.html"); 
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   console.log("error",errorMessage)

// });




































// var todos_object = JSON.parse(localStorage.getItem("todos"));
// console.log(todos_object);

var p_value;
var todos_object;


function self() {

  onAuthStateChanged(auth, async (user) => {

    if (user) {
      console.log(user)

      const q = query(collection(db, "todos"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        document.getElementById("myul").innerHTML += `<li>${doc.data().todos}<span onclick="marked(this)"><i class="fa-solid fa-check"></i></span><span onclick="rmv(this)"><i class="fa fa-trash" aria-hidden="true"></i>
        </span></li>`;

        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());
      });

//

    }
     else {
      location.replace(location.href="../index.html");
    }})
};
self();











// document.getElementById("body").addEventListener("click", function(e) {
//   e.preventDefault();
// })



document.getElementById("get").addEventListener("click", function (e) {
  e.preventDefault();

  alert("in func")


  var todo = document.getElementById("newlist").value;
  document.getElementById("myul").innerHTML += `<li>${todo}<span onclick="marked(this)"><i class="fa-solid fa-check"></i></span><span onclick="rmv(this)"><i class="fa fa-trash" aria-hidden="true"></i></span></li>`;
  document.getElementById("newlist").value = ""


  var priority = document.getElementsByName("priority")
  for (var i = 0; i < priority.length; i++) {
    if (priority[i].checked) {
      p_value = priority[i].value
    }
  }


  // if (todos_object == null) {
  //     todos_object = [{

  //     }]
  // localStorage.setItem("todos", JSON.stringify(todos_object));

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = await addDoc(collection(db, "todos"), {
        todos: `${todo}`,
        priority: `${p_value}`,
        uid: user.uid
      });
      console.log("Document written with ID: ", docRef.id);
    }
  })
















  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/auth.user














  // } else {
  //     todos_object.push({
  //         todos: todo,
  //         priority: p_value
  //     })

  // localStorage.setItem("todos", JSON.stringify(todos_object));
  // setDoc(doc(db, "TODOS",userid), {
  //   todos_object
  // });

}


  // }
)








function rmv(e) {
  e.parentNode.remove(e);
}
function marked(e) {
  e.parentNode.className += "marked";
  e.parentNode.removeChild(e);
  e.previousSibling(e).parentNode.removeChild(previous);
}

