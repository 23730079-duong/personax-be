const bcrypt = require("bcrypt");
const User = require("../users/user.model");
const { generateToken } = require("../../utils/token");

const sanitizeUser = (user) => {
  const obj = user.toObject();
  delete obj.password_hash;
  return obj;
};

/**
 * Register user
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.username
 * @param {string} payload.password
 */
const register = async ({ email, username, password }) => {
  // check existing user
  const existedUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existedUser) {
    throw new Error("Email or username already exists");
  }

  // hash password
  const password_hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    password_hash
  });

  const token = generateToken({
    user_id: user._id
  });

  return {
    user: sanitizeUser(user),
    token
  };
};

/**
 * Login user
 * @param {Object} payload
 * @param {string} payload.identifier (email or username)
 * @param {string} payload.password
 */
const login = async ({ identifier, password }) => {
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }]
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // update last active
  user.last_active = new Date();
  await user.save();

  const token = generateToken({
    user_id: user._id
  });

  return {
    user: sanitizeUser(user),
    token
  };
};

module.exports = {
  register,
  login
};
