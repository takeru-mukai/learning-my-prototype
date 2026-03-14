"use client";

/**
 * 実装指示書 — ひとり旅プランナー
 */

const sections = [
  { id: "overview", title: "概要" },
  { id: "screens", title: "画面一覧" },
  { id: "components", title: "コンポーネント仕様" },
  { id: "tokens", title: "デザイントークン" },
  { id: "responsive", title: "レスポンシブ挙動" },
  { id: "interactions", title: "インタラクション仕様" },
  { id: "edge-cases", title: "エッジケース / 状態" },
] as const;

function SectionNav() {
  return (
    <nav className="flex flex-wrap gap-2 mb-8 text-sm">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="px-3 py-1 rounded-full bg-bg-surface text-text-sub hover:bg-bg-hover transition-colors"
        >
          {s.title}
        </a>
      ))}
    </nav>
  );
}

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="text-lg font-bold mt-12 mb-4 scroll-mt-20">
      <a href={`#${id}`} className="hover:text-primary transition-colors">
        {title}
      </a>
    </h2>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left py-2 px-3 bg-bg-surface text-text-sub font-medium text-xs">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className="py-2.5 px-3 text-text-sub">
                  {j === 0 ? <code className="text-text font-medium text-xs">{cell}</code> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SpecPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">実装指示書</h1>
      <p className="text-text-sub text-sm mb-6">
        ひとり旅プランナー プロトタイプの実装仕様
      </p>

      <SectionNav />

      {/* ─── 1. 概要 ─── */}
      <SectionHeading id="overview" title="概要" />
      <div className="space-y-3 text-sm text-text-sub">
        <p>
          <strong className="text-text">プロダクト名:</strong> ひとり旅プランナー
        </p>
        <p>
          <strong className="text-text">ユーザーストーリー:</strong>{" "}
          休日に一人旅をしたいユーザーが、行き先候補を一覧から検索・フィルターし、
          詳細を確認してレビューを読み、旅程を作成する。
        </p>
        <p>
          <strong className="text-text">技術スタック:</strong>{" "}
          Next.js 15 / React 19 / Tailwind CSS v4 / TypeScript
        </p>
        <p>
          <strong className="text-text">デザイン方針:</strong>{" "}
          Apple HIG準拠。枠線ではなく背景色の差と影で要素を区切る。WCAG 2.1 AA準拠。
        </p>
      </div>

      {/* ─── 2. 画面一覧 ─── */}
      <SectionHeading id="screens" title="画面一覧" />
      <Table
        headers={["画面", "パス", "説明", "パターン数"]}
        rows={[
          ["行き先一覧", "/", "旅行先を検索・フィルターして一覧表示", "3 (default / loading / empty)"],
          ["旅行先 詳細", "/detail", "選んだ旅行先の詳細情報を表示", "5 (layout A/B/C + loading + empty)"],
          ["レビュー一覧", "/detail?_p=review-*", "旅行先のレビューを一覧表示", "2 (card / timeline)"],
          ["旅程作成", "/plan", "旅のスケジュールを作成する", "3 (card / timeline / map)"],
          ["デザインシステム", "/design-system", "カラー・文字・コンポーネントの一覧", "—"],
        ]}
      />

      {/* ─── 3. コンポーネント仕様 ─── */}
      <SectionHeading id="components" title="コンポーネント仕様" />

      <h3 className="font-medium text-text text-sm mt-6 mb-3">DestinationCard（行き先カード）</h3>
      <Table
        headers={["Props", "型", "必須", "説明"]}
        rows={[
          ["destination", "Destination", "はい", "旅行先データオブジェクト"],
        ]}
      />
      <Table
        headers={["子要素", "トークン", "値"]}
        rows={[
          ["カード背景", "--color-bg-surface", "#F2F2F7 (light) / #1C1C1E (dark)"],
          ["カード角丸", "rounded-2xl", "16px"],
          ["写真アスペクト比", "aspect-[4/3]", "4:3"],
          ["タイトル", "font-bold text-text", "16px bold"],
          ["エリア", "text-sm text-text-sub", "14px + MapPinアイコン"],
          ["予算", "text-sm font-bold text-primary", "14px bold 青"],
          ["タグ", "bg-bg-hover rounded-full", "11px pill型"],
        ]}
      />

      <h3 className="font-medium text-text text-sm mt-6 mb-3">CategoryFilter（カテゴリフィルター）</h3>
      <Table
        headers={["Props", "型", "必須", "説明"]}
        rows={[
          ["activeCategory", "Category", "はい", "現在選択中のカテゴリ"],
          ["onChange", "(cat: Category) => void", "はい", "カテゴリ変更時のハンドラー"],
        ]}
      />
      <Table
        headers={["状態", "背景", "文字色"]}
        rows={[
          ["選択中", "--color-primary (#147EDF)", "--color-on-fill (#FFFFFF)"],
          ["非選択", "--color-bg-input (#E5E5EA)", "--color-text-sub (#636366)"],
          ["ホバー", "--color-bg-hover (#D8D8DD)", "--color-text-sub"],
        ]}
      />

      <h3 className="font-medium text-text text-sm mt-6 mb-3">SearchBar（検索バー）</h3>
      <Table
        headers={["Props", "型", "必須", "説明"]}
        rows={[
          ["value", "string", "はい", "入力値"],
          ["onChange", "(value: string) => void", "はい", "入力変更時のハンドラー"],
        ]}
      />
      <Table
        headers={["要素", "トークン", "値"]}
        rows={[
          ["背景", "--color-bg-input", "#E5E5EA (light) / #2C2C2E (dark)"],
          ["角丸", "rounded-xl", "12px"],
          ["アイコン", "Search (lucide)", "16px text-text-hint"],
          ["プレースホルダー", "text-text-hint", "#7C7C80"],
          ["フォーカス", "ring-2 ring-primary/30", "青のリング"],
        ]}
      />

      <h3 className="font-medium text-text text-sm mt-6 mb-3">BackButton（戻るボタン）</h3>
      <Table
        headers={["Props", "型", "必須", "説明"]}
        rows={[
          ["href", "string", "いいえ", "遷移先（デフォルト: /）"],
          ["light", "boolean", "いいえ", "白文字バージョン（ヒーロー画像上で使用）"],
        ]}
      />

      <h3 className="font-medium text-text text-sm mt-6 mb-3">ReviewPreview（レビュープレビュー）</h3>
      <Table
        headers={["Props", "型", "必須", "説明"]}
        rows={[
          ["destId", "string", "はい", "旅行先ID（レビュー全件への遷移リンクに使用）"],
        ]}
      />

      <h3 className="font-medium text-text text-sm mt-6 mb-3">StatusBadge（ステータスバッジ）</h3>
      <Table
        headers={["Props", "型", "必須", "説明"]}
        rows={[
          ["variant", "'positive' | 'negative' | 'info' | 'default'", "はい", "バッジの種類"],
          ["label", "string", "はい", "表示テキスト"],
        ]}
      />
      <Table
        headers={["variant", "背景", "文字色"]}
        rows={[
          ["positive", "--color-positive-subtle", "--color-positive"],
          ["negative", "--color-negative-subtle", "--color-negative"],
          ["info", "--color-primary-subtle", "--color-primary"],
          ["default", "--color-bg-hover", "--color-text-sub"],
        ]}
      />

      {/* ─── 4. デザイントークン ─── */}
      <SectionHeading id="tokens" title="デザイントークン" />
      <p className="text-sm text-text-sub mb-4">
        <code className="bg-bg-surface px-1.5 py-0.5 rounded text-xs">globals.css</code> で定義。
        テーマは <code className="bg-bg-surface px-1.5 py-0.5 rounded text-xs">data-theme</code> 属性で切り替え。
      </p>
      <Table
        headers={["トークン", "Light", "Dark", "用途"]}
        rows={[
          ["--color-bg", "#FFFFFF", "#000000", "ページ背景"],
          ["--color-bg-surface", "#F2F2F7", "#1C1C1E", "カード・セクション背景"],
          ["--color-bg-input", "#E5E5EA", "#2C2C2E", "検索窓・フィルター背景"],
          ["--color-bg-hover", "#D8D8DD", "#48484A", "タグ・ホバー時背景"],
          ["--color-text", "#1D1D1F", "#F5F5F7", "メイン文字"],
          ["--color-text-sub", "#636366", "#98989D", "補足文字"],
          ["--color-primary", "#147EDF", "#147EDF", "アクション・リンク"],
        ]}
      />

      {/* ─── 5. レスポンシブ挙動 ─── */}
      <SectionHeading id="responsive" title="レスポンシブ挙動" />
      <Table
        headers={["ブレークポイント", "カード列数", "レイアウト変化"]}
        rows={[
          ["〜639px (mobile)", "1列", "縦積み、全幅カード"],
          ["640px〜 (sm)", "2列", "2カラムグリッド"],
          ["1024px〜 (lg)", "3列", "3カラムグリッド"],
        ]}
      />
      <div className="text-sm text-text-sub space-y-2">
        <p><strong className="text-text">最大幅:</strong> max-w-5xl (1024px) で中央寄せ</p>
        <p><strong className="text-text">ページ余白:</strong> px-5 (20px)</p>
        <p><strong className="text-text">詳細画面パターンA:</strong> lg未満では縦積みにフォールバック</p>
      </div>

      {/* ─── 6. インタラクション仕様 ─── */}
      <SectionHeading id="interactions" title="インタラクション仕様" />
      <Table
        headers={["要素", "トリガー", "アニメーション", "時間"]}
        rows={[
          ["カード", "ホバー", "translateY(-2px) + 画像scale(1.05)", "200ms / 300ms"],
          ["カテゴリピル", "クリック", "即時切り替え + 検索リセット", "—"],
          ["検索バー", "フォーカス", "ring-2 ring-primary/30 表示", "200ms"],
          ["検索バー", "入力", "リアルタイムフィルタリング（デバウンスなし）", "即時"],
          ["戻るボタン", "クリック", "Next.js Link遷移（SPAナビゲーション）", "—"],
          ["Compareパネル", "パターン選択", "ドロワーを閉じずにページ遷移", "—"],
          ["テーマ切り替え", "クリック", "背景色・文字色のトランジション", "300ms"],
        ]}
      />

      {/* ─── 7. エッジケース / 状態 ─── */}
      <SectionHeading id="edge-cases" title="エッジケース / 状態" />
      <div className="space-y-3 text-sm">
        {[
          { label: "一覧 ローディング", desc: "スケルトンUI（6枚のカードプレースホルダー）を表示。アスペクト比4:3を維持。", link: "/?_v=loading" },
          { label: "一覧 検索結果なし", desc: "検索アイコン（32px）+ 「検索結果がありません」+ 条件変更の案内テキスト。", link: "/?_v=empty" },
          { label: "詳細 ローディング", desc: "画像・テキスト・ボタンのスケルトンUI。パルスアニメーション。", link: "/detail?_v=loading" },
          { label: "詳細 見つからない", desc: "MapPinアイコン（32px）+ 「旅行先が見つかりません」+ 一覧に戻るボタン。", link: "/detail?_v=empty" },
          { label: "類似検索フォールバック", desc: "完全一致なし → 類似キーワード → 全件表示の3段階フォールバック。案内バナー表示。", link: "/" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl bg-bg-surface p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-text">{item.label}</span>
              <a href={item.link} className="text-xs text-primary hover:underline">
                プロトで確認 →
              </a>
            </div>
            <p className="text-text-sub">{item.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
