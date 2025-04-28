import userModel from '../models/user.models.js'

export const updateUser = async (req, res) => {
  const { phone } = req.body
  const userId = req.user.id

  try {
    const updateData = { phone }

    if (req.file) {
      updateData.profilePicture = req.file.path
    }

    const update = await userModel.findByIdAndUpdate(userId, updateData, { new: true })

    res.status(200).json({ message: 'User Updated', user: update })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Update User error', error: error.message })
  }
}

export const deleteUser = async (req, res) => {
  const userId = req.user.id

  try {
    await userModel.findByIdAndDelete(userId)
    res.status(200).json({ message: 'Deleted Successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'User Delete Error', error: error.message })
  }
}
