export function renderModals(): string {
    return `
    <div id="modal-bio" class="modal">
        <div class="modal-content">
            <h3>ویرایش بیوگرافی</h3>
            <textarea id="input-bio" placeholder="درباره من..."></textarea>
            <button class="modal-btn save" id="btn-save-bio">ذخیره</button>
            <button class="modal-btn close" id="btn-close-bio">لغو</button>
        </div>
    </div>
    `;
}
