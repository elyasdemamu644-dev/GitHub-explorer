const BASE_URL = "https://api.github.com";
//store git hub api address  
export async function fetchGitHubUser(username) {
//function receives user name
    const url = `${BASE_URL}/users/${encodeURIComponent(username)}`;
//add's user name to address
    try {
        //fetch() it returns a promise the reusit maybe not ready but it will give us later
        const response = await fetch(url);
// await wait for the promise
        if (!response.ok) {
//checking a repository is okey 404 403 429. it thorw if there is an erorr
            if (response.status === 404) {
                throw new Error("GitHub user not found.");
            }

            if (response.status === 403 ||response.status === 429) {

                throw new Error("GitHub API rate limit may have been reached. Please try again later.");
            }

            throw new Error( `GitHub API request failed with status ${response.status}.`);
        }

        const user = await response.json();
//converting lson repo to javascript
        return user;

    } catch (error) {

        if (error instanceof TypeError) {
            throw new Error("Network error. Please check your internet connection.");
        }
        throw error;
    }
}

export async function fetchUserRepositories(username) {

    const url = `${BASE_URL}/users/${encodeURIComponent(username)}/repos` + "?per_page=100&sort=updated";

    try {
        // fetch()
        const response = await fetch(url);

        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("GitHub user repositories not found.");
            }

            if (response.status === 403 ||response.status === 429) {

                throw new Error("GitHub API rate limit may have been reached. Please try again later.");
            }

            throw new Error(`Repository request failed with status ${response.status}.`);
        }

        const repositories = await response.json();

        return repositories;

    } catch (error) {

        if (error instanceof TypeError) {
            throw new Error("Network error. Please check your internet connection.");
        }
        
        throw error;
    }
}

//it have two api functions we have two differnt resources github user and the repositorie
