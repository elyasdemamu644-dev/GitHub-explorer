# GitHub Developer Explorer

A Vanilla JavaScript assignment project for the course **Backend Development with Node.js**, module **JavaScript Fundamentals - Asynchronous JavaScript**.

## Author
Name:- Elyas Demamu 
Id:- Ets 0489/17

## Project overview

This app lets a user enter a GitHub username and view public profile details and repository statistics using the GitHub REST API.

The assignment emphasizes asynchronous JavaScript and requires:

- browser-native `fetch()`
- `async` / `await`
- `Promise.all()`
- `response.ok` and `response.status` handling
- `try...catch` and `throw new Error()`
- `response.json()` parsing
- array methods like `map()`, `filter()`, `reduce()`, `sort()`, and `find()`
- ES modules (`import` / `export`)
- `Date` handling for account age
- nullish coalescing (`??`) and optional chaining (`?.`)

## What the app does

- Validates a GitHub username input
- Shows a loading state while fetching data
- Requests profile and repository data concurrently
- Displays profile details and GitHub profile link
- Calculates repository statistics from fetched data
- Displays the most-starred repository and top 5 repositories
- Provides filtering and sorting of fetched repositories
- Uses only browser JavaScript and no external libraries

## Project structure

```
github-explorer/
├── index.html          # App UI and entry point
├── style.css           # Optional styling
├── README.md           # Project instructions and notes
└── js/
    ├── app.js          # Main event and application flow
    ├── githubApi.js    # GitHub API fetch functions
    ├── analytics.js    # Repository analysis and filtering helpers
    └── ui.js           # DOM rendering helpers
```

## How to run

### Recommended: VS Code Live Server

1. Install the **Live Server** extension by Ritwick Dey.
2. Open the `github-explorer` folder in VS Code.
3. Open `index.html`.
4. Right-click and select **Open with Live Server**.
5. In the browser, enter a GitHub username such as `octocat` and click **Search**.

### Alternative: open directly in a browser

- Open `index.html` from the file system.
- If the app does not load because browser security blocks module loading, use Live Server.

## Important instructions

- Do not use `npm`, `node`, or a backend server for this assignment.
- Do not use Express.js, Axios, React, Vue, Angular, or any other external JavaScript library.
- Do not use a database.
- Use only the browser Fetch API and standard JavaScript.
- Keep the application modular and avoid placing all logic in a single file.
- New searches should replace previous results, not append duplicates.

## GitHub API endpoints used

- Profile: `https://api.github.com/users/{username}`
- Repositories: `https://api.github.com/users/{username}/repos?per_page=100&sort=updated`

## Assignment requirements covered

The app includes the following functional behaviors:

- empty username validation
- loading state display
- concurrent fetching of profile and repository data with `Promise.all()`
- HTTP response validation using `response.ok`
- 404 handling with a friendly message
- 403 / 429 handling for rate limit conditions
- network error handling
- null-safe display for optional profile fields (`name`, `bio`, `company`, `location`)
- summary statistics based on the returned repository array
- unique language list ignoring `null` languages
- filtering by language, starred repos, and non-forks
- sorting by updated date, stars, and name
- account age calculation using `created_at` and `Date`

## Troubleshooting

If the app does not work:

1. Confirm `index.html` contains:

```html
<script type="module" src="./js/app.js"></script>
```

2. Confirm the `js/` folder contains:

- `app.js`
- `githubApi.js`
- `analytics.js`
- `ui.js`

3. Open the browser developer console (F12) and inspect any error messages.
4. If you see module load errors or 404s, use Live Server instead of `file://`.

## Example usage

1. Start Live Server.
2. Enter `octocat`.
3. Click **Search**.
4. The app should display the profile and repository summary.

## Notes for submission

- This is a pure front-end project.
- No API tokens or secrets are stored in the code.
- The app focuses on asynchronous JavaScript and GitHub API handling.
- The repository should include clean, modular JavaScript and a README with clear instructions.


