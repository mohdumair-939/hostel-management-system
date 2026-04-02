import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Smart Hostel Management System</h1>

    <form id="studentForm" class="student-form">
      <input type="text" id="name" placeholder="Name" required />
      <input type="text" id="rollNumber" placeholder="Roll Number" required />
      <input type="text" id="branch" placeholder="Branch" required />
      <input type="number" id="year" placeholder="Year" required />
      <input type="text" id="phone" placeholder="Phone" required />
      <button type="submit">Add Student</button>
    </form>

    <div class="student-list">
      <h2>Students List</h2>
      <table id="studentsTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
`;

const API = "https://hostel-management-system-0xwb.onrender.com/students";

async function fetchStudents() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const tbody = document.querySelector("#studentsTable tbody");
    tbody.innerHTML = "";

    data.forEach(student => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.rollNumber}</td>
        <td>${student.branch}</td>
        <td>${student.year}</td>
        <td>${student.phone}</td>
        <td><button class="delete-btn" data-id="${student.id}">Delete</button></td>
      `;
      tbody.appendChild(row);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        await fetch(`${API}/${id}`, { method: "DELETE" });
        fetchStudents();
      });
    });
  } catch (error) {
    console.error("Error fetching students:", error);
  }
}

document.querySelector("#studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: document.querySelector("#name").value,
    rollNumber: document.querySelector("#rollNumber").value,
    branch: document.querySelector("#branch").value,
    year: Number(document.querySelector("#year").value),
    phone: document.querySelector("#phone").value
  };

  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });

    document.querySelector("#studentForm").reset();
    fetchStudents();
  } catch (error) {
    console.error("Error adding student:", error);
  }
});

fetchStudents();