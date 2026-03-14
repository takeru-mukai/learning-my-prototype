"use client";

// カフェ詳細ページは現在使用していません。
// 旅行先の詳細ページを作る際にここを置き換えます。

import Link from "next/link";

export default function CafeDetailPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <Link
        href="/"
        className="text-sm text-wf-text-sub hover:text-wf-text transition-colors"
      >
        ← 一覧に戻る
      </Link>
      <div className="mt-8 text-center text-wf-text-sub">
        <p>詳細ページは準備中です</p>
      </div>
    </main>
  );
}
