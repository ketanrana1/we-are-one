import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Weareone', () => {
    console.log("database connected")
});