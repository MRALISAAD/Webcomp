export default function Header() {
  return (
    <header className="bg-marhaban-beige shadow-soft fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo_bleu.png" alt="Marhaban Canada" className="w-10" />
          <span className="text-marhaban-blue font-title text-2xl font-semibold">Marhaban Canada</span>
        </a>
        <nav className="hidden md:flex gap-6 text-marhaban-blue font-medium">
          <a href="/packs" className="hover:text-marhaban-gold transition">Packs</a>
          <a href="/about" className="hover:text-marhaban-gold transition">À propos</a>
          <a href="/contact" className="hover:text-marhaban-gold transition">Contact</a>
        </nav>
        <button className="bg-marhaban-gold text-marhaban-blue px-4 py-2 rounded-xl font-medium hover:bg-[#E8B930] transition">
          Réserver
        </button>
      </div>
    </header>
  );
}
