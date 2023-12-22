const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const cors = require('cors');
const rootDir = require('./util/path');


const sequelize = require('./util/database');

app.use(bodyParser.json());
app.use(cors());


// Route to mark attendance
app.post('/mark-attendance', (req, res) => {
    const { date, studentId, isPresent } = req.body;
    const query = 'INSERT INTO students (attendance_date, student_id, is_present) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE is_present = ?';
    db.query(query, [date, studentId, isPresent, isPresent], err => {
      if (err) {
        console.error('Error marking attendance:', err);
        res.status(500).send('Error marking attendance');
      } else {
        res.send('Attendance marked successfully');
      }
    });
  });
  
  // Route to fetch attendance status for a specific date
  app.get('/attendance', (req, res) => {
    const { date } = req.query;
    const query = 'SELECT COUNT(*) as attendanceCount FROM students WHERE attendance_date = ? AND is_present = true';
    db.query(query, [date], (err, results) => {
      if (err) {
        console.error('Error fetching attendance status:', err);
        res.status(500).send('Error fetching attendance status');
      } else {
        const attendanceCount = results.length > 0 ? results[0].attendanceCount : 0;
        res.json(`Present: ${attendanceCount} students`);
      }
    });
  });
  
  // Route to fetch attendance report
  app.get('/fetch-attendance-report', (req, res) => {
    const query = 'SELECT attendance_date, COUNT(*) as totalStudents, SUM(is_present) as presentCount FROM students GROUP BY attendance_date';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching attendance report:', err);
        res.status(500).send('Error fetching attendance report');
      } else {
        res.json(results);
      }
    });
  });  

  
  sequelize.sync()
    .then(() => {
        console.log('database synced successfully');
        app.listen(7000, () => {
            console.log('Server is running on port 7000');
            app.get('/welcome', (req, res) => {
                res.sendFile(path.join(__dirname, "views", "index.html"));
            })
        });
    })
    .catch(err => console.log(err))


