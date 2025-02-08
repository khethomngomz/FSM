// Function to update job status
function updateStatus(jobId, status) {
  alert(`Job ${jobId} status updated to: ${status}`);
}

// Function for check-in
function checkIn() {
  alert("Checked in at: " + new Date().toLocaleTimeString());
}

// Function for check-out
function checkOut() {
  alert("Checked out at: " + new Date().toLocaleTimeString());
}

// Charts for Reporting Dashboard
const jobCompletionChart = new Chart(document.getElementById("jobCompletionChart"), {
  type: "bar",
  data: {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Jobs",
        data: [12, 5],
        backgroundColor: ["#36a2eb", "#ff6384"],
      },
    ],
  },
});

const technicianPerformanceChart = new Chart(
  document.getElementById("technicianPerformanceChart"),
  {
    type: "pie",
    data: {
      labels: ["John Doe", "Jane Smith"],
      datasets: [
        {
          label: "Performance",
          data: [8, 12],
          backgroundColor: ["#ffcd56", "#4bc0c0"],
        },
      ],
    },
  }
);

// Initialize Google Maps
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: -34.397, lng: 150.644 }, // Default center
  });

  // Add markers for technicians
  const technicians = [
    { name: "John Motsepe", lat: -34.397, lng: 150.644, team: "Installations" },
    { name: "Tshepo Moloi", lat: -34.396, lng: 150.643, team: "Uninstall" },
  ];

  technicians.forEach((tech) => {
    new google.maps.Marker({
      position: { lat: tech.lat, lng: tech.lng },
      map,
      title: `${tech.name} (${tech.team})`,
    });
  });
}

// Real-Time Notifications with Socket.IO
const socket = io();
const notificationsList = document.getElementById("notifications");

socket.on("notification", (message) => {
  const notificationItem = document.createElement("li");
  notificationItem.className = "list-group-item";
  notificationItem.textContent = message;
  notificationsList.appendChild(notificationItem);
});

// Example: Send a notification
socket.emit("notification", "Technician John Doe has started a job.");

// Connect to the Socket.IO server

// Send a notification
function sendNotification(message) {
  socket.emit("notification", message);
}

// Receive notifications
socket.on("notification", (message) => {
  const notificationsList = document.getElementById("notifications");
  const notificationItem = document.createElement("li");
  notificationItem.className = "list-group-item";
  notificationItem.textContent = message;
  notificationsList.appendChild(notificationItem);
});

// Example: Send a notification when a job starts
function updateStatus(jobId, status) {
  sendNotification(`Job ${jobId} status updated to: ${status}`);
}

// Job Timestamps
let startTime = null;
let finishTime = null;

function startJob() {
  startTime = new Date().toLocaleTimeString();
  document.getElementById("startTime").textContent = startTime;
  sendNotification(`Job started at ${startTime}`);
}

function finishJob() {
  finishTime = new Date().toLocaleTimeString();
  document.getElementById("finishTime").textContent = finishTime;
  sendNotification(`Job finished at ${finishTime}`);
}

// Submit Comments
function submitComment(stage) {
  const comment = document.getElementById(`${stage}Comment`).value;
  if (comment) {
    sendNotification(`Comment (${stage}): ${comment}`);
    document.getElementById(`${stage}Comment`).value = ""; // Clear the textarea
  }
}

function sendNotification(message) {
  socket.emit("notification", message);
}

socket.on("notification", (message) => {
  const notificationsList = document.getElementById("notifications");
  const notificationItem = document.createElement("li");
  notificationItem.className = "list-group-item";
  notificationItem.textContent = message;
  notificationsList.appendChild(notificationItem);
});

// Edit Personal Details
function editPersonalDetails() {
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const saveButton = document.querySelector("#personalDetailsForm .btn-success");

  emailInput.disabled = false;
  phoneInput.disabled = false;
  saveButton.style.display = "inline-block";
}

// Save Personal Details
document.getElementById("personalDetailsForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const saveButton = document.querySelector("#personalDetailsForm .btn-success");

  emailInput.disabled = true;
  phoneInput.disabled = true;
  saveButton.style.display = "none";
  alert("Personal details saved!");
});

// Delete Personal Details
function deletePersonalDetails() {
  if (confirm("Are you sure you want to delete your personal details?")) {
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    alert("Personal details deleted!");
  }
}

// Edit Team Information
function editTeamInfo() {
  const teamInput = document.getElementById("team");
  const supervisorInput = document.getElementById("supervisor");
  const saveButton = document.querySelector("#teamInfoForm .btn-success");

  teamInput.disabled = false;
  supervisorInput.disabled = false;
  saveButton.style.display = "inline-block";
}

// Save Team Information
document.getElementById("teamInfoForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const teamInput = document.getElementById("team");
  const supervisorInput = document.getElementById("supervisor");
  const saveButton = document.querySelector("#teamInfoForm .btn-success");

  teamInput.disabled = true;
  supervisorInput.disabled = true;
  saveButton.style.display = "none";
  alert("Team information saved!");
});

// Delete Team Information
function deleteTeamInfo() {
  if (confirm("Are you sure you want to delete your team information?")) {
    document.getElementById("team").value = "";
    document.getElementById("supervisor").value = "";
    alert("Team information deleted!");
  }
}

// Handle Image Upload
document.getElementById("imageUploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const beforeImage = document.getElementById("beforeImage").files[0];
  const afterImage = document.getElementById("afterImage").files[0];

  if (beforeImage) {
    alert(`Before Job Image Uploaded: ${beforeImage.name}`);
    // You can upload the image to a server here
  }

  if (afterImage) {
    alert(`After Job Image Uploaded: ${afterImage.name}`);
    // You can upload the image to a server here
  }
});

// Inventory List
const inventoryList = document.getElementById("inventoryList");

// Add Inventory Item
document.getElementById("addInventoryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const itemName = document.getElementById("itemName").value;
  const itemImage = document.getElementById("itemImage").files[0];

  if (itemName && itemImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const item = `
        <tr>
          <td>${itemName}</td>
          <td><img src="${e.target.result}" alt="${itemName}" width="50"></td>
          <td><button class="btn btn-sm btn-danger" onclick="deleteInventoryItem(this)">Delete</button></td>
        </tr>
      `;
      inventoryList.insertAdjacentHTML("beforeend", item);
    };
    reader.readAsDataURL(itemImage);

    // Clear the form
    document.getElementById("addInventoryForm").reset();
  } else {
    alert("Please fill out all fields.");
  }
});

// Delete Inventory Item
function deleteInventoryItem(button) {
  const row = button.closest("tr");
  row.remove();
}

// Helper function to format numbers to two digits
function formatTimeUnit(unit) {
  return unit < 10 ? "0" + unit : unit;
}

// Function to capture and display the start time
function startJob() {
  const now = new Date();
  const hours = formatTimeUnit(now.getHours());
  const minutes = formatTimeUnit(now.getMinutes());
  const seconds = formatTimeUnit(now.getSeconds());
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  document.getElementById("startTime").textContent = formattedTime;
  sendNotification(`Job started at ${formattedTime}`);
}

// Function to capture and display the finish time
function finishJob() {
  const now = new Date();
  const hours = formatTimeUnit(now.getHours());
  const minutes = formatTimeUnit(now.getMinutes());
  const seconds = formatTimeUnit(now.getSeconds());
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  document.getElementById("finishTime").textContent = formattedTime;
  sendNotification(`Job finished at ${formattedTime}`);
}
