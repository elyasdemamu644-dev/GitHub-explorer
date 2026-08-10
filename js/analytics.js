export function calculateRepositoryCount(repositories) {
    return repositories.length;
}
// total repostory 

export function calculateTotalStars(repositories) {

    return repositories.reduce( (total, repository) => total + (repository.stargazers_count ?? 0), 0 );
}
// calculate for total stars reduce() combines many valus into one

export function calculateTotalForks(repositories) {

    return repositories.reduce( (total, repository) =>total + (repository.forks_count ?? 0), 0 );
}
// calculate for total forks reduce() combines many valus into one

export function findMostStarredRepository(repositories) {

    if (repositories.length === 0) {
        return null;
    }

    const topStarCount = repositories.reduce(
        (max, repository) => Math.max(max, repository.stargazers_count ?? 0), 0);
//nullish coalescing if repository is null it will display 0
    return repositories.find( repository => (repository.stargazers_count ?? 0) === topStarCount ) || null;
}
//find() use when looking for item that satisfies a condition..

export function hasStarredRepositories( repositories) {

    return repositories.some( repository => (repository.stargazers_count ?? 0) > 0 );
}


export function getTopFiveRepositories(repositories) {

    return [...repositories]
        .sort(
            (a, b) =>
                (b.stargazers_count ?? 0) -
                (a.stargazers_count ?? 0)
        )
        .slice(0, 5);
//sort() sort from the highest star to lowest slice() takes the first valus 
//[.. repostory] mean cody the original arry to not modify the actual atty so we use copy one safly to sort.
}


export function getLanguages(repositories) {

    const languages = repositories
        .map(repository => repository.language)
        .filter(language => language !== null);

    return [...new Set(languages)].sort();
}
//sort by languge
//map() to transform ever item the languge like python java...
//filter() fiter the languge that is differnt from !== null 
//set() to remove duplication
export function findMostUsedLanguage(repositories) {

    const languageCounts = repositories .filter(repository => repository.language !== null)
     .reduce((counts, repository) => {

            const language = repository.language;

            counts[language] =
                (counts[language] ?? 0) + 1;

            return counts;

        }, {});

    const languages = Object.entries(languageCounts);

    if (languages.length === 0) {
        return null;
    }

    const mostUsed = languages.reduce(
        (current, language) => {

            if (language[1] > current[1]) {
                return language;
            }

            return current;
        }
    );

    return mostUsed[0];
}


export function filterByLanguage(repositories,language) {

    if (language === "all") {
        return repositories;
    }

    return repositories.filter(
        repository =>
            repository.language === language
    );
}


export function filterByStars(repositories) {

    return repositories.filter( repository =>(repository.stargazers_count ?? 0) > 0);
}


export function filterNonForks(repositories) {

    return repositories.filter( repository => repository.fork === false );
}


export function sortRepositories(repositories,sortType) {

    const sorted = [...repositories];

    if (sortType === "stars") {

        return sorted.sort(
            (a, b) =>
                (b.stargazers_count ?? 0) -
                (a.stargazers_count ?? 0)
        );
    }

    if (sortType === "name") {

        return sorted.sort((a, b) =>a.name.localeCompare(b.name) );
    }

    if (sortType === "updated") {

        return sorted.sort((a, b) => new Date(b.updated_at) -new Date(a.updated_at) );
    }

    return sorted;
}


export function calculateAccountAge(createdAt) {

    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    let age =
        currentDate.getFullYear() -
        createdDate.getFullYear();

    const currentMonth =
        currentDate.getMonth();

    const createdMonth =
        createdDate.getMonth();

    const currentDay =
        currentDate.getDate();

    const createdDay =
        createdDate.getDate();

    if (
        currentMonth < createdMonth ||
        (
            currentMonth === createdMonth &&
            currentDay < createdDay
        )
    ) {
        age--;
    }

    return Math.max(age, 0);
}
// github give created_at and convert it creared date and comper it to current date and calculate the time passsed ...Date to calculate the repo age.