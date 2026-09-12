// 인스타그램 캡션용 줄바꿈 유지 변환과 유니코드 특수 폰트 변환 로직
const ZERO_WIDTH_SPACE = "​";

// 연속된 빈 줄이 붙여넣기 과정에서 사라지지 않도록 각 빈 줄에 폭 없는 문자를 삽입
export function preserveLineBreaks(text: string): string {
  return text
    .split("\n")
    .map((line) => (line.trim() === "" ? ZERO_WIDTH_SPACE : line))
    .join("\n");
}

type StyleMap = { upperBase: number; lowerBase: number; digitBase?: number; spaceChar?: string };

const STYLE_MAPS: Record<string, StyleMap> = {
  bold: { upperBase: 0x1d400, lowerBase: 0x1d41a, digitBase: 0x1d7ce },
  italic: { upperBase: 0x1d434, lowerBase: 0x1d44e },
  monospace: { upperBase: 0x1d670, lowerBase: 0x1d68a, digitBase: 0x1d7f6 },
  fullwidth: { upperBase: 0xff21, lowerBase: 0xff41, digitBase: 0xff10, spaceChar: "　" },
};

export type FontStyle = keyof typeof STYLE_MAPS;
export const FONT_STYLES: FontStyle[] = ["bold", "italic", "monospace", "fullwidth"];

export function convertFontStyle(text: string, style: FontStyle): string {
  const map = STYLE_MAPS[style];

  return Array.from(text)
    .map((ch) => {
      const code = ch.codePointAt(0)!;
      if (ch >= "A" && ch <= "Z") return String.fromCodePoint(map.upperBase + (code - 65));
      if (ch >= "a" && ch <= "z") return String.fromCodePoint(map.lowerBase + (code - 97));
      if (map.digitBase && ch >= "0" && ch <= "9") return String.fromCodePoint(map.digitBase + (code - 48));
      if (ch === " " && map.spaceChar) return map.spaceChar;
      return ch;
    })
    .join("");
}
