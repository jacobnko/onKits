"use client";

// 영수증 이미지를 여러 장 업로드해 A4 PDF 한 장으로 자동 취합하는 위젯
import { useState } from "react";
import { generateReceiptPdf, RECEIPTS_PER_PAGE, type ReceiptImage } from "@/lib/generators/receipt-pdf";

type UploadedImage = ReceiptImage & { id: string; name: string };

function readImage(file: File): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        resolve({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: file.name,
          dataUrl,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        });
      };
      img.onerror = () => reject(new Error("이미지를 불러올 수 없습니다"));
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

export function ReceiptPdfWidget() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  async function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    const loaded = await Promise.all(files.map(readImage));
    setImages((prev) => [...prev, ...loaded]);
    setPdfUrl("");
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setPdfUrl("");
  }

  function moveImage(id: string, direction: -1 | 1) {
    setImages((prev) => {
      const index = prev.findIndex((img) => img.id === id);
      const targetIndex = index + direction;
      if (index === -1 || targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
    setPdfUrl("");
  }

  async function handleGenerate() {
    if (images.length === 0) return;
    setIsGenerating(true);
    try {
      const doc = generateReceiptPdf(images);
      const blob = doc.output("blob");
      setPdfUrl(URL.createObjectURL(blob));
    } finally {
      setIsGenerating(false);
    }
  }

  const pageCount = Math.ceil(images.length / RECEIPTS_PER_PAGE);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors hover:border-primary/40">
        <span className="font-medium text-foreground">영수증 이미지를 선택하세요</span>
        <span className="text-sm text-muted-foreground">여러 장을 한 번에 선택할 수 있어요 (JPG, PNG)</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </label>

      {images.length > 0 && (
        <>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((image, index) => (
              <div key={image.id} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.dataUrl} alt={image.name} className="h-full w-full object-cover" />
                <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/70 text-[10px] text-white">
                  {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/70 text-xs text-white"
                  aria-label="삭제"
                >
                  ✕
                </button>
                <div className="absolute inset-x-1 bottom-1 flex justify-between gap-1">
                  <button
                    type="button"
                    onClick={() => moveImage(image.id, -1)}
                    disabled={index === 0}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/70 text-xs text-white disabled:opacity-30"
                    aria-label="앞으로 이동"
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(image.id, 1)}
                    disabled={index === images.length - 1}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/70 text-xs text-white disabled:opacity-30"
                    aria-label="뒤로 이동"
                  >
                    ▶
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            총 {images.length}장 · A4 {pageCount}페이지로 생성됩니다 (페이지당 최대 {RECEIPTS_PER_PAGE}장)
          </p>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {isGenerating ? "PDF 생성 중..." : pdfUrl ? "PDF 다시 생성" : "PDF 생성하기"}
          </button>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download="onkits-receipts.pdf"
              className="mt-3 block rounded-xl border border-border py-2.5 text-center text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              PDF 다운로드
            </a>
          )}
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        업로드한 이미지는 서버로 전송되지 않고 브라우저 안에서만 PDF로 합쳐집니다. 페이지를 벗어나면 목록은
        사라져요.
      </p>
    </div>
  );
}
