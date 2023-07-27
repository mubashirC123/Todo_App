import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore,collection,addDoc,getDocs,doc,deleteDoc,updateDoc,} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAx9PyabC6uZJ3odZv3f9dUV3dgUMSR_w0",
    authDomain: "test-51ff0.firebaseapp.com",
    projectId: "test-51ff0",
    storageBucket: "test-51ff0.appspot.com",
    messagingSenderId: "94551822328",
    appId: "1:94551822328:web:62662f8ab4ce74fd14900d",
    measurementId: "G-TGHYB90BFE"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const btn = document.getElementById("submit");
const inp = document.getElementById("entry");
const todo = document.getElementById("todo-list");

btn.addEventListener("click", async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            todo: inp.value,
        });
        location.reload();
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

async function data() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        todo.innerHTML += `
  <li class="list-item">
  <p class="text">${doc.data().todo}</p>
  <button id="del" onclick="del('${doc.id}')">Delete</button>
  <button id="up" onclick="up('${doc.id}')">Update</button>
</li> 
  `;
    });
}
data();

async function del(id) {
    await deleteDoc(doc(db, "users", id));
    location.reload();
}
async function up(id) {
    var prom = prompt("Enter Value You want To Update");
    const cityRef = doc(db, "users", id);

    await updateDoc(cityRef, {
        todo: prom,
    });
    location.reload();
}

window.del = del;
window.up = up;
