import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const userModels = mongoose.model('User', userSchema)

export default userModels
