const GithubAPI = require('./api');
const getConfig = require('./config');

/**
 * Rename master branch to main for your owned repositories
 * @param {string} source
 * @param {string} dest
 * @param {object} options
 */
async function run(source, dest, options) {
  try {
    const config = getConfig();

    const api = new GithubAPI(config.auth);

    const action = async (repo) => {
      const branchs = await api.listOfBranchs(repo.name, config.owner);
      const sourceBranch = branchs.find((b) => b.name === source);
      if (sourceBranch) {
        if (branchs.indexOf((b) => b.name === dest) === -1) {
          // create main branch
          await api.createBranch(
            repo.name,
            config.owner,
            dest,
            sourceBranch.commit.sha
          );
        }

        // set default branch
        if (setDefault) {
          await api.setDefaultBranch(dest, repo.name, config.owner);
        }

        if (setDefault || repo.default_branch !== source) {
          // delete source branch
          await api.deleteBranch(repo.name, config.owner, source);
        }
      }
    };

    if (options.setAll) {
      // get repositories
      const repositories = await api.getUserRepos();

      // ignore fork
      const repos = repositories.filter((r) => r.fork === false);

      repos.forEach(action);
    } else {
      const repo = await api.getUserRepo(options.repo, config.owner);
      if (repo.fork) {
        throw new Error('Currently ignore fork repository');
      }
      await action(repo);
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = run;
