// 카카오톡 공유하기(Kakao Share SDK) 초기화 및 텍스트 템플릿 전송 유틸
declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (options: {
          objectType: "text";
          text: string;
          link: { mobileWebUrl: string; webUrl: string };
        }) => void;
      };
    };
  }
}

function ensureKakaoInit() {
  if (typeof window === "undefined" || !window.Kakao) return false;
  const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  if (!key) return false;
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(key);
  }
  return true;
}

export function shareToKakao(text: string, url: string) {
  if (!ensureKakaoInit()) return false;
  window.Kakao.Share.sendDefault({
    objectType: "text",
    text,
    link: { mobileWebUrl: url, webUrl: url },
  });
  return true;
}
