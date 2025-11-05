export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="mb-2 text-3xl font-poppins font-bold text-primary">{title}</h2>
      {subtitle && <p className="mx-auto max-w-2xl text-grayText">{subtitle}</p>}
    </div>
  );
}
