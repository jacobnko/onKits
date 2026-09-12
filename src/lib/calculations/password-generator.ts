// 브라우저 crypto API 기반 랜덤 비밀번호 생성 (서버 전송 없음)
const CHAR_SETS = {
  uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lowercase: "abcdefghijkmnpqrstuvwxyz",
  numbers: "23456789",
  symbols: "!@#$%^&*-_=+",
} as const;

export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export function generatePassword(options: PasswordOptions): string {
  const pool = (Object.keys(CHAR_SETS) as (keyof typeof CHAR_SETS)[])
    .filter((key) => options[key])
    .map((key) => CHAR_SETS[key])
    .join("");

  if (pool.length === 0 || options.length <= 0) return "";

  const randomValues = new Uint32Array(options.length);
  crypto.getRandomValues(randomValues);

  return Array.from(randomValues, (value) => pool[value % pool.length]).join("");
}

export type PasswordStrength = "weak" | "medium" | "strong";

export function evaluateStrength(options: PasswordOptions): PasswordStrength {
  const typeCount = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(Boolean).length;

  if (options.length >= 14 && typeCount >= 3) return "strong";
  if (options.length >= 10 && typeCount >= 2) return "medium";
  return "weak";
}
