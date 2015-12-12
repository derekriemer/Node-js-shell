/* 
*Slave process for the node shell (NSH).
*Copyright (C) Derek Riemer, 2015.
*/
var child_process = require("child_process");
process.on("message", function(message){
  if(message.do != undefined){    
    var d=child_process.exec(message.do, callback = function(err, outBuf, errBuf){
      var out = outBuf.toString(), 
        err = errBuf.toString();
      process.send({out: out,
        err: err});
    });
  }
  if(message == "Die!"){
    process.exit();
  }
});

  