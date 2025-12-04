// Store the state of the filters and search, to be used in all functions
const state = {
    filter: {},
    search: "",
}

// Render the projects on the page
const renderProjects = (projects) => {
    return (`${projects.filter((project) => filterAttributes(project) && filterName(project)).map (project => { 
        return (
            `<article class="project-box">
                <h3 class="project-name">${project.name}</h3>
                <div class="project-description">
                    <p>${project.description}</p>
                    <div class="project-links">
            ` +
            (( project.url !== undefined ) ? `            <a href="${project.url}" target="_blank" class="fa-solid fa-link"></a>` : "")
            + `
                        <a href="${project.github}" target="_blank" class="fa-brands fa-github"></a>
                    </div>
                </div>
            </article>`
        )
    }).join('')}`);

    function filterAttributes(project) {
        const { filter } = state;
        if (Array.isArray(project[filter.attribute])) {
            return project[filter.attribute].includes(filter.value);
        }
        return project[filter.attribute] === filter.value;
    }

    function filterName(project) {
        return project.name.toLowerCase().includes(state.search.toLowerCase());
    }
}

// Insert new HTML into the page
const rerender = (data) => {
    const newProject = data.toSorted((a, b) => !b["name"].localeCompare(a["name"]));
    const renderedHtml = renderProjects(newProject);
    const destination = 'div.projects-container'
    document.querySelector(destination).innerHTML = renderedHtml;

}

// Fetch the data from the JSON file
window.onload = () => { 
    fetch('assets/js/projects.json')
    .then(response => response.json())
    .then(data => {
        rerender(data.projects);
    })
}