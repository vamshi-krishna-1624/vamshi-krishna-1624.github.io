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
