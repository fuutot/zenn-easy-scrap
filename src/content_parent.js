console.log('Content Parent Script Loaded');

// 子Scrap記事の投稿時にZennのScrapに投稿
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'childScrapPosted') {
        const childUrl = message.url || '不明なURL';
        postToScrap(childUrl);
    }
});

function postToScrap(childUrl) {
    try {
        // Zennのテキストエリア（投稿フォーム）を取得
        const textareaSelector = 'div.cm-line'
        const textarea = document.querySelector(textareaSelector);
        
        if (!textarea) {
            console.error('投稿用のテキストエリアが見つかりません');
            return;
        }

        // 投稿内容を作成
        const postContent = `関連記事を投稿しました\n${childUrl}`;
        
        // テキストエリアに内容を設定
        textarea.innerText = postContent;

        // 少し待ってから投稿ボタンをクリック
        setTimeout(() => {
            const Buttons = document.querySelectorAll('button');
            let submitButton = null;
            Buttons.forEach(btn => {
                if (btn.textContent.includes('投稿する')) {
                    submitButton = btn;
                }
            });

            if (submitButton && !submitButton.disabled) {
                submitButton.click();
                console.log('Scrapに投稿されました:', postContent);
            } else {
                console.warn('投稿ボタンが見つからないか、無効になっています');
            }
        }, 500);
        
    } catch (error) {
        console.error('Scrapへの投稿中にエラーが発生しました:', error);
    }
}