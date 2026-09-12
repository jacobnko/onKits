"use client";

// 검색어 + 카테고리로 TOOLS를 필터링해 그리드로 보여주는 홈페이지 탐색 UI
import { useMemo, useState } from "react";
import { CATEGORIES, TOOLS, type ToolCategory } from "@/lib/tools";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { ToolCard } from "./ToolCard";

type FilterValue = ToolCategory | "all";

export function ToolsExplorer() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FilterValue>("all");

  const counts = useMemo(() => {
    const base: Record<FilterValue, number> = { all: TOOLS.length, finance: 0, docs: 0, productivity: 0 };
    for (const tool of TOOLS) base[tool.category] += 1;
    return base;
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const categoryOrder = CATEGORIES.map((c) => c.key);
    return TOOLS.filter((tool) => {
      const matchesCategory = category === "all" || tool.category === category;
      const matchesQuery =
        query === "" || tool.name.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    }).sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
  }, [search, category]);

  const categoryLabel = CATEGORIES.find((c) => c.key === category)?.label;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter value={category} onChange={setCategory} counts={counts} />
        <div className="sm:w-72">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted px-6 py-16 text-center text-sm text-muted-foreground">
          {search.trim() !== ""
            ? "검색 결과가 없어요. 다른 키워드로 찾아보세요."
            : `${categoryLabel ?? ""} 카테고리는 곧 준비할게요.`}
        </div>
      )}
    </section>
  );
}
