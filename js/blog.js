// blog.js

import { currentLang, getLocalizedUrl } from './translation.js';
import { loadMarkdown } from './content.js';

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

export function loadBlogPosts() {
    const blogList = document.getElementById('blog-list');
    if (blogList) {
        blogList.innerHTML = ''; // Clear existing list
        blogPosts.forEach(post => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = post.title[currentLang];
            a.onclick = (e) => {
                e.preventDefault();
                const localizedUrl = getLocalizedUrl(post.url, currentLang);
                loadMarkdown(localizedUrl);
            };
            li.appendChild(a);
            blogList.appendChild(li);
        });
    } else {
        console.error('Blog list element not found');
    }
}
