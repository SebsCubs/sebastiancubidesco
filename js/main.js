// main.js

import { loadHeader } from './header.js';
import { loadProjects, getProjectById } from './projects.js';
import { loadBlogPosts, getBlogPostById } from './blog.js';
import { initializeThemeToggle, refreshThemeLabel } from './theme.js';
import { initializeLanguageToggle, currentLang, getLocalizedUrl, translatePage, t } from './translation.js';
import { loadMarkdown } from './content.js';

const BASE_INDEX = 'index.html';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    initializeThemeToggle();
    setupNavigation();

    initializeLanguageToggle(() => {
        renderFromUrl();
    });

    renderFromUrl();

    window.addEventListener('popstate', () => {
        renderFromUrl();
    });
});

function setupNavigation() {
    document.querySelectorAll('nav a[data-route]').forEach(link => {
        link.addEventListener('click', (event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }
            event.preventDefault();
            const target = link.getAttribute('href');
            if (target) {
                navigateTo(target);
            }
        });
    });
}

function navigateTo(path, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${path}?${query}` : path;
    if (window.location.pathname.endsWith(path) && (window.location.search === (query ? `?${query}` : ''))) {
        renderFromUrl();
        return;
    }
    history.pushState({ path, params }, '', url);
    renderFromUrl();
}

function renderFromUrl() {
    const { path, params } = parseLocation();
    switch (path) {
        case '':
        case BASE_INDEX:
            renderHome();
            break;
        case 'projects.html':
            if (params.project) {
                renderProjectDetail(params.project);
            } else {
                renderProjectList();
            }
            break;
        case 'blogs.html':
            if (params.post) {
                renderBlogDetail(params.post);
            } else {
                renderBlogList();
            }
            break;
        default:
            renderNotFound();
            break;
    }
    updateActiveNav(path);
    translatePage();
    refreshThemeLabel();
}

function renderHome() {
    document.title = t('page-title.home');
    loadMarkdown(getLocalizedUrl('content/index.md', currentLang));
}

function renderProjectList() {
    document.title = t('page-title.projects');
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
        return;
    }
    mainContent.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('centered-content');

    const section = document.createElement('section');
    section.id = 'projects';

    const heading = document.createElement('h1');
    heading.setAttribute('data-i18n', 'headings.projects');
    heading.textContent = t('headings.projects');

    const list = document.createElement('ul');
    list.id = 'projects-list';

    section.appendChild(heading);
    section.appendChild(list);
    container.appendChild(section);
    mainContent.appendChild(container);

    loadProjects((project) => {
        openProject(project);
    });
}

function renderProjectDetail(projectId) {
    const project = getProjectById(projectId);
    if (!project) {
        renderNotFound();
        return;
    }
    document.title = `${project.title[currentLang]} | ${t('page-title.base')}`;
    loadMarkdown(getLocalizedUrl(project.url, currentLang));
}

function openProject(project) {
    navigateTo('projects.html', { project: project.id });
}

function renderBlogList() {
    document.title = t('page-title.blog');
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
        return;
    }
    mainContent.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('centered-content');

    const section = document.createElement('section');
    section.id = 'blog';

    const heading = document.createElement('h1');
    heading.setAttribute('data-i18n', 'headings.blog');
    heading.textContent = t('headings.blog');

    const list = document.createElement('ul');
    list.id = 'blog-list';

    section.appendChild(heading);
    section.appendChild(list);
    container.appendChild(section);
    mainContent.appendChild(container);

    loadBlogPosts((post) => {
        openBlogPost(post);
    });
}

function renderBlogDetail(postId) {
    const post = getBlogPostById(postId);
    if (!post) {
        renderNotFound();
        return;
    }
    document.title = `${post.title[currentLang]} | ${t('page-title.base')}`;
    loadMarkdown(getLocalizedUrl(post.url, currentLang));
}

function openBlogPost(post) {
    navigateTo('blogs.html', { post: post.id });
}

function renderNotFound() {
    document.title = t('page-title.notFound');
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
        return;
    }
    mainContent.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('centered-content');

    const heading = document.createElement('h1');
    heading.setAttribute('data-i18n', 'headings.notFound');
    heading.textContent = t('headings.notFound');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('data-i18n', 'messages.notFound');
    paragraph.textContent = t('messages.notFound');

    container.appendChild(heading);
    container.appendChild(paragraph);
    mainContent.appendChild(container);
}

function updateActiveNav(path) {
    const normalized = path || BASE_INDEX;
    document.querySelectorAll('nav a[data-route]').forEach(link => {
        const target = link.getAttribute('href');
        if (!target) {
            return;
        }
        if (target === normalized || (normalized === BASE_INDEX && target === BASE_INDEX)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function parseLocation() {
    const path = window.location.pathname.split('/').pop() || '';
    const params = Object.fromEntries(new URLSearchParams(window.location.search));
    return { path, params };
}
