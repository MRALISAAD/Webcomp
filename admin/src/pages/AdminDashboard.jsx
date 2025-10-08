"use strict";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { fetchDemandes } from "../utils/api.js";

function AdminDashboard() {
  const [demandes, setDemandes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDemandes() {
      setStatus("loading");
      const token = localStorage.getItem("marhaban-admin-token");
      if (!token) {
        navigate("/", { replace: true });
        return;
      }
      try {
        const response = await fetchDemandes(token);
        setDemandes(response.data || []);
        setStatus("loaded");
      } catch (error) {
        if (error.status === 401) {
          localStorage.removeItem("marhaban-admin-token");
          navigate("/", { replace: true });
          return;
        }
        setStatus("error");
        setErrorMessage(error.message || "Impossible de récupérer les demandes.");
      }
    }

    loadDemandes();
  }, [navigate]);

  const demandesSorted = useMemo(
    () =>
      [...demandes].sort((a, b) => new Date(b.createdAt || b.dateArrivee || 0) - new Date(a.createdAt || a.dateArrivee || 0)),
    [demandes]
  );

  const handleLogout = () => {
    localStorage.removeItem("marhaban-admin-token");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-brand-gray px-4 py-12 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Tableau de bord</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Demandes d&apos;accompagnement</h1>
            <p className="mt-2 text-sm text-slate-500">Dernière synchronisation : {new Date().toLocaleString("fr-CA")}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-red hover:text-brand-red"
          >
            Se déconnecter
          </button>
        </header>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          {status === "loading" && <Loader label="Chargement des demandes..." />}
          {status === "error" && (
            <p className="rounded-2xl border border-brand-pale bg-brand-pale px-4 py-3 text-sm text-brand-dark">
              {errorMessage}
            </p>
          )}
          {status === "loaded" && demandesSorted.length === 0 && (
            <p className="rounded-2xl border border-slate-200 bg-brand-gray px-4 py-3 text-center text-sm text-slate-500">
              Aucune demande pour le moment.
            </p>
          )}

          {demandesSorted.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-brand-pale/60 text-xs uppercase tracking-wide text-brand-red">
                  <tr>
                    <th className="px-4 py-3">Nom</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Téléphone</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Arrivée</th>
                    <th className="px-4 py-3">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {demandesSorted.map((demande) => (
                    <tr key={demande._id || demande.id}>
                      <td className="px-4 py-3 font-semibold text-slate-900">{demande.nom}</td>
                      <td className="px-4 py-3">{demande.email}</td>
                      <td className="px-4 py-3">{demande.telephone}</td>
                      <td className="px-4 py-3">{demande.service}</td>
                      <td className="px-4 py-3">
                        {demande.dateArrivee
                          ? new Date(demande.dateArrivee).toLocaleDateString("fr-CA")
                          : "À préciser"}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{demande.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
