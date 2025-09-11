// ハンバーガーメニュー & モーダル機能
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('menu-toggle');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    
    // フォーカストラップ用の変数
    let focusTrapListener = null;
    
    // フォーカストラップを設定する関数
    function setupFocusTrap() {
        focusTrapListener = function(e) {
            if (e.key === 'Tab') {
                // モーダル内のフォーカス可能な要素を取得
                const focusableElements = modalContent.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                if (focusableElements.length === 0) return;
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    // Shift+Tab: 最初の要素なら最後に移動
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab: 最後の要素なら最初に移動
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        
        document.addEventListener('keydown', focusTrapListener);
    }
    
    // フォーカストラップを解除する関数
    function removeFocusTrap() {
        if (focusTrapListener) {
            document.removeEventListener('keydown', focusTrapListener);
            focusTrapListener = null;
        }
    }
    
    // モーダルHTMLを読み込む関数
    async function loadModal() {
        try {
            const response = await fetch('modal.html');
            if (!response.ok) {
                throw new Error('modal.htmlの読み込みに失敗しました');
            }
            const htmlText = await response.text();
            
            // modal.htmlからbody内のコンテンツのみを抽出
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const modalBodyContent = doc.querySelector('body').innerHTML;
            
            return modalBodyContent;
        } catch (error) {
            console.error('Modal loading error:', error);
            return '<p>モーダルの読み込みに失敗しました</p>';
        }
    }
    
    // モーダルを表示する関数
    async function showModal() {
        // モーダルHTMLを読み込んでコンテンツに挿入
        const modalHTML = await loadModal();
        modalContent.innerHTML = modalHTML;
        
        // 要素の存在確認
        const flameSpElement = modalContent.querySelector('.flame-sp');
        
        // バツボタン（flame-sp）のクリックイベント
        if (flameSpElement) {
            flameSpElement.addEventListener('click', function(e) {
                e.stopPropagation();
                hideModal();
                hamburgerMenu.checked = false;
                const menuTrigger = document.querySelector('.header__menu-trigger');
                menuTrigger.setAttribute('aria-expanded', 'false');
                menuTrigger.setAttribute('aria-label', 'メニューを開く');
            });
            flameSpElement.style.cursor = 'pointer';
            flameSpElement.style.minHeight = '60px';
            flameSpElement.style.width = '100%';
            // タブインデックスを追加してフォーカス可能にする
            flameSpElement.setAttribute('tabindex', '0');
        }
        
        // モーダルを表示
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // スクロールを無効化
        
        // フォーカストラップを設定
        setupFocusTrap();
        
        // 最初のフォーカス可能な要素にフォーカスを当てる
        if (flameSpElement) {
            flameSpElement.focus();
        }
    }
    
    // モーダルを閉じる関数
    function hideModal() {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = ''; // スクロールを有効化
        modalContent.innerHTML = ''; // コンテンツをクリア
        
        // フォーカストラップを解除
        removeFocusTrap();
        
        // ハンバーガーメニューにフォーカスを戻す
        const menuTrigger = document.querySelector('.header__menu-trigger');
        if (menuTrigger) {
            menuTrigger.focus();
        }
    }
    
    // ハンバーガーメニューのクリックイベント
    hamburgerMenu.addEventListener('change', function() {
        const menuTrigger = document.querySelector('.header__menu-trigger');
        
        if (this.checked) {
            showModal();
            menuTrigger.setAttribute('aria-expanded', 'true');
            menuTrigger.setAttribute('aria-label', 'メニューを閉じる');
        } else {
            hideModal();
            menuTrigger.setAttribute('aria-expanded', 'false');
            menuTrigger.setAttribute('aria-label', 'メニューを開く');
        }
    });
    
    // document全体でクリックイベントを監視してモーダル外クリックを検出
    document.addEventListener('click', function(e) {
        // モーダルが表示されていない場合は何もしない
        if (modalOverlay.style.display !== 'flex') {
            return;
        }
        
        // ハンバーガーメニューをクリックした場合は何もしない
        if (hamburgerMenu.contains(e.target) || hamburgerMenu === e.target) {
            return;
        }
        
        // モーダルコンテンツ内をクリックした場合は何もしない
        if (modalContent.contains(e.target)) {
            return;
        }
        
        // モーダル外をクリックした場合は閉じる
        hideModal();
        hamburgerMenu.checked = false;
        const menuTrigger = document.querySelector('.header__menu-trigger');
        menuTrigger.setAttribute('aria-expanded', 'false');
        menuTrigger.setAttribute('aria-label', 'メニューを開く');
    });
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            hideModal();
            hamburgerMenu.checked = false;
            const menuTrigger = document.querySelector('.header__menu-trigger');
            menuTrigger.setAttribute('aria-expanded', 'false');
            menuTrigger.setAttribute('aria-label', 'メニューを開く');
        }
    });
    
    // ボタンクリック時の色変化
    const buttons = document.querySelectorAll('.buttons__button, .classic-sweet-item__button, .seasonal-new-item__button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // クリックされたボタンにactiveクラスを追加
            this.classList.add('active');
            // 200ms後に元の色に戻す
            setTimeout(() => {
                this.classList.remove('active');
            }, 200);
        });
    });
});

// スクロール時のフェードイン効果
$(window).on("scroll",function(){
    $('[data-fadeIn]').each(function(index,el){
        // 要素の上端がウィンドウの下端から80%の位置に来たらフェードイン
        if($(window).scrollTop() + $(window).height() * 0.8 > $(el).offset().top){
            $(el).addClass('is-over');
        }
    });
});