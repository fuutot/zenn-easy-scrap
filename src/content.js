// ボタンを追加するターゲット要素のセレクタ
const targetSelector = '.ThreadEditor_buttons__Y_Bk5';

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
  button.addEventListener('click', () => {
    alert('ボタンがクリックされました');
  });
  target.appendChild(button);
}

// 初期表示分
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
