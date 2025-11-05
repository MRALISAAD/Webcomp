export default function OptimizedImage({
  srcJpg,
  srcWebp,
  srcAvif,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  fetchPriority,
  ...imgProps
}) {
  return (
    <picture>
      {srcAvif && <source srcSet={srcAvif} type="image/avif" />}
      {srcWebp && <source srcSet={srcWebp} type="image/webp" />}
      <img
        src={srcJpg}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
        {...imgProps}
      />
    </picture>
  );
}
