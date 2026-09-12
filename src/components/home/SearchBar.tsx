// 홈페이지 툴 그리드를 이름/설명 기준으로 즉시 필터링하는 검색창
import { Search } from "lucide-react";

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="어떤 도구를 찾으세요? (예: 연차, 퇴직금, 부가세)"
        className="w-full rounded-full border border-border bg-white py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
