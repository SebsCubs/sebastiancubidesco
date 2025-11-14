// projects.js

import { currentLang } from './translation.js';

let projects = [];
let projectsCache = null;

/**
 * Extracts the title from a markdown file (first # heading)
 */
function extractTitle(markdown) {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : 'Untitled';
}

/**
 * Discovers projects by trying to fetch project files sequentially
 */
async function discoverProjects() {
    if (projectsCache) {
        return projectsCache;
    }

    const projectList = [];
    let projectNumber = 1;
    let consecutiveFailures = 0;
    const maxFailures = 3; // Stop after 3 consecutive missing projects

    while (consecutiveFailures < maxFailures) {
        const projectId = `project${projectNumber}`;
        const enUrl = `content/projects/${projectId}.md`;
        const esUrl = `content/projects/${projectId}_es.md`;

        try {
            // Try to fetch both English and Spanish versions
            const [enResponse, esResponse] = await Promise.all([
                fetch(enUrl).catch(() => null),
                fetch(esUrl).catch(() => null)
            ]);

            // Only add entry if BOTH English and Spanish versions exist
            if (enResponse && enResponse.ok && esResponse && esResponse.ok) {
                const enMarkdown = await enResponse.text();
                const enTitle = extractTitle(enMarkdown);

                const esMarkdown = await esResponse.text();
                const esTitle = extractTitle(esMarkdown);

                projectList.push({
                    id: projectId,
                    title: {
                        en: enTitle,
                        es: esTitle
                    },
                    url: enUrl
                });

                consecutiveFailures = 0; // Reset failure counter
            } else {
                consecutiveFailures++;
            }
        } catch (error) {
            consecutiveFailures++;
        }

        projectNumber++;
    }

    // Sort projects by number (project1, project2, etc.) in reverse order (newest first)
    projectList.sort((a, b) => {
        const numA = parseInt(a.id.replace('project', ''));
        const numB = parseInt(b.id.replace('project', ''));
        return numB - numA;
    });

    projectsCache = projectList;
    projects = projectList;
    return projectList;
}

export async function loadProjects(onSelect) {
    const projectList = document.getElementById('projects-list');
    if (!projectList) {
        console.error('Project list element not found');
        return;
    }

    // Show loading state
    projectList.innerHTML = '<li>Loading projects...</li>';

    try {
        const projectsData = await discoverProjects();
        projectList.innerHTML = '';

        projectsData.forEach(project => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `projects.html?project=${project.id}`;
            a.textContent = project.title[currentLang];
            a.addEventListener('click', (event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                    return;
                }
                event.preventDefault();
                if (typeof onSelect === 'function') {
                    onSelect(project);
                }
            });
            li.appendChild(a);
            projectList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        projectList.innerHTML = '<li>Error loading projects</li>';
    }
}

export async function getProjectById(id) {
    await discoverProjects();
    return projects.find(project => project.id === id);
}
