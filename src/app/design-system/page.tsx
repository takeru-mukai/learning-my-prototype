"use client";

import { useState } from "react";

/* ================================================================
   カラーパレットのデータ
   ================================================================ */
const grayScale = [
  { token: "gray-0", dark: "#FFFFFF", light: "#000000" },
  { token: "gray-100", dark: "#F2F2F2", light: "#1A1A1A" },
  { token: "gray-200", dark: "#E0E0E0", light: "#2E2E2E" },
  { token: "gray-300", dark: "#CCCCCC", light: "#444444" },
  { token: "gray-400", dark: "#AFAFAF", light: "#5A5A5A" },
  { token: "gray-500", dark: "#989898", light: "#6E6E6E" },
  { token: "gray-600", dark: "#6D6D6D", light: "#888888" },
  { token: "gray-700", dark: "#353535", light: "#D0D0D0" },
  { token: "gray-800", dark: "#202020", light: "#E8E8E8" },
  { token: "gray-900", dark: "#000000", light: "#FFFFFF" },
];

const accentColors = [
  { token: "blue", value: "#147EDF", usage: "メインアクション・リンク" },
  { token: "blue-dark", value: "#205CB7", usage: "ダーク環境での青" },
  { token: "blue-icon", value: "#477EE9", usage: "アイコンのアクティブ状態" },
  { token: "orange", value: "#E85121", usage: "強調・バッジ・アラート" },
];

const semanticColors = [
  {
    category: "Background",
    description: "背景に使う色",
    tokens: [
      { token: "--color-bg", dark: "#000000", light: "#FFFFFF", usage: "ページ背景" },
      { token: "--color-bg-surface", dark: "#202020", light: "#F3F3F3", usage: "カード・セクション背景" },
      { token: "--color-bg-elevated", dark: "#353535", light: "#FFFFFF", usage: "浮き上がった要素" },
    ],
  },
  {
    category: "Text",
    description: "文字に使う色",
    tokens: [
      { token: "--color-text", dark: "#FFFFFF", light: "#1A1A1A", usage: "メインの文字" },
      { token: "--color-text-sub", dark: "#989898", light: "#6E6E6E", usage: "補足の文字" },
      { token: "--color-text-hint", dark: "#6D6D6D", light: "#888888", usage: "ヒント・薄い文字" },
      { token: "--color-text-accent", dark: "#147EDF", light: "#147EDF", usage: "リンク・アクション" },
    ],
  },
  {
    category: "Border",
    description: "区切り線に使う色",
    tokens: [
      { token: "--color-border", dark: "rgba(255,255,255,0.1)", light: "rgba(0,0,0,0.06)", usage: "控えめな区切り" },
      { token: "--color-border-strong", dark: "#353535", light: "#E0E0E0", usage: "はっきりした区切り" },
    ],
  },
  {
    category: "Primary",
    description: "ボタン・アクションに使う色",
    tokens: [
      { token: "--color-primary", dark: "#147EDF", light: "#147EDF", usage: "主要ボタン" },
      { token: "--color-primary-hover", dark: "#3A94E5", light: "#1170C7", usage: "ホバー時" },
      { token: "--color-primary-press", dark: "#5EABEB", light: "#0E5FA8", usage: "押下時" },
    ],
  },
  {
    category: "Status",
    description: "状態を伝える色",
    tokens: [
      { token: "--color-positive", dark: "#55B762", light: "#55B762", usage: "成功・完了" },
      { token: "--color-negative", dark: "#EB5545", light: "#D24C3E", usage: "エラー・削除" },
    ],
  },
];

/* ================================================================
   タイポグラフィのデータ
   ================================================================ */
const typographyTokens = [
  { token: "text-hero", size: "35px", weight: 700, lineHeight: "1.14", usage: "ページタイトル", sample: "Today" },
  { token: "text-heading-lg", size: "27px", weight: 600, lineHeight: "1.19", usage: "ヒーロー見出し", sample: "あなたの旅をデザインする" },
  { token: "text-heading-md", size: "26px", weight: 600, lineHeight: "1.23", usage: "カードタイトル", sample: "Featured Story" },
  { token: "text-heading-md-ja", size: "24px", weight: 500, lineHeight: "1.33", usage: "カードタイトル（日本語）", sample: "おすすめの旅先" },
  { token: "text-heading-sm", size: "20px", weight: 700, lineHeight: "1.2", usage: "セクション見出し", sample: "人気のプラン" },
  { token: "text-button", size: "18px", weight: 500, lineHeight: "1.33", usage: "ボタンラベル", sample: "はじめる" },
  { token: "text-body-lg", size: "16px", weight: 400, lineHeight: "1.5", usage: "本文（大）", sample: "旅の計画を立てましょう。行きたい場所を選んでください。" },
  { token: "text-body-md", size: "15px", weight: 500, lineHeight: "1.6", usage: "本文・説明文", sample: "週末のひとり旅にぴったりの温泉地をご紹介します。" },
  { token: "text-body-sm", size: "14px", weight: 400, lineHeight: "1.71", usage: "詳細テキスト", sample: "レビュー 4.8 / 5.0（128件の評価）" },
  { token: "text-caption", size: "13px", weight: 500, lineHeight: "1.19", usage: "カテゴリラベル", sample: "TRAVEL・LIFESTYLE" },
  { token: "text-caption-sm", size: "12px", weight: 500, lineHeight: "1.33", usage: "アプリカテゴリ", sample: "旅行 · ナビゲーション" },
  { token: "text-tab", size: "10px", weight: 400, lineHeight: "1.19", usage: "タブラベル", sample: "Today" },
  { token: "text-micro", size: "7px", weight: 400, lineHeight: "1.14", usage: "極小テキスト", sample: "App内課金" },
];

/* ================================================================
   スペーシングのデータ
   ================================================================ */
const spacingTokens = [
  { token: "spacing-1", value: "4px" },
  { token: "spacing-2", value: "8px" },
  { token: "spacing-3", value: "10px" },
  { token: "spacing-4", value: "16px" },
  { token: "spacing-5", value: "20px" },
  { token: "spacing-6", value: "24px" },
  { token: "spacing-8", value: "32px" },
  { token: "spacing-10", value: "40px" },
];

/* ================================================================
   角丸のデータ
   ================================================================ */
const radiusTokens = [
  { token: "radius-none", value: "0px", usage: "角丸なし" },
  { token: "radius-xs", value: "5px", usage: "小さなサムネイル" },
  { token: "radius-sm", value: "10px", usage: "アイコン・CTAボタン" },
  { token: "radius-md", value: "15px", usage: "カード・リスト背景" },
  { token: "radius-lg", value: "16px", usage: "ピルボタン" },
  { token: "radius-xl", value: "20px", usage: "大きなサムネイル" },
  { token: "radius-full", value: "9999px", usage: "完全な丸" },
];

/* ================================================================
   コンポーネント命名のデータ
   ================================================================ */
const componentGroups = [
  {
    category: "ナビゲーション",
    items: [
      { name: "TabNavigation", desc: "画面下部の5つのタブバー", size: "375×80px" },
      { name: "TabNav/Menu", desc: "タブの1つ分（アイコン＋ラベル）", size: "56×56px" },
      { name: "StatusBar", desc: "画面上部のステータスバー", size: "375×44px" },
    ],
  },
  {
    category: "コンテンツカード",
    items: [
      { name: "Card", desc: "フィーチャーカード（画像＋カテゴリ＋タイトル＋説明）", size: "335×400px" },
      { name: "Recommend", desc: "おすすめカード（画像＋タイトル）", size: "216×184px" },
    ],
  },
  {
    category: "アプリアイテム",
    items: [
      { name: "AppItem/lg", desc: "大サイズのアプリ表示", size: "96×96px icon" },
      { name: "AppItem/md", desc: "中サイズのアプリ表示", size: "64×64px icon" },
      { name: "AppItem/sm", desc: "小サイズのアプリ表示", size: "48×48px icon" },
      { name: "AppItem/price", desc: "価格ボタン（ピル型）", size: "70×32px" },
    ],
  },
  {
    category: "ボタン・アクション",
    items: [
      { name: "Button", desc: "CTAボタン（メインアクション）", size: "radius: 10px" },
      { name: "CategoryItem", desc: "カテゴリフィルターのタグ", size: "radius: 16px" },
    ],
  },
  {
    category: "セクション",
    items: [
      { name: "DetailTitle", desc: "セクション見出し＋「すべて見る」リンク", size: "—" },
      { name: "Carousel", desc: "横スクロールのコンテンツ列", size: "—" },
      { name: "ListItem", desc: "リスト行（区切り線つき）", size: "—" },
    ],
  },
  {
    category: "詳細画面",
    items: [
      { name: "AppHeading", desc: "アプリアイコン＋タイトル＋カテゴリ", size: "—" },
      { name: "RatingSummary", desc: "評価の概要（星＋数値）", size: "—" },
      { name: "ReviewList", desc: "ユーザーレビュー一覧", size: "—" },
    ],
  },
];

/* ================================================================
   メインコンポーネント
   ================================================================ */
export default function DesignSystemPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState("colors");

  const isDark = theme === "dark";

  // Apple HIG inspired: 枠線ではなく背景色の差と影で階層を表現
  const t = {
    bg: isDark ? "#000000" : "#F5F5F7",
    bgCard: isDark ? "#1C1C1E" : "#FFFFFF",
    bgHover: isDark ? "#2C2C2E" : "#F0F0F2",
    text: isDark ? "#F5F5F7" : "#1D1D1F",
    textSecondary: isDark ? "#A1A1A6" : "#86868B",
    textTertiary: isDark ? "#636366" : "#AEAEB2",
    accent: "#147EDF",
    separator: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    cardShadow: isDark
      ? "0 2px 12px rgba(0,0,0,0.4)"
      : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
    cardShadowHover: isDark
      ? "0 4px 24px rgba(0,0,0,0.5)"
      : "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)",
  };

  const sections = [
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "labels", label: "Labels" },
    { id: "spacing", label: "Spacing" },
    { id: "radius", label: "Radius" },
    { id: "components", label: "Components" },
  ];

  return (
    <div style={{ backgroundColor: t.bg, color: t.text, minHeight: "100vh", transition: "background-color 0.3s, color 0.3s" }}>
      {/* ──── ヘッダー ──── */}
      <header
        style={{
          position: "sticky",
          top: 40,
          zIndex: 40,
          backgroundColor: isDark ? "rgba(0,0,0,0.72)" : "rgba(245,245,247,0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
                Design System
              </h1>
              <p style={{ fontSize: 15, color: t.textSecondary, margin: "4px 0 0", fontWeight: 400 }}>
                Figmaから抽出したデザインガイドライン
              </p>
            </div>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                borderRadius: 980,
                border: "none",
                backgroundColor: isDark ? "#2C2C2E" : "#E8E8ED",
                color: t.text,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isDark ? "#3A3A3C" : "#D1D1D6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isDark ? "#2C2C2E" : "#E8E8ED"; }}
            >
              <span style={{ fontSize: 14 }}>{isDark ? "☀️" : "🌙"}</span>
              {isDark ? "Light" : "Dark"}
            </button>
          </div>

          {/* セクションタブ */}
          <nav style={{ display: "flex", gap: 2, marginTop: 48, paddingBottom: 12 }}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 0,
                  border: "none",
                  borderBottom: activeSection === s.id ? `2px solid ${t.accent}` : "2px solid transparent",
                  fontSize: 14,
                  fontWeight: activeSection === s.id ? 600 : 400,
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: activeSection === s.id ? t.accent : t.textSecondary,
                  transition: "all 0.15s",
                }}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ──── メインコンテンツ ──── */}
      <main style={{ maxWidth: 980, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* ════════════════════════════════════════
           Colors
           ════════════════════════════════════════ */}
        {activeSection === "colors" && (
          <div>
            {/* Gray Scale */}
            <SectionHeader title="Gray Scale" sub="画面全体のベースとなるグレーの段階" t={t} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, marginBottom: 56 }}>
              {grayScale.map((c) => {
                const color = isDark ? c.dark : c.light;
                return (
                  <div
                    key={c.token}
                    style={{
                      borderRadius: 12,
                      overflow: "hidden",
                      backgroundColor: t.bgCard,
                      boxShadow: t.cardShadow,
                      transition: "box-shadow 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = t.cardShadowHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = t.cardShadow; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ height: 64, backgroundColor: color }} />
                    <div style={{ padding: "10px 12px" }}>
                      <p style={{ fontSize: 12, fontWeight: 600, margin: 0, color: t.text }}>{c.token}</p>
                      <p style={{ fontSize: 11, color: t.textTertiary, margin: "3px 0 0", fontFamily: "SF Mono, monospace" }}>{color}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Accent Colors */}
            <SectionHeader title="Accent Colors" sub="操作可能な要素やアクティブ状態に使う色" t={t} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8, marginBottom: 56 }}>
              {accentColors.map((c) => (
                <div
                  key={c.token}
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    backgroundColor: t.bgCard,
                    boxShadow: t.cardShadow,
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = t.cardShadowHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = t.cardShadow; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ height: 56, backgroundColor: c.value }} />
                  <div style={{ padding: "12px 14px" }}>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: t.text }}>{c.token}</p>
                    <p style={{ fontSize: 11, color: t.textTertiary, margin: "2px 0 0", fontFamily: "SF Mono, monospace" }}>{c.value}</p>
                    <p style={{ fontSize: 12, color: t.textSecondary, margin: "6px 0 0" }}>{c.usage}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Semantic Colors */}
            <SectionHeader
              title="Semantic Colors"
              sub="意味で名付けた色。コードではこちらを使います"
              t={t}
            />
            <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 24, lineHeight: 1.7 }}>
              トークン名は <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: isDark ? "#2C2C2E" : "#E8E8ED" }}>種類 → 対象 → 状態</code> の順で構成されています。
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {semanticColors.map((group) => (
                <div
                  key={group.category}
                  style={{
                    borderRadius: 16,
                    backgroundColor: t.bgCard,
                    boxShadow: t.cardShadow,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ padding: "14px 20px 10px" }}>
                    <h4 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: t.text }}>{group.category}</h4>
                    <p style={{ fontSize: 12, color: t.textTertiary, margin: "2px 0 0" }}>{group.description}</p>
                  </div>
                  {group.tokens.map((tok) => (
                    <div
                      key={tok.token}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "12px 20px",
                        borderTop: `1px solid ${t.separator}`,
                        transition: "background-color 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = t.bgHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                        backgroundColor: isDark ? tok.dark : tok.light,
                        boxShadow: `inset 0 0 0 1px ${t.separator}`,
                      }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <code style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{tok.token}</code>
                        <p style={{ fontSize: 12, color: t.textSecondary, margin: "2px 0 0" }}>{tok.usage}</p>
                      </div>
                      <code style={{ fontSize: 11, color: t.textTertiary, fontFamily: "SF Mono, monospace" }}>
                        {isDark ? tok.dark : tok.light}
                      </code>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
           Typography
           ════════════════════════════════════════ */}
        {activeSection === "typography" && (
          <div>
            <SectionHeader title="Typography" sub="各文字サイズを実際のサイズで表示しています" t={t} />
            <div style={{ borderRadius: 16, backgroundColor: t.bgCard, boxShadow: t.cardShadow, overflow: "hidden" }}>
              {typographyTokens.map((typ, i) => (
                <div
                  key={typ.token}
                  style={{
                    padding: "24px 24px",
                    borderTop: i > 0 ? `1px solid ${t.separator}` : "none",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = t.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {/* メタ情報 */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <code style={{ fontSize: 12, color: t.accent, fontWeight: 500 }}>{typ.token}</code>
                    <span style={{
                      fontSize: 11, color: t.textTertiary,
                      backgroundColor: isDark ? "#2C2C2E" : "#F0F0F2",
                      padding: "2px 8px", borderRadius: 6,
                    }}>
                      {typ.usage}
                    </span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: t.textTertiary, fontFamily: "SF Mono, monospace" }}>
                      {typ.size} · w{typ.weight} · lh {typ.lineHeight}
                    </span>
                  </div>
                  {/* 実サイズプレビュー */}
                  <p style={{
                    fontSize: typ.size, fontWeight: typ.weight, lineHeight: typ.lineHeight,
                    margin: 0, color: t.text,
                  }}>
                    {typ.sample}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
           Labels
           ════════════════════════════════════════ */}
        {activeSection === "labels" && (
          <div>
            <SectionHeader title="Labels & Badges" sub="タグ、カテゴリ、ステータスなど小さなラベルパーツの一覧" t={t} />

            {/* Tag / Category Pill */}
            <div style={{ marginBottom: 40 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 12 }}>Tag（タグ）</h4>
              <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 16, lineHeight: 1.6 }}>
                コンテンツの分類に使う小さなラベル。背景色で区切り、枠線は使わない。
              </p>
              <div style={{ borderRadius: 16, backgroundColor: t.bgCard, boxShadow: t.cardShadow, padding: 24 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {["温泉", "自然", "グルメ", "歴史・文化", "アート", "離島"].map((tag) => (
                    <span key={tag} style={{
                      fontSize: 11, fontWeight: 500, padding: "5px 12px", borderRadius: 9999,
                      backgroundColor: isDark ? "#2C2C2E" : "#F0F0F2", color: t.textSecondary,
                    }}>{tag}</span>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${t.separator}`, paddingTop: 16 }}>
                  <SpecRow label="フォントサイズ" value="11px (text-micro ~ text-caption-sm)" t={t} />
                  <SpecRow label="太さ" value="Medium (500)" t={t} />
                  <SpecRow label="余白" value="5px 12px" t={t} />
                  <SpecRow label="角丸" value="9999px (radius-full)" t={t} />
                  <SpecRow label="背景色" value="--color-bg-hover" t={t} />
                  <SpecRow label="文字色" value="--color-text-sub" t={t} />
                </div>
              </div>
            </div>

            {/* Category Pill (Active / Inactive) */}
            <div style={{ marginBottom: 40 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 12 }}>CategoryItem（カテゴリフィルター）</h4>
              <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 16, lineHeight: 1.6 }}>
                フィルター操作に使うピル型ボタン。選択中はプライマリカラーで塗りつぶし。
              </p>
              <div style={{ borderRadius: 16, backgroundColor: t.bgCard, boxShadow: t.cardShadow, padding: 24 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  <span style={{
                    fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 9999,
                    backgroundColor: "#147EDF", color: "#FFFFFF",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}>すべて</span>
                  {["温泉", "自然", "グルメ"].map((cat) => (
                    <span key={cat} style={{
                      fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 9999,
                      backgroundColor: isDark ? "#1C1C1E" : "#F0F0F2", color: t.textSecondary,
                    }}>{cat}</span>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${t.separator}`, paddingTop: 16 }}>
                  <SpecRow label="フォントサイズ" value="13px (text-caption)" t={t} />
                  <SpecRow label="太さ" value="Medium (500)" t={t} />
                  <SpecRow label="余白" value="8px 16px" t={t} />
                  <SpecRow label="角丸" value="9999px (radius-full)" t={t} />
                  <SpecRow label="選択時 背景" value="--color-primary (#147EDF)" t={t} />
                  <SpecRow label="選択時 文字" value="--color-on-fill (#FFFFFF)" t={t} />
                  <SpecRow label="非選択時 背景" value="--color-bg-surface" t={t} />
                  <SpecRow label="ホバー" value="背景色が --color-bg-hover に変化" t={t} />
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div style={{ marginBottom: 40 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 12 }}>StatusBadge（ステータスバッジ）</h4>
              <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 16, lineHeight: 1.6 }}>
                状態を伝える小さなバッジ。色でステータスを区別する。
              </p>
              <div style={{ borderRadius: 16, backgroundColor: t.bgCard, boxShadow: t.cardShadow, padding: 24 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {[
                    { label: "公開中", bg: isDark ? "#1A3A1E" : "#E7F2E8", color: "#55B762" },
                    { label: "エラー", bg: isDark ? "#3A1A18" : "#FBE7E6", color: isDark ? "#EB5545" : "#D24C3E" },
                    { label: "お知らせ", bg: isDark ? "#1A3A5C" : "#E8F0FE", color: "#147EDF" },
                    { label: "下書き", bg: isDark ? "#2C2C2E" : "#F0F0F2", color: t.textSecondary },
                  ].map((badge) => (
                    <span key={badge.label} style={{
                      fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6,
                      backgroundColor: badge.bg, color: badge.color,
                    }}>{badge.label}</span>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${t.separator}`, paddingTop: 16 }}>
                  <SpecRow label="フォントサイズ" value="11px" t={t} />
                  <SpecRow label="太さ" value="SemiBold (600)" t={t} />
                  <SpecRow label="余白" value="4px 10px" t={t} />
                  <SpecRow label="角丸" value="6px" t={t} />
                  <SpecRow label="成功" value="背景: --color-positive-subtle / 文字: --color-positive" t={t} />
                  <SpecRow label="エラー" value="背景: --color-negative-subtle / 文字: --color-negative" t={t} />
                  <SpecRow label="情報" value="背景: --color-primary-subtle / 文字: --color-primary" t={t} />
                  <SpecRow label="デフォルト" value="背景: --color-bg-hover / 文字: --color-text-sub" t={t} />
                </div>
              </div>
            </div>

            {/* Price Button */}
            <div style={{ marginBottom: 40 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 12 }}>AppItem/price（価格ボタン）</h4>
              <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 16, lineHeight: 1.6 }}>
                Figmaのアプリアイテムで使われる価格表示ピルボタン。
              </p>
              <div style={{ borderRadius: 16, backgroundColor: t.bgCard, boxShadow: t.cardShadow, padding: 24 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20, alignItems: "center" }}>
                  <span style={{
                    fontSize: 14, fontWeight: 700, padding: "6px 16px", borderRadius: 16,
                    backgroundColor: isDark ? "#353535" : "#F0F0F2", color: "#147EDF",
                    minWidth: 70, textAlign: "center",
                  }}>¥250</span>
                  <span style={{
                    fontSize: 14, fontWeight: 700, padding: "6px 16px", borderRadius: 16,
                    backgroundColor: isDark ? "#353535" : "#F0F0F2", color: "#147EDF",
                    minWidth: 70, textAlign: "center",
                  }}>無料</span>
                  <span style={{
                    fontSize: 14, fontWeight: 700, padding: "6px 16px", borderRadius: 16,
                    backgroundColor: "#147EDF", color: "#FFFFFF",
                    minWidth: 70, textAlign: "center",
                  }}>入手</span>
                </div>
                <div style={{ borderTop: `1px solid ${t.separator}`, paddingTop: 16 }}>
                  <SpecRow label="フォントサイズ" value="14px (text-body-sm)" t={t} />
                  <SpecRow label="太さ" value="Bold (700)" t={t} />
                  <SpecRow label="余白" value="6px 16px" t={t} />
                  <SpecRow label="角丸" value="16px (radius-lg)" t={t} />
                  <SpecRow label="サイズ" value="70×32px" t={t} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
           Spacing
           ════════════════════════════════════════ */}
        {activeSection === "spacing" && (
          <div>
            <SectionHeader title="Spacing" sub="余白のサイズ一覧。バーの幅が実際の比率を表しています" t={t} />
            <div style={{ borderRadius: 16, backgroundColor: t.bgCard, boxShadow: t.cardShadow, overflow: "hidden" }}>
              {spacingTokens.map((sp, i) => (
                <div
                  key={sp.token}
                  style={{
                    display: "flex", alignItems: "center", gap: 20,
                    padding: "14px 24px",
                    borderTop: i > 0 ? `1px solid ${t.separator}` : "none",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = t.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <code style={{ fontSize: 13, color: t.textSecondary, minWidth: 100, fontWeight: 500 }}>{sp.token}</code>
                  <div style={{
                    height: 24, width: parseInt(sp.value) * 3.5,
                    borderRadius: 6,
                    background: `linear-gradient(135deg, ${t.accent}, #477EE9)`,
                    minWidth: 8, transition: "width 0.3s ease",
                    opacity: 0.85,
                  }} />
                  <span style={{ fontSize: 13, color: t.textTertiary, fontFamily: "SF Mono, monospace", minWidth: 40 }}>{sp.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
           Radius
           ════════════════════════════════════════ */}
        {activeSection === "radius" && (
          <div>
            <SectionHeader title="Border Radius" sub="各角丸の値と実際の見え方" t={t} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
              {radiusTokens.map((r) => (
                <div
                  key={r.token}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                    padding: 24,
                    borderRadius: 16,
                    backgroundColor: t.bgCard,
                    boxShadow: t.cardShadow,
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = t.cardShadowHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = t.cardShadow; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{
                    width: 64, height: 64,
                    borderRadius: r.value === "9999px" ? "50%" : r.value,
                    background: `linear-gradient(135deg, ${t.accent}, #477EE9)`,
                    opacity: 0.85,
                  }} />
                  <div style={{ textAlign: "center" }}>
                    <code style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{r.token}</code>
                    <p style={{ fontSize: 11, color: t.textTertiary, margin: "3px 0 0", fontFamily: "SF Mono, monospace" }}>{r.value}</p>
                    <p style={{ fontSize: 11, color: t.textSecondary, margin: "4px 0 0" }}>{r.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
           Components
           ════════════════════════════════════════ */}
        {activeSection === "components" && (
          <div>
            <SectionHeader title="Components" sub="Figmaで定義されているパーツの名前と役割" t={t} />
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {componentGroups.map((group) => (
                <div
                  key={group.category}
                  style={{
                    borderRadius: 16,
                    backgroundColor: t.bgCard,
                    boxShadow: t.cardShadow,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ padding: "14px 20px 10px" }}>
                    <h4 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: t.text }}>{group.category}</h4>
                  </div>
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(140px, 1fr) 2fr auto",
                        gap: 12,
                        padding: "12px 20px",
                        borderTop: `1px solid ${t.separator}`,
                        alignItems: "center",
                        transition: "background-color 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = t.bgHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <code style={{ fontSize: 13, fontWeight: 500, color: t.accent }}>{item.name}</code>
                      <span style={{ fontSize: 13, color: t.text }}>{item.desc}</span>
                      <span style={{ fontSize: 11, color: t.textTertiary, fontFamily: "SF Mono, monospace" }}>{item.size}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ================================================================
   共通パーツ
   ================================================================ */
function SpecRow({ label, value, t }: { label: string; value: string; t: { text: string; textSecondary: string; textTertiary: string } }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "5px 0" }}>
      <span style={{ fontSize: 12, color: t.textSecondary }}>{label}</span>
      <span style={{ fontSize: 12, color: t.text, fontFamily: "SF Mono, monospace" }}>{value}</span>
    </div>
  );
}

function SectionHeader({ title, sub, t }: { title: string; sub: string; t: { text: string; textSecondary: string } }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: t.text, letterSpacing: "-0.01em" }}>{title}</h2>
      <p style={{ fontSize: 14, color: t.textSecondary, margin: "4px 0 0", lineHeight: 1.5 }}>{sub}</p>
    </div>
  );
}
