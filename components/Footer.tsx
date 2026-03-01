"use client";

interface FooterProps {
  t: (key: string) => string;
}

function WaveSvg() {
  return (
    <svg
      viewBox="0 0 1200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Fill above the wave with the page background colour */}
      <rect width="1200" height="50" fill="#F8F5F0" />
      {/* Wave shape transitioning into the footer gradient */}
      <path
        d="M0 25 Q150 5 300 25 Q450 45 600 25 Q750 5 900 25 Q1050 45 1200 25 L1200 50 L0 50 Z"
        fill="#F0E8DC"
      />
    </svg>
  );
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer
      style={{
        background: "#F0E8DC",
      }}
    >
      <WaveSvg />
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-2 text-center sm:px-6 lg:px-8">
        <p className="text-base font-bold text-[#3A2416]">{t("footer.brand")}</p>
        <p className="mt-1 text-sm text-[#9A8068]">{t("footer.tagline")}</p>

        {/* Social Links */}
        <div className="mt-5 flex justify-center gap-3">
          {/* <a
            href={`https://line.me/R/ti/p/${process.env.NEXT_PUBLIC_LINE_OA_ID || ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD0BC] bg-white/60 px-4 py-2 text-sm font-medium text-[#06C755] transition hover:bg-white"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            {t("footer.social.line")}
          </a> */}
          <a
            href="https://www.instagram.com/cozy.nook.tw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD0BC] bg-white/60 px-4 py-2 text-sm font-medium text-[#6A4C38] transition hover:bg-white"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            {t("footer.social.instagram")}
          </a>
        </div>

        <p className="mt-6 text-xs text-[#B0A090]">{t("footer.rights")}</p>
      </div>
    </footer>
  );
}
