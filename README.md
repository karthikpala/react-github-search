# react-github-search
A simple SPA built to search and display github repositories using public github APIs

Features:

* Capture the User entered search value with debounce
* Download the repo data with search value as param from API - https://api.github.com/search/repositories?q=searchkeyword
* Display avatar and additional repo information when clicked on each repo item on the grid
* Option to navigate directly to the home page of the repository
* Responsive (for mobiles and tablets too!)
* Included unit test cases using jest for react
* Documentation using JSDOC

Steps to run in dev environment using webpack dev server. After running the command open http://localhost:8080
``` text
> npm install

> npm run dev
```

Documentation
``` text
> npm run docs
```
Testing
``` text
> npm run test
```
If components are changed, please update snapshots using --
``` text
> npm run update-snapshots
```

