var child_process = require('child_process'); //child process handling
// From the node documentation for readline
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('$'); //Default! 

function reversed(r){
  function rev(r, acc){
    if(r=="")
      return acc;
    else
      return rev(r.substr(1), r[0]+acc);
  }
  return rev(r, "");
}

function removeCommand(str){
  function rc(str, cmd){
    if(str == "" || str.substr(0,1) == " ")
      return cmd;
    else
      return rc(str.substr(1), str.substr(0,1)+cmd);
  }
  return reversed(rc(str, ""));
}
//Didn't need to do that, for loops work just fine but I wanted to play around with recursion a bit for the fun of it. That should be tail recursive as well if I am thinking through this correctly.

rl.on('line', function(line) {
  var cmd = removeCommand(line);
  //builtin things.
  switch(cmd) {
    case "cd":
      var dir = line.substr(cmd.length+1);
      try{
        process.chdir(dir);
      }
      catch(err){
        console.error(dir+": That's not a valid directory!");
      }
      break;
    case "exit":
      child.send("Die!");
      process.exit();
    default:
      //Handle   executing.
      child.send({do : line});
      break;
  }
});

rl.on('SIGINT', function() {
  child.send("Die!");
  process.exit(0);
});

function loop(){
  console.log(process.cwd()+" $")
  //readline.prompt();
}

var child = child_process.fork("child.js");
child.on("message", function(message){
  console.log(message.out);
  console.log(message.err);
  loop();
});
console.log("The node shell, (nash) \nCopyright (c) Derek Riemer, 2015. \nLicense: Who the hell cares anyway? \nThis may basically be used for any purpose, \nit was intended as educational material.\nNo waranty is granted for any reason, \nINCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A \nPARTICULAR PURPOSE AND NONINFRINGEMENT."),
loop();