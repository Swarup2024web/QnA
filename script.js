// Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM Elements
const classSelect = document.getElementById("classSelect");
const subjectSelect = document.getElementById("subjectSelect");
const chapterSelect = document.getElementById("chapterSelect");
const qnaContainer = document.getElementById("qnaContainer");

let classData = {};

// Load class → subject → chapter map
function loadClassData() {
  db.collection("classData").get().then(snapshot => {
    snapshot.forEach(doc => {
      classData[doc.id] = doc.data(); // example: { Science: [ "Light", "Electricity" ] }
      const option = document.createElement("option");
      option.value = doc.id;
      option.textContent = "Class " + doc.id;
      classSelect.appendChild(option);
    });
  });
}

// When Class selected → update Subject
classSelect.addEventListener("change", () => {
  const selectedClass = classSelect.value;
  subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
  chapterSelect.innerHTML = `<option value="">Select Chapter</option>`;
  chapterSelect.disabled = true;

  if (selectedClass && classData[selectedClass]) {
    const subjects = Object.keys(classData[selectedClass]);
    subjects.forEach(subject => {
      const option = document.createElement("option");
      option.value = subject;
      option.textContent = subject;
      subjectSelect.appendChild(option);
    });
    subjectSelect.disabled = false;
  } else {
    subjectSelect.disabled = true;
  }

  qnaContainer.innerHTML = ""; // clear previous QnA
});

// When Subject selected → update Chapter
subjectSelect.addEventListener("change", () => {
  const selectedClass = classSelect.value;
  const selectedSubject = subjectSelect.value;
  chapterSelect.innerHTML = `<option value="">Select Chapter</option>`;

  if (
    selectedClass &&
    selectedSubject &&
    classData[selectedClass] &&
    classData[selectedClass][selectedSubject]
  ) {
    classData[selectedClass][selectedSubject].forEach(chapter => {
      const option = document.createElement("option");
      option.value = chapter;
      option.textContent = chapter;
      chapterSelect.appendChild(option);
    });
    chapterSelect.disabled = false;
  } else {
    chapterSelect.disabled = true;
  }

  qnaContainer.innerHTML = ""; // clear previous QnA
});

// When Chapter selected → fetch QnAs
chapterSelect.addEventListener("change", () => {
  const selectedClass = classSelect.value;
  const selectedSubject = subjectSelect.value;
  const selectedChapter = chapterSelect.value;

  if (selectedClass && selectedSubject && selectedChapter) {
    fetchQnAs(selectedClass, selectedSubject, selectedChapter);
  } else {
    qnaContainer.innerHTML = "";
  }
});

// Load QnAs from Firestore
function fetchQnAs(cls, subj, chap) {
  qnaContainer.innerHTML = `<p>Loading QnAs...</p>`;

  db.collection("qna")
    .where("class", "==", cls)
    .where("subject", "==", subj)
    .where("chapter", "==", chap)
    .get()
    .then(snapshot => {
      qnaContainer.innerHTML = "";

      if (snapshot.empty) {
        qnaContainer.innerHTML = `<p>No QnAs found.</p>`;
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();
        const card = document.createElement("div");
        card.className = "qna-card";
        card.innerHTML = `
          <h3>Q: ${data.question}</h3>
          <p><strong>Ans:</strong> ${data.answer}</p>
        `;
        qnaContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching QnAs:", error);
      qnaContainer.innerHTML = `<p>Error loading data.</p>`;
    });
}

// Initial load
loadClassData();
