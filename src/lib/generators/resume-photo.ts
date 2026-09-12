// 증명사진 규격 크롭 및 단색 배경 변환(모서리 색 기준 유사색 치환) 로직
export type CropPreset = {
  label: string;
  ratio: number;
  outputWidth: number;
  outputHeight: number;
};

export const CROP_PRESETS: CropPreset[] = [
  { label: "3×4cm (반명함)", ratio: 3 / 4, outputWidth: 480, outputHeight: 640 },
  { label: "3.5×4.5cm (여권・증명사진)", ratio: 3.5 / 4.5, outputWidth: 420, outputHeight: 540 },
  { label: "5×7cm (이력서 대형)", ratio: 5 / 7, outputWidth: 500, outputHeight: 700 },
];

export type SourceRect = { x: number; y: number; width: number; height: number };

export function cropToCanvas(
  img: HTMLImageElement,
  source: SourceRect,
  output: { width: number; height: number }
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = output.width;
  canvas.height = output.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("캔버스를 생성할 수 없습니다");
  ctx.drawImage(img, source.x, source.y, source.width, source.height, 0, 0, output.width, output.height);
  return canvas;
}

export type BgColor = { name: string; r: number; g: number; b: number };

export const BG_COLORS: BgColor[] = [
  { name: "흰색", r: 255, g: 255, b: 255 },
  { name: "파란색", r: 64, g: 122, b: 191 },
  { name: "회색", r: 200, g: 200, b: 200 },
  { name: "빨간색", r: 200, g: 48, b: 48 },
];

// 네 모서리 평균색을 배경 기준색으로 삼아, 그 색과 비슷한 픽셀만 지정한 단색으로 치환한다.
// 실제 인물 분리(세그멘테이션)가 아니라 배경이 비교적 단색에 가까울 때 잘 동작하는 간이 방식이다.
export function replaceBackground(canvas: HTMLCanvasElement, target: BgColor, threshold: number): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const sampleAt = (x: number, y: number) => {
    const i = (y * width + x) * 4;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const corners = [sampleAt(0, 0), sampleAt(width - 1, 0), sampleAt(0, height - 1), sampleAt(width - 1, height - 1)];
  const bgRef = [0, 1, 2].map((c) => corners.reduce((sum, p) => sum + p[c], 0) / corners.length);

  const thresholdSq = threshold * threshold;
  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - bgRef[0];
    const dg = data[i + 1] - bgRef[1];
    const db = data[i + 2] - bgRef[2];
    const distSq = dr * dr + dg * dg + db * db;
    if (distSq <= thresholdSq) {
      data[i] = target.r;
      data[i + 1] = target.g;
      data[i + 2] = target.b;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}
