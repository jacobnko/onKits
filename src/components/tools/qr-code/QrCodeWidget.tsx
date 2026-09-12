"use client";

// URL/텍스트 또는 와이파이 접속 정보를 브라우저에서 바로 QR코드 이미지로 생성하는 위젯
import { useEffect, useState } from "react";
import QRCode from "qrcode";

type Tab = "text" | "wifi";
type WifiSecurity = "WPA" | "WEP" | "nopass";

function buildWifiPayload(ssid: string, password: string, security: WifiSecurity) {
  if (!ssid) return "";
  const escapedSsid = ssid.replace(/([\\;,:"])/g, "\\$1");
  const escapedPassword = password.replace(/([\\;,:"])/g, "\\$1");
  return `WIFI:T:${security};S:${escapedSsid};${security === "nopass" ? "" : `P:${escapedPassword};`};`;
}

export function QrCodeWidget() {
  const [tab, setTab] = useState<Tab>("text");

  const [text, setText] = useState("https://onkits.jacobko.app");
  const [ssid, setSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [security, setSecurity] = useState<WifiSecurity>("WPA");

  const [generatedUrl, setGeneratedUrl] = useState("");

  const payload = tab === "text" ? text : buildWifiPayload(ssid, wifiPassword, security);
  const dataUrl = payload ? generatedUrl : "";

  useEffect(() => {
    if (!payload) return;
    let cancelled = false;
    QRCode.toDataURL(payload, { width: 320, margin: 1 })
      .then((url) => {
        if (!cancelled) setGeneratedUrl(url);
      })
      .catch(() => {
        if (!cancelled) setGeneratedUrl("");
      });
    return () => {
      cancelled = true;
    };
  }, [payload]);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("text")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "text" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          텍스트/URL
        </button>
        <button
          type="button"
          onClick={() => setTab("wifi")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "wifi" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          와이파이
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-4">
          {tab === "text" ? (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">URL 또는 텍스트</span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
          ) : (
            <>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">네트워크 이름 (SSID)</span>
                <input
                  type="text"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">비밀번호</span>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  disabled={security === "nopass"}
                  className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
                />
              </label>
              <div className="flex gap-2 text-sm">
                {(["WPA", "WEP", "nopass"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSecurity(option)}
                    className={`rounded-full border px-3 py-1 ${
                      security === option ? "border-primary text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    {option === "nopass" ? "보안 없음" : option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-secondary/40 p-4">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={dataUrl} alt="생성된 QR코드" className="h-40 w-40 rounded-lg bg-white p-2" />
          ) : (
            <p className="text-sm text-muted-foreground">내용을 입력하면 QR코드가 여기 나타나요</p>
          )}
          {dataUrl && (
            <a
              href={dataUrl}
              download="onkits-qrcode.png"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              PNG로 저장
            </a>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        QR코드는 브라우저에서만 생성되며 서버로 전송되지 않습니다. 와이파이 QR은 대부분의 스마트폰 카메라 앱에서
        스캔하면 바로 접속할 수 있습니다.
      </p>
    </div>
  );
}
