const scriptURL = "https://script.google.com/macros/s/AKfycbyBfTgjLgJIZpW04ziHnhHk7A9GJzdNCHRUj5o7N24jOtwrONqndHqXS8zSDCZ3OA5g/exec";
let allData = [];
const defaultCols = ["Name", "Roll Number", "Overall"];

// Fetch data from Google Sheets
fetch(scriptURL)
  .then(res => res.json())
  .then(data => {
    allData = data;
    renderTable(); // default render
  })
  .catch(err => console.error("Error loading data: ", err));

// Render function
function renderTable() {
  const checkedMonths = [...document.querySelectorAll("input[type=checkbox]:checked")].map(cb => cb.value);
  const columns = [...defaultCols, ...checkedMonths];

  // Table head
  const thead = document.getElementById("tableHead");
  thead.innerHTML = "";
  columns.forEach(col => {
    thead.innerHTML += `<th>${col}</th>`;
  });

  // Table body
  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";
  allData.forEach(row => {
    let tr = "<tr>";
    columns.forEach(col => {
      let value = row[col] || "";
      tr += `<td>${value}</td>`;
    });
    tr += "</tr>";
    tbody.innerHTML += tr;
  });
}

// Checkbox event
document.querySelectorAll("input[type=checkbox]").forEach(cb => {
  cb.addEventListener("change", renderTable);
});
