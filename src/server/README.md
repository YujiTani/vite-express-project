### 各ディレクトリの説明

- **controller/**: ビジネスロジックを含むディレクトリです。各エンドポイントの処理内容を定義します。

- **router/**: ルーティングを管理するディレクトリです。各エンドポイントの URL とコントローラを結びつけます。

- **validator/**: リクエストのバリデーションを行うディレクトリです。`express-validator`を使用して、リクエストデータの検証を行います。

- **main.ts**: アプリケーションのエントリーポイントです。Express アプリケーションを初期化し、サーバーを起動します。
