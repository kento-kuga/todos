# Todos

## 概要

タスク管理アプリ「ToDos」のリポジトリです。
このアプリはポートフォリオとして作成しました。

## アプリ

https://todos-ap.web.app/

## 使用技術

- React.js
- TypeScript
- Semantic UI React
- Firebase
  - Cloud Firestore
  - Authentication
  - Hosting

## ディレクトリ構成（一部抜粋）

```
.
├ src
│ ├ common        アプリ戦隊で使用するもの
│ │ ├ consts      定数
│ │ ├ context     ReactのuseContextを利用したコンテキスト
│ │ ├ css         汎用的なスタイルの定義（styled-componentsの中で変数として参照する）
│ │ ├ dto         DBから取得したデータやフォームの型定義
│ │ ├ helper      汎用的な関数
│ │ └ hooks       カスタムフック
│ ├ components    Reactコンポーネント。Atomic Designの単位で管理。
│ ├ core          アプリのシステムに関連するもの
│ ├ repositories  Firebaseを内包したリポジトリ層
│ └ test          テスト関連（未実装）
└ memo.md         開発時のやることリストと、コーディング規約
```

## コミットメッセージ

- feat: 新しい機能
- improve： 機能改修
- fix: バグの修正
- docs: ドキュメントのみの変更
- refactor: 仕様に影響がないコード改善(リファクタ)
- test: テスト関連

## アピールポイント

以下の notion をご覧ください。

https://www.notion.so/ToDos-5f2dfd442ecb4b008c6eea161bb07a92
