"use strict";

function ServiceCard({ icon, title, description }) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-pale text-brand-red">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </article>
  );
}

export default ServiceCard;
