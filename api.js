const { Octokit } = require('@octokit/core');

class GithubAPI {
  constructor(auth) {
    this.oberisk = new Octokit({ auth });
  }

  /**
   * Get a repository
   * @param {string} repo
   * @param {string} owner
   */
  async getUserRepo(repo, owner) {
    const response = await this.oberisk.request('GET /repos/:owner/:repo', {
      owner,
      repo,
    });

    return response.data;
  }

  /**
   * Get user repositories
   */
  async getUserRepos() {
    const response = await this.oberisk.request('GET /user/repos', {
      // TODO: more than 100?
      per_page: 100,
    });
    return response.data;
  }

  /**
   * Update default branch
   * @param {string} branch
   * @param {string} repo
   * @param {string} owner
   */
  async setDefaultBranch(branch, repo, owner) {
    await this.oberisk.request('PATCH /repos/:owner/:repo', {
      default_branch: branch,
      repo,
      owner,
    });
  }

  /**
   * Create branch
   * @param {string} repo
   * @param {string} owner
   * @param {string} branch
   * @param {string} sha
   */
  async createBranch(repo, owner, branch, sha) {
    const ref = `refs/heads/${branch}`;
    await this.oberisk.request('POST /repos/:owner/:repo/git/refs', {
      ref,
      sha,
      owner,
      repo,
    });
  }

  /**
   * Get list of branchs for a repo
   * @param {string} repo
   * @param {string} owner
   */
  async listOfBranchs(repo, owner) {
    const response = await this.oberisk.request(
      'GET /repos/:owner/:repo/branches',
      {
        repo,
        owner,
      }
    );

    return response.data;
  }

  /**
   * Delete branch
   * @param {string} repo
   * @param {string} owner
   * @param {string} branch
   */
  async deleteBranch(repo, owner, branch) {
    const ref = `heads/${branch}`;
    const response = await this.oberisk.request(
      'DELETE /repos/:owner/:repo/git/refs/:ref',
      {
        repo,
        owner,
        ref,
      }
    );
  }
}

module.exports = GithubAPI;
