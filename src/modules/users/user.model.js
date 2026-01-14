const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password_hash: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    display_name: {
      type: String
    },
    avatar_url: {
      type: String
    },
    username_changed_count: {
      type: Number,
      default: 0
    },
    last_active: {
      type: Date
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false
    }
  }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
