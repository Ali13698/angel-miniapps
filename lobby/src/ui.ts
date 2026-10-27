import { fetchProfileData } from './api.js';

export async function renderProfileScreen() {
    const container = document.getElementById('screen-profile');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align:center;padding:50px;color:#888;">در حال دریافت اطلاعات...</div>';

    const user = await fetchProfileData();
    
    if (!user) {
        container.innerHTML = '<div style="text-align:center;padding:50px;color:#ef4444;">خطا در دریافت اطلاعات پروفایل</div>';
        return;
    }

    const wins = user.wins || 0;
    const coins = user.coins || 0;
    const gems = user.gems || 0;
    const likes = user.likes_count || 0;
    const age = user.age_days || 1;
    const displayName = user.display_name || user.game_username || "کاربر مهمان";
    const gameUsername = user.game_username || "unknown";
    const bio = user.bio || "بیوگرافی...";
    
    // آواتار پیش‌فرض در صورت نبود عکس
    const avatarUrl = user.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=" + user.id;

    container.innerHTML = `
        <div class="profile-card">
            <div class="banner" style="background: ${user.banner_id || 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)'}; background-size: cover;">
                <button class="plus-badge banner-plus" id="btn-edit-banner">+</button>
            </div>
            <div class="avatar-container">
                <div class="avatar"><img id="profile-avatar-img" src="${avatarUrl}" /></div>
                <button class="plus-badge avatar-plus" id="btn-change-avatar">+</button>
            </div>
            <div class="profile-info">
                <div class="name" style="color:${user.profile_color || '#c084fc'}">${displayName}</div>
                <div class="username">@${gameUsername}</div>
                <div class="bio-wrapper">
                    <span class="bio" id="profile-bio">${bio}</span>
                    <button class="pencil-btn" id="btn-edit-bio">✏️</button>
                </div>
            </div>
            <div class="main-stats">
                <div class="stat-box" id="like-box" style="cursor:pointer;">
                    <div class="stat-value" id="heart-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </div>
                    <div class="stat-label" id="likes-count">${likes}</div>
                </div>
                <div class="stat-box"><div class="stat-value">${age}</div><div class="stat-label">روز</div></div>
                <div class="stat-box"><div class="stat-value">${wins}</div><div class="stat-label">برد</div></div>
            </div>
            <div class="action-buttons">
                <button class="btn-square-small green">💎 ${gems}</button>
                <button class="btn-square-small">🪙 ${coins}</button>
            </div>
        </div>
    `;

    // فعال کردن دکمه‌های ویرایش
    const { initModals } = await import('../../profile/src/modals.js');
    initModals(user);
}
