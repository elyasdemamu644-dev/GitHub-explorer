export function showLoading() {

    const loadingElement = document.getElementById("loading");

    loadingElement.textContent = "Loading developer information...";

    loadingElement.classList.remove("hidden");
}


export function hideLoading() {

    document.getElementById("loading").classList.add("hidden");
}


export function showError(message) {

    const errorElement = document.getElementById("error");

    errorElement.textContent = message;

    errorElement.classList.remove("hidden");
}


export function hideError() {

    document.getElementById("error").classList.add("hidden");
}


export function showResults() {

    document.getElementById("results").classList.remove("hidden");
}


export function hideResults() {

    document.getElementById("results").classList.add("hidden");
}


function safeValue(value) {

    return value ?? "Not provided";
}


export function displayProfile (profile,accountAge) {

    document.getElementById("avatar").src =profile.avatar_url;

    document.getElementById("avatar").alt = `${safeValue(profile.name)} avatar`;

    document.getElementById("developerName").textContent = safeValue(profile.name);

    document.getElementById("developerUsername") .textContent = `@${profile.login}`;

    document.getElementById("bio") .textContent = safeValue(profile.bio);

    document.getElementById("company")  .textContent =  safeValue(profile.company);

    document.getElementById("location") .textContent =  safeValue(profile.location);

    document.getElementById("followers") .textContent = profile.followers ?? 0;

    document.getElementById("following") .textContent = profile.following ?? 0;

    document.getElementById("publicRepos") .textContent = profile.public_repos ?? 0;

    document.getElementById("memberSince") .textContent = formatDate(profile.created_at);

    document.getElementById("accountAge") .textContent = `${accountAge} years`;

    const profileLink = document.getElementById( "githubProfileLink" );

    profileLink.href =  profile.html_url;
}


function formatDate(dateString) {

    if (!dateString) {
        return "Not provided";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}


export function displayStatistics(
    repositories,
    totalStars,
    totalForks,
    mostStarred,
    mostUsedLanguage,
    languages,
    hasStarredRepos
) {

    document.getElementById("repoCount").textContent = repositories.length;

    document.getElementById("totalStars").textContent = totalStars;

    document.getElementById("totalForks").textContent = totalForks;

    document.getElementById("mostUsedLanguage").textContent = mostUsedLanguage ?? "Not available";

    document.getElementById("languagesList").textContent = languages.length > 0 ? languages.join(", "): "None";

    document.getElementById("hasStarredRepos").textContent = hasStarredRepos ? "Yes" : "No";

    const mostStarredElement = document.getElementById("mostStarred");

    if (!mostStarredElement) {
        return;
    }

    if (!mostStarred) {

        mostStarredElement.textContent = "No repositories available.";

        return;
    }

    mostStarredElement.innerHTML = createRepositoryHTML(mostStarred);
}


export function displayTopRepositories(repositories) {

    const container = document.getElementById("topRepositories");

    if (repositories.length === 0) {

        container.innerHTML = "<p>No repositories available.</p>";

        return;
    }

    container.innerHTML =
        repositories.map(repository =>createRepositoryHTML(repository)).join("");

}


export function displayRepositories(repositories) {

    const container = document.getElementById("repositoryResults");

    if (repositories.length === 0) {

        container.innerHTML = "<p>No repositories match the selected filters.</p>";

        return;
    }

    container.innerHTML = repositories.map(repository => createRepositoryHTML(repository)).join("");
}

///
////

export function populateLanguageFilter(languages) {

    const select = document.getElementById("languageFilter");

    select.innerHTML = `
        <option value="all">
            All Languages
        </option>
    `;

    languages.forEach(language => {const option = document.createElement("option");

        option.value = language;
        option.textContent = language;

        select.appendChild(option);
    });
}


export function clearResults() {

    const topRepositories = document.getElementById("topRepositories");
    const repositoryResults = document.getElementById("repositoryResults");

    if (topRepositories) {
        topRepositories.innerHTML = "";
    }

    if (repositoryResults) {
        repositoryResults.innerHTML = "";
    }
}