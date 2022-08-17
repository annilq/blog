// if (NativeUtil) {
//   NativeUtil.use("close");
// }


function slowdown() {
    var seconds = 0.5
    var start = (new Date()).getTime()
    var end = start
    while (end - start < seconds * 1000) {
      end = (new Date()).getTime()
    }
  }
  
  // setInterval(slowdown,3000)