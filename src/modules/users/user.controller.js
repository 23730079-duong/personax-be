const userService = require("./user.service");

const getMe = async (req, res, next) => {
  try {
    const user = await userService.getMe(req.user.user_id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const changeUsername = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await userService.changeUsername(
      req.user.user_id,
      username
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMe,
  changeUsername
};
