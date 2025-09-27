chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'createNewScrapTab' && message.target === 'background') {
        console.log('Parent URL to save:', message.parentUrl);
        
        // 新しいタブを作成
        const newScrapUrl = 'https://zenn.dev/scraps/new';
        chrome.tabs.create({ url: newScrapUrl }, (tab) => {
            console.log('新しいタブが作成されました。タブID:', tab.id);
            
            // レスポンスとしてタブIDを返す
            sendResponse({ tabId: tab.id, success: true });
            
            // 親URLとタブIDの関連付けを保存する処理をここに追加
            // 例: chrome.storage.local.set({ [tab.id]: message.parentUrl });
        });
        
        // 非同期レスポンスを使用することを示す
        return true;
    }
});