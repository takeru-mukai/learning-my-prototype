"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Star, ChevronLeft, Clock, Wallet, Heart, ChevronRight } from "lucide-react";
import { destinations } from "../data";

// ─── サンプルレビューデータ ───

const reviews = [
  {
    id: "r1",
    user: "旅好きさくら",
    avatar: "🌸",
    rating: 5,
    date: "2025年12月",
    title: "最高の癒し旅でした",
    body: "温泉が素晴らしく、料理も絶品。一人でゆっくり過ごすには最高の場所です。スタッフの方も親切で、また必ず訪れたいと思いました。",
  },
  {
    id: "r2",
    user: "ひとり旅マスター",
    avatar: "🎒",
    rating: 4,
    date: "2025年11月",
    title: "静かで落ち着ける場所",
    body: "平日に訪問したので人も少なく、のんびり過ごせました。交通の便が少し不便ですが、それも含めて旅の醍醐味かなと。",
  },
  {
    id: "r3",
    user: "カメラ女子あい",
    avatar: "📷",
    rating: 5,
    date: "2025年10月",
    title: "フォトスポットがたくさん！",
    body: "どこを切り取っても絵になる場所ばかり。朝早く起きて撮影散歩するのがおすすめです。地元の方とのふれあいも楽しかった。",
  },
];

// ─── 星表示 ───

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-orange fill-orange" : "text-text-disabled"}
        />
      ))}
    </div>
  );
}

// ─── パターンA: 左サムネイル・右テキスト ───

function DetailPatternA({ dest }: { dest: typeof destinations[0] }) {
  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <BackButton />
      <div className="flex gap-6 mt-6">
        <div className="w-2/5 shrink-0">
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full aspect-[3/4] object-cover rounded-2xl"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {dest.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-bg-input text-text-sub font-medium">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-[28px] font-bold text-text tracking-tight mb-2">{dest.name}</h1>
          <div className="flex items-center gap-1.5 text-text-sub mb-4">
            <MapPin size={15} />
            <span className="text-[15px]">{dest.area}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5">
              <Wallet size={15} className="text-primary" />
              <span className="text-[15px] font-bold text-primary">{dest.budgetLabel}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-orange fill-orange" />
              <span className="text-[14px] font-medium text-text">4.7</span>
              <span className="text-[13px] text-text-sub">(128件)</span>
            </div>
          </div>
          <p className="text-[15px] text-text-sub leading-relaxed mb-6">{dest.description}</p>
          <div className="flex gap-3">
            <Link href={`/plan?id=${dest.id}`} className="flex-1 py-3 rounded-xl bg-primary text-on-fill font-medium text-[15px] text-center">
              旅程を作成
            </Link>
            <button className="w-12 h-12 rounded-xl bg-bg-input flex items-center justify-center">
              <Heart size={20} className="text-text-sub" />
            </button>
          </div>
          <ReviewPreview destId={dest.id} />
        </div>
      </div>
    </div>
  );
}

// ─── パターンB: 上画像・下テキスト ───

function DetailPatternB({ dest }: { dest: typeof destinations[0] }) {
  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <BackButton />
      <div className="mt-6">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full aspect-[16/9] object-cover rounded-2xl mb-6"
        />
        <div className="flex flex-wrap gap-1.5 mb-3">
          {dest.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-bg-input text-text-sub font-medium">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-[28px] font-bold text-text tracking-tight mb-2">{dest.name}</h1>
        <div className="flex items-center gap-1.5 text-text-sub mb-4">
          <MapPin size={15} />
          <span className="text-[15px]">{dest.area}</span>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            <Wallet size={15} className="text-primary" />
            <span className="text-[15px] font-bold text-primary">{dest.budgetLabel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-orange fill-orange" />
            <span className="text-[14px] font-medium text-text">4.7</span>
            <span className="text-[13px] text-text-sub">(128件)</span>
          </div>
        </div>
        <p className="text-[15px] text-text-sub leading-relaxed mb-6">{dest.description}</p>
        <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-bg-surface">
          <div className="text-center">
            <Clock size={18} className="mx-auto text-text-hint mb-1" />
            <p className="text-[11px] text-text-hint">おすすめ日数</p>
            <p className="text-[14px] font-bold text-text">1泊2日</p>
          </div>
          <div className="text-center">
            <Wallet size={18} className="mx-auto text-text-hint mb-1" />
            <p className="text-[11px] text-text-hint">予算目安</p>
            <p className="text-[14px] font-bold text-text">{dest.budgetLabel}</p>
          </div>
          <div className="text-center">
            <MapPin size={18} className="mx-auto text-text-hint mb-1" />
            <p className="text-[11px] text-text-hint">エリア</p>
            <p className="text-[14px] font-bold text-text">{dest.area}</p>
          </div>
        </div>
        <Link href={`/plan?id=${dest.id}`} className="block w-full py-3.5 rounded-xl bg-primary text-on-fill font-medium text-[15px] text-center">
          旅程を作成する
        </Link>
        <ReviewPreview destId={dest.id} />
      </div>
    </div>
  );
}

// ─── パターンC: ヒーロー画像＋オーバーレイ ───

function DetailPatternC({ dest }: { dest: typeof destinations[0] }) {
  return (
    <div>
      {/* ヒーロー */}
      <div className="relative h-[360px] overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <BackButton light />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {dest.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-white/20 text-white font-medium backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-[32px] font-bold text-white tracking-tight mb-1">{dest.name}</h1>
          <div className="flex items-center gap-1.5 text-white/70">
            <MapPin size={14} />
            <span className="text-[14px]">{dest.area}</span>
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="max-w-2xl mx-auto px-5 -mt-4">
        <div className="rounded-2xl bg-bg-surface p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <Wallet size={16} className="text-primary" />
              <span className="text-[16px] font-bold text-primary">{dest.budgetLabel}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-orange fill-orange" />
              <span className="text-[14px] font-medium text-text">4.7</span>
              <span className="text-[13px] text-text-sub">(128件)</span>
            </div>
          </div>
          <p className="text-[15px] text-text-sub leading-relaxed mb-5">{dest.description}</p>
          <div className="flex gap-3">
            <Link href={`/plan?id=${dest.id}`} className="flex-1 py-3.5 rounded-xl bg-primary text-on-fill font-medium text-[15px] text-center">
              旅程を作成する
            </Link>
            <button className="w-12 h-12 rounded-xl bg-bg-input flex items-center justify-center">
              <Heart size={20} className="text-text-sub" />
            </button>
          </div>
          <ReviewPreview destId={dest.id} />
        </div>
      </div>
    </div>
  );
}

// ─── ローディング状態 ───

function DetailLoading() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-8 animate-pulse">
      <div className="h-5 w-16 bg-bg-input rounded-md mb-6" />
      <div className="w-full aspect-[16/9] bg-bg-surface rounded-2xl mb-6" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-14 bg-bg-input rounded-full" />
        <div className="h-6 w-14 bg-bg-input rounded-full" />
        <div className="h-6 w-14 bg-bg-input rounded-full" />
      </div>
      <div className="h-8 w-2/3 bg-bg-surface rounded-lg mb-3" />
      <div className="h-4 w-1/3 bg-bg-input rounded-md mb-6" />
      <div className="space-y-2 mb-8">
        <div className="h-4 w-full bg-bg-surface rounded-md" />
        <div className="h-4 w-5/6 bg-bg-surface rounded-md" />
        <div className="h-4 w-4/6 bg-bg-surface rounded-md" />
      </div>
      <div className="h-12 w-full bg-bg-surface rounded-xl" />
    </div>
  );
}

// ─── 空状態 ───

function DetailEmpty() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <BackButton />
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-bg-surface flex items-center justify-center mb-6">
          <MapPin size={32} className="text-text-hint" />
        </div>
        <h2 className="text-[20px] font-bold text-text mb-2">旅行先が見つかりません</h2>
        <p className="text-[14px] text-text-sub text-center leading-relaxed mb-8 max-w-xs">
          指定された旅行先は現在掲載されていません。<br />他の旅行先を探してみてください。
        </p>
        <a href="/" className="px-6 py-3 rounded-xl bg-primary text-on-fill font-medium text-[15px]">
          旅行先一覧に戻る
        </a>
      </div>
    </div>
  );
}

// ─── レビュー: カード型 ───

function ReviewCards({ destId }: { destId: string }) {
  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <BackButton href={`/detail?id=${destId}`} />
      <h2 className="text-[22px] font-bold text-text mt-6 mb-1">レビュー</h2>
      <div className="flex items-center gap-2 mb-6">
        <Star size={16} className="text-orange fill-orange" />
        <span className="text-[16px] font-bold text-text">4.7</span>
        <span className="text-[14px] text-text-sub">· 128件のレビュー</span>
      </div>
      <div className="flex flex-col gap-4">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl bg-bg-surface p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-bg-input flex items-center justify-center text-lg">
                {r.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-text">{r.user}</p>
                <p className="text-[12px] text-text-hint">{r.date}</p>
              </div>
              <Stars rating={r.rating} />
            </div>
            <h3 className="text-[15px] font-bold text-text mb-1">{r.title}</h3>
            <p className="text-[14px] text-text-sub leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── レビュー: タイムライン型 ───

function ReviewTimeline({ destId }: { destId: string }) {
  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <BackButton href={`/detail?id=${destId}`} />
      <h2 className="text-[22px] font-bold text-text mt-6 mb-1">レビュー</h2>
      <div className="flex items-center gap-2 mb-6">
        <Star size={16} className="text-orange fill-orange" />
        <span className="text-[16px] font-bold text-text">4.7</span>
        <span className="text-[14px] text-text-sub">· 128件のレビュー</span>
      </div>
      <div className="relative pl-8">
        {/* タイムラインの縦線 */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-bg-hover" />
        {reviews.map((r) => (
          <div key={r.id} className="relative pb-8 last:pb-0">
            {/* ドット */}
            <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-bg" />
            {/* 日付 */}
            <p className="text-[12px] text-text-hint mb-2">{r.date}</p>
            {/* コンテンツ */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{r.avatar}</span>
                <span className="text-[14px] font-medium text-text">{r.user}</span>
                <Stars rating={r.rating} />
              </div>
              <h3 className="text-[15px] font-bold text-text mb-1">{r.title}</h3>
              <p className="text-[14px] text-text-sub leading-relaxed">{r.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── レビュープレビュー（詳細画面内に埋め込む） ───

function ReviewPreview({ destId }: { destId: string }) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-bold text-text">レビュー</h2>
        <Link
          href={`/detail?id=${destId}&_p=review-card`}
          className="inline-flex items-center gap-0.5 text-[14px] font-medium text-primary hover:text-primary-hover transition-colors"
        >
          すべて見る
          <ChevronRight size={16} />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {reviews.slice(0, 2).map((r) => (
          <div key={r.id} className="rounded-xl bg-bg-surface p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{r.avatar}</span>
              <span className="text-[13px] font-medium text-text">{r.user}</span>
              <Stars rating={r.rating} />
            </div>
            <p className="text-[13px] text-text-sub leading-relaxed line-clamp-2">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 共通パーツ ───

function BackButton({ light, href = "/" }: { light?: boolean; href?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 text-[14px] font-medium ${
        light ? "text-white/80 hover:text-white" : "text-primary hover:text-primary-hover"
      } transition-colors`}
    >
      <ChevronLeft size={18} />
      戻る
    </Link>
  );
}

// ─── メインルーティング ───

function DetailInner() {
  const searchParams = useSearchParams();
  const pattern = searchParams.get("_p");
  const variant = searchParams.get("_v");
  const id = searchParams.get("id");

  // idからデータを取得（見つからなければ箱根をデフォルト）
  const dest = destinations.find((d) => d.id === id) ?? destinations[0];

  // ローディング状態
  if (variant === "loading") return <DetailLoading />;

  // 空状態
  if (variant === "empty") return <DetailEmpty />;

  // レビューパターン（戻るリンクを詳細画面に向ける）
  if (pattern === "review-card") return <ReviewCards destId={dest.id} />;
  if (pattern === "review-timeline") return <ReviewTimeline destId={dest.id} />;

  // 詳細レイアウトパターン
  if (pattern === "layout-a") return <DetailPatternA dest={dest} />;
  if (pattern === "layout-c") return <DetailPatternC dest={dest} />;

  // デフォルト: パターンB
  return <DetailPatternB dest={dest} />;
}

export default function DetailPage() {
  return (
    <Suspense>
      <DetailInner />
    </Suspense>
  );
}
