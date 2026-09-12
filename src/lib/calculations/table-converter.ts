// 엑셀/스프레드시트에서 복사한 표를 마크다운・HTML 테이블 문자열로 변환
export function parseTable(raw: string): string[][] {
  const lines = raw.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length === 0) return [];

  const delimiter = lines.some((line) => line.includes("\t")) ? "\t" : ",";
  return lines.map((line) => line.split(delimiter).map((cell) => cell.trim()));
}

export function toMarkdownTable(rows: string[][]): string {
  if (rows.length === 0) return "";

  const [header, ...body] = rows;
  const headerLine = `| ${header.join(" | ")} |`;
  const separatorLine = `| ${header.map(() => "---").join(" | ")} |`;
  const bodyLines = body.map((row) => `| ${row.join(" | ")} |`);

  return [headerLine, separatorLine, ...bodyLines].join("\n");
}

export function toHtmlTable(rows: string[][]): string {
  if (rows.length === 0) return "";

  const [header, ...body] = rows;
  const thead = `  <tr>\n${header.map((cell) => `    <th>${cell}</th>`).join("\n")}\n  </tr>`;
  const tbody = body
    .map((row) => `  <tr>\n${row.map((cell) => `    <td>${cell}</td>`).join("\n")}\n  </tr>`)
    .join("\n");

  return `<table>\n<thead>\n${thead}\n</thead>\n<tbody>\n${tbody}\n</tbody>\n</table>`;
}
