const run = require('./run');

const args = process.argv.slice(2);

const options = args.slice(2);

if (options.length !== 0) {
  const opts = getOptions(options);

  if (!opts.setAll && opts.repo === '') {
    console.warn('Please specify a repository, use --repo=<repo name>');
    return;
  }

  run(args[0], args[1], opts);
} else {
  console.log('See \033[91m\033[4mREADME.md\033[0m for more usage');
}

function getOptions(options) {
  const opts = {
    setDefault: false,
    setAll: false,
    repo: '',
  };
  const reg = /--repo=(?<repo>.*)/;

  options.forEach((option) => {
    switch (option) {
      case '--set-default':
        opts.setDefault = true;
        break;
      case '--all':
        opts.setAll = true;
        break;
      default:
        const r = option.match(reg);
        if (r !== null) {
          opts.repo = r.groups.repo;
        }
        break;
    }
  });

  return opts;
}
