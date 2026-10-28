export function renderGamesScreen() {
    const container = document.getElementById('screen-games');
    if (!container) return;

    container.innerHTML = `
        <style>
            .angel-games-wrapper {
                display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 10px;
            }
            .angel-game-card {
                border-radius: 16px; overflow: hidden; cursor: pointer; transition: transform 0.2s; box-sizing: border-box; width: 100%;
            }
            .angel-game-card:active { transform: scale(0.98); }
            
            /* Ludo Card */
            .angel-ludo-card {
                max-width: 600px; aspect-ratio: 3 / 1; display: flex; border: 3px solid #8b5cf6;
            }
            .angel-ludo-col {
                flex: 1; display: flex; justify-content: center; align-items: center; position: relative;
            }
            .angel-bg-blue   { background-color: #2188d9; }
            .angel-bg-yellow { background-color: #f5be18; }
            .angel-bg-green  { background-color: #26b32b; }
            .angel-bg-red    { background-color: #e52e2e; }
            
            .angel-home-base {
                width: 75%; height: 75%; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 15%; padding: 15%; border-radius: 12px; box-sizing: border-box;
            }
            .angel-bg-blue .angel-home-base   { background-color: #1862a8; }
            .angel-bg-yellow .angel-home-base { background-color: #d19f0b; }
            .angel-bg-green .angel-home-base  { background-color: #1a861e; }
            .angel-bg-red .angel-home-base    { background-color: #b82020; }
            
            .angel-token { border-radius: 50%; aspect-ratio: 1 / 1; width: 100%; box-sizing: border-box; }
            .angel-token.ring { border: 6px solid #ffffff; }
            
            .angel-bg-blue .angel-token.solid   { background-color: #2188d9; }
            .angel-bg-yellow .angel-token.solid { background-color: #f5be18; }
            .angel-bg-green .angel-token.solid  { background-color: #26b32b; }
            .angel-bg-red .angel-token.solid    { background-color: #e52e2e; }
            
            /* TTT Card */
            .angel-ttt-card {
                max-width: 250px; aspect-ratio: 1 / 1; background: #1c1e26; border: 3px solid #8b5cf6;
                display: flex; justify-content: center; align-items: center; align-self: center; width: 60%;
            }
            .angel-ttt-icon {
                width: 40%; height: 40%; border-radius: 50%; border: 12px solid #e52e2e; box-sizing: border-box;
            }
            
            @media (max-width: 400px) {
                .angel-ludo-card { aspect-ratio: 2.5 / 1; }
                .angel-token.ring { border-width: 4px; }
                .angel-ttt-icon { border-width: 8px; }
            }
        </style>
        
        <div class="angel-games-wrapper">
            <!-- Ludo -->
            <div class="angel-game-card angel-ludo-card" onclick="window.location.href='/games/ludo/lobby.html'">
                <div class="angel-ludo-col angel-bg-blue">
                    <div class="angel-home-base">
                        <div class="angel-token ring"></div><div class="angel-token solid"></div>
                        <div class="angel-token ring"></div><div class="angel-token ring"></div>
                    </div>
                </div>
                <div class="angel-ludo-col angel-bg-yellow">
                    <div class="angel-home-base">
                        <div class="angel-token solid"></div><div class="angel-token solid"></div>
                        <div class="angel-token ring"></div><div class="angel-token ring"></div>
                    </div>
                </div>
                <div class="angel-ludo-col angel-bg-green">
                    <div class="angel-home-base">
                        <div class="angel-token solid"></div><div class="angel-token ring"></div>
                        <div class="angel-token ring"></div><div class="angel-token ring"></div>
                    </div>
                </div>
                <div class="angel-ludo-col angel-bg-red">
                    <div class="angel-home-base">
                        <div class="angel-token ring"></div><div class="angel-token ring"></div>
                        <div class="angel-token ring"></div><div class="angel-token ring"></div>
                    </div>
                </div>
            </div>

            <!-- Tic Tac Toe -->
            <div class="angel-game-card angel-ttt-card" onclick="window.location.href='/games/tic-tac-toe/index.html'">
                <div class="angel-ttt-icon"></div>
            </div>
        </div>
    `;
}
