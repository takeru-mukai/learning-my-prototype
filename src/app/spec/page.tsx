"use client";

/**
 * 実装指示書 — ひとり旅プランナー
 *
 * プロトタイプ確定後に実際の仕様に書き換えてください。
 */

const sections = [
  { id: "overview", title: "概要" },
  { id: "components", title: "画面構成" },
  { id: "tokens", title: "デザイントークン" },
  { id: "responsive", title: "レスポンシブ挙動" },
  { id: "edge-cases", title: "エッジケース / 状態" },
] as const;

function SectionNav() {
  return (
    <nav className="flex flex-wrap gap-2 mb-8 text-sm">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="px-3 py-1 rounded-full border border-border text-text-sub hover:bg-bg-surface transition-colors"
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

export default function SpecPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">実装指示書</h1>
      <p className="text-text-sub text-sm mb-6">
        ひとり旅プランナー プロトタイプの実装仕様
      </p>

      <SectionNav />

      {/* --- 1. 概要 --- */}
      <SectionHeading id="overview" title="概要" />
      <div className="space-y-2 text-sm text-text-sub">
        <p>
          <strong className="text-text">ユーザーストーリー:</strong>{" "}
          休日に一人旅をしたいユーザーが、行き先候補を一覧から検索・フィルターして、自分に合った旅行先を見つけたい。
        </p>
        <p>
          <strong className="text-text">スコープ:</strong>{" "}
          行き先一覧画面（検索・カテゴリフィルター付き）。
        </p>
      </div>

      {/* --- 2. 画面構成 --- */}
      <SectionHeading id="components" title="画面構成" />
      <div className="space-y-4 text-sm">
        <div>
          <h3 className="font-medium text-text mb-2">
            行き先一覧{" "}
            <code className="text-xs bg-bg-surface px-1.5 py-0.5 rounded">/</code>
          </h3>
          <ul className="list-disc list-inside text-text-sub space-y-1">
            <li>検索バー（行き先・エリア・タグで検索）</li>
            <li>カテゴリフィルター（すべて / 温泉 / 自然 / グルメ / 歴史・文化 / アート / 離島）</li>
            <li>カード一覧（写真・行き先名・エリア・目安予算・タグ）</li>
          </ul>
        </div>
      </div>

      {/* --- 3. デザイントークン --- */}
      <SectionHeading id="tokens" title="デザイントークン" />
      <p className="text-sm text-text-sub mb-4">
        ワイヤーフレーム段階では --wf-* トークンを使用。
      </p>

      {/* --- 4. レスポンシブ挙動 --- */}
      <SectionHeading id="responsive" title="レスポンシブ挙動" />
      <div className="text-sm text-text-sub space-y-2">
        <p>
          <strong className="text-text">sm (640px):</strong> 1列 → 2列グリッド
        </p>
        <p>
          <strong className="text-text">lg (1024px):</strong> 2列 → 3列グリッド
        </p>
        <p>
          <strong className="text-text">全幅:</strong> 最大幅 max-w-5xl で中央寄せ
        </p>
      </div>

      {/* --- 5. エッジケース / 状態 --- */}
      <SectionHeading id="edge-cases" title="エッジケース / 状態" />
      <div className="space-y-3 text-sm">
        {[
          {
            label: "ローディング",
            desc: "スケルトンUIを表示。カードのアスペクト比を維持したプレースホルダー。",
            link: "/?_v=loading",
          },
          {
            label: "検索結果なし",
            desc: "検索アイコン + 「見つかりませんでした」メッセージ + 条件変更の案内。",
            link: "/?_v=empty",
          },
        ].map((item) => (
          <div key={item.label} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-text">{item.label}</span>
              <a
                href={item.link}
                className="text-xs text-primary hover:underline"
              >
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
