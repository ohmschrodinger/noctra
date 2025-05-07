const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const Guard = require('../models/Guard');
const Warden = require('../models/Warden');
const Admin = require('../models/Admin');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/noctra';

async function seed() {
  await mongoose.connect(MONGO_URI);
  const passwordHash = await bcrypt.hash('pass1234', 10);

  // Create Student
  const student = new Student({
    prn: '23070122155',
    name: 'Om Dhamame',
    email: 'om.dhamame.btech2023@sitpune.edu.in',
    hostelBlock: 'E',
    year: 2,
    degree: 'BTech',
    password: passwordHash,
    parentId: null, // to be set after parent is created
  });
  await student.save();

  // Create Parent
  const parent = new Parent({
    name: 'Test Parent',
    email: 'vegtacocat@gmail.com',
    childId: student._id,
    password: passwordHash,
  });
  await parent.save();

  // Update student with parentId
  student.parentId = parent._id;
  await student.save();

  // Create Guard
  const guard = new Guard({
    name: 'Guard',
    email: 'catdrinkslemonade@gmail.com',
    hostelBlock: 'E',
    password: passwordHash,
  });
  await guard.save();

  // Create Admin
  const admin = new Admin({
    name: 'Admin',
    email: 'omdhamame@gmail.com',
    password: passwordHash,
  });
  await admin.save();

  // Create Warden
  const warden = new Warden({
    name: 'Warden',
    email: 'ytpremiumcontri@gmail.com',
    hostelBlock: 'E',
    password: passwordHash,
  });
  await warden.save();

  console.log('Users seeded successfully!');
  mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
}); 