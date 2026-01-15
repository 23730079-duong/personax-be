const authService = require("./auth.service");

const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const result = await authService.register({
      email,
      username,
      password
    });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    const result = await authService.login({
      identifier,
      password
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};
