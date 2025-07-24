// Import necessary Firebase modules
import { db } from './firebaseConfig.js';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";

// Reference to the 'questions' collection
const questionsRef = collection(db, "questions");

// Function to load all questions
async function loadQuestions() {
  const querySnapshot = await getDocs(questionsRef);
  const listContainer = document.getElementById('question-list');
  listContainer.innerHTML = ""; // Clear existing list

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${data.question}</strong>
      <button onclick="deleteQuestion('${docSnap.id}')">Delete</button>
    `;
    listContainer.appendChild(li);
  });
}

// Function to add a new question
async function addQuestion(event) {
  event.preventDefault();
  const input = document.getElementById("question-input");
  const question = input.value.trim();
  if (question === "") return;

  await addDoc(questionsRef, { question });
  input.value = "";
  loadQuestions();
}

// Function to delete a question
async function deleteQuestion(id) {
  await deleteDoc(doc(db, "questions", id));
  loadQuestions();
}

// Initialize on page load
window.onload = () => {
  loadQuestions();
  document.getElementById("add-question-form").addEventListener("submit", addQuestion);
};
