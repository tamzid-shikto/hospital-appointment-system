const { Router } = require("express");
const { ReadDatabase, PushDatabase } = require("./database");

const router = Router();

router.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    const users = (await ReadDatabase("users")) || {};

    if (Object.values(users).some(u => u.email === email)) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    const result = await PushDatabase("users", {
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        userId: result.name,
        name,
        email
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = (await ReadDatabase("users")) || {};

    const user = Object.entries(users).find(
      ([_, u]) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        userId: user[0],
        token: "jwt_token"
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.get("/doctors", async (req, res) => {
  try {
    const doctors = (await ReadDatabase("doctors")) || {};

    const data = Object.entries(doctors).map(([id, doctor]) => ({
      doctorId: id,
      name: doctor.name,
      specialization: doctor.specialization || doctor.specialty
    }));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.get("/doctors/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await ReadDatabase(`doctors/${doctorId}`);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        doctorId,
        name: doctor.name,
        specialization: doctor.specialization || doctor.specialty
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.get("/doctors/:doctorId/availability", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required"
      });
    }

    const doctor = await ReadDatabase(`doctors/${doctorId}`);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    const appointments = (await ReadDatabase("appointments")) || {};

    const bookedSlots = Object.values(appointments)
      .filter(
        appointment =>
          appointment.doctorId === doctorId &&
          appointment.date === date
      )
      .map(appointment => appointment.time);

    const slots = doctor.slots || [
      "09:00",
      "09:30",
      "10:00",
      "10:30"
    ];

    const availableSlots = slots.filter(
      slot => !bookedSlots.includes(slot)
    );

    res.status(200).json({
      success: true,
      data: {
        doctorId,
        date,
        slots: availableSlots
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post("/appointments", async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "doctorId, date and time are required"
      });
    }

    const doctor = await ReadDatabase(`doctors/${doctorId}`);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    const appointments = (await ReadDatabase("appointments")) || {};

    const alreadyBooked = Object.values(appointments).some(
      appointment =>
        appointment.doctorId === doctorId &&
        appointment.date === date &&
        appointment.time === time
    );

    if (alreadyBooked) {
      return res.status(409).json({
        success: false,
        message: "Appointment slot is already booked"
      });
    }

    const appointmentData = {
      doctorId,
      date,
      time,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    const result = await PushDatabase(
      "appointments",
      appointmentData
    );

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: {
        appointmentId: result.name,
        doctorId,
        date,
        time,
        status: "pending"
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.get("/appointments", async (req, res) => {
  try {
    const appointments = (await ReadDatabase("appointments")) || {};

    const data = Object.entries(appointments).map(
      ([id, appointment]) => ({
        appointmentId: id,
        doctorId: appointment.doctorId,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status
      })
    );

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.get("/appointments/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await ReadDatabase(
      `appointments/${appointmentId}`
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        appointmentId,
        doctorId: appointment.doctorId,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject and message are required"
      });
    }

    const contactData = {
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    };

    const result = await PushDatabase(
      "contacts",
      contactData
    );

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: {
        contactId: result.name,
        name,
        email,
        subject,
        message
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;