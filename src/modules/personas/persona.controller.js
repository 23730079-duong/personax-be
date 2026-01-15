const personaService = require("./persona.service");

const createPersona = async (req, res, next) => {
  try {
    const persona = await personaService.createPersona({
      ...req.body,
      creator_id: req.user.user_id
    });

    res.status(201).json({
      success: true,
      data: persona
    });
  } catch (error) {
    next(error);
  }
};

const getMyPersonas = async (req, res, next) => {
  try {
    const personas = await personaService.getMyPersonas(req.user.user_id);

    res.status(200).json({
      success: true,
      data: personas
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPersona,
  getMyPersonas
};
