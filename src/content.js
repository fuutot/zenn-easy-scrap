// ボタン要素を作成
const button = document.createElement('button');
button.textContent = '新規Scrap作成';

// ボタンをページに追加
document.body.appendChild(button);

// ボタンのクリックイベント
button.addEventListener('click', () => {
  alert('ボタンがクリックされました');
});