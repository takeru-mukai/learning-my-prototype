# Design System

プロジェクトのデザイントークンと制約を定義するファイルです。
Claude Code はプロトタイプ作成時にこのファイルを最初に読み込みます。

詳細なデザインシステムは `DESIGN_SYSTEM.md` を参照してください。
Webで閲覧: `/design-system` ページ

## Theme（テーマ）

ダークテーマとライトテーマの両方に対応しています。

- **ライトテーマ**: デフォルト。薄グレー背景（#F5F5F7）に暗い文字
- **ダークテーマ**: Figmaデザイン準拠。黒背景に明るい文字
- **自動切り替え**: ユーザーのOS設定に連動

テーマ切り替えは `data-theme` 属性で制御：
```html
<html data-theme="light">  <!-- ライト -->
<html data-theme="dark">   <!-- ダーク -->
```

## Brand Colors

`globals.css` にカラートークンが定義されています。

```
Primary:       #147EDF（Blue）
Primary Hover: #1170C7
Primary Press: #0E5FA8
Accent:        #E85121（Orange）
```

## Accessibility（WCAG 2.1 AA 準拠）

色やテキストを変更する際は、以下のコントラスト比を必ず満たすこと。

- **通常テキスト（14px以下）**: 背景に対し **4.5:1** 以上
- **大きなテキスト（18px bold / 24px 以上）**: 背景に対し **3:1** 以上
- **UIコンポーネント（ボタン・入力欄の境界）**: 隣接色に対し **3:1** 以上
- **プレースホルダー**: 補助的な情報のため 3:1 を目安とする

## Design Constraints（Apple HIG 準拠）

- One screen, one purpose（1画面1目的）
- Mobile-first（iPhone 375px 基準）
- ページ左右マージン: 20px
- **枠線（border）ではなく、背景色の差と影で要素を区切る**
- **ホバー: 背景色変化 + わずかな浮き上がり（translateY）**
- **すりガラス効果: ヘッダー・タブバーに backdrop-filter blur**
- No decorative SVG/illustrations or animated backgrounds
- Icons: lucide-react only

## Typography

- Font: System font stack（-apple-system, BlinkMacSystemFont, 'Hiragino Sans', ...）
- 見出し: SF Pro Display 相当 — bold/semibold
- 本文: SF Pro Text 相当 — regular/medium
- 日本語: Hiragino Sans

## Token Reference

See `src/app/globals.css` for the full token list:

### テーマ共通トークン（@theme）
- Gray: `--color-gray-0` ~ `--color-gray-900`
- Accent: `--color-blue`, `--color-orange`
- Typography: `--text-hero` ~ `--text-micro`
- Spacing: `--spacing-1` (4px) ~ `--spacing-10` (40px)
- Radius: `--radius-xs` (5px) ~ `--radius-full` (9999px)
- Shadow: `--shadow-card`, `--shadow-card-hover`, `--shadow-float`
- Wireframe: `--color-wf-bg`, `--color-wf-surface`, `--color-wf-border`, `--color-wf-text`, `--color-wf-text-sub`, `--color-wf-accent`

### テーマ切り替えトークン（:root / [data-theme]）
- Background: `--color-bg`, `--color-bg-surface`, `--color-bg-elevated`, `--color-bg-hover`
- Text: `--color-text`, `--color-text-sub`, `--color-text-hint`
- Border: `--color-border`, `--color-border-strong`（控えめに使う）
- Primary: `--color-primary`, `--color-primary-hover`, `--color-primary-press`
- Tab: `--color-tab-bg`, `--color-tab-active`, `--color-tab-inactive`

## Component Naming

コンポーネント名は `DESIGN_SYSTEM.md` のセクション6を参照。
Figma のコンポーネント名とコードの命名を一致させてください。

主要なラベル・バッジパーツ:
- `Tag` — コンテンツ分類タグ（pill型、bg-hover背景）
- `CategoryItem` — フィルターピル（選択時: primary塗り）
- `StatusBadge` — ステータス表示（positive / negative / info / default）
- `AppItem/price` — 価格ボタン（pill型、70×32px）
