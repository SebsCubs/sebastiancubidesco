/**
 * Content Configuration
 * Centralized metadata for all content types
 */
export const contentConfig = {
    blogs: [
        {
            id: 'post1',
            title: {
                en: 'A whitepaper on my website',
                es: 'Un whitepaper sobre mi sitio web'
            },
            url: 'content/blogs/post1.md',
            date: '2024-01-01',
            tags: ['web', 'development'],
            description: {
                en: 'A comprehensive overview of my personal website',
                es: 'Una descripción completa de mi sitio web personal'
            }
        },
        {
            id: 'post2',
            title: {
                en: 'My Second Post',
                es: 'Mi segunda publicación'
            },
            url: 'content/blogs/post2.md',
            date: '2024-01-15',
            tags: ['blog', 'update'],
            description: {
                en: 'My second blog post with updates',
                es: 'Mi segunda publicación del blog con actualizaciones'
            }
        }
    ],
    projects: [
        {
            id: 'project1',
            title: {
                en: 'Awesome Project',
                es: 'Proyecto Impresionante'
            },
            url: 'content/projects/project1.md',
            technologies: ['JavaScript', 'HTML', 'CSS'],
            status: 'completed',
            description: {
                en: 'An awesome project built with modern web technologies',
                es: 'Un proyecto impresionante construido con tecnologías web modernas'
            }
        },
        {
            id: 'project2',
            title: {
                en: 'Another Project',
                es: 'Otro Proyecto'
            },
            url: 'content/projects/project2.md',
            technologies: ['React', 'Node.js'],
            status: 'in-progress',
            description: {
                en: 'Another exciting project currently in development',
                es: 'Otro proyecto emocionante actualmente en desarrollo'
            }
        }
    ]
};