# Introduction
I am [Folusho Oladipo](https://www.linkedin.com/in/folushooladipo/) and I am a candidate for Wolt's Senior Frontend/Fullstack Engineer position. This is my submission for the take-home assignment.

## Required software
In order to run this app, you need to have the following installed:
* Node.js v14 or later: I suggest you consider installing [nvm](https://github.com/nvm-sh/nvm) and use it to easily switch between versions of Node. Otherwise, head over to the [Node.js website](https://nodejs.org/en/) for installation instructions.
* Yarn v1.22.10 or later: Yarn is a fast and open-source package manager for JavaScript packages. Head over to [their website](https://yarnpkg.com/) for installation instructions.

## Getting started
* Open a terminal/command prompt.
* Install the app's dependencies by running this command:
```bash
yarn
```
* Start the app by running the command below. It will open the app in a new browser window at `http://localhost:3000/`
```bash
yarn start
```

## Tech stack
* TypeScript
* React
* Node.js
* Yarn
* ESLint
* Git
* Jest
* React Testing Library
* SCSS
* Create React App

## Tests
I have written extensive unit and integration tests for the functions and React components that I created. They are contained in `**/*.test.ts` or `**/*.test.tsx` files. Please run the command below to see them in action:
```bash
yarn test
````

## Code quality
I setup ESLint immediately after I initialized this repository. You can review my rules in `./.eslintrc.json`. You can also run the command below to lint the project for errors or warnings:
```bash
yarn lint
```

## Responsiveness
I made the app responsive. Resize your browser window to see this in action.

## Reasonable extra features
- Each row in the schedule is highlighted when hovered.
- The schedule can display fractional times like 12:01 AM, 3:42 PM etc.
