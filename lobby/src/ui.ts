import { fetchProfileData, toggleLike } from './api.js';
import { initModals } from '../../profile/src/modals.js';
import { renderModals } from '../../profile/src/ui/modals.js';

export async function renderProfileScreen() {
    const container = document.getElementById('screen-profile');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align:center;padding:50px;color:#888;">در حال دریافت...</div>';
    const user = await fetchProfileData();
    
    if (!user) {
        container.innerHTML = '<div style="text-align:center;padding:50px;color:#ef4444;">خطا در دریافت اطلاعات</div>';
        return;
    }

    const avatarUrl = user.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=" + user.id;
    
    const headerAvatar = document.querySelector('#header-avatar svg');
    if (headerAvatar) {
        headerAvatar.outerHTML = `<img src="${avatarUrl}" style="width:100%; height:100%; object-fit:cover;">`;
    }

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
                <div class="name" style="color:${user.profile_color || '#c084fc'}">${user.display_name || user.game_username}</div>
                <div class="username">@${user.game_username}</div>
                <div class="bio-wrapper">
                    <span class="bio" id="profile-bio">${user.bio || "بیوگرافی..."}</span>
                    <button class="pencil-btn" id="btn-edit-bio">✏️</button>
                </div>
            </div>
            <div class="main-stats">
                <div class="stat-box" id="like-box" style="cursor:pointer;">
                    <div class="stat-value" id="heart-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </div>
                    <div class="stat-label" id="likes-count">${user.likes_count || 0}</div>
                </div>
                <div class="stat-box"><div class="stat-value">${user.age_days || 1}</div><div class="stat-label">روز</div></div>
                <div class="stat-box"><div class="stat-value">${user.wins || 0}</div><div class="stat-label">برد</div></div>
            </div>
            <div class="action-buttons">
                <button class="btn-square-small green">💎 ${user.gems || 0}</button>
                <button class="btn-square-small">🪙 ${user.coins || 0}</button>
            </div>
        </div>
        ${renderModals()}
    `;

    initModals(user);

    // لایک زنده و ذخیره در دیتابیس
    let isLiked = false;
    document.getElementById('like-box')?.addEventListener('click', async () => {
        const icon = document.getElementById('heart-icon')?.querySelector('svg');
        const countEl = document.getElementById('likes-count');
        
        // تغییر ظاهر فوری (Optimistic UI)
        const newIsLiked = !isLiked;
        if (icon) {
            icon.setAttribute('fill', newIsLiked ? '#ef4444' : 'none');
            icon.setAttribute('stroke', newIsLiked ? '#ef4444' : '#ffffff');
        }
        if (countEl) {
            let count = parseInt(countEl.innerText);
            countEl.innerText = (newIsLiked ? count + 1 : Math.max(0, count - 1)).toString();
        }

        // ارسال به سرور
        const success = await toggleLike(user.id, newIsLiked);
        if (success) {
            isLiked = newIsLiked;
        } else {
            // اگر خطا داد، ظاهر را برمی‌گردانیم
            if (icon) {
                icon.setAttribute('fill', isLiked ? '#ef4444' : 'none');
                icon.setAttribute('stroke', isLiked ? '#ef4444' : '#ffffff');
            }
            if (countEl) countEl.innerText = user.likes_count.toString();
            alert("خطا در ثبت لایک");
        }
    });
}
