    'use strict'
module.exports = function(models){

  const add = function(req, res){
  var waitername = (req.params.waitername.substr(0, 1).toUpperCase()) + (req.params.waitername.substr(1).toLowerCase())
models.Waiters.find({}, function(err, next){
  if (err) {
    return next(err);
  }else {

    res.render('waiters/selectDays',{Msg: waitername } );
  }
});
  }


const index = function(req, res){

}
const roster = function(req, res){


}

return{
  index,
  add,
  roster
}
}
