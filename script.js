const apiURL = "https://script.google.com/macros/s/AKfycbyW3cOy0mOZHHFxwOa1P2AdRljkEOjJYtI2DYgLWxWzUMBGnmWSqrAXM4huZzAwhAQgGw/exec";

function loadData() {
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#attendance-table tbody');
      tbody.innerHTML = ""; // clear old rows
      data.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.Name}</td>
          <td>${student.RollNo}</td>
          <td>${student.Percentage}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    });
}

// First load
loadData();

// Refresh every 15 seconds
setInterval(loadData, 15000);
