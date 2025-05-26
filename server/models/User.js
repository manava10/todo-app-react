const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      console.log('Password not modified, skipping hash');
      return next();
    }
    
    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully');
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password comparison result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User; 