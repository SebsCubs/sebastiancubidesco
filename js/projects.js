// projects.js

import { currentLang, getLocalizedUrl } from './translation.js';
import { loadMarkdown } from './content.js';

export const projects = [
    { 
        id: 'project1', 
        title: {
            en: 'Awesome Project',
            es: 'Proyecto Impresionante'
        },
        url: '/content/projects/project1.md'
    },
    { 
        id: 'project2', 
        title: {
            en: 'Another Project',
            es: 'Otro Proyecto'
        },
        url: '/content/projects/project2.md'
    }
];

export function loadProjects() {
    const projectList = document.getElementById('projects-list');
    if (projectList) {
        projectList.innerHTML = ''; // Clear existing list
        projects.forEach(project => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = project.title[currentLang];
            a.onclick = (e) => {
                e.preventDefault();
                const localizedUrl = getLocalizedUrl(project.url, currentLang);
                loadMarkdown(localizedUrl);
            };
            li.appendChild(a);
            projectList.appendChild(li);
        });
    } else {
        console.error('Project list element not found');
    }
}
