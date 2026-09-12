// 여러 영수증 이미지를 A4 용지에 격자로 배치해 하나의 PDF로 합치는 생성기 (전부 브라우저에서 처리)
import jsPDF from "jspdf";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 10;
const GAP_MM = 5;
const COLS = 2;
const ROWS = 3;

export type ReceiptImage = {
  dataUrl: string;
  naturalWidth: number;
  naturalHeight: number;
};

function detectFormat(dataUrl: string): "PNG" | "JPEG" {
  return dataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";
}

export function generateReceiptPdf(images: ReceiptImage[]): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const cellWidth = (A4_WIDTH_MM - MARGIN_MM * 2 - GAP_MM * (COLS - 1)) / COLS;
  const cellHeight = (A4_HEIGHT_MM - MARGIN_MM * 2 - GAP_MM * (ROWS - 1)) / ROWS;
  const perPage = COLS * ROWS;

  images.forEach((image, index) => {
    const indexInPage = index % perPage;
    if (index > 0 && indexInPage === 0) doc.addPage();

    const col = indexInPage % COLS;
    const row = Math.floor(indexInPage / COLS);
    const cellX = MARGIN_MM + col * (cellWidth + GAP_MM);
    const cellY = MARGIN_MM + row * (cellHeight + GAP_MM);

    const aspect = image.naturalWidth / image.naturalHeight;
    let drawWidth = cellWidth;
    let drawHeight = cellWidth / aspect;
    if (drawHeight > cellHeight) {
      drawHeight = cellHeight;
      drawWidth = cellHeight * aspect;
    }

    const offsetX = cellX + (cellWidth - drawWidth) / 2;
    const offsetY = cellY + (cellHeight - drawHeight) / 2;

    doc.addImage(image.dataUrl, detectFormat(image.dataUrl), offsetX, offsetY, drawWidth, drawHeight);
  });

  return doc;
}

export const RECEIPTS_PER_PAGE = COLS * ROWS;
