// 존재하지 않는 페이지에 대한 브랜드 일관된 404 화면
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="text-2xl font-bold text-foreground">페이지를 찾을 수 없어요</h1>
      <p className="text-muted-foreground">요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.</p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
