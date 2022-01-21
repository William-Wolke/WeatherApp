const useUnixTime = (timeStamp) => {
    //Kind of stolen code below
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timeStamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    // Will display time in 10:30 format
    var formattedTime = hours + ':' + minutes.substr(-2);
    
return formattedTime;
}