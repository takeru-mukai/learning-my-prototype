"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, Plus, Clock, MapPin, Utensils, Camera,
  Train, Coffee, ChevronRight, GripVertical, Map,
} from "lucide-react";
import { destinations } from "../data";

// ─── サンプルスポットデータ ───

const sampleSpots = [
  { id: "s1", time: "10:00", name: "箱根湯本駅", icon: Train, duration: "到着", category: "移動" },
  { id: "s2", time: "10:30", name: "箱根湯寮", icon: Coffee, duration: "90分", category: "温泉" },
  { id: "s3", time: "12:30", name: "はつ花そば", icon: Utensils, duration: "60分", category: "グルメ" },
  { id: "s4", time: "14:00", name: "箱根彫刻の森美術館", icon: Camera, duration: "120分", category: "観光" },
  { id: "s5", time: "16:30", name: "大涌谷", icon: Camera, duration: "60分", category: "観光" },
  { id: "s6", time: "18:00", name: "宿チェックイン", icon: MapPin, duration: "—", category: "宿泊" },
];

const categoryColors: Record<string, string> = {
  "移動": "text-blue",
  "温泉": "text-orange",
  "グルメ": "text-orange",
  "観光": "text-primary",
  "宿泊": "text-positive",
};

// ─── パターンA: タイムライン型 ───

function PlanTimelinePattern({ dest }: { dest: typeof destinations[0] }) {
  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <BackButton destId={dest.id} />

      <div className="mt-6 mb-6">
        <h1 className="text-[24px] font-bold text-text tracking-tight mb-1">旅程プラン</h1>
        <p className="text-[14px] text-text-sub">{dest.name} · 1泊2日</p>
      </div>

      {/* 日付タブ */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 text-[13px] font-medium rounded-full bg-primary text-on-fill">
          1日目 · 3/22(土)
        </button>
        <button className="px-4 py-2 text-[13px] font-medium rounded-full bg-bg-input text-text-sub">
          2日目 · 3/23(日)
        </button>
      </div>

      {/* タイムライン */}
      <div className="relative pl-16">
        <div className="absolute left-[52px] top-4 bottom-4 w-px bg-bg-hover" />

        {sampleSpots.map((spot) => {
          const Icon = spot.icon;
          const colorClass = categoryColors[spot.category] || "text-text-sub";
          return (
            <div key={spot.id} className="relative flex gap-4 pb-6 last:pb-0">
              {/* 時刻 */}
              <div className="absolute -left-16 top-1 text-[13px] font-medium text-text-sub w-12 text-right">
                {spot.time}
              </div>
              {/* ドット */}
              <div className={`absolute -left-1 top-1.5 w-3 h-3 rounded-full border-2 border-bg bg-primary`} />
              {/* カード */}
              <div className="flex-1 rounded-xl bg-bg-surface p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-bg-input flex items-center justify-center ${colorClass}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-text">{spot.name}</p>
                    <p className="text-[12px] text-text-sub">{spot.category} · {spot.duration}</p>
                  </div>
                  <GripVertical size={16} className="text-text-hint" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 追加ボタン */}
      <button className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-bg-hover text-text-sub text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-bg-surface transition-colors">
        <Plus size={16} />
        スポットを追加
      </button>
    </div>
  );
}

// ─── パターンB: カード追加型（ステップ形式） ───

function PlanCardPattern({ dest }: { dest: typeof destinations[0] }) {
  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <BackButton destId={dest.id} />

      <div className="mt-6 mb-6">
        <h1 className="text-[24px] font-bold text-text tracking-tight mb-1">旅程をつくる</h1>
        <p className="text-[14px] text-text-sub">{dest.name}への旅を計画しましょう</p>
      </div>

      {/* 旅行概要カード */}
      <div className="rounded-2xl bg-bg-surface p-5 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img src={dest.image} alt={dest.name} className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <h2 className="text-[16px] font-bold text-text">{dest.name}</h2>
            <p className="text-[13px] text-text-sub">{dest.area} · {dest.budgetLabel}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-bg-input p-3">
            <p className="text-[11px] text-text-hint mb-1">出発日</p>
            <p className="text-[14px] font-medium text-text">2025/03/22</p>
          </div>
          <div className="rounded-xl bg-bg-input p-3">
            <p className="text-[11px] text-text-hint mb-1">日数</p>
            <p className="text-[14px] font-medium text-text">1泊2日</p>
          </div>
        </div>
      </div>

      {/* スポットカード一覧 */}
      <h3 className="text-[16px] font-bold text-text mb-3">スポット</h3>
      <div className="flex flex-col gap-3 mb-4">
        {sampleSpots.slice(0, 4).map((spot, i) => {
          const Icon = spot.icon;
          return (
            <div key={spot.id} className="flex items-center gap-3">
              {/* 番号 */}
              <div className="w-7 h-7 rounded-full bg-primary text-on-fill text-[12px] font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              {/* カード */}
              <div className="flex-1 flex items-center gap-3 rounded-xl bg-bg-surface p-3">
                <div className="w-8 h-8 rounded-lg bg-bg-input flex items-center justify-center text-text-sub">
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-text">{spot.name}</p>
                  <p className="text-[12px] text-text-sub">{spot.time} · {spot.duration}</p>
                </div>
                <ChevronRight size={16} className="text-text-hint" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 追加ボタン */}
      <div className="flex gap-3 mb-8">
        <button className="flex-1 py-3 rounded-xl bg-bg-surface text-text-sub text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-bg-hover transition-colors">
          <MapPin size={16} />
          スポットを追加
        </button>
        <button className="flex-1 py-3 rounded-xl bg-bg-surface text-text-sub text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-bg-hover transition-colors">
          <Utensils size={16} />
          グルメを追加
        </button>
      </div>

      {/* 保存ボタン */}
      <button className="w-full py-3.5 rounded-xl bg-primary text-on-fill font-medium text-[15px]">
        この旅程を保存する
      </button>
    </div>
  );
}

// ─── パターンC: マップ＋リスト型 ───

function PlanMapPattern({ dest }: { dest: typeof destinations[0] }) {
  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <BackButton destId={dest.id} />

      <div className="mt-6 mb-6">
        <h1 className="text-[24px] font-bold text-text tracking-tight mb-1">旅程プラン</h1>
        <p className="text-[14px] text-text-sub">{dest.name} · 1泊2日 · {dest.budgetLabel}</p>
      </div>

      <div className="flex gap-6">
        {/* 左: マップエリア */}
        <div className="w-1/2 shrink-0">
          <div className="rounded-2xl bg-bg-surface aspect-[4/3] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-bg-input opacity-50" />
            <div className="relative flex flex-col items-center gap-2 text-text-hint">
              <Map size={40} />
              <p className="text-[13px] font-medium">ルートマップ</p>
              <p className="text-[11px]">スポットの位置が表示されます</p>
            </div>
            {/* ダミーのルートポイント */}
            <div className="absolute top-[20%] left-[30%] w-6 h-6 rounded-full bg-primary text-on-fill text-[10px] font-bold flex items-center justify-center">1</div>
            <div className="absolute top-[35%] left-[50%] w-6 h-6 rounded-full bg-primary text-on-fill text-[10px] font-bold flex items-center justify-center">2</div>
            <div className="absolute top-[55%] left-[40%] w-6 h-6 rounded-full bg-primary text-on-fill text-[10px] font-bold flex items-center justify-center">3</div>
            <div className="absolute top-[70%] left-[65%] w-6 h-6 rounded-full bg-primary text-on-fill text-[10px] font-bold flex items-center justify-center">4</div>
          </div>
        </div>

        {/* 右: スポットリスト */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-bold text-text">スケジュール</h3>
            <button className="text-[13px] text-primary font-medium flex items-center gap-1">
              <Plus size={14} />
              追加
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {sampleSpots.map((spot, i) => {
              const Icon = spot.icon;
              const colorClass = categoryColors[spot.category] || "text-text-sub";
              return (
                <div key={spot.id} className="flex items-center gap-3 rounded-xl bg-bg-surface p-3 hover:bg-bg-hover transition-colors">
                  <div className="w-6 h-6 rounded-full bg-primary text-on-fill text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <div className={`w-8 h-8 rounded-lg bg-bg-input flex items-center justify-center ${colorClass} shrink-0`}>
                    <Icon size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-text truncate">{spot.name}</p>
                    <p className="text-[11px] text-text-sub">{spot.time} · {spot.duration}</p>
                  </div>
                  <GripVertical size={14} className="text-text-hint shrink-0" />
                </div>
              );
            })}
          </div>

          <button className="w-full mt-4 py-3.5 rounded-xl bg-primary text-on-fill font-medium text-[15px]">
            この旅程を保存する
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 共通パーツ ───

function BackButton({ destId }: { destId: string }) {
  return (
    <Link
      href={`/detail?id=${destId}`}
      className="inline-flex items-center gap-1 text-[14px] font-medium text-primary hover:text-primary-hover transition-colors"
    >
      <ChevronLeft size={18} />
      戻る
    </Link>
  );
}

// ─── メインルーティング ───

function PlanInner() {
  const searchParams = useSearchParams();
  const pattern = searchParams.get("_p");
  const id = searchParams.get("id");

  const dest = destinations.find((d) => d.id === id) ?? destinations[0];

  if (pattern === "timeline") return <PlanTimelinePattern dest={dest} />;
  if (pattern === "map") return <PlanMapPattern dest={dest} />;

  // デフォルト: カード追加型
  return <PlanCardPattern dest={dest} />;
}

export default function PlanPage() {
  return (
    <Suspense>
      <PlanInner />
    </Suspense>
  );
}
