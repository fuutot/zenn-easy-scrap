// ボタンを追加するターゲット要素を取得
const targetSelector = '.ThreadEditor_buttons__Y_Bk5';
const targets = document.querySelectorAll(targetSelector);

// 追加するボタンの設定
const buttonClasses = [
    "Button_primary__VcoA9",
    "Button_baseStyle__Vhn6Y",
    "Button_small__ErWhv",
    "Button_fontBold__BN6Co"
];
const buttonText = '新規Scrap作成';

// ターゲット要素が存在する場合、ボタンを追加
if (targets.length > 0) {
  targets.forEach(target => {
    // 要素ごとにボタンを作成して追加
    const button = document.createElement('button');
    button.textContent = buttonText;
    button.classList.add(...buttonClasses);
    button.addEventListener('click', () => {
      alert('ボタンがクリックされました');
    });
    target.appendChild(button);
  });
};

// 変更を監視して、ターゲット要素が追加されたらボタンを追加する
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const newTargets = node.querySelectorAll(targetSelector);
        newTargets.forEach(target => {
          // 要素ごとにボタンを作成して追加
          const button = document.createElement('button');
          button.textContent = buttonText;
          button.classList.add(...buttonClasses);
          button.addEventListener('click', () => {
            alert('ボタンがクリックされました');
          });
          target.appendChild(button);
        });
      }
    });
  });
});

// ドキュメントの変更を監視
const observeSelector = ".ContainerUndo_undoInSM__1vdc1";  // できるだけ監視対象を絞る
observer.observe(document.querySelector(observeSelector), { childList: true, subtree: true });
