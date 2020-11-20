const GithubAPI = require('./api');
const getConfig = require('./config');

/**
 * Rename master branch to main for your owned repositories
 * @param {string} source
 * @param {string} dest
 * @param {boolean} setDefault
 */
async function run(source, dest, setDefault) {
  try {
    const config = getConfig();

    const api = new GithubAPI(config.auth);

    // get repositories
    const repositories = await api.getUserRepos();

    // ignore fork
    const repos = repositories.filter((r) => r.fork === false);

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

    repos.forEach(action);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = run;
