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
    else if (message.action === 'getCurrentTabInfo' && message.target === 'background') {
        // 現在のタブIDを取得
        if (sender.tab && sender.tab.id) {
            const currentTabId = sender.tab.id.toString();
            chrome.storage.session.get(currentTabId).then((result) => {
                if (result && result[currentTabId]) {
                    // タブ情報が存在する場合、レスポンスとして返す
                    currentTabInfo = result[currentTabId];
                    currentTabInfo.url = sender.tab.url;
                    chrome.storage.session.set({[currentTabId]: currentTabInfo}).then(() => {
                        console.log('現在のタブのURL情報が更新されました');
                    });
                    sendResponse({ exists: true, info: currentTabInfo });
                } else {
                    // タブ情報が存在しない場合
                    sendResponse({ exists: false });
                }
            });
        }
        return true;
    }
});