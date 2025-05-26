"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { loginJogador, createJogador } from "../../api/jogador";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // ✅ importa o hook do contexto

// Hook para gerenciar feedback de API
function useApiFeedback(initialStatus = "idle") {
  const [status, setStatus] = useState(initialStatus);

  const setLoading = useCallback(() => setStatus("loading"), []);
  const setSuccess = useCallback(() => setStatus("success"), []);
  const setError = useCallback(() => setStatus("error"), []);
  const setIdle = useCallback(() => setStatus("idle"), []);

  return {
    status,
    setLoading,
    setSuccess,
    setError,
    setIdle,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    isIdle: status === "idle",
  };
}

// Componente de Feedback
function ApiFeedback({
  status,
  successMessage = "Operação realizada com sucesso!",
  errorMessage = "Ocorreu um erro. Tente novamente.",
  loadingMessage = "Processando...",
  onRetry,
  onDismiss,
  className,
  showRetryButton = true,
  showDismissButton = true,
}) {
  if (status === "idle") {
    return null;
  }

  const getIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getMessage = () => {
    switch (status) {
      case "loading":
        return loadingMessage;
      case "success":
        return successMessage;
      case "error":
        return errorMessage;
      default:
        return "";
    }
  };

  const getVariant = () => {
    switch (status) {
      case "success":
        return "success";
      case "error":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Alert
      variant={getVariant()}
      className={cn(
        "flex items-center justify-center gap-1 text-left text-sm",
        "border-green-600/50 bg-gray-800/50",
        status === "success" && "border-green-500/50 bg-green-900/20",
        status === "error" && "border-red-500/50 bg-red-900/20",
        className
      )}
    >
      {getIcon()}
      <AlertDescription className="flex items-center justify-between text-gray-200">
        <span className="mt-1">{getMessage()}</span>
        {(status === "error" || status === "success") && (
          <div className="flex gap-2 ml-4">
            {status === "error" && showRetryButton && onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="h-7 px-2 text-xs bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-400"
              >
                Tentar novamente
              </Button>
            )}
            {/*{showDismissButton && onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-7 px-2 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              >
                Dispensar
              </Button>
            )}*/}
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}

export default function LoginAuth() {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth(); // ✅ pega a função login do contexto
  const [showPassword, setShowPassword] = useState(false);

  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");

  const [nomeRegister, setNomeRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [senhaRegister, setSenhaRegister] = useState("");

  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "login"; // fallback para login
  const [tabValue, setTabValue] = useState(defaultTab);

  useEffect(() => {
    setTabValue(defaultTab);
  }, [defaultTab]);

  // Feedback states
  const loginFeedback = useApiFeedback();
  const registerFeedback = useApiFeedback();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    loginFeedback.setLoading();

    try {
      const res = await loginJogador({ email: emailLogin, senha: senhaLogin });
      //console.log("✅ Login sucesso:", res.data);

      if (res.data && res.data.success === true) {
        loginFeedback.setSuccess();
        setMessage(res.data.message);

        // ✅ Sinaliza ao contexto que o usuário está autenticado
        loginContext();

        // Auto-dismiss success after 3 seconds
        setTimeout(() => {
          loginFeedback.setIdle();
          // Aqui você pode redirecionar o usuário
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      console.error("❌ Erro ao logar:", err.response?.data || err.message);
      setMessage(err.response?.data.message);
      loginFeedback.setError();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    registerFeedback.setLoading();

    try {
      const res = await createJogador({
        nome: nomeRegister,
        email: emailRegister,
        senha: senhaRegister,
      });
      console.log("✅ Cadastro sucesso:", res.data);

      if (res.data && res.data.success === true) {
        registerFeedback.setSuccess();

        // Auto-dismiss success after 3 seconds and switch to login
        setTimeout(() => {
          registerFeedback.setIdle();
          setTabValue("login");
          // Limpar campos do registro
          setNomeRegister("");
          setEmailRegister("");
          setSenhaRegister("");
        }, 3000);
      }
    } catch (err) {
      console.error("❌ Erro ao cadastrar:", err.response?.data || err.message);
      setMessage(err.response?.data.message);
      registerFeedback.setError();
    }
  };

  const handleRetryLogin = () => {
    loginFeedback.setIdle();
  };

  const handleRetryRegister = () => {
    registerFeedback.setIdle();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black">
      <Card className="w-full max-w-md border-green-600/50 bg-black/90 text-white">
        <CardHeader className="space-y-2 text-center flex flex-col justify-center items-center">
          <a href="/" className="flex items-center">
            <img
              src="https://winfun.pro/public/uploads/17216052025043915.png"
              alt="Logo do Cassino"
              className="h-12 sm:h-16 max-w-full object-contain"
            />
          </a>
          <CardDescription className="text-gray-400">
            Entre ou cadastre-se para começar a jogar
          </CardDescription>
        </CardHeader>

        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=inactive]:text-neutral-50"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=inactive]:text-neutral-50"
            >
              Cadastro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="email-login" className="text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="email-login"
                      placeholder="seu@email.com"
                      type="email"
                      value={emailLogin}
                      onChange={(e) => setEmailLogin(e.target.value)}
                      required
                      disabled={loginFeedback.isLoading}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login" className="text-gray-300">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="password-login"
                      type={showPassword ? "text" : "password"}
                      value={senhaLogin}
                      onChange={(e) => setSenhaLogin(e.target.value)}
                      required
                      disabled={loginFeedback.isLoading}
                      className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-white"
                      onClick={togglePasswordVisibility}
                      disabled={loginFeedback.isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Feedback do Login */}
                <ApiFeedback
                  status={loginFeedback.status}
                  successMessage={message}
                  errorMessage={message}
                  loadingMessage="Fazendo login..."
                  onRetry={handleRetryLogin}
                  onDismiss={loginFeedback.setIdle}
                />
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  disabled={loginFeedback.isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 mt-4 disabled:opacity-50"
                >
                  {loginFeedback.isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Nome
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      value={nomeRegister}
                      onChange={(e) => setNomeRegister(e.target.value)}
                      required
                      disabled={registerFeedback.isLoading}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register" className="text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="email-register"
                      placeholder="seu@email.com"
                      type="email"
                      value={emailRegister}
                      onChange={(e) => setEmailRegister(e.target.value)}
                      required
                      disabled={registerFeedback.isLoading}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register" className="text-gray-300">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="password-register"
                      type={showPassword ? "text" : "password"}
                      value={senhaRegister}
                      onChange={(e) => setSenhaRegister(e.target.value)}
                      required
                      disabled={registerFeedback.isLoading}
                      className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-white"
                      onClick={togglePasswordVisibility}
                      disabled={registerFeedback.isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Feedback do Registro */}
                <ApiFeedback
                  status={registerFeedback.status}
                  successMessage="Conta criada com sucesso! Redirecionando para login..."
                  errorMessage={message}
                  loadingMessage="Criando conta..."
                  onRetry={handleRetryRegister}
                  onDismiss={registerFeedback.setIdle}
                />
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  disabled={registerFeedback.isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 mt-4 disabled:opacity-50"
                >
                  {registerFeedback.isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      Cadastrar <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>

        <div className="px-8 pb-8 pt-2 text-center text-xs text-gray-500">
          Ao entrar, você concorda com nossos termos e condições.
        </div>
      </Card>
    </div>
  );
}
