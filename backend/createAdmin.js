import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import User from './models/userModel.js'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const existingAdmin = await User.findOne({ email: 'admin@example.com' })

    if (existingAdmin) {
      console.log('Admin already exists')
      process.exit()
    }

    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    })

    console.log('Admin user created:', adminUser.email)
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

createAdmin()
