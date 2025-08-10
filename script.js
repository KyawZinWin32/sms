document.addEventListener('DOMContentLoaded', function() {
  const fetchBtn = document.getElementById('fetchBtn');
  const sheetSelect = document.getElementById('sheetSelect');
  const attendanceData = document.getElementById('attendance-data');
  const loading = document.getElementById('loading');
  const errorDiv = document.getElementById('error');
  const displayTitle = document.getElementById('display-title');
  
  // Replace with your actual Apps Script URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9b-q3Ri4hhjugJJ8di7xRCX4LuUcTo4Ljt8O1ePdes8LxGBoLMdQruI8Y7H3IZLXhSA/exec';
  
  fetchBtn.addEventListener('click', fetchAttendanceData);
  
  async function fetchAttendanceData() {
    const sheet = sheetSelect.value;
    
    // Clear previous data and errors
    attendanceData.innerHTML = '';
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
    loading.style.display = 'flex';
    
    try {
      const response = await fetch(`${SCRIPT_URL}?sheet=${sheet}`);
      
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message);
      }
      
      // Update UI
      displayTitle.textContent = `${sheet} Data`;
      
      // Populate table
      if (data.data.length === 0) {
        attendanceData.innerHTML = `
          <tr>
            <td colspan="3" style="text-align: center;">No attendance records found in ${sheet}</td>
          </tr>
        `;
      } else {
        data.data.forEach(student => {
          const percentage = parseFloat(student.percentage);
          let attendanceClass = '';
          
          if (percentage >= 75) attendanceClass = 'high-attendance';
          else if (percentage >= 50) attendanceClass = 'medium-attendance';
          else attendanceClass = 'low-attendance';
          
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${student.name || 'N/A'}</td>
            <td>${student.rollNo || 'N/A'}</td>
            <td class="percentage-cell ${attendanceClass}">${student.percentage || '0%'}</td>
          `;
          attendanceData.appendChild(tr);
        });
      }
      
    } catch (error) {
      errorDiv.textContent = `Error loading data: ${error.message}`;
      errorDiv.style.display = 'block';
      console.error('Fetch error:', error);
      
      // Show more detailed error info for debugging
      if (error.message.includes('Failed to fetch')) {
        errorDiv.innerHTML += `<br><small>Possible causes: 
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>Check your internet connection</li>
            <li>Verify the script URL is correct</li>
            <li>Ensure the Google Apps Script is deployed as a web app</li>
            <li>Check browser console for CORS errors (F12 > Console)</li>
          </ul>
        </small>`;
      }
    } finally {
      loading.style.display = 'none';
    }
  }
});
