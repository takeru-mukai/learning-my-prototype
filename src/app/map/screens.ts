export type ScreenState = {
  id: string;
  label: string;
  query?: string;
};

export type ScreenVariant = {
  id: string;
  label: string;
  query: string;
};

export type ScreenPattern = {
  id: string;
  label: string;
  description: string;
  query: string;
  group?: string;
};

export type Screen = {
  id: string;
  label: string;
  path: string;
  states: ScreenState[];
  variants?: ScreenVariant[];
  patterns?: ScreenPattern[];
  linksTo?: string[];
};

// ─── Define your screens here ───

export const screens: Screen[] = [
  {
    id: "destination-list",
    label: "行き先一覧",
    path: "/",
    states: [
      { id: "default", label: "デフォルト表示" },
    ],
    variants: [
      { id: "empty", label: "検索結果なし", query: "_v=empty" },
      { id: "loading", label: "ローディング", query: "_v=loading" },
    ],
    linksTo: ["destination-detail"],
  },
  {
    id: "destination-detail",
    label: "旅行先 詳細",
    path: "/detail",
    states: [
      { id: "default", label: "デフォルト表示（パターンB）" },
    ],
    variants: [
      { id: "loading", label: "ローディング", query: "_v=loading" },
      { id: "empty", label: "空状態（見つからない）", query: "_v=empty" },
    ],
    patterns: [
      // 詳細レイアウト
      {
        id: "layout-a",
        label: "パターンA: 左サムネ・右テキスト",
        description: "横並びレイアウト。PC向けに情報を一覧しやすい構成",
        query: "_p=layout-a",
        group: "詳細レイアウト",
      },
      {
        id: "layout-b",
        label: "パターンB: 上画像・下テキスト",
        description: "縦積みレイアウト。モバイルファーストで読みやすい構成",
        query: "_p=layout-b",
        group: "詳細レイアウト",
      },
      {
        id: "layout-c",
        label: "パターンC: ヒーロー画像＋オーバーレイ",
        description: "画像を全幅で表示し、テキストを重ねる没入感のある構成",
        query: "_p=layout-c",
        group: "詳細レイアウト",
      },
      // レビュー表示
      {
        id: "review-card",
        label: "レビュー: カード型",
        description: "各レビューをカードで区切って表示。独立性が高く読みやすい",
        query: "_p=review-card",
        group: "レビュー表示",
      },
      {
        id: "review-timeline",
        label: "レビュー: タイムライン型",
        description: "時系列で縦につなげて表示。投稿の流れが把握しやすい",
        query: "_p=review-timeline",
        group: "レビュー表示",
      },
    ],
    linksTo: ["destination-list", "review", "plan"],
  },
  {
    id: "review",
    label: "レビュー一覧",
    path: "/detail",
    states: [
      { id: "default", label: "カード型（デフォルト）", query: "_p=review-card" },
    ],
    patterns: [
      {
        id: "card",
        label: "カード型",
        description: "各レビューをカードで区切って表示",
        query: "_p=review-card",
      },
      {
        id: "timeline",
        label: "タイムライン型",
        description: "時系列で縦につなげて表示",
        query: "_p=review-timeline",
      },
    ],
    linksTo: ["destination-detail"],
  },
  {
    id: "plan",
    label: "旅程作成",
    path: "/plan",
    states: [
      { id: "default", label: "カード追加型（デフォルト）" },
    ],
    patterns: [
      {
        id: "card",
        label: "カード追加型",
        description: "スポットをカードで追加していくステップ形式",
        query: "_p=card",
      },
      {
        id: "timeline",
        label: "タイムライン型",
        description: "時間軸で縦に並べるスケジュールビュー",
        query: "_p=timeline",
      },
      {
        id: "map",
        label: "マップ＋リスト型",
        description: "左にルートマップ、右にスポットリスト",
        query: "_p=map",
      },
    ],
    linksTo: ["destination-detail"],
  },
];
