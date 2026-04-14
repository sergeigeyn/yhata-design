"use client";
import { useState } from "react";

export function StubButton({
  label, icon, description = "Функция в разработке — заглушка для preview", className = "",
}: {
  label: string; icon?: React.ReactNode; description?: string; className?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => { setShow(true); setTimeout(() => setShow(false), 2500); }} className={className}>
        {icon}{label}
      </button>
      {show && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-black/90 text-white text-sm px-5 py-3 rounded-2xl shadow-xl max-w-xs text-center">
          <p className="font-medium mb-0.5">{label}</p>
          <p className="text-white/60 text-xs">{description}</p>
        </div>
      )}
    </>
  );
}
