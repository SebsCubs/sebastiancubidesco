// blog.js

import { currentLang } from './translation.js';

export const blogPosts = [
    {
        id: 'post1',
        title: {
            en: 'A whitepaper on my website',
            es: 'Un whitepaper sobre mi sitio web'
        },
        url: 'content/blogs/post1.md'
    },
    {
        id: 'post2',
        title: {
            en: 'My Second Post',
            es: 'Mi segunda publicación'
        },
        url: 'content/blogs/post2.md'
    }
];

export function loadBlogPosts(onSelect) {
    const blogList = document.getElementById('blog-list');
    if (!blogList) {
        console.error('Blog list element not found');
        return;
    }

    blogList.innerHTML = '';
    blogPosts.forEach(post => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `blogs.html?post=${post.id}`;
        a.textContent = post.title[currentLang];
        a.addEventListener('click', (event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }
            event.preventDefault();
            if (typeof onSelect === 'function') {
                onSelect(post);
            }
        });
        li.appendChild(a);
        blogList.appendChild(li);
    });
}

export function getBlogPostById(id) {
    return blogPosts.find(post => post.id === id);
}
