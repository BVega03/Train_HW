// Initialize Firebase
var config = {
  apiKey: "AIzaSyCD7PH3oouFJb9FpFHRw5RUjiYRrqDp0Xw",
  authDomain: "timesheetpract.firebaseapp.com",
  databaseURL: "https://timesheetpract.firebaseio.com",
  projectId: "timesheetpract",
  storageBucket: "timesheetpract.appspot.com",
  messagingSenderId: "43061725680"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTime = $("#first-time").val().trim();
  console.log("firstTime" + firstTime)
  var frequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    time: firstTime,
    frequency: frequency
  };

  database.ref().push(newTrain);

});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var firstTime = childSnapshot.val().time;
  var frequencyInt = parseInt(frequency);


  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "year");
  console.log("firstTimeConverted" + firstTimeConverted);

  var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("timeDifference" + timeDifference);

  var timeRemainder = timeDifference % frequencyInt;
  console.log("timeRemainder" + timeRemainder);

  var nextMinutes = frequencyInt - timeRemainder;
  console.log("nextMinutes" + nextMinutes);

  var nextArrival = moment().add(nextMinutes, "minutes").format("HH:mm");
  console.log("nextArrival" + nextArrival);

  var newRow = $("<tr>").append("<td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td>" + "<td>" + nextMinutes + "</td>");

  $("#train-table>tbody").append(newRow);

})