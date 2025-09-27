chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'createNewScrapTab' && message.target === 'background') {
        // 新しいタブを作成
        const newScrapUrl = 'https://zenn.dev/scraps/new';
        chrome.tabs.create({ url: newScrapUrl }, (tab) => {
            console.log('新しいタブが作成されました。タブID:', tab.id);
            
            // レスポンスとしてタブIDを返す
            sendResponse({ tabId: tab.id, success: true });
            
            // 親URLとタブIDの関連付けを保存
            childTabId = tab.id.toString();
            chrome.storage.session.set({[childTabId]: {'url': null, 'parentTabId': sender.tab.id.toString()}}).then(() => {
                console.log('新しいタブの情報が保存されました');
            });
        });
        
        // 非同期レスポンスを使用することを示す
        return true;
    }
});