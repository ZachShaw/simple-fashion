# React Boilerplate project

# My App (React Boilerplate)

## Project setup

* `npm install -g yarn` - this installs `yarn` globally. You can skip if `yarn` is already installed.
* `yarn` - this will install all our dependencies.

Any new dependencies MUST be installed by running `yarn add <module name>`

## Running locally
 
run `npm run dev`

## Preparing for production deploy

Increment the version in `package.json` and push the tag to bitbucket:

* `npm version patch`
* `git push`
* `git push --tags`

## Building for production

Run the `deploy-to-production` bitbucket pipeline on the tag you created, if you have access.
