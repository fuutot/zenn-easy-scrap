# Zenn Easy Scrap
Scrap編集画面から簡単に新たなScrapを作成できるChrome拡張機能です。
ZennのScrap記事画面からScrap記事を作ることができます。
作成された新しいScrap記事は、作成元のScrap記事からリンクが貼られます。

## 問題意識
- Zennでスレッド形式の議論や関連する複数のScrapを作成する際、手動でリンクを貼る作業が煩雑
- Scrap作成後に元記事に戻ってリンクを追加する手間が発生
- 関連記事同士の連携が取りにくい

## 機能
- **新規Scrap作成ボタン**: Scrap編集画面に「新規Scrap作成」ボタンを追加
- **自動リンク投稿**: 新しいScrapを投稿すると、親となるScrapに自動でリンクが投稿される
- **リアルタイム監視**: DOM変更を監視して、動的にボタンを追加

## 使用方法
1. ZennのScrap編集画面を開く
2. 「新規Scrap作成」ボタンをクリック
3. 新しいタブでScrap作成画面が開く
4. 新しいScrapを投稿すると、元のScrapに自動でリンクが追加される

## 技術仕様
- **Manifest Version**: 3
- **対象サイト**: `https://zenn.dev/*/scraps/*`
- **権限**: tabs, storage
- **主要ファイル**:
  - [`src/content.js`](src/content.js): ボタンの追加とクリックハンドリング
  - [`src/background.js`](src/background.js): タブ管理とメッセージング
  - [`src/content_parent.js`](src/content_parent.js): 親Scrapへの自動投稿
  - [`src/content_child.js`](src/content_child.js): 子Scrapでの情報表示

## インストール方法
1. Chrome拡張機能の開発者モードを有効にする
2. 「パッケージ化されていない拡張機能を読み込む」でこのフォルダを選択
3. Zennのサイトにアクセスして使用開始

## 動作フロー
1. ユーザーがScrap編集画面で「新規Scrap作成」ボタンをクリック
2. [`background.js`](src/background.js)が新しいタブを作成し、親子関係をstorageに保存
3. 新しいScrapでページが読み込まれると、[`content_child.js`](src/content_child.js)が親タブ情報を表示
4. 子Scrapが投稿されると、[`content_parent.js`](src/content_parent.js)が親Scrapに自動でリンクを投稿