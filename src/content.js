function handleClick() {
  // 親のScrap記事のURLを保存
  const parentUrl = window.location.href;

  // background.jsにメッセージを送信（新しいタブ作成を依頼）
  chrome.runtime.sendMessage(
    {
      action: 'createNewScrapTab',
      target: 'background',
      parentUrl: parentUrl
    },
    (response) => {
      if (response && response.tabId) {
        console.log('新しいタブが作成されました。タブID:', response.tabId);
        // 必要に応じて、タブIDを使った追加処理をここに記述
      }
    }
  );
}

// ボタン生成＆追加処理を関数化
function addButtonToTarget(target) {
  // 既にボタンが追加されていないかチェック（重複防止）
  if (target.querySelector('.scrap-create-btn')) return;

  const button = document.createElement('button');
  const buttonClasses = [
    "Button_primary__VcoA9",
    "Button_baseStyle__Vhn6Y",
    "Button_small__ErWhv",
    "Button_fontBold__BN6Co"
  ];
  const buttonText = '新規Scrap作成';
  button.textContent = buttonText;
  button.classList.add(...buttonClasses, 'scrap-create-btn');
  button.addEventListener('click', handleClick);
  target.appendChild(button);
}

// 初期表示分
const targetSelector = '.ThreadEditor_buttons__Y_Bk5';  // ボタンを追加するターゲット要素のセレクタ
document.querySelectorAll(targetSelector).forEach(addButtonToTarget);

// 変更を監視して、ターゲット要素が追加されたらボタンを追加する
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // 追加ノード自身がターゲットの場合も考慮
        if (node.matches && node.matches(targetSelector)) {
          addButtonToTarget(node);
        }
        // 子孫も検索
        node.querySelectorAll && node.querySelectorAll(targetSelector).forEach(addButtonToTarget);
      }
    });
  });
});

// ドキュメントの変更を監視
const observeSelector = ".ContainerUndo_undoInSM__1vdc1";  // できるだけ監視対象を絞る
const observeTarget = document.querySelector(observeSelector);
if (observeTarget) {
  observer.observe(observeTarget, { childList: true, subtree: true });
}
