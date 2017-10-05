const mongoose = require('mongoose');
module.exports = function(mongoUrl){
mongoose.Promise = global.Promise

mongoose.connection.on('error', function(err){
  console.log(err);
})
mongoose.connect(mongoUrl);

const WaiterSchema = mongoose.Schema({
  waiterName : String,
  days : [String]
});

WaiterSchema.index({waiterName : 1}, { unique : true});

const Waiters = mongoose.model('Waiter', WaiterSchema);

return{
  Waiters
};
}
