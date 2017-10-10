module.exports = function(models){


// displaying the
const view = function(req, res, next){
  var waiterName = (req.params.waitername.substr(0, 1).toUpperCase()) + (req.params.waitername.substr(1).toLowerCase())
 models.Waiters.find({}, function(err, results){
   if (err) {
     return next(err);
   }else {

     res.render('waiters/selectDays',{waiterName});
   }
 });
}
// adding all the names and the days on the database

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
      req.flash('msg', 'Hello' + ' ' + waiterName +  " " + 'you have successfully updated your days');
      res.redirect('/waiters/' + waiterName);
    }
    else{
      models.Waiters.create(waiterShift, function(err, results){
        req.flash('msg', 'Your working days are: ' + waiterShift.days);
             res.redirect('/waiters/' + waiterName);
      })
    }
  })
}
}

const colorPicker = function(myColor) {
  if (myColor === 3) {
    return 'colorNO';
  }
  if (myColor < 3) {
    return 'colorNO1';
  }
  if (myColor > 3) {
    return 'colorNO2';
  }
}
// creating a an object of Array that will have all the days
const roster = function(req, res, next){

var day = req.body.days

var waitersInEachDay = {

  Monday: {
          waiters : []
        },
        Tuesday: {
          waiters : []
        },
        Wednesday: {
        waiters:[]
        },
        Thursday:{
          waiters:[]
        },
        Friday:{
          waiters:[]
        },
        Saturday:{
          waiters:[]
        },
        Sunday:{
          waiters:[]
        }
}
models.Waiters.find({}, function(err, shift){
  if(err){
    return next(err)
  }
  shift.forEach(function(waiter){
     waiter.days.forEach(function(day){
    waitersInEachDay[day].waiters.push(waiter.waiterName);
       //console.log(waiter.waiterName);
     });
  });
  res.render('waiters/index', {
    data : waitersInEachDay,
    monday: colorPicker(waitersInEachDay.Monday.waiters.length),
    tuesday: colorPicker(waitersInEachDay.Tuesday.waiters.length),
    wednesday: colorPicker(waitersInEachDay.Wednesday.waiters.length),
    thursday: colorPicker(waitersInEachDay.Thursday.waiters.length),
    friday: colorPicker(waitersInEachDay.Friday.waiters.length),
    saturday: colorPicker(waitersInEachDay.Saturday.waiters.length),
    sunday: colorPicker(waitersInEachDay.Sunday.waiters.length)
  })
})
}

//clearing the table

var reset = function(req, res, next) {
  models.Waiters.remove({}, function(err, waiters){
    if (err) {
    return next(err);
    } else {
      req.flash('msg', "You have cleared the database!")
    res.redirect('/days');
    }
  });
}

return {
  view,
  addedDays,
  roster,
  reset
}

}
