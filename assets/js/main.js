// ハンバーガーメニュー & モーダル機能
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('menu-toggle');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    
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
        
        // デバッグ: 要素の存在確認
        console.log('Modal loaded, searching for flame-sp...');
        const flameSpElement = modalContent.querySelector('.flame-sp');
        console.log('flame-sp element found:', flameSpElement);
        
        // バツボタン（flame-sp）のクリックイベント
        if (flameSpElement) {
            console.log('Adding click event to flame-sp');
            flameSpElement.addEventListener('click', function(e) {
                console.log('flame-sp clicked!');
                e.stopPropagation();
                hideModal();
                hamburgerMenu.checked = false;
            });
            flameSpElement.style.cursor = 'pointer';
            flameSpElement.style.minHeight = '60px';
            flameSpElement.style.width = '100%';
        }
        
        // 全体クリックテスト
        modalContent.addEventListener('click', function(e) {
            console.log('Modal content clicked:', e.target);
            if (e.target.classList.contains('flame-sp')) {
                console.log('flame-sp detected via event target');
                hideModal();
                hamburgerMenu.checked = false;
            }
        });
        
        // モーダルを表示
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // スクロールを無効化
    }
    
    // モーダルを閉じる関数
    function hideModal() {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = ''; // スクロールを有効化
        modalContent.innerHTML = ''; // コンテンツをクリア
    }
    
    // ハンバーガーメニューのクリックイベント
    hamburgerMenu.addEventListener('change', function() {
        if (this.checked) {
            showModal();
        } else {
            hideModal();
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
    });
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            hideModal();
            hamburgerMenu.checked = false;
        }
    });
    
    // ボタンクリック時の色変化
    const buttons = document.querySelectorAll('.buttons__button, .sensai-item__button, .tabekata-item__button');
    
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
        if($(window).scrollTop() > ($(el).offset().top - $(window).height() / 2)){
            $(el).addClass('is-over');
        }
    });
});