# リファクタリングメモ

- フォルダー選択チェックが、編集モードを抜けても解除されていない
- modal のハンドラ props の名前修正
- taskFolder を taskFolders に変える
- taskFolderList を Folders に変える
- test-id 属性消せるようにする
- 再レンダリングを抑制する
- 不要な通信処理が行われていないか確認
- task の取得とタスクフォルダーの取得は分ける
- リポジトリにてエラーちゃんと表示する
- タスクフォルダー削除時、タスクコレクションも削除する

# ルール

## フォーマット

- コンポーネント内の処理は種類ごとにまとめ、以下のコメントを付ける。
  - //hooks
  - //state
  - //effect
  - //function

## props

- onClick を実行するコンポーネントが受け取るのは onClickProps、それ以外は handlerProps を受け取る

## フォーム

- フォームパーツは、一つのページで共通化する(FormProvider と useFormContext を使用する)
- フォームは親コンポーネントからコンテキストを介してパーツを受け取る
- サブミットの送信はフォーム、サブミット時の処理は親から受け取る

## リポジトリ

- firebase のコレクション名には定数を切る
- リポジトリの関数には doc をつける

## CSS

- 共通の css は common/css/common-style.ts にまとめる
