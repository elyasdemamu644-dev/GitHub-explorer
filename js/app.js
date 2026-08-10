import {
    fetchGitHubUser,
    fetchUserRepositories
} from "./githubApi.js";


import {
    calculateTotalStars,
    calculateTotalForks,
    findMostStarredRepository,
    hasStarredRepositories,
    getTopFiveRepositories,
    getLanguages,
    findMostUsedLanguage,
    filterByLanguage,
    filterByStars,
    filterNonForks,
    sortRepositories,
    calculateAccountAge
} from "./analytics.js";


import {
    showLoading,
    hideLoading,
    showError,
    hideError,
    showResults,
    hideResults,
    displayProfile,
    displayStatistics,
    displayTopRepositories,
    displayRepositories,
    populateLanguageFilter,
    clearResults
} from "./ui.js";


const searchForm = document.getElementById("searchForm");

const usernameInput = document.getElementById("username");

const languageFilter = document.getElementById("languageFilter");

const repositoryFilter = document.getElementById("repositoryFilter");

const sortSelect = document.getElementById("sortRepositories");


let currentRepositories = [];

searchForm.addEventListener( "submit", handleSearch );

languageFilter.addEventListener( "change",  updateRepositoryDisplay );


repositoryFilter.addEventListener( "change", updateRepositoryDisplay );


sortSelect.addEventListener( "change", updateRepositoryDisplay );

async function handleSearch(event) {

    event.preventDefault();

    const username = usernameInput.value.trim();

    if (!username) {

        hideResults();

        showError("Please enter a GitHub username.");

        return;
    }

    hideError();
    hideResults();
    clearResults();
    showLoading();

    try {

        const [profile, repositories] = await Promise.all([
            fetchGitHubUser(username),
            fetchUserRepositories(username)
        ]);


        currentRepositories = repositories;

        const totalStars = calculateTotalStars(repositories );

        const totalForks = calculateTotalForks( repositories );

        const mostStarred = findMostStarredRepository( repositories );

        const topFive = getTopFiveRepositories( repositories );

        const languages = getLanguages( repositories );

        const mostUsedLanguage =  findMostUsedLanguage( repositories );

        const hasStarredRepos = hasStarredRepositories(  repositories );

        const accountAge = calculateAccountAge( profile.created_at);

        displayProfile( profile, accountAge);


        displayStatistics(
            repositories,
            totalStars,
            totalForks,
            mostStarred,
            mostUsedLanguage,
            languages,
            hasStarredRepos
        );


        displayTopRepositories( topFive );


        populateLanguageFilter( languages);

        languageFilter.value = "all";
        repositoryFilter.value = "all";
        sortSelect.value = "updated";

        updateRepositoryDisplay();

        showResults();

    } catch (error) {

        showError( error.message || "Something went wrong while loading the developer." );

    } finally {

        hideLoading();
    }
}


function updateRepositoryDisplay() {

    let filteredRepositories =[...currentRepositories];

    const selectedLanguage = languageFilter.value;

    const selectedFilter = repositoryFilter.value;

    const selectedSort = sortSelect.value;

    /*
     * Language filter
     */

    filteredRepositories = filterByLanguage( filteredRepositories, selectedLanguage );

    /*
     * Additional repository filter
     */

    if (selectedFilter === "starred") {

        filteredRepositories =
            filterByStars( filteredRepositories );
    }


    if (selectedFilter === "notFork") {

        filteredRepositories =
            filterNonForks( filteredRepositories );
    }

    /*
     * Sorting
     */

    filteredRepositories =
        sortRepositories( filteredRepositories, selectedSort );

    displayRepositories( filteredRepositories );
}
