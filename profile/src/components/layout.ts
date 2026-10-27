export function renderLayout(content: string, activeTab: string, user: any): string {
    return `
    <div class="app-shell">
        <div class="top-header">
            <div class="logo-text">Angel</div>
            <div class="header-avatar" onclick="window.Router.switch('profile', document.getElementById('nav-profile'))">
                <img src="${user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + (user?.id || 1)}" />
            </div>
        </div>
        
        <div class="page-content">
            ${content}
        </div>

        <div class="bottom-nav">
            <div class="nav-item ${activeTab === 'friends' ? 'active' : ''}" id="nav-friends" onclick="window.Router.switch('friends', this)">
                <span class="nav-icon">👥</span>
            </div>
            <div class="nav-item ${activeTab === 'games' ? 'active' : ''}" id="nav-games" onclick="window.Router.switch('games', this)">
                <span class="nav-icon">🎮</span>
            </div>
            <div class="nav-center-btn" id="nav-home" onclick="window.Router.switch('home', this)">
                <span class="nav-icon">🏠</span>
            </div>
            <div class="nav-item ${activeTab === 'rooms' ? 'active' : ''}" id="nav-rooms" onclick="window.Router.switch('rooms', this)">
                <span class="nav-icon">💬</span>
            </div>
            <div class="nav-item ${activeTab === 'profile' ? 'active' : ''}" id="nav-profile" onclick="window.Router.switch('profile', this)">
                <span class="nav-icon">👤</span>
            </div>
        </div>
    </div>`;
}
