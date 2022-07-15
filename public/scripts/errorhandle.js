window.onerror = function (msg, url, line, col, error) {
  // Note that col & error are new to the HTML 5 spec and may not be 
  // supported in every browser.  It worked for me in Chrome.
  var extra = !col ? '' : '\ncolumn: ' + col;
  extra += !error ? '' : '\nerror: ' + error;

  // You can view the information in an alert to see things working like this:
  console.error("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

  // TODO: Report this error via ajax so you can keep track
  //       of what pages have JS issues

  var suppressErrorAlert = true;
  // If you return true, then error alerts (like in older versions of 
  // Internet Explorer) will be suppressed.
  return suppressErrorAlert;
};

// if (NativeUtil) {
//   NativeUtil.use("close");
// }


function slowdown() {
  console.log("slowdown");
  var seconds = 0.5
  var start = (new Date()).getTime()
  var end = start
  while (end - start < seconds * 1000) {
    end = (new Date()).getTime()
  }
}

setInterval(slowdown,10)