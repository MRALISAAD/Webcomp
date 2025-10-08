"use strict";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { adminLogin } from "../utils/api.js";

function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (values) => {
    setFeedback(null);
    try {
      const response = await adminLogin(values);
      localStorage.setItem("marhaban-admin-token", response.token);
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      if (error.status === 401) {
        setFeedback({ type: "error", message: "Identifiants invalides. Merci de réessayer." });
        return;
      }
      setFeedback({
        type: "error",
        message: error.message || "Connexion impossible pour le moment.",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-gray px-4 py-12 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white">
            MC
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Espace admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Connexion</h1>
          <p className="mt-2 text-sm text-slate-500">
            Accédez au tableau de bord pour suivre et traiter les nouvelles demandes d&apos;accompagnement.
          </p>
        </header>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="username">
              Nom d&apos;utilisateur
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
              {...register("username", { required: "Champ requis." })}
            />
            {errors.username && <p className="mt-1 text-xs text-brand-red">{errors.username.message}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
              {...register("password", { required: "Champ requis." })}
            />
            {errors.password && <p className="mt-1 text-xs text-brand-red">{errors.password.message}</p>}
          </div>
          <button className="btn-primary w-full justify-center" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
          {feedback && (
            <p className="rounded-2xl border border-brand-pale bg-brand-pale px-4 py-3 text-sm text-brand-dark">
              {feedback.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
