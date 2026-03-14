"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Info } from "lucide-react";
import {
  destinations,
  categories,
  similarKeywords,
  type Category,
  type Destination,
} from "./data";

// ─── Components ───

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link href={`/detail?id=${destination.id}`} className="group block rounded-2xl overflow-hidden bg-bg-surface hover:-translate-y-0.5 transition-all duration-200">
      {/* 写真 */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {/* テキストエリア */}
      <div className="p-4">
        <h3 className="font-bold text-text mb-1">{destination.name}</h3>
        <div className="flex items-center gap-1 text-sm text-text-sub mb-2">
          <MapPin size={13} />
          <span>{destination.area}</span>
        </div>
        <p className="text-sm font-bold text-primary mb-3">
          {destination.budgetLabel}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full bg-bg-hover text-text-sub font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-bg-surface overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-bg-input" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-bg-input rounded-md w-3/4" />
        <div className="h-3 bg-bg-input rounded-md w-1/2" />
        <div className="h-3 bg-bg-input rounded-md w-1/3" />
      </div>
    </div>
  );
}

function SuggestionBanner({
  query,
  hasPartialMatch,
}: {
  query: string;
  hasPartialMatch: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5 mb-4 p-4 rounded-2xl bg-primary-subtle">
      <Info size={16} className="text-primary shrink-0 mt-0.5" />
      <p className="text-sm text-text-sub">
        {hasPartialMatch ? (
          <>
            「<span className="font-medium text-text">{query}</span>
            」に一致する旅行先はありませんでしたが、あなたの興味がありそうなものを表示しています。
          </>
        ) : (
          <>
            「<span className="font-medium text-text">{query}</span>
            」に一致する旅行先は見つかりませんでした。こちらのおすすめはいかがですか？
          </>
        )}
      </p>
    </div>
  );
}

// ─── Search logic ───

function findSimilarTags(query: string): string[] {
  const q = query.trim();
  if (q === "") return [];

  const matched: string[] = [];
  for (const [keyword, tags] of Object.entries(similarKeywords)) {
    if (keyword.includes(q) || q.includes(keyword)) {
      matched.push(...tags);
    }
  }
  return [...new Set(matched)];
}

function sortByRelevance(
  items: Destination[],
  matchTags: string[]
): Destination[] {
  if (matchTags.length === 0) {
    return [...items].sort((a, b) => a.budgetValue - b.budgetValue);
  }

  return [...items]
    .map((d) => {
      const score = d.tags.filter((t) => matchTags.includes(t)).length;
      return { dest: d, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.dest.budgetValue - b.dest.budgetValue;
    })
    .map((item) => item.dest);
}

type SearchResult = {
  results: Destination[];
  mode: "exact" | "similar" | "fallback";
};

function searchDestinations(
  query: string,
  activeCategory: Category
): SearchResult {
  const q = query.trim();

  const filterByCategory = (list: Destination[]) =>
    activeCategory === "すべて"
      ? list
      : list.filter((d) => d.tags.includes(activeCategory));

  if (q === "") {
    return {
      results: filterByCategory(destinations),
      mode: "exact",
    };
  }

  const exact = filterByCategory(
    destinations.filter(
      (d) =>
        d.name.includes(q) ||
        d.area.includes(q) ||
        d.tags.some((t) => t.includes(q)) ||
        d.description.includes(q)
    )
  );

  if (exact.length > 0) {
    return { results: exact, mode: "exact" };
  }

  const similarTags = findSimilarTags(q);

  if (similarTags.length > 0) {
    const suggested = filterByCategory(
      destinations.filter((d) => d.tags.some((t) => similarTags.includes(t)))
    );

    if (suggested.length > 0) {
      return {
        results: sortByRelevance(suggested, similarTags),
        mode: "similar",
      };
    }
  }

  const fallback = filterByCategory(destinations);

  if (fallback.length > 0) {
    return {
      results: sortByRelevance(fallback, []),
      mode: "fallback",
    };
  }

  return {
    results: sortByRelevance(destinations, []),
    mode: "fallback",
  };
}

// ─── Main ───

function TravelListInner() {
  const searchParams = useSearchParams();
  const variant = searchParams.get("_v");

  const isLoading = variant === "loading";
  const isEmpty = variant === "empty";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("すべて");

  const { results, mode } = useMemo(
    () => searchDestinations(query, activeCategory),
    [query, activeCategory]
  );

  return (
    <main className="max-w-5xl mx-auto px-5 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-text mb-1 tracking-tight">
          ひとり旅プランナー
        </h1>
        <p className="text-[15px] text-text-sub">
          休日にふらっと行ける、一人旅の行き先を見つけよう
        </p>
      </div>

      {/* 検索バー — bg-input で背景と明確に区別 */}
      <div className="mb-5">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-hint"
          />
          <input
            type="text"
            placeholder="行き先・エリア・タグで検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-[15px] rounded-xl bg-bg-input focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200 placeholder:text-text-hint"
          />
        </div>
      </div>

      {/* カテゴリフィルター — bg-input で背景と区別 */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setQuery("");
            }}
            className={`px-4 py-2 text-[13px] font-medium rounded-full whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat
                ? "bg-primary text-on-fill"
                : "bg-bg-input text-text-sub hover:bg-bg-hover"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-full bg-bg-surface flex items-center justify-center mb-6">
            <Search size={32} className="text-text-hint" />
          </div>
          <h2 className="text-[20px] font-bold text-text mb-2">検索結果がありません</h2>
          <p className="text-[14px] text-text-sub text-center leading-relaxed max-w-xs">
            条件に一致する旅行先が見つかりませんでした。<br />キーワードを変えて再度お試しください。
          </p>
        </div>
      ) : (
        <>
          {mode !== "exact" && query.trim() !== "" && (
            <SuggestionBanner
              query={query}
              hasPartialMatch={mode === "similar"}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </>
      )}

      {/* 件数 */}
      {!isLoading && !isEmpty && results.length > 0 && (
        <p className="text-xs text-text-hint text-center mt-8">
          {results.length} 件の旅行先
        </p>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <TravelListInner />
    </Suspense>
  );
}
