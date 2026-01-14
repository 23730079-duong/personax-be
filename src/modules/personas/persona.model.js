const mongoose = require("mongoose");

const PersonaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    description: {
      type: String
    },
    greeting: {
      type: String
    },
    prompt_context: {
      type: String
    },
    visibility: {
      type: String
    },
    avatar_url: {
      type: String
    },

    // Model configuration
    model_config_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    model_config_name: {
      type: String,
      required: true
    },
    model_provider: {
      type: String,
      required: true
    },
    model_name: {
      type: String,
      required: true
    },
    // temperature
    // max_tokens
    // top_p
    model_config_created_at: {
      type: Date
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

PersonaSchema.index({ creator_id: 1 });
PersonaSchema.index({ visibility: 1 });

module.exports = mongoose.model("Persona", PersonaSchema);
