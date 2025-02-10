// mockUser.js
const mockUsers = [
  { id: 1, username: "Tshiamo", password: "admin1", email: "user1@example.com" },
  { id: 2, username: "Khetho", password: "admin2", email: "user2@example.com" },
  { id: 3, username: "user3", password: "pass3", email: "user3@example.com" },
  { id: 4, username: "user4", password: "pass4", email: "user4@example.com" },
  { id: 5, username: "user5", password: "pass5", email: "user5@example.com" },
  { id: 6, username: "user6", password: "pass6", email: "user6@example.com" },
  { id: 7, username: "user7", password: "pass7", email: "user7@example.com" },
  { id: 8, username: "user8", password: "pass8", email: "user8@example.com" },
  { id: 9, username: "user9", password: "pass9", email: "user9@example.com" },
  { id: 10, username: "user10", password: "pass10", email: "user10@example.com" },
];

// Pick the first user or any specific one you want to set as default
const selectedUser = mockUsers[0]; // Use mock user with index 0 (Tshiamo)

// Set selected user in localStorage
localStorage.setItem("user_id", selectedUser.id);
localStorage.setItem("user_name", selectedUser.username);
localStorage.setItem("user_email", selectedUser.email);
