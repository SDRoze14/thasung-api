const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(`${process.env.DB_URI}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(con => {
    console.log(`MongoDB connected with host ${con.connection.host}`)
  }).catch(err => {
    console.log(err)
  })
}

module.exports = connectDB