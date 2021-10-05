# Contributing to _React Auth Kit_

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- [Discussing the current state of the code](https://github.com/react-auth-kit/react-auth-kit/issues)
- [Reporting a bug](https://github.com/react-auth-kit/react-auth-kit/blob/master/.github/ISSUE_TEMPLATE/bug_report.md)
- [Submitting a fix](https://github.com/react-auth-kit/react-auth-kit/blob/master/.github/pull_request_template.md)
- [Proposing new features](https://github.com/react-auth-kit/react-auth-kit/blob/master/.github/ISSUE_TEMPLATE/feature_request.md)
- [Contributing to documentation](https://authkit.arkadip.co/contributing/)

## Steps to follow :scroll:

We use [Github Flow](https://guides.github.com/introduction/flow/index.html), all code changes happen through [Pull Requests](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests). We actively welcome your pull requests. So here are the steps to get started.

### 1. Fork it :fork_and_knife:

You can get your own fork/copy of [React Auth Kit](https://github.com/react-auth-kit/react-auth-kit) by using the <kbd><b>Fork</b></kbd></a> button.

[![Fork Button](https://help.github.com/assets/images/help/repository/fork_button.jpg)](https://github.com/react-auth-kit/react-auth-kit)

### 2. Clone it :busts_in_silhouette:

You need to clone (download) it to local machine using

```sh
git clone https://github.com/Your_Username/react-auth-kit.git
```

> This makes a local copy of the repository in your machine.

Once you have cloned the `React-Auth-Kit` repository from GitHub, move to that folder first using change directory command.

```sh
# This will change directory to a folder Plant_Disease_Detection
cd react-auth-kit
```

Move to this folder for all other commands.

### 3. Ready Steady Go... :turtle: :rabbit2:

Once you have completed these steps, you are ready to start contributing by checking our `Help Wanted` Issues and creating [pull requests](https://github.com/react-auth-kit/react-auth-kit/pulls).

### 4. Create a new branch :bangbang:

Whenever you are going to make a contribution. Please create a separate branch using command and keep your `master` branch clean (i.e. synced with remote branch).

```sh
# It will create a new branch with the name Branch_Name and will switch to that branch.
git checkout -b Branch_Name
```

### 5. Install all dependencies :turtle:

Install project dependencies

```sh
# It will install all necessary dependencies
npm install
```

:tada: **_Now comes coding time_** :tada:

To add the changes to the branch. Use,

```sh
# To add all files to branch Branch_Name
git add .
```

Type in a message relevant for the code reviewer using

### Conventional Commit

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:

- **fix**: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).

- **feat**: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).

- **refactor**: a commit of the type refactor is a change that neither fixes a bug nor adds a feature.

- **build**: a commit of the type build are changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).

- **chore**: a commit of the type chore are other changes that don't modify src or test files.

- **ci**: a commit of the type ci are changes to our CI configuration files and scripts.

- **style**: a commit of the type style are changes that do not affect the meaning of the code (white-space, formatting, missing semi-colon, etc).

- **docs**: a commit of the type docs are documentation changes only.

- **perf**: a commit of the type perf is a code change that improves performance.

- **test**: a commit of the type test introduces missing tests or correcting existing tests

- **BREAKING CHANGE**: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.

Ex.

```sh
# This message gets associated with all files you have changed
git commit -m 'docs: edited the CONTRIBUTING.md'
```

Now, Push your awesome work to your remote repository using

```sh
# To push your work to your remote repository
git push -u origin Branch_Name
```

Finally, go to your forked repository in your browser and click on `Compare & pull request`.
Use our [pull request template format](https://github.com/react-auth-kit/react-auth-kit/blob/master/.github/pull_request_template.md).
Then add a title and description to your pull request that explains your precious effort.

Now, sit back and relax till we review your PR, you've made your contribution to our project.

## License

By contributing, you agree that your contributions will be licensed under [Apache License 2.0](LICENSE).

:tada: :confetti ball: :smiley: _**Happy Contributing**_ :smiley: :confetti_ball: :tada:
