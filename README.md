# oberisk

Rename master branch to main for your owned repositories

## Usage

Create access token [https://github.com/settings/tokens/new?scopes=repo](https://github.com/settings/tokens/new?scopes=repo)

Create an `oberisk.yml` at current working directory
```sh
echo "auth:
owner:" > oberisk.yml
```
structure
```yml
# oberisk.yml
auth:   # access token
owner:  # your github username
```

Run `yarn` and `yarn rename master main --set-default`

## options
```
yarn rename source_branch new_branch [--set-default], ignore fork repo

--set-default    set new_branch to default branch
```

**Be careful** if `--set-default` not set and source_branch is default branch, it just create an new_branch

## Any issuse are welcome