// projects.js

import { currentLang } from './translation.js';

export const projects = [
    {
        id: 'project1',
        title: {
            en: 'Awesome Project',
            es: 'Proyecto Impresionante'
        },
        url: 'content/projects/project1.md'
    },
    {
        id: 'project2',
        title: {
            en: 'Another Project',
            es: 'Otro Proyecto'
        },
        url: 'content/projects/project2.md'
    }
];

export function loadProjects(onSelect) {
    const projectList = document.getElementById('projects-list');
    if (!projectList) {
        console.error('Project list element not found');
        return;
    }

    projectList.innerHTML = '';
    projects.forEach(project => {
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
}

export function getProjectById(id) {
    return projects.find(project => project.id === id);
}
