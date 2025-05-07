const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const Guard = require('../models/Guard');
const Warden = require('../models/Warden');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const roleModelMap = {
  student: Student,
  parent: Parent,
  guard: Guard,
  warden: Warden,
  admin: Admin,
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required.' });
  }
  const Model = roleModelMap[role];
  if (!Model) {
    return res.status(400).json({ message: 'Invalid role.' });
  }
  try {
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign(
      { id: user._id, role, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
