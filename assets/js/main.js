// Dark mode handling
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

function toggleDarkMode() {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark'));
}

darkModeToggle?.addEventListener('click', toggleDarkMode);

// Mobile menu handling
const openSidebar = document.getElementById('openSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.querySelector('aside');

function toggleSidebar() {
    sidebar.classList.toggle('-translate-x-full');
}

openSidebar?.addEventListener('click', toggleSidebar);
closeSidebar?.addEventListener('click', toggleSidebar);

// Search functionality
const searchInput = document.getElementById('docsSearch');
const searchResults = document.createElement('div');
searchResults.className = 'search-results hidden';
searchInput?.parentNode.appendChild(searchResults);

let searchIndex = null;
let searchTimeout = null;

async function initializeSearch() {
    try {
        const response = await fetch('/search-index.json');
        searchIndex = await response.json();
    } catch (error) {
        console.error('Error loading search index:', error);
    }
}

function debounceSearch(event) {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    searchTimeout = setTimeout(() => performSearch(event.target.value), 300);
}

function performSearch(query) {
    if (!searchIndex || query.length < 2) {
        searchResults.classList.add('hidden');
        return;
    }

    const results = searchIndex.filter(page => {
        const titleMatch = page.title.toLowerCase().includes(query.toLowerCase());
        const contentMatch = page.content.toLowerCase().includes(query.toLowerCase());
        return titleMatch || contentMatch;
    }).slice(0, 5);

    if (results.length > 0) {
        searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result-item">
                <div class="title">${result.title}</div>
                <div class="excerpt">${getSearchExcerpt(result.content, query)}</div>
            </a>
        `).join('');
        searchResults.classList.remove('hidden');
    } else {
        searchResults.classList.add('hidden');
    }
}

function getSearchExcerpt(content, query) {
    const position = content.toLowerCase().indexOf(query.toLowerCase());
    const start = Math.max(0, position - 50);
    const end = Math.min(content.length, position + 100);
    return '...' + content.slice(start, end).replace(
        new RegExp(query, 'gi'),
        match => `<mark>${match}</mark>`
    ) + '...';
}

// Close search results when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-results') && !event.target.closest('#docsSearch')) {
        searchResults.classList.add('hidden');
    }
});

searchInput?.addEventListener('input', debounceSearch);
searchInput?.addEventListener('focus', () => {
    if (searchInput.value.length >= 2) {
        searchResults.classList.remove('hidden');
    }
});

// Initialize search when the page loads
initializeSearch();

// Table of contents highlighting
const tocLinks = document.querySelectorAll('.table-of-contents a');
const headers = document.querySelectorAll('h2, h3, h4');
let activeLink = null;

function updateTOC() {
    const fromTop = window.scrollY + 100;

    headers.forEach(header => {
        const headerTop = header.offsetTop;
        const id = header.getAttribute('id');
        const correspondingLink = document.querySelector(`.table-of-contents a[href="#${id}"]`);

        if (correspondingLink && headerTop <= fromTop) {
            if (activeLink) activeLink.classList.remove('active');
            correspondingLink.classList.add('active');
            activeLink = correspondingLink;
        }
    });
}

// Add anchor links to headings
headers.forEach(header => {
    const id = header.getAttribute('id');
    if (id) {
        const anchor = document.createElement('a');
        anchor.className = 'anchor';
        anchor.href = `#${id}`;
        anchor.innerHTML = '#';
        header.appendChild(anchor);
    }
});

window.addEventListener('scroll', () => {
    requestAnimationFrame(updateTOC);
});
