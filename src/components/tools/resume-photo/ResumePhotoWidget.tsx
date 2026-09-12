"use client";

// 드래그/줌으로 위치를 맞추는 증명사진 크롭 + 단색 배경 변환 위젯
import { useRef, useState } from "react";
import { CROP_PRESETS, BG_COLORS, cropToCanvas, replaceBackground } from "@/lib/generators/resume-photo";

const BOX_HEIGHT = 320;

export function ResumePhotoWidget() {
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [presetIndex, setPresetIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  const [bgColorIndex, setBgColorIndex] = useState<number | null>(null);
  const [threshold, setThreshold] = useState(40);

  const [resultUrl, setResultUrl] = useState("");

  const preset = CROP_PRESETS[presetIndex];
  const boxWidth = BOX_HEIGHT * preset.ratio;
  const baseScale = imgEl ? Math.max(boxWidth / imgEl.naturalWidth, BOX_HEIGHT / imgEl.naturalHeight) : 1;
  const finalScale = baseScale * zoom;
  const displayWidth = imgEl ? imgEl.naturalWidth * finalScale : 0;
  const displayHeight = imgEl ? imgEl.naturalHeight * finalScale : 0;
  const left = (boxWidth - displayWidth) / 2 + offset.x;
  const top = (BOX_HEIGHT - displayHeight) / 2 + offset.y;

  function handleFile(file: File | null) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImgEl(img);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setResultUrl("");
    };
    img.src = url;
  }

  function selectPreset(index: number) {
    setPresetIndex(index);
    setOffset({ x: 0, y: 0 });
  }

  function onPointerDown(e: React.PointerEvent) {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, offsetX: offset.x, offsetY: offset.y };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    setOffset({
      x: dragStart.current.offsetX + (e.clientX - dragStart.current.x),
      y: dragStart.current.offsetY + (e.clientY - dragStart.current.y),
    });
  }
  function onPointerUp() {
    setDragging(false);
  }

  function handleApply() {
    if (!imgEl) return;
    const sourceX = -left / finalScale;
    const sourceY = -top / finalScale;
    const sourceWidth = boxWidth / finalScale;
    const sourceHeight = BOX_HEIGHT / finalScale;

    const canvas = cropToCanvas(
      imgEl,
      { x: sourceX, y: sourceY, width: sourceWidth, height: sourceHeight },
      { width: preset.outputWidth, height: preset.outputHeight }
    );

    if (bgColorIndex !== null) {
      replaceBackground(canvas, BG_COLORS[bgColorIndex], threshold);
    }

    setResultUrl(canvas.toDataURL("image/jpeg", 0.95));
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {!imgEl ? (
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors hover:border-primary/40">
          <span className="font-medium text-foreground">증명사진용 원본 사진을 선택하세요</span>
          <span className="text-sm text-muted-foreground">인물이 가운데 오도록 찍은 사진이 좋아요</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2 text-sm">
            {CROP_PRESETS.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => selectPreset(i)}
                className={`rounded-full border px-3 py-1 ${
                  presetIndex === i ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <div
              className="relative touch-none overflow-hidden rounded-xl border border-border bg-muted"
              style={{ width: boxWidth, height: BOX_HEIGHT }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgEl.src}
                alt="크롭 대상"
                draggable={false}
                className="absolute cursor-grab select-none active:cursor-grabbing"
                style={{ left, top, width: displayWidth, height: displayHeight }}
              />
            </div>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">확대/축소</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="accent-primary"
            />
          </label>

          <div className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">배경색 (선택)</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setBgColorIndex(null)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  bgColorIndex === null ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
              >
                원본 유지
              </button>
              {BG_COLORS.map((color, i) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setBgColorIndex(i)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${
                    bgColorIndex === i ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-border"
                    style={{ backgroundColor: `rgb(${color.r},${color.g},${color.b})` }}
                  />
                  {color.name}
                </button>
              ))}
            </div>
            {bgColorIndex !== null && (
              <label className="mt-1 flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">배경 인식 범위: {threshold}</span>
                <input
                  type="range"
                  min={10}
                  max={120}
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="accent-primary"
                />
              </label>
            )}
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            증명사진 생성
          </button>

          {resultUrl && (
            <div className="flex flex-col items-center gap-3 rounded-xl bg-secondary/40 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultUrl} alt="완성된 증명사진" className="rounded-lg" style={{ maxHeight: 320 }} />
              <a
                href={resultUrl}
                download={`onkits-resume-photo.jpg`}
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                다운로드 ({preset.outputWidth}×{preset.outputHeight}px)
              </a>
            </div>
          )}

          <button
            type="button"
            onClick={() => setImgEl(null)}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-primary"
          >
            다른 사진으로 다시 시작
          </button>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        사진은 브라우저 안에서만 처리되며 서버로 전송되지 않습니다. 배경색 변환은 배경이 비교적 단색에 가까울
        때 잘 동작하는 간이 방식으로, 완전한 인물 배경제거(AI 세그멘테이션)와는 다릅니다.
      </p>
    </div>
  );
}
