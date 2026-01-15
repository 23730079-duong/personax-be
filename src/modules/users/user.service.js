const User = require("./user.model");

const getMe = async (user_id) => {
  const user = await User.findById(user_id).select("-password_hash");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// change username (limit to once)
const changeUsername = async (user_id, newUsername) => {
  const user = await User.findById(user_id);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.username_changed_count >= 1) {
    throw new Error("Username change limit reached");
  }

  const existed = await User.findOne({ username: newUsername });
  if (existed) {
    throw new Error("Username already taken");
  }

  user.username = newUsername;
  user.username_changed_count += 1;

  await user.save();

  return user;
};


module.exports = {
  getMe,
  changeUsername
};
