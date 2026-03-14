"use client";

import { useState, useEffect } from "react";

/**
 * QA チェックリスト — ひとり旅プランナー
 */

type Priority = "P0" | "P1" | "P2";

interface TestCase {
  id: string;
  title: string;
  steps: string[];
  expected: string;
  priority: Priority;
}

interface QASection {
  id: string;
  title: string;
  cases: TestCase[];
}

const priorityStyles: Record<Priority, { bg: string; text: string; label: string }> = {
  P0: { bg: "bg-negative-subtle", text: "text-negative", label: "P0 — 必須（リリースブロッカー）" },
  P1: { bg: "bg-primary-subtle", text: "text-primary", label: "P1 — 重要" },
  P2: { bg: "bg-bg-surface", text: "text-text-sub", label: "P2 — あると良い" },
};

const templateSections: QASection[] = [
  // ─── 行き先一覧 ───
  {
    id: "destination-list",
    title: "行き先一覧（/）",
    cases: [
      {
        id: "list-1",
        title: "初期表示で全行き先が表示される",
        steps: ["トップページ（/）を開く"],
        expected: "6件の行き先カードが3列グリッドで表示される",
        priority: "P0",
      },
      {
        id: "list-2",
        title: "カテゴリフィルターで絞り込みできる",
        steps: ["トップページを開く", "「温泉」フィルターをタップする"],
        expected: "温泉タグを持つ行き先のみ表示され、件数表示が更新される",
        priority: "P0",
      },
      {
        id: "list-3",
        title: "検索バーで行き先を検索できる",
        steps: ["検索バーに「金沢」と入力する"],
        expected: "金沢のカードのみ表示される",
        priority: "P0",
      },
      {
        id: "list-4",
        title: "カードクリックで詳細画面に遷移する",
        steps: ["任意の行き先カードをクリックする"],
        expected: "/detail?id=X に遷移し、該当する旅行先の詳細が表示される",
        priority: "P0",
      },
      {
        id: "list-5",
        title: "検索結果なし状態が正しく表示される",
        steps: ["/?_v=empty にアクセスする"],
        expected: "検索アイコン + 「検索結果がありません」メッセージが中央に表示される",
        priority: "P1",
      },
      {
        id: "list-6",
        title: "ローディング状態が正しく表示される",
        steps: ["/?_v=loading にアクセスする"],
        expected: "6枚のスケルトンカードがパルスアニメーションで表示される",
        priority: "P1",
      },
      {
        id: "list-7",
        title: "類似検索で代替結果が表示される",
        steps: ["検索バーに「お風呂」と入力する"],
        expected: "案内バナー + 温泉関連の行き先が表示される",
        priority: "P2",
      },
    ],
  },

  // ─── 旅行先 詳細 ───
  {
    id: "destination-detail",
    title: "旅行先 詳細（/detail）",
    cases: [
      {
        id: "detail-1",
        title: "詳細情報が正しく表示される",
        steps: ["一覧から箱根カードをクリックして詳細に遷移する"],
        expected: "箱根の画像・名前・エリア・予算・タグ・説明が表示される",
        priority: "P0",
      },
      {
        id: "detail-2",
        title: "「旅程を作成する」ボタンで旅程作成画面に遷移する",
        steps: ["詳細画面で「旅程を作成する」ボタンをクリック"],
        expected: "/plan?id=X に遷移する",
        priority: "P0",
      },
      {
        id: "detail-3",
        title: "「戻る」ボタンで一覧に戻れる",
        steps: ["詳細画面で「戻る」をクリック"],
        expected: "行き先一覧（/）に遷移する",
        priority: "P0",
      },
      {
        id: "detail-4",
        title: "レビュープレビューが表示される",
        steps: ["詳細画面を下にスクロールする"],
        expected: "レビュー2件のプレビューと「すべて見る」リンクが表示される",
        priority: "P1",
      },
      {
        id: "detail-5",
        title: "「すべて見る」でレビュー一覧に遷移する",
        steps: ["レビューセクションの「すべて見る」をクリック"],
        expected: "レビュー一覧画面に遷移し、全レビューが表示される",
        priority: "P1",
      },
      {
        id: "detail-6",
        title: "パターンA（横並び）が正しく表示される",
        steps: ["/detail?_p=layout-a にアクセスする"],
        expected: "左にサムネイル、右にテキスト情報が横並びで表示される",
        priority: "P1",
      },
      {
        id: "detail-7",
        title: "パターンC（ヒーロー画像）が正しく表示される",
        steps: ["/detail?_p=layout-c にアクセスする"],
        expected: "全幅ヒーロー画像にテキストがオーバーレイで表示される",
        priority: "P1",
      },
      {
        id: "detail-8",
        title: "空状態が正しく表示される",
        steps: ["/detail?_v=empty にアクセスする"],
        expected: "「旅行先が見つかりません」+ 一覧に戻るボタンが表示される",
        priority: "P2",
      },
    ],
  },

  // ─── レビュー一覧 ───
  {
    id: "review",
    title: "レビュー一覧",
    cases: [
      {
        id: "review-1",
        title: "カード型レビューが正しく表示される",
        steps: ["/detail?_p=review-card にアクセスする"],
        expected: "各レビューがカードで区切られ、アバター・ユーザー名・星・タイトル・本文が表示される",
        priority: "P0",
      },
      {
        id: "review-2",
        title: "タイムライン型レビューが正しく表示される",
        steps: ["/detail?_p=review-timeline にアクセスする"],
        expected: "縦の線でつながったタイムライン形式でレビューが表示される",
        priority: "P1",
      },
      {
        id: "review-3",
        title: "「戻る」で詳細画面に戻れる",
        steps: ["レビュー画面で「戻る」をクリック"],
        expected: "該当旅行先の詳細画面に戻る",
        priority: "P0",
      },
    ],
  },

  // ─── 旅程作成 ───
  {
    id: "plan",
    title: "旅程作成（/plan）",
    cases: [
      {
        id: "plan-1",
        title: "カード追加型が正しく表示される",
        steps: ["/plan にアクセスする"],
        expected: "旅行概要カード + 番号付きスポットリスト + 追加ボタンが表示される",
        priority: "P0",
      },
      {
        id: "plan-2",
        title: "タイムライン型が正しく表示される",
        steps: ["/plan?_p=timeline にアクセスする"],
        expected: "時刻付きタイムラインでスポットが縦に並ぶ",
        priority: "P1",
      },
      {
        id: "plan-3",
        title: "マップ+リスト型が正しく表示される",
        steps: ["/plan?_p=map にアクセスする"],
        expected: "左にルートマップ、右にスポットリストが横並びで表示される",
        priority: "P1",
      },
      {
        id: "plan-4",
        title: "「戻る」で詳細画面に戻れる",
        steps: ["旅程作成画面で「戻る」をクリック"],
        expected: "該当旅行先の詳細画面に戻る",
        priority: "P0",
      },
    ],
  },

  // ─── テーマ・アクセシビリティ ───
  {
    id: "theme",
    title: "テーマ・アクセシビリティ",
    cases: [
      {
        id: "theme-1",
        title: "ダークモードに切り替えできる",
        steps: ["ヘッダー右の「Dark」ボタンをクリック"],
        expected: "背景が黒、文字が白に切り替わり、全要素が正しく表示される",
        priority: "P0",
      },
      {
        id: "theme-2",
        title: "ライトモードに戻せる",
        steps: ["ダークモードで「Light」ボタンをクリック"],
        expected: "元のライトテーマに戻る",
        priority: "P0",
      },
      {
        id: "theme-3",
        title: "テキストのコントラスト比がWCAG AA基準を満たす",
        steps: ["各画面でメイン文字・補足文字の色を確認する"],
        expected: "通常テキスト 4.5:1以上、大テキスト 3:1以上",
        priority: "P1",
      },
      {
        id: "theme-4",
        title: "検索窓・タグが背景と区別できる",
        steps: ["各画面で検索窓・カテゴリピル・タグの視認性を確認する"],
        expected: "背景色との差が明確で、要素の境界が認識できる",
        priority: "P1",
      },
    ],
  },

  // ─── 画面遷移 ───
  {
    id: "navigation",
    title: "画面遷移・ナビゲーション",
    cases: [
      {
        id: "nav-1",
        title: "ヘッダーナビから全ページに遷移できる",
        steps: ["ヘッダーの各リンク（Prototype / Design System / Map / Spec / QA）をクリック"],
        expected: "各ページに正しく遷移する",
        priority: "P0",
      },
      {
        id: "nav-2",
        title: "Compareパネルで切り替え時にドロワーが閉じない",
        steps: ["詳細画面でCompareボタンを開く", "パネル内のパターンをクリックする"],
        expected: "ドロワーは開いたまま、背景のページだけが切り替わる",
        priority: "P1",
      },
      {
        id: "nav-3",
        title: "画面マップが正しく表示される",
        steps: ["/map にアクセスする"],
        expected: "一覧→詳細→レビュー/旅程作成のフローチャートが表示される",
        priority: "P2",
      },
    ],
  },
];

const STORAGE_KEY = "qa-check-state";

function useCheckedState() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setChecked(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const reset = () => {
    setChecked({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return { checked, toggle, reset };
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const style = priorityStyles[priority];
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
      {priority}
    </span>
  );
}

function TestCaseCard({
  tc,
  isChecked,
  onToggle,
}: {
  tc: TestCase;
  isChecked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-xl p-4 transition-colors ${
        isChecked ? "bg-positive-subtle/30" : "bg-bg-surface"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="mt-1 w-4 h-4 accent-positive shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <PriorityBadge priority={tc.priority} />
            <span
              className={`font-medium text-sm ${
                isChecked ? "line-through text-text-hint" : "text-text"
              }`}
            >
              {tc.title}
            </span>
          </div>
          <div className="text-sm space-y-1">
            <p className="text-text-sub font-medium">手順:</p>
            <ol className="list-decimal list-inside text-text-sub space-y-0.5 pl-1">
              {tc.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <p className="text-text-sub mt-2">
              <span className="font-medium">期待結果:</span> {tc.expected}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QAPage() {
  const { checked, toggle, reset } = useCheckedState();

  const allCases = templateSections.flatMap((s) => s.cases);
  const checkedCount = allCases.filter((c) => checked[c.id]).length;
  const totalCount = allCases.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  // 優先度別カウント
  const p0Total = allCases.filter((c) => c.priority === "P0").length;
  const p0Done = allCases.filter((c) => c.priority === "P0" && checked[c.id]).length;
  const p1Total = allCases.filter((c) => c.priority === "P1").length;
  const p1Done = allCases.filter((c) => c.priority === "P1" && checked[c.id]).length;
  const p2Total = allCases.filter((c) => c.priority === "P2").length;
  const p2Done = allCases.filter((c) => c.priority === "P2" && checked[c.id]).length;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">QA チェックリスト</h1>
        <button
          onClick={reset}
          className="text-xs text-text-hint hover:text-text-sub transition-colors px-2 py-1 bg-bg-surface rounded"
        >
          リセット
        </button>
      </div>
      <p className="text-text-sub text-sm mb-6">
        ひとり旅プランナー — 全 {totalCount} 件のテストケース
      </p>

      {/* プログレスバー */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-text-sub">全体進捗</span>
          <span className="font-mono text-text-sub">
            {checkedCount}/{totalCount}
          </span>
        </div>
        <div className="h-2 bg-bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-positive rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 優先度別サマリー */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="rounded-xl bg-bg-surface p-3 text-center">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityStyles.P0.bg} ${priorityStyles.P0.text}`}>P0</span>
          <p className="text-[13px] font-medium text-text mt-2">{p0Done}/{p0Total}</p>
          <p className="text-[11px] text-text-hint">必須</p>
        </div>
        <div className="rounded-xl bg-bg-surface p-3 text-center">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityStyles.P1.bg} ${priorityStyles.P1.text}`}>P1</span>
          <p className="text-[13px] font-medium text-text mt-2">{p1Done}/{p1Total}</p>
          <p className="text-[11px] text-text-hint">重要</p>
        </div>
        <div className="rounded-xl bg-bg-surface p-3 text-center">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityStyles.P2.bg} ${priorityStyles.P2.text}`}>P2</span>
          <p className="text-[13px] font-medium text-text mt-2">{p2Done}/{p2Total}</p>
          <p className="text-[11px] text-text-hint">あると良い</p>
        </div>
      </div>

      {/* テストケース */}
      {templateSections.map((section) => (
        <section key={section.id} className="mb-10">
          <h2 id={section.id} className="text-lg font-bold mb-4 scroll-mt-20">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.cases.map((tc) => (
              <TestCaseCard
                key={tc.id}
                tc={tc}
                isChecked={!!checked[tc.id]}
                onToggle={() => toggle(tc.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
