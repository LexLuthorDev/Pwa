"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Mail, Lock, User, Dice1Icon as Dice, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "react-router-dom";

export default function LoginAuth() {
  const [showPassword, setShowPassword] = useState(false)

  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "login"; // fallback para login
  const [tabValue, setTabValue] = useState(defaultTab);

  useEffect(() => {
    setTabValue(defaultTab);
  }, [defaultTab]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // Add your login logic here
    console.log("Login submitted")
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // Add your registration logic here
    console.log("Registration submitted")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black">
      <Card className="w-full max-w-md border-green-600/50 bg-black/90 text-white">
        <CardHeader className="space-y-2 text-center flex flex-col justify-center items-center">
          <a href="/" className="flex items-center">
            <img
              src="https://zonebets.site/public/uploads/57125022025223826.png"
              alt="Logo do Cassino"
              className="h-12 sm:h-16 max-w-full object-contain"
            />
          </a>
          <CardDescription className="text-gray-400">Entre ou cadastre-se para começar a jogar</CardDescription>
        </CardHeader>
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="login" className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=inactive]:text-neutral-50">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=inactive]:text-neutral-50">
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
                      requigreen
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
                      requigreen
                      className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-white"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Toggle password visibility</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 mt-4">
                  Entrar <ChevronRight className="ml-2 h-4 w-4" />
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
                      requigreen
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
                      requigreen
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
                      requigreen
                      className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-white"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Toggle password visibility</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 mt-4">
                  Cadastrar <ChevronRight className="ml-2 h-4 w-4" />
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
  )
}
