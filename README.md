# kinki-viewer

## 環境

- node 16.13.1 (>= 14)
- yarn

## ライブラリ

- Next.js v12
- three.js v136
- stats.js

### style
- emotion

### GUI
- dat.gui v6

### tween
- anime.js v3
- @tween.js/tweenjs

### store
- ★ redux ( with next-redux-wrapper & redux toolkit )

### lint
- eslint
- prettier

## フォルダ構成
- /public
  - 画像、hdrデータなど
- /src
  - /components - 各コンポーネンツ
  - /hooks - フック
  - /layout - Next上でのページ構築に必要なファイル
  - /pages - ページ
  - /store - ストア
  - /type - typescript用タイプ定義
  - /utils - 計算など関数の集合

## 利用時の注意点
- threeを用いたコンポーネントを利用するときは、dynamic import機能で`ssr:false` にする
```
// @/components/Boxはデフォルトエクスポート(export default Box)されている必要あり。
// そうでないと、dynamic importできない

const Box = dynamic(() => import('@/components/Box'), {
  ssr: false,
})

```
