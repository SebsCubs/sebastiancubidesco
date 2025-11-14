// blog.js

import { currentLang } from './translation.js';

let blogPosts = [];
let postsCache = null;

/**
 * Extracts the title from a markdown file (first # heading)
 */
function extractTitle(markdown) {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : 'Untitled';
}

/**
 * Discovers blog posts by trying to fetch post files sequentially
 */
async function discoverBlogPosts() {
    if (postsCache) {
        return postsCache;
    }

    const posts = [];
    let postNumber = 1;
    let consecutiveFailures = 0;
    const maxFailures = 3; // Stop after 3 consecutive missing posts

    while (consecutiveFailures < maxFailures) {
        const postId = `post${postNumber}`;
        const enUrl = `content/blogs/${postId}.md`;
        const esUrl = `content/blogs/${postId}_es.md`;

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

                posts.push({
                    id: postId,
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

        postNumber++;
    }

    // Sort posts by number (post1, post2, etc.) in reverse order (newest first)
    posts.sort((a, b) => {
        const numA = parseInt(a.id.replace('post', ''));
        const numB = parseInt(b.id.replace('post', ''));
        return numB - numA;
    });

    postsCache = posts;
    blogPosts = posts;
    return posts;
}

export async function loadBlogPosts(onSelect) {
    const blogList = document.getElementById('blog-list');
    if (!blogList) {
        console.error('Blog list element not found');
        return;
    }

    // Show loading state
    blogList.innerHTML = '<li>Loading posts...</li>';

    try {
        const posts = await discoverBlogPosts();
        blogList.innerHTML = '';

        posts.forEach(post => {
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
    } catch (error) {
        console.error('Error loading blog posts:', error);
        blogList.innerHTML = '<li>Error loading posts</li>';
    }
}

export async function getBlogPostById(id) {
    await discoverBlogPosts();
    return blogPosts.find(post => post.id === id);
}
