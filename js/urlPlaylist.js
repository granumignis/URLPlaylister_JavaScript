/*
  This is the JavaScript code for
  "urlPlaylist.html"

  The URL Playlist program allows you to display a list of web pages in series, each with it's own duration.

  Author: Luke Johnson
  Date: 05/01/2016
  Version: 1.00  

*/

/*
  Problem Statement:
  
  Create a program that will display multiple web pages with delays
  in between each one.
  Prompt for a URL and associated Duration (in seconds) from the user.
  Then, display the URL and Duration in the main window
  Load the actual URL's content in a seperate window
  When the duration for a specific URL has passed, 
  load the next URL's content in the afformentioned seperate window.


  Nouns:
    web pages, delays, second window

  Verbs:
    prompt, display, load


  ____________________________

  Defining Diagram:

  Inputs:
    urlIn
    durationIn

  Processing:
    Initialize adjustedDurationArray to []
    Initialize durationArray to []
    Initialize output to ""
    Initialize urlArray to []
    Initialize viewingWindow to window.open("default.html", "viewingWindow", "width=1280,height=720");

    Call populateArrays function
      Initialize keepLooping to true
    
      Append default values into urlArray and durationArray
    
      Display an Alert indicating this program uses pop up windows
    
      While keepLooping is True
        Prompt for urlIn   
            IF urlIn is equal to ""
              Break from the While loop
            ELSE
              Continue as normal
            ENDIF
        Prompt for durationIn
        
        Convert durationIn to a number
        Append value of urlIn to urlArray
        Append value of (durationIn + 2) to durationArray
    
      Append default values into urlArray and durationArray
      END
        

    Call createTimers function
      Initialize currentTime to result of getCurrentTime function

          getCurrentTime function
            Initialize currentDate with a value of: new Date()
            Initialize currentTime with a value of: currentDate.getTime()
            Convert currentTime to a number  
            Return currentTime
          end getCurrentTime function
    
      Use a for loop to iterate through the entries in the urlArray (starting at 1, not 0)
        Create an 'adjusted duration array' with the times in values like the ones
        that the getCurrentTime function returns. See the algorithm below:
            adjustedDurationArray[i] = currentTime += (durationArray[i] * 1000)

      Use another for loop to iterate through urlArray. Start at 1 and go until the last entry minus one.
      This is because entry 0 and the very last entry are 'padding' entries with the default page and length.
      Each time through the loop, create a dynamically named variable and timer for each entry in the array.:
          eval("var timer" + index + " = setInterval(function(){ newTimer(" + index + ",timer" + index + "); }, 1000);")
      Log each timer's creation in the console log

      The for loop directly above calls the newTimer function

          newTimer function
            Initialize currentTime to result of getCurrentTime function
            Initialize useLastDuration to 0
            
            Convert i to a number
            Set useLastDuration to (i-1)
        
            If currentTime is less than or equal to adjustedDurationArray[useLastDuration] 
              Create a console log entry: "The time is right for "+ urlArray[i])"
              Change the currently displayed page in the 'viewingWindow' pop-up window to urlArray[i] with:
                viewingWindow.location.replace(urlArray[i]);
              Use clearInterval(timer) to end this timer.
            Otherwise
              Create a Console log entry: newTimer()[" + i + "] The time is________________" + currentTime
              Create a Console log entry: newTimer()[" + i + "] Waiting for the time to be " + adjustedDurationArray[useLastDuration]
            End of If statement
          end newTimer function

    Set finalOutput equal to the result of displayPlaylist(output)

        displayPlaylist function
            Append "Current Playlist: <br>" to variable 'output'
 
            Use a for loop to iterate through urlArray.
            For HTML formatting purposes, each time through the loop append these strings of text:
                "<table border=1><tr>"
                "<td width=400>Item " + index + ": " + urlArray[index] + "</td><td width=400>Duration: " + durationArray[index] + " seconds.</td> <br>"
                "</tr></table>"

            Return the value of 'output' when done.
        end displayPlaylist function

    Display finalOutput variable value


  ____________________________

  Flowchart:


    See urlPlaylist_flowchart.png file located in this folder.

  ____________________________
  
  Psuedocode/Solution Algorith:
  
  urlPlayList(NOTE: the code in this block is not contained within a function.)
    Initialize adjustedDurationArray to []
    Initialize durationArray to []
    Initialize output to ""
    Initialize urlArray to []
    Initialize viewingWindow to window.open("default.html", "viewingWindow", "width=1280,height=720");
  
    Call populateArrays function
    Call createTimers function
    Call finalOutput function (Pass 'output' variable in)
    Display finalOutput variable value
  END


  populateArrays
    Initialize keepLooping

    Push "default.html" into urlArray
    Push 0 into durationArray

    Display an Alert - "This software uses Pop-Up windows. If the URLs you enter fail to appear 
    in a seperate window, please adjust the settings of or disable your pop up blocker."

    WHILE keepLooping
      Prompt for URL - "Please enter a URL (including http:// or https://). 
      Leave it blank if you are finished."

      IF URL === "" THEN
        Break from Loop
      ELSE
        Do nothing (continue as normal)
      ENDIF
      Prompt for Duration - "How many seconds should this URL display for? The URL is " + urlIn"
      
      Convert Duration to a number
      Push value of urlIn into urlArray
      Push value of (durationIn + 2) into durationArray
    ENDWHILE

    Push "default.html" into urlArray
    Push 0 into durationArray    
  END

 
  createTimers
    Initialize currentTime to result of getCurrentTime function

    FOR i=1 | Condition: i > urlArray.length | Add 1 to i each loop
      adjustedDurationArray[i] = currentTime += (durationArray[i] * 1000)
    ENDFOR

    FOR index=1 | Condition: index > (urlArray.length - 1) | Add 1 to index each loop
      Create a dyanmically-named variable and timer for each array entry: 
        "eval("var timer" + index + " = setInterval(function(){ newTimer(" + index + ",timer" + index + "); }, 1000);")
      Create a console log entry: "'createTimers() Created timer for index value of ' + index"
    ENDFOR
  END

  newTimer(i,timer)
    Initialize currentTime to result of getCurrentTime function
    Initialize useLastDuration to 0
    
    Convert i to a number
    Set useLastDuration to (i-1)

    IF currentTime >= adjustedDurationArray[useLastDuration] THEN
      Create a console log entry: "The time is right for "+ urlArray[i])"
      Change the currently displayed page in the 'viewingWindow' pop-up window to urlArray[i] with:
        viewingWindow.location.replace(urlArray[i]);
      Use clearInterval(timer) to end this timer.
    ELSE
      Console log entry: newTimer()[" + i + "] The time is________________" + currentTime
      Console log entry: newTimer()[" + i + "] Waiting for the time to be " + adjustedDurationArray[useLastDuration]
    ENDIF
  END


  displayPlaylist(output)
    Append "Current Playlist: <br>" to variable 'output'

    FOR index=1 | Condition: index < urlArray.length | Add 1 to index each loop
      Append to output variable: "<table border=1><tr>"
      Append to output variable: "<td width=400>Item " + index + ": " + urlArray[index] + "</td><td width=400>Duration: " + durationArray[index] + " seconds.</td> <br>"
      Append to output variable: "</tr></table>"
    ENDFOR

    Return output;
  END


  getCurrentTime
    Initialize currentDate with a value of: new Date()
    Initialize currentTime with a value of: currentDate.getTime()
    Convert currentTime to a number  
    Return currentTime
  END

  ____________________________
  
  Test Plans:

  VARIABLES: urlIn, durationIn
  
  TEST CASE 1:
  
    INPUT VALUES: 
      http://www.wikipedia.org, 5
      http://www.google.com, 5
  
    EXPECTED RESULT: 
      Current Playlist:
      Item 1: http://www.wikipedia.org Duration: 5 seconds. 
      Item 2: http://www.google.com Duration: 5 seconds. 

    ACTUAL RESULT:
      Current Playlist:      
      Item 1: http://www.wikipedia.org  Duration: 5 seconds.      
      Item 2: http://www.google.com Duration: 5 seconds.
  
  TEST CASE 2:
  
    INPUT VALUES: 
      https://www.youtube.com/watch?v=u4hlzRNu3uE, 31
      https://www.youtube.com/watch?v=yfp2Bg6iUdY, 30
  
    EXPECTED RESULT:
      Current Playlist:      
      Item 1: https://www.youtube.com/watch?v=u4hlzRNu3uE Duration: 31 seconds.      
      Item 2: https://www.youtube.com/watch?v=yfp2Bg6iUdY Duration: 30 seconds. 
  
    ACTUAL RESULT: 
  
  TEST CASE 3:
  
    INPUT VALUES: 
      https://www.netflix.com/watch/70177969?trackId=14170289&tctx=0%2C6%2Cf2307bd2-dfff-40d2-bdad-e34573c9062d-75154263, 67
      https://www.netflix.com/watch/70156631?trackId=13752289&tctx=0%2C3%2C70ffa57e-131d-4c01-ab54-e2dabd8534e4-75341359, 66
  
    EXPECTED RESULT: 
      Current Playlist:      
      Item 1: https://www.netflix.com/watch/70177969?trackId=14170289&tctx=0%2C6%2Cf2307bd2-dfff-40d2-bdad-e34573c9062d-75154263 Duration: 67 seconds.      
      Item 2: https://www.netflix.com/watch/70156631?trackId=13752289&tctx=0%2C3%2C70ffa57e-131d-4c01-ab54-e2dabd8534e4-75341359 Duration: 66 seconds. 
  
    ACTUAL RESULT: 
      Current Playlist:
      Item 1: https://www.netflix.com/watch/70177969?trackId=14170289&tctx=0%2C6%2Cf2307bd2-dfff-40d2-bdad-e34573c9062d-75154263  Duration: 67 seconds.
      Item 2: https://www.netflix.com/watch/70156631?trackId=13752289&tctx=0%2C3%2C70ffa57e-131d-4c01-ab54-e2dabd8534e4-75341359  Duration: 66 seconds.

  TEST CASE 4:
  
    INPUT VALUES: 
      https://upload.wikimedia.org/wikipedia/en/3/32/Super_Mario_World_Coverart.png, 10
      https://upload.wikimedia.org/wikipedia/en/f/f4/Supermarioworld.jpg, 10
      https://upload.wikimedia.org/wikipedia/en/1/12/SMWCartoon.jpg, 5
      https://iamdeandotnet.files.wordpress.com/2012/07/600full-super-mario-world-screenshot.jpeg, 3
      http://images.nintendolife.com/screenshots/11427/large.jpg, 4
      https://www.unseen64.net/wp-content/uploads/2009/11/super-mario-world-beta-remake-hack-04.jpg, 10
  
    EXPECTED RESULT: 
      Current Playlist:
      Item 1:https://upload.wikimedia.org/wikipedia/en/3/32/Super_Mario_World_Coverart.png Duration: 10
      Item 2:https://upload.wikimedia.org/wikipedia/en/f/f4/Supermarioworld.jpg Duration: 10
      Item 3:https://upload.wikimedia.org/wikipedia/en/1/12/SMWCartoon.jpg Duration: 5
      Item 4:https://iamdeandotnet.files.wordpress.com/2012/07/600full-super-mario-world-screenshot.jpeg Duration: 3
      Item 5:http://images.nintendolife.com/screenshots/11427/large.jpg Duration: 4
      Item 6:https://www.unseen64.net/wp-content/uploads/2009/11/super-mario-world-beta-remake-hack-04.jpg Duration: 10
  
    ACTUAL RESULT: 
      Current Playlist:    
      Item 1: https://upload.wikimedia.org/wikipedia/en/3/32/Super_Mario_World_Coverart.png Duration: 10 seconds.
      Item 2: https://upload.wikimedia.org/wikipedia/en/f/f4/Supermarioworld.jpg  Duration: 10 seconds.
      Item 3: https://upload.wikimedia.org/wikipedia/en/1/12/SMWCartoon.jpg Duration: 5 seconds.
      Item 4: https://iamdeandotnet.files.wordpress.com/2012/07/600full-super-mario-world-screenshot.jpeg Duration: 3 seconds.
      Item 5: http://images.nintendolife.com/screenshots/11427/large.jpg  Duration: 4 seconds.
      Item 6: https://www.unseen64.net/wp-content/uploads/2009/11/super-mario-world-beta-remake-hack-04.jpg Duration: 10 seconds.

*/

var adjustedDurationArray = [];
var durationArray = [];
var output = "";
var urlArray = [];
// The line below creates the pop-up window
var viewingWindow = window.open("default.html", "viewingWindow", "width=1280,height=720");


function populateArrays() {
  var keepLooping = true;

  // Add Default Values to slot 0 of both arrays
  urlArray.push("default.html");
  durationArray.push(0);

  //Warn users about Pop-Up Blockers
  alert("This software uses Pop-Up windows. If the URLs you enter fail to appear in a seperate window, please adjust the settings of or disable your pop up blocker.");


  while (keepLooping) {
    var urlIn = prompt("Please enter a URL (including http:// or https://). Leave it blank if you are finished.");
    if (urlIn === "") {
        break;        
    }else {     
    }
    var durationIn = prompt ("How many seconds should this URL display for? The URL is " + urlIn)
    durationIn = Number(durationIn);
    urlArray.push(urlIn);
    //The +1 below is to allow a little extra time for the page to finish loading.
    durationArray.push(durationIn + 2);
  }  

  // Add Default Values to last slot of both arrays
  urlArray.push("default.html");
  durationArray.push(0);

}

function createTimers() {
  var currentTime = getCurrentTime();

  // Create an array containing the actual times the URL pages should be displayed
  for (i=0; i < urlArray.length; i++) {
    adjustedDurationArray[i] = currentTime += (durationArray[i] * 1000);
  }

  for (index = 1; index < urlArray.length; index++) {
    // The line below dynamically creates a timer variable name based on the current index value
    // It also creates the timers for each array entry
    eval("var timer" + index + " = setInterval(function(){ newTimer(" + index + ",timer" + index + "); }, 1000);");
    console.log("createTimers() Created timer for index value of " + index);
  }
}

function newTimer(i, timer) {
  var currentTime = getCurrentTime();
  var useLastDuration = 0;

  i = Number(i); 
  useLastDuration = i - 1;

  if (currentTime >= adjustedDurationArray[useLastDuration]) {
    console.log("The time is right for "+ urlArray[i]);
    viewingWindow.location.replace(urlArray[i]);
    clearInterval(timer);    
  } else {
    console.log("newTimer()[" + i + "] The time is________________" + currentTime);
    console.log("newTimer()[" + i + "] Waiting for the time to be " + adjustedDurationArray[useLastDuration]);
}
}


function displayPlaylist(output) {
  output += "Current Playlist: <br>";
  
  // index = 1 to hide the first array entry (default.html, 0 seconds)
  // Similarly (urlArray.length - 1) is used to hide the last entry (default.html, 0 seconds)
  for ( var index = 1; index < (urlArray.length - 1); index++) {
    output += "<table border=1><tr>";
    // (durationArray[index] - 2) is used below to hide the 2 second 'page load buffer' I added earlier
    output += "<td width=400>Item " + index + ": " + urlArray[index] + "</td><td width=400>Duration: " + (durationArray[index] - 2) + " seconds.</td> <br>";  
    output += "</tr></table>";
  }
  return output;
}


function getCurrentTime() {
  var currentDate = new Date();
  var currentTime = currentDate.getTime(); 
  currentTime = Number(currentTime);
  return currentTime;
}

populateArrays();
createTimers();
finalOutput = displayPlaylist(output);
document.write(finalOutput);