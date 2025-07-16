"use client"
import { useEffect } from "react"

interface AdsenseProps {
  slot: string
  style?: React.CSSProperties
  format?: string
}

export default function Adsense({ slot, style = { display: "block" }, format = "auto" }: AdsenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className="flex justify-center my-8">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-3231991570613413"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
} 