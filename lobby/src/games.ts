export function renderGamesScreen() {
    const container = document.getElementById('screen-games');
    if (!container) return;

    container.innerHTML = `
        <style>
            .angel-games-wrapper {
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                gap: 20px; 
                padding: 10px;
                margin-top: 40px; /* فاصله از بالا */
            }
            .angel-game-card {
                border-radius: 16px; 
                overflow: hidden; 
                cursor: pointer; 
                transition: transform 0.2s; 
                box-sizing: border-box; 
                width: 100%;
                border: 3px solid #8b5cf6;
            }
            .angel-game-card:active { 
                transform: scale(0.98); 
            }
            
            /* --- Ludo Card --- */
            .angel-ludo-card {
                max-width: 600px; 
                aspect-ratio: 3 / 1; 
                display: flex; 
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
            
            /* --- Tic Tac Toe Card (مستطیلی) --- */
            .angel-ttt-card {
                max-width: 600px; 
                aspect-ratio: 3 / 1; 
                background: #1c1e26; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
            }
            .angel-ttt-icon {
                width: 20%; height: auto; aspect-ratio: 1/1; border-radius: 50%; border: 12px solid #e52e2e; box-sizing: border-box;
            }

            /* --- Football Card --- */
            .angel-football-card {
                max-width: 600px; 
                aspect-ratio: 3 / 1; 
                background: transparent; 
                display: flex; 
                justify-content: center; 
                align-items: center;
                overflow: hidden;
            }
            .angel-football-card img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                /* اگر عکس پس‌زمینه دارد، این خط باعث میشه با تم تاریک سایت ترکیب بشه */
                mix-blend-mode: screen; 
            }
            
            @media (max-width: 400px) {
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

            <!-- Football -->
            <div class="angel-game-card angel-football-card" onclick="alert('بازی فوتبال به زودی اضافه می‌شود!')">
                <img alt="فوتبال" src="data:image/webp;base64,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" />
            </div>
        </div>
    `;
}
