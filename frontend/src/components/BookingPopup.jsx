export default function BookingPopup({ open, setOpen, selectedPack, setSelectedPack }) {
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Demande envoyée pour le Pack ${selectedPack}`);
    setOpen(false);
  };

  const handlePackChange = (e) => {
    const newPack = e.target.value;
    setSelectedPack(newPack);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative bg-[#0b2239] text-[#fdf8f3] rounded-2xl shadow-2xl w-[90%] max-w-md p-8">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-200 text-2xl"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold mb-6 text-center">
          Réserver le Pack {selectedPack}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Nom complet</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-[#bfa45b] bg-transparent focus:ring-2 focus:ring-[#bfa45b] outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Adresse email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-[#bfa45b] bg-transparent focus:ring-2 focus:ring-[#bfa45b] outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Téléphone (WhatsApp)</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 rounded-lg border border-[#bfa45b] bg-transparent focus:ring-2 focus:ring-[#bfa45b] outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Pack choisi</label>
            <select
              value={selectedPack}
              onChange={handlePackChange}
              className="w-full px-4 py-2 rounded-lg border border-[#bfa45b] bg-transparent focus:ring-2 focus:ring-[#bfa45b] outline-none"
            >
              <option value="Essentiel">Pack Essentiel</option>
              <option value="Confort">Pack Confort</option>
              <option value="Premium">Pack Premium Famille</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#bfa45b] hover:bg-[#a68d44] text-[#0b2239] font-semibold py-3 rounded-full transition"
          >
            Envoyer ma demande
          </button>
        </form>
      </div>
    </div>
  );
}

