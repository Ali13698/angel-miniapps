export function renderGames(): string {
    const games = [
        { id: 'ludo', name: 'منچ فضایی', icon: '🎲', route: '/games/ludo/lobby.html' },
        { id: 'tic-tac-toe', name: 'دوز', icon: '⭕', route: '/games/tic-tac-toe/index.html' }
    ];

    return `
    <div style="padding: 20px;">
        <h2>بازی‌ها</h2>
        <div class="games-grid">
            ${games.map(game => `
                <div class="game-card" onclick="window.location.href='${game.route}'">
                    <div class="game-icon">${game.icon}</div>
                    <div class="game-name">${game.name}</div>
                </div>
            `).join('')}
        </div>
    </div>`;
}
