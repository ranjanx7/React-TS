import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, loginSchema, type RegisterFormData, type LoginFormData } from "../schemas/auth.schema";
import { useAuthStore } from "../store/auth-store";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { register: registerUser, login, currentUser } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (currentUser) {
    navigate("/admin");
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData | LoginFormData>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = (data: RegisterFormData | LoginFormData) => {
    setMessage(null);

    if (isLogin) {
      const loginData = data as LoginFormData;
      const result = login(loginData.email, loginData.password);
      if (result.success) {
        setMessage({ type: "success", text: result.message });
        setTimeout(() => navigate("/admin"), 500);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } else {
      const registerData = data as RegisterFormData;
      const result = registerUser(registerData.name, registerData.email, registerData.password);
      if (result.success) {
        setMessage({ type: "success", text: result.message });
        // Switch to login mode after successful registration
        setTimeout(() => {
          setIsLogin(true);
          reset();
          setMessage(null);
        }, 1000);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setMessage(null);
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Sign in to your account to continue" : "Create your account to get started"}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-gray-200/50">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>

          {message && (
            <div
              className={`mb-4 rounded-lg p-3 text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {"name" in errors && errors.name && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/40"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleToggleMode}
              className="text-sm text-gray-600 transition-colors hover:text-blue-600"
            >
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <span className="font-medium text-blue-600 hover:underline">Sign up</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="font-medium text-blue-600 hover:underline">Sign in</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
