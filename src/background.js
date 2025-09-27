chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'saveParentUrl' && message.target === 'background') {
        console.log('Parent URL to save:', message.url);
        // URLを保存する処理をここに追加
    }
});