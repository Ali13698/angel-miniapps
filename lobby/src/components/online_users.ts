export function renderOnlineUsers(users: any[]): string {
    if (!users || users.length === 0) {
        return '<div class="text-muted">کاربری آنلاین نیست</div>';
    }

    return `
    <div class="online-slider">
        ${users.map(user => `
            <div class="online-card">
                <div class="online-avatar">
                    <img src="${user.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + user.id}" alt="${user.name}" />
                </div>
                <div class="online-name">${user.name}</div>
            </div>
        `).join('')}
    </div>`;
}
