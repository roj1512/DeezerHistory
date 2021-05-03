# Deezer History — Tell others what you were lisening to on Deezer

### Publicly hosted as [@DeezerHistoryBot](https://t.me/DeezerHistoryBot).

#### Caching in a chat, sending `InlineQueryResultCachedPhoto` and the generated graphics are inspirations from [@NeelPlaysAC](https://github.com/NeelPlaysAC)’s [spotipie-bot](https://github.com/NeelPlaysAC/spotipie-bot).

## Requirements

- Node.JS
- Google Chrome/Chromium browser
- A MongoDB

## Running

1. Install Typescript:

```bash
npm install typescript
```

2. Build:

```bash
npm run build
```

3. Copy example.env to .env:

```bash
cp example.env .env
```

4. Add your credentials:

`BOT_TOKEN` > A bot token from [@BotFather](https://t.me/BotFather).

`DB_URI` > A MongoDB URI.

`CACHE_CHAT_ID` > ID of a chat where the bot can send photos to cache them for inline results.

5. Install PM2:

```bash
npm install pm2
```

6. Start the bot:

```bash
pm2 start dist --name deezer-history
```

## License

### GNU Affero General Public License v3.0

[Read more](http://www.gnu.org/licenses/#AGPL)
