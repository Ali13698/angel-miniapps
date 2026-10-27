export function renderModals(): string {
    const avatarOptions = [
        "https://api.dicebear.com/7.x/bottts/svg?seed=1",
        "https://api.dicebear.com/7.x/bottts/svg?seed=2",
        "https://api.dicebear.com/7.x/bottts/svg?seed=3",
        "https://api.dicebear.com/7.x/bottts/svg?seed=4",
        "https://api.dicebear.com/7.x/bottts/svg?seed=5"
    ];
    const bannerOptions = [
        "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
        "linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)",
        "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
    ];

    return `
    <div id="modal-bio" class="modal">
        <div class="modal-content">
            <h3>ویرایش بیوگرافی</h3>
            <textarea id="input-bio" placeholder="درباره من..."></textarea>
            <button class="modal-btn save" id="btn-save-bio">ذخیره</button>
            <button class="modal-btn close" id="btn-close-bio">لغو</button>
        </div>
    </div>
    <div id="modal-avatar" class="modal">
        <div class="modal-content">
            <h3>تغییر آواتار</h3>
            <div class="avatar-grid">
                ${avatarOptions.map(url => `<img src="${url}" class="avatar-option" data-url="${url}" onclick="window.selectAvatar('${url}')">`).join('')}
            </div>
            <button class="modal-btn close" id="btn-close-avatar">بستن</button>
        </div>
    </div>
    <div id="modal-banner" class="modal">
        <div class="modal-content">
            <h3>تغییر بنر</h3>
            <div class="banner-grid">
                ${bannerOptions.map(bg => `<div class="banner-option" style="background:${bg}" onclick="window.selectBanner('${bg}')"></div>`).join('')}
            </div>
            <button class="modal-btn close" id="btn-close-banner">بستن</button>
        </div>
    </div>`;
}
