document.addEventListener('DOMContentLoaded', () => {
  searchAttendance();

  document.getElementById('fetch_attendance').addEventListener('click', fetchAttendanceReport);
});

function searchAttendance() {
  const selectedDate = document.getElementById('date_sel').ariaValueMax;

  axios.get(`http://localhost:7000/attendance?date=${selectedDate}`)
    .then(response => {
      const attendanceStatus = response.data;
      displayAttendanceStatus(attendanceStatus);
    })
    .catch(error => {
      console.error('Error fetching attendance status:', error);
    });
}

function displayAttendanceStatus(status) {
  const statusDiv = document.getElementById('attendance_status');
  statusDiv.innerHTML = `Attendance Status: ${status}`;
}

function fetchAttendanceReport() {
  axios.get('/fetch-attendance-report')
    .then(response => {
      const attendanceReport = response.data;
      // Display or process the attendance report as needed
      console.log('Attendance Report:', attendanceReport);
    })
    .catch(error => {
      console.error('Error fetching attendance report:', error);
    });
}