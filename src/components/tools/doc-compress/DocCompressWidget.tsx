"use client";

// 공공기관 제출용 이미지를 목표 용량/해상도에 맞춰 압축하는 위젯
import { useState } from "react";
import { compressImage, type CompressResult } from "@/lib/generators/doc-compress";

function formatKB(bytes: number) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

const TARGET_PRESETS = [100, 200, 500, 1024];

export function DocCompressWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [targetKB, setTargetKB] = useState(200);
  const [maxWidth, setMaxWidth] = useState(1200);
  const [maxHeight, setMaxHeight] = useState(1600);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [resultUrl, setResultUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  function handleFile(selected: File | null) {
    setFile(selected);
    setResult(null);
    setResultUrl("");
    if (selected) setPreviewUrl(URL.createObjectURL(selected));
  }

  async function handleCompress() {
    if (!file) return;
    setIsProcessing(true);
    try {
      const compressed = await compressImage(file, { maxWidth, maxHeight, targetKB });
      setResult(compressed);
      setResultUrl(URL.createObjectURL(compressed.blob));
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors hover:border-primary/40">
        <span className="font-medium text-foreground">
          {file ? file.name : "이미지를 선택하세요"}
        </span>
        <span className="text-sm text-muted-foreground">JPG, PNG 등 (한 장씩 처리)</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>

      {file && (
        <div className="mt-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">최대 가로(px)</span>
              <input
                type="number"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value) || 0)}
                className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">최대 세로(px)</span>
              <input
                type="number"
                value={maxHeight}
                onChange={(e) => setMaxHeight(Number(e.target.value) || 0)}
                className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
          </div>

          <div className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">목표 용량</span>
            <div className="flex flex-wrap gap-2">
              {TARGET_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTargetKB(preset)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    targetKB === preset ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {preset}KB
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCompress}
            disabled={isProcessing}
            className="rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {isProcessing ? "압축 중..." : "압축하기"}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-secondary/40 p-3">
              <p className="text-xs text-muted-foreground">원본 ({formatKB(file.size)})</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {previewUrl && <img src={previewUrl} alt="원본 미리보기" className="max-h-40 rounded-lg" />}
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-secondary/40 p-3">
              <p className="text-xs text-muted-foreground">
                {result ? `압축 결과 (${formatKB(result.blob.size)})` : "압축 결과"}
              </p>
              {resultUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={resultUrl} alt="압축 결과 미리보기" className="max-h-40 rounded-lg" />
              ) : (
                <p className="text-xs text-muted-foreground">압축하기를 눌러보세요</p>
              )}
            </div>
          </div>

          {result && resultUrl && (
            <a
              href={resultUrl}
              download={`onkits-compressed-${file.name.replace(/\.[^.]+$/, "")}.jpg`}
              className="rounded-xl border border-border py-2.5 text-center text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              압축된 이미지 다운로드 ({result.width}×{result.height}px)
            </a>
          )}
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        이미지는 브라우저 안에서만 처리되며 서버로 전송되지 않습니다. 목표 용량에 가깝게 화질을 자동으로
        낮추며, 과도하게 낮은 용량을 지정하면 화질이 많이 떨어질 수 있습니다.
      </p>
    </div>
  );
}
