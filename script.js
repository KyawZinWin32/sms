const apiURL = "https://script.google.com/macros/s/AKfycbyW3cOy0mOZHHFxwOa1P2AdRljkEOjJYtI2DYgLWxWzUMBGnmWSqrAXM4huZzAwhAQgGw/exec";
fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#attendance-table tbody');
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
