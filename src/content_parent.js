console.log('Content Parent Script Loaded');

// 子Scrap記事の投稿時にアラートを表示
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'childScrapPosted') {
        const childUrl = message.url || '不明なURL';
        alert(`子記事が投稿されました！\n記事URL: ${childUrl}`);
    }
});