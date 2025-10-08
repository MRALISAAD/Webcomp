"use strict";

function Loader({ label = "Chargement..." }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-brand-pale bg-white/80 px-4 py-3 text-sm text-brand-red shadow-soft">
      <span className="h-3 w-3 animate-ping rounded-full bg-brand-red" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default Loader;
