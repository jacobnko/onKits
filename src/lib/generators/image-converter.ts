// 이미지 포맷(JPG/PNG/WebP) 변환 및 크기 조절 로직 (Canvas API, 전부 브라우저 처리)
export type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

export const FORMAT_LABELS: Record<ImageFormat, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

export const FORMAT_EXTENSIONS: Record<ImageFormat, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export type ConvertOptions = {
  format: ImageFormat;
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
};

export type ConvertResult = {
  blob: Blob;
  width: number;
  height: number;
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

export async function convertImage(file: File, options: ConvertOptions): Promise<ConvertResult> {
  const img = await loadImage(file);

  const scale = Math.min(
    options.maxWidth ? options.maxWidth / img.naturalWidth : 1,
    options.maxHeight ? options.maxHeight / img.naturalHeight : 1,
    1
  );
  const width = Math.round(img.naturalWidth * scale);
  const height = Math.round(img.naturalHeight * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("캔버스를 생성할 수 없습니다");

  if (options.format === "image/jpeg") {
    // JPEG는 투명도를 지원하지 않아 흰 배경을 먼저 채운다
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, options.format, options.quality)
  );
  if (!blob) throw new Error("이미지를 변환하지 못했습니다");

  return { blob, width, height };
}
