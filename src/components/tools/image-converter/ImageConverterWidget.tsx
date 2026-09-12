"use client";

// 이미지 포맷(JPG/PNG/WebP) 변환과 크기 조절을 제공하는 위젯
import { useState } from "react";
import {
  convertImage,
  FORMAT_LABELS,
  FORMAT_EXTENSIONS,
  type ImageFormat,
  type ConvertResult,
} from "@/lib/generators/image-converter";

const FORMATS: ImageFormat[] = ["image/jpeg", "image/png", "image/webp"];

function formatKB(bytes: number) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

export function ImageConverterWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<ImageFormat>("image/webp");
  const [quality, setQuality] = useState(0.9);
  const [maxWidth, setMaxWidth] = useState("");
  const [maxHeight, setMaxHeight] = useState("");

  const [result, setResult] = useState<ConvertResult | null>(null);
  const [resultUrl, setResultUrl] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  function handleFile(selected: File | null) {
    setFile(selected);
    setResult(null);
    setResultUrl("");
  }

  async function handleConvert() {
    if (!file) return;
    setIsConverting(true);
    try {
      const converted = await convertImage(file, {
        format,
        quality,
        maxWidth: maxWidth ? Number(maxWidth) : undefined,
        maxHeight: maxHeight ? Number(maxHeight) : undefined,
      });
      setResult(converted);
      setResultUrl(URL.createObjectURL(converted.blob));
    } finally {
      setIsConverting(false);
    }
  }

  const showQuality = format !== "image/png";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors hover:border-primary/40">
        <span className="font-medium text-foreground">{file ? file.name : "이미지를 선택하세요"}</span>
        <span className="text-sm text-muted-foreground">JPG, PNG, WebP 등 (한 장씩 처리)</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>

      {file && (
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">변환할 포맷</span>
            <div className="flex gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={`rounded-full border px-3 py-1 ${
                    format === f ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {FORMAT_LABELS[f]}
                </button>
              ))}
            </div>
          </div>

          {showQuality && (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">화질: {Math.round(quality * 100)}%</span>
              <input
                type="range"
                min={0.3}
                max={1}
                step={0.05}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="accent-primary"
              />
            </label>
          )}

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">최대 가로(px, 선택)</span>
              <input
                type="number"
                value={maxWidth}
                onChange={(e) => setMaxWidth(e.target.value)}
                placeholder="원본 유지"
                className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">최대 세로(px, 선택)</span>
              <input
                type="number"
                value={maxHeight}
                onChange={(e) => setMaxHeight(e.target.value)}
                placeholder="원본 유지"
                className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleConvert}
            disabled={isConverting}
            className="rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {isConverting ? "변환 중..." : `${FORMAT_LABELS[format]}로 변환`}
          </button>

          {result && resultUrl && (
            <div className="flex flex-col items-center gap-3 rounded-xl bg-secondary/40 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultUrl} alt="변환 결과" className="max-h-56 rounded-lg" />
              <p className="text-sm text-muted-foreground">
                {formatKB(file.size)} → {formatKB(result.blob.size)} · {result.width}×{result.height}px
              </p>
              <a
                href={resultUrl}
                download={`onkits-converted.${FORMAT_EXTENSIONS[format]}`}
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                다운로드
              </a>
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        이미지는 브라우저 안에서만 처리되며 서버로 전송되지 않습니다. PNG로 변환하면 투명도가 유지되고, JPG로
        변환하면 투명 영역이 흰색으로 채워집니다.
      </p>
    </div>
  );
}
