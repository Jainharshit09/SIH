const express = require('express');
const dotenv = require('dotenv');
const Employee = require('./models/employee');
dotenv.config();

const app = express();
app.use(express.json());

app.post('/validate-employee', async (req, res) => {
  const { employeeId, secret } = req.body;

  if (!employeeId || !secret) {
    return res.status(400).json({ success: false, message: "Employee ID and secret password are required." });
  }

  try {
    const employee = await Employee.findOne({
      where: {
        employee_id: employeeId,
        secret: secret,
      }
    });

    if (employee) {
      return res.status(200).json({ success: true, message: "Employee ID and secret are valid." });
    } else {
      return res.status(401).json({ success: false, message: "Invalid employee ID or secret password." });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
