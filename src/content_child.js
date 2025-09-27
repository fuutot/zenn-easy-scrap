console.log('Content Child Script Loaded');

// 現在のタブIDがstorageに存在するかを確認し、存在すればアラートを表示
chrome.runtime.sendMessage(
    { action: 'getCurrentTabInfo', target: 'background' },
    (response) => {
        if (response.exists) {
            const currentTabInfo = response.info;
            console.log('現在のタブ情報:', currentTabInfo);
            alert(`親記事のタブID：${currentTabInfo.parentTabId}`);
        }
    }
);
