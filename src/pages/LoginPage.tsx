import { Spin } from "antd";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../Auth/authStore";
import axiosApi from "../Config/axiosConfig";

interface LoginForm {
  usernameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const LogUser = authStore((state) => state.logIn);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axiosApi.post("/Account/login", loginForm);
      localStorage.setItem("token", response.data.token);

      if (loginForm.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      LogUser();
      navigate("/");
    } catch (error) {
      console.error("Échec de la connexion :", error);
      setErrorMessage("Nom d'utilisateur/email ou mot de passe invalide");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        {/* En-tête avec dégradé */}
        <div className="bg-gradient-to-r from-blue-600 to-yellow-500 p-6 text-center">
          <div className="flex flex-col items-center">
            <div className="text-white font-bold text-3xl mb-1">Manafiaa</div>
            <div className="text-blue-100 text-sm">Plateforme Immobilière Premium</div>
          </div>
        </div>

        {/* Contenu du formulaire */}
        <div className="p-8">
          {/* Message d'erreur */}
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <svg
                className="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Champ Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-blue-800">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="usernameOrEmail"
                  className="block w-full pl-10 pr-3 py-3 border border-blue-200 rounded-lg bg-blue-50 focus:ring-2 focus:ring-yellow-400 focus:border-blue-400 focus:bg-white transition-all"
                  placeholder="votre@email.com"
                  value={loginForm.usernameOrEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Champ mot de passe */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-blue-800">Mot de passe</label>
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="block w-full pl-10 pr-10 py-3 border border-blue-200 rounded-lg bg-blue-50 focus:ring-2 focus:ring-yellow-400 focus:border-blue-400 focus:bg-white transition-all"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {/* Icones yeux visibles/invisibles */}
                  {showPassword ? (
                    <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Souviens-toi de moi */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="rememberMe"
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-blue-200 rounded"
                checked={loginForm.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-blue-800">
                Se souvenir de moi
              </label>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Spin size="small" className="mr-2" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Se connecter
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
