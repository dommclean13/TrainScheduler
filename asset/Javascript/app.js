    // Initialize Firebase
    $(document).ready(function () {
    var config = {
      apiKey: "AIzaSyBZFb6PI6bOxBfG0dv4ttHpdZ__MQngzKc",
      authDomain: "traintracker-b208f.firebaseapp.com",
      databaseURL: "https://traintracker-b208f.firebaseio.com",
      projectId: "traintracker-b208f",
      storageBucket: "traintracker-b208f.appspot.com",
      messagingSenderId: "418472813221",
      appId: "1:418472813221:web:f6496c6f84bade9db7634c",
      measurementId: "G-T3ERWDV4PZ"
    };

    firebase.initializeApp(config);

    var trainName 
    var destination
    var firstTrain 
    var freq



    var database = firebase.database();


  
    // Capture Button Click
    $("#newTrain").on("click", function (event) {
      event.preventDefault();
  
      // Values from text boxes
      var formTrainName = $("#trainName").val();
      var formDestination = $("#destination").val();
      var formFirstTrain = $("#firstTrain").val();
      var formFreq = $("#interval").val();

      // Code for handling the push
      database.ref().push({
        trainName: formTrainName,
        destination: formDestination,
        firstTrain: formFirstTrain,
        frequency: formFreq,
      });
    });
  
  
    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function (childSnapshot) {
  
      var newTrain = childSnapshot.val().trainName;
      var newLocation = childSnapshot.val().destination;
      var newFirstTrain = childSnapshot.val().firstTrain;
      var newFreq = childSnapshot.val().frequency;
  
      // First Time (pushed back 1 year to make sure it comes before current time)
      var currentTime = moment();
      var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
      var diffTime = moment().diff(moment(startTimeConverted), "minutes");
      var tRemainder = diffTime % newFreq;
      var tMinutesTillTrain = newFreq - tRemainder;
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var catchTrain = moment(nextTrain).format("HH:mm");
  

        console.log(currentTime.format("hh:mm"))

      // Display On Page
      $("#showAll").append(
        ' <tr><td>' + newTrain +
        ' </td><td>' + newLocation +
        ' </td><td>' + newFreq +
        ' </td><td>' + catchTrain +
        ' </td><td>' + tMinutesTillTrain + ' </td></tr>')
  
      // Clear input fields
      $("#trainName, #destination, #firstTrain, #interval").val("");
      return false;
    });
    
     
  }); 