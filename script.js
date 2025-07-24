// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyApDnDrhy_Z0zvLoWfvsmP4JJSUIdtSulM",
  authDomain: "qnasite-6d9cc.firebaseapp.com",
  projectId: "qnasite-6d9cc",
  storageBucket: "qnasite-6d9cc.appspot.com",
  messagingSenderId: "707268852195",
  appId: "1:707268852195:web:05e13ee17b0d96253688d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to Firestore collection
const qnaCollection = collection(db, "questions");

// Single QnA Submit Handler
document.getElementById("singleForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const question = document.getElementById("question").value.trim();
  const answer = document.getElementById("answer").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const chapter = document.getElementById("chapter").value.trim();
  const marks = document.getElementById("marks").value.trim();
  const time = Timestamp.now();

  if (!question || !answer || !subject || !chapter || !marks) {
    alert("All fields must be filled!");
    return;
  }

  try {
    await addDoc(qnaCollection, {
      question,
      answer,
      subject,
      chapter,
      marks,
      time
    });

    alert("QnA added successfully!");
    e.target.reset();
  } catch (error) {
    alert("Error adding QnA: " + error.message);
  }
});

// Bulk QnA Add Row
document.getElementById("addRow").addEventListener("click", () => {
  const tableBody = document.getElementById("bulkTableBody");
  const row = document.createElement("tr");

  ["question", "answer", "subject", "chapter", "marks"].forEach(field => {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = field;
    input.required = true;
    td.appendChild(input);
    row.appendChild(td);
  });

  tableBody.appendChild(row);
});

// Bulk QnA Submit Handler
document.getElementById("bulkForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const tableBody = document.getElementById("bulkTableBody");
  const rows = tableBody.querySelectorAll("tr");

  let successCount = 0;

  for (const row of rows) {
    const inputs = row.querySelectorAll("input");
    const [question, answer, subject, chapter, marks] = Array.from(inputs).map(input => input.value.trim());

    if (!question || !answer || !subject || !chapter || !marks) continue;

    try {
      await addDoc(qnaCollection, {
        question,
        answer,
        subject,
        chapter,
        marks,
        time: Timestamp.now()
      });
      successCount++;
    } catch (error) {
      console.error("Failed to add:", question, error);
    }
  }

  alert(`${successCount} QnA(s) added successfully.`);
  tableBody.innerHTML = "";
});
