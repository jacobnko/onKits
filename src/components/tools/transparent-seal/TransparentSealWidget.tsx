"use client";

// 도장/서명 사진 누끼(흰 배경 제거)와 이름 기반 전자도장 생성을 탭으로 제공하는 위젯
import { useMemo, useState } from "react";
import {
  removeWhiteBackground,
  loadImageToCanvas,
  generateSealStamp,
  type SealColor,
} from "@/lib/generators/transparent-seal";

type Tab = "cutout" | "generate";

const CHECKER_BG =
  "linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)";

export function TransparentSealWidget() {
  const [tab, setTab] = useState<Tab>("cutout");

  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [sensitivity, setSensitivity] = useState(60);
  const [cutoutUrl, setCutoutUrl] = useState("");

  const [sealText, setSealText] = useState("온킷츠");
  const [sealColor, setSealColor] = useState<SealColor>("red");
  const sealDataUrl = useMemo(() => {
    if (typeof document === "undefined" || !sealText.trim()) return "";
    return generateSealStamp(sealText, 320, sealColor).toDataURL("image/png");
  }, [sealText, sealColor]);

  function applyCutout(image: HTMLImageElement, currentSensitivity: number) {
    const canvas = loadImageToCanvas(image);
    removeWhiteBackground(canvas, currentSensitivity);
    setCutoutUrl(canvas.toDataURL("image/png"));
  }

  function handleFile(file: File | null) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImgEl(img);
      applyCutout(img, sensitivity);
    };
    img.src = url;
  }

  function handleSensitivityChange(value: number) {
    setSensitivity(value);
    if (imgEl) applyCutout(imgEl, value);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("cutout")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "cutout" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          도장/서명 누끼
        </button>
        <button
          type="button"
          onClick={() => setTab("generate")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "generate" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          전자도장 생성
        </button>
      </div>

      {tab === "cutout" ? (
        <div className="flex flex-col gap-4">
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors hover:border-primary/40">
            <span className="font-medium text-foreground">
              {imgEl ? "다른 사진으로 바꾸기" : "흰 종이에 찍은 도장/서명 사진을 선택하세요"}
            </span>
            <span className="text-sm text-muted-foreground">배경이 흰색에 가까울수록 결과가 깔끔해요</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>

          {imgEl && (
            <>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">배경 제거 민감도: {sensitivity}</span>
                <input
                  type="range"
                  min={10}
                  max={120}
                  value={sensitivity}
                  onChange={(e) => handleSensitivityChange(Number(e.target.value))}
                  className="accent-primary"
                />
              </label>

              <div
                className="flex items-center justify-center rounded-xl border border-border p-4"
                style={{ backgroundImage: CHECKER_BG, backgroundSize: "16px 16px", backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px" }}
              >
                {cutoutUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cutoutUrl} alt="배경 제거 결과" className="max-h-64" />
                )}
              </div>

              {cutoutUrl && (
                <a
                  href={cutoutUrl}
                  download="onkits-seal-cutout.png"
                  className="rounded-xl bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  투명 PNG 다운로드
                </a>
              )}
            </>
          )}

          <p className="text-xs text-muted-foreground">
            이미지는 브라우저 안에서만 처리되며 서버로 전송되지 않습니다. 흰 배경과 밝기 차이가 뚜렷할수록 결과가
            깨끗합니다.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">도장에 새길 이름 (최대 4자)</span>
            <input
              type="text"
              value={sealText}
              maxLength={4}
              onChange={(e) => setSealText(e.target.value)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <div className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => setSealColor("red")}
              className={`rounded-full border px-3 py-1 ${
                sealColor === "red" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              빨간색
            </button>
            <button
              type="button"
              onClick={() => setSealColor("black")}
              className={`rounded-full border px-3 py-1 ${
                sealColor === "black" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              검은색
            </button>
          </div>

          <div
            className="flex items-center justify-center rounded-xl border border-border p-6"
            style={{ backgroundImage: CHECKER_BG, backgroundSize: "16px 16px", backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px" }}
          >
            {sealDataUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sealDataUrl} alt="생성된 전자도장" className="h-40 w-40" />
            )}
          </div>

          {sealDataUrl && (
            <a
              href={sealDataUrl}
              download="onkits-seal.png"
              className="rounded-xl bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              전자도장 PNG 다운로드
            </a>
          )}

          <p className="text-xs text-muted-foreground">
            간이 전자도장으로, 공식 인감・법인 도장으로는 사용할 수 없습니다. 내부 문서나 간단한 서명 대체용으로
            활용하세요.
          </p>
        </div>
      )}
    </div>
  );
}
