const Persona = require("./persona.model");

const createPersona = async (payload) => {
  return await Persona.create(payload);
};

const getMyPersonas = async (user_id) => {
  return await Persona.find({ creator_id: user_id })
    .sort({ created_at: -1 });
};

module.exports = {
  createPersona,
  getMyPersonas
};
