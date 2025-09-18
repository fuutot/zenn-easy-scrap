// ボタン要素を作成
const button = document.createElement('button');
button.textContent = '新規Scrap作成';

// ボタンを追加するターゲット要素を取得
const targetSelector = '.ThreadEditor_buttons__Y_Bk5';
const targets = document.querySelectorAll(targetSelector);

// ターゲット要素が存在する場合、ボタンを追加
if (targets.length > 0) {
  targets.forEach(target => {
    target.appendChild(button);
  });
} else {
  console.log(`ターゲット要素が見つかりません: ${targetSelector}`);
}

// ボタンのクリックイベント
button.addEventListener('click', () => {
  alert('ボタンがクリックされました');
});