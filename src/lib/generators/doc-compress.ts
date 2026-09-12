// 이미지를 목표 용량(KB) 이하로 맞추기 위해 Canvas에서 크기/품질을 반복 조절하는 압축 로직
export type CompressOptions = {
  maxWidth: number;
  maxHeight: number;
  targetKB: number;
};

export type CompressResult = {
  blob: Blob;
  width: number;
  height: number;
  quality: number;
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("이미지를 불러올 수 없습니다"));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality));
}

const MIN_QUALITY = 0.4;
const QUALITY_STEP = 0.08;

export async function compressImage(file: File, options: CompressOptions): Promise<CompressResult> {
  const img = await loadImage(file);

  const scale = Math.min(1, options.maxWidth / img.naturalWidth, options.maxHeight / img.naturalHeight);
  const width = Math.round(img.naturalWidth * scale);
  const height = Math.round(img.naturalHeight * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("캔버스를 생성할 수 없습니다");
  ctx.drawImage(img, 0, 0, width, height);

  const targetBytes = options.targetKB * 1024;
  let quality = 0.92;
  let blob = await canvasToBlob(canvas, quality);

  while (blob && blob.size > targetBytes && quality > MIN_QUALITY) {
    quality = Math.round((quality - QUALITY_STEP) * 100) / 100;
    blob = await canvasToBlob(canvas, quality);
  }

  if (!blob) throw new Error("이미지를 압축하지 못했습니다");

  return { blob, width, height, quality };
}
