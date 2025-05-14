const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });
    res.status(201).json({ message: 'User registered', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.signToken({ id: user._id });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
