  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";



// ----------------------------------------------dont change-----------------------------------------------------//
  const firebaseConfig = {
    apiKey: "AIzaSyDsmGooNCbVlQY-KZE9-YIhGhXTTUfnKy4",
    authDomain: "appntapp-2d799.firebaseapp.com",
    projectId: "appntapp-2d799",
    storageBucket: "appntapp-2d799.appspot.com",
    messagingSenderId: "740407693598",
    appId: "1:740407693598:web:cf495254e20b2ac93ff90f",
    measurementId: "G-Q53J0PGR4Y"
  };
// ----------------------------------------------dont change-----------------------------------------------------//
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  // Get a reference to the Firebase Realtime Database
  const database = getDatabase(app);
  
  // Reference to the form and its elements
  const form1 = document.getElementById("contactForm1");
  const name1Input = document.getElementById("name1");
  const appnt1Input = document.getElementById("appnt1");
  const unq1Input = document.getElementById("unq1");
  
  // Add a submit event listener to the form
  form1.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Get values from the form
    const name1 = name1Input.value;
    const appnt1 = appnt1Input.value;
    const unq1 = unq1Input.value;
  
    // Push the data to the Firebase Realtime Database
    const appointmentsRef = ref(database, 'appointments');
    push(appointmentsRef, {
      name: name1,
      appointment: appnt1,
      unique: unq1
    }).then(() => {
      // Data has been successfully pushed
      alert("Appointment data pushed to Firebase");
      // You can add any further actions or UI updates here
    }).catch((error) => {
      // Handle errors if data push fails
      alert("Error pushing appointment data: ", error);
    });
  
    // Clear the form fields
    name1Input.value = '';
    appnt1Input.value = '';
    unq1Input.value = '';
  });
  

// ...
// Reference to the second form and its elements
const form2 = document.getElementById("contactForm2");
const name2Input = document.getElementById("name2");
const unq2Input = document.getElementById("unq2");
form2.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Get values from the form
    const name2 = name2Input.value;
    const unq2 = unq2Input.value;
  
    // Reference to the Firebase Realtime Database
    const database = getDatabase(app);
  
    try {
      // Fetch the user data from the database (replace 'appointments' with your database reference)
      const appointmentsRef = ref(database, 'appointments');
      const snapshot = await get(appointmentsRef);
  
      let validCredentialsFound = false; // Flag to check if any valid credentials were found
  
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          const validName = userData.name;
          const validPassword = userData.unique;
  
          console.log("Name Entered:", name2);
          console.log("Password Entered:", unq2);
          console.log("Valid Name:", validName);
          console.log("Valid Password:", validPassword);
  
          // Check if the entered name and password match the database values
          if (name2 === validName && unq2 === validPassword) {
            // Create a text file with user details and initiate download
            const userDetails = `Name: ${name2}\nPassword: ${unq2}\nAppointment Number: ${userData.appointment}`;
            const blob = new Blob([userDetails], { type: "text/plain" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "user_details.txt";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            alert("Appointment downloading!");
            validCredentialsFound = true; // Valid credentials found
            // Clear the form fields
            name2Input.value = "";
            unq2Input.value = "";
            return; // Exit the loop if a match is found
          }
        });
  
        // Check if no valid credentials were found and show the "Invalid credentials" alert
        if (!validCredentialsFound) {
          alert("Invalid credentials. Please check your name and password.");
        }
      } 
      else {
        alert("No data found in the database.");
      }
    } catch (error) {
      console.error("Error fetching data from the database: ", error);
      alert("An error occurred while fetching data from the database.");
    }
});
