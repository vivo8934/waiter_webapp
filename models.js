const mongoose = require('mongoose');
module.exports = function(mongoURL){
mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);

const WaiterSchema = mongoose.Schema({

  username: String,
  Monday: Boolean,
  Tuesday: Boolean,
  Wednesday: Boolean,
  Thursday: Boolean,
  Friday: Boolean,
  Saturday: Boolean,
  Sunday: Boolean
});
WaiterSchema.index({
   username: 1,
 }, {
   unique: true
 });
 const Waiters = mongoose.model('Waiters', WaiterSchema);

   return {
     Waiters
   };
}
