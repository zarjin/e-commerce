import mongoose from 'mongoose'

const mongodbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL)
    console.log('mongodb connected')
  } catch (error) {
    console.log(`mongodb connect:${error}`)
  }
}

export default mongodbConnect
