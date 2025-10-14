export function setPageTitle(title) {
  document.title = `${title} | Marhaban Canada`;
}

export function setMetaDescription(description) {
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute("content", description);
  } else {
    const newMeta = document.createElement("meta");
    newMeta.setAttribute("name", "description");
    newMeta.setAttribute("content", description);
    document.head.appendChild(newMeta);
  }
}
