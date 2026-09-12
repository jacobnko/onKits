// 흰 종이 위 도장/서명 사진의 흰 배경을 투명하게 만들고, 이름으로 원형 전자도장을 생성하는 로직
export function removeWhiteBackground(canvas: HTMLCanvasElement, sensitivity: number): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const threshold = 255 - sensitivity;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (brightness >= threshold) {
      const fade = Math.min(255, (brightness - threshold) * 8);
      data[i + 3] = Math.max(0, data[i + 3] - fade);
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

export function loadImageToCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("캔버스를 생성할 수 없습니다");
  ctx.drawImage(img, 0, 0);
  return canvas;
}

const SEAL_COLORS = {
  red: "#c0392b",
  black: "#1f1f1f",
} as const;

export type SealColor = keyof typeof SEAL_COLORS;

export function generateSealStamp(text: string, size: number, color: SealColor): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("캔버스를 생성할 수 없습니다");

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - size * 0.06;
  const strokeColor = SEAL_COLORS[color];

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = size * 0.045;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  const chars = Array.from(text.trim()).slice(0, 4);
  if (chars.length === 0) return canvas;

  const rows: string[][] = [];
  for (let i = 0; i < chars.length; i += 2) rows.push(chars.slice(i, i + 2));

  ctx.fillStyle = strokeColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold ${size * 0.3}px "Noto Serif KR", serif`;

  const rowHeight = size * 0.34;
  const startY = cy - ((rows.length - 1) * rowHeight) / 2;

  rows.forEach((row, rowIndex) => {
    const y = startY + rowIndex * rowHeight;
    if (row.length === 1) {
      ctx.fillText(row[0], cx, y);
    } else {
      const spacing = size * 0.22;
      ctx.fillText(row[0], cx - spacing / 2, y);
      ctx.fillText(row[1], cx + spacing / 2, y);
    }
  });

  return canvas;
}
