let appointments = JSON.parse(localStorage.getItem("appointments")) || []; // Load appointments from localStorage

document
  .getElementById("appointmentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const sex = document.getElementById("sex").value;
    const age = document.getElementById("age").value;
    const caseDescription = document.getElementById("case").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const note = document.getElementById("note").value;

    const appointment = {
      name,
      sex,
      age,
      caseDescription,
      appointmentDate,
      note,
      status: "Scheduled", // default status
    };

    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments)); // Save appointments to localStorage
    displayAppointments();
    document.getElementById("appointmentForm").reset(); // Reset form
  });

function displayAppointments() {
  const tableBody = document
    .getElementById("appointmentsTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear existing rows

  appointments.forEach((appointment) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.sex}</td>
            <td>${appointment.age}</td>
            <td>${appointment.caseDescription}</td>
            <td>${new Date(appointment.appointmentDate).toLocaleString()}</td>
            <td>${appointment.note}</td>
            <td>${appointment.status}</td>
            <td><a href="#">View Details</a></td>
        `;
    tableBody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", displayAppointments); // Display appointments when the page loads

function filterAppointments() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.name.toLowerCase().includes(searchInput) ||
      new Date(appointment.appointmentDate)
        .toLocaleDateString()
        .includes(searchInput)
  );

  const tableBody = document
    .getElementById("appointmentsTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  filteredAppointments.forEach((appointment) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.sex}</td>
            <td>${appointment.age}</td>
            <td>${appointment.caseDescription}</td>
            <td>${new Date(appointment.appointmentDate).toLocaleString()}</td>
            <td>${appointment.note}</td>
            <td>${appointment.status}</td>
            <td><a href="#">View Details</a></td>
        `;
    tableBody.appendChild(row);
  });
}
