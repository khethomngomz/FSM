document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://fsm-nx79.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.message);
      return;
    }

    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Please try again.");
  }
});

async function fetchInventory() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to view inventory.");
    return;
  }
  try {
    const response = await fetch("https://fsm-nx79.onrender.com/api/inventory", {
      headers: { Authorization: token },
    });
    const inventory = await response.json();
    document.getElementById("inventoryList").innerHTML = inventory
      .map(
        (item) => `
      <tr>
        <td>${item.itemName}</td>
        <td>${item.checkInTime}</td>
        <td>${item.checkOutTime || "N/A"}</td>
      </tr>
    `
      )
      .join("");
  } catch (error) {
    console.error("Fetch inventory error:", error);
  }
}
