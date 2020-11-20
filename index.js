const run = require('./run');

let setDefault = false;

const args = process.argv.slice(2);

if (args.length >= 2) {
  if (args.length === 3 && args[2] === '--set-default') {
    setDefault = true;
  }

  run(args[0], args[1], setDefault);
} else {
  console.log('See \033[91m\033[4mREADME.md\033[0m for more usage');
}
