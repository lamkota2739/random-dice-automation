# JavaScript ver.

AutoJs6の環境でAndroid端末を自動操作するJavaScriptスクリプト群。

## 環境設定

### 権限の付与

- スクリプト実行時に表示される許可を予め付与: `adb shell appops set org.autojs.autojs6 PROJECT_MEDIA allow`
  - パッケージの確認: `adb shell "pm list packages | grep autojs"`

## Coop-Distortion-Monolith実行手順

1. 実行するJavaScriptスクリプトが配置されている`src`フォルダをAutoJs6のworking dirに設定。
1. サブ端末の開発者モードをONにし、"Stay awake"の項目をONにする。
1. サブ端末にメイン垢、メイン端末にサブ垢でログイン。
1. サブ端末側でルームを作成し、ゲーム開始。
1. メイン端末側で適当にダイスを出しつつ、サブ端末側で盤面作成。
1. 盤面が安定してきたらメイン端末側のアプリをタスキル。
1. サブ端末側で盤面を完成まで持って行く。
1. 盤面完成。
1. 盤面操作の隙を見て「明るさ変更」「音量変更」を行う。
1. boss wave終了後1秒後くらいにAutoJs6のフローティングボタンから`main_integrated.js`を実行。
1. 実行開始後、最初のモノリスが発射されるまで3秒程度かかるため、その間敵が入らないように自分で操作。
1. サブ端末を充電器に接続し、充電されていることを確認して放置。
1. 以上。

### 停止手順

1. AutoJs6のフローティングボタンからスクリプトを停止。
1. 以上。
