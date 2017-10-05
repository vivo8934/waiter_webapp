module.exports = function(models){

const view = function(req, res, next){
  var waiterName = (req.params.waitername.substr(0, 1).toUpperCase()) + (req.params.waitername.substr(1).toLowerCase())
 models.Waiters.find({}, function(err, results){
   if (err) {
     return next(err);
   }else {

     res.render('waiters/selectDays',{waiterName} );
   }
 });
}
const addedDays = function(req, res, next){
waiterName = (req.params.waitername.substr(0, 1).toUpperCase()) + (req.params.waitername.substr(1).toLowerCase())
var waiterShift = {
  waiterName,
  days : req.body.days
}
if(!waiterShift || !waiterShift.days){
  req.flash('erorr', 'Please Select the days you would like to work on');
  res.redirect('/waiters/' + waiterName)
}else {
  models.Waiters.findOne({waiterName: waiterShift.waiterName}, function(err, results){
    if(err){
      return next(err);
    }
    else if (results) {
      models.Waiters.update({waiterName}, { $set: { days: req.body.days } }, function(err, results){
      })
      req.flash('msg', 'Hello' + ' ' + waiterName +  " " + 'you have successfully change your days');
      res.redirect('/waiters/' + waiterName);
    }
    else{
      models.Waiters.create(waiterShift, function(err, results){
console.log(results);
        req.flash('msg', 'Your have selected this day(s) to work: ' + waiterShift.days);

             req.flash('msg2', 'Your shift day(s) has been successfully saved ' + waiterShift.waiterName);
             res.redirect('/waiters/' + waiterName);
      })
    }
  })
}
}
const roster = function(req, res, next){

}

return {
  view,
  addedDays,
  roster
}

}
