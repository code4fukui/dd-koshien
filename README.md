# dd-koshien

- [エントリー一覧](https://code4fukui.github.io/dd-koshien/)
- [動画エントリー一覧](https://code4fukui.github.io/dd-koshien/movie.html)
- [動画エントリー一覧（全件、読込長い）](https://code4fukui.github.io/dd-koshien/movie-all.html)

## auto update

```
mkdir .github
mkdir .github/workflows
cat > .github/workflows/scheduled-update.yml
```

```
name: Scheduled 

on:
  schedule:
    # 毎日18:25分に実行 (JST=UTC+9)
    - cron: '25 9 * * *'

jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - name: fetch
        run: cd deno; deno run -A download.js
      - name: commit and push
        run: |
          git config --global user.email "workflow@example.com"
          git config --global user.name "workflow user"
          git add .
          git commit -m 'update data' && git push ${REPO} HEAD:${{github.event.pull_request.head.ref}} || true
          git push
```

## for nettv.gov-online

- 動画表示コンポーネント [createNetTV.js](createNetTV.js)

