const useUnixTime = (timeStamp) => {
    //Kind of stolen code below
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timeStamp * 1000).toLocaleDateString('se-SE');

    
    
return date;
}