"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Truck, Mail, Lock, User, Phone } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-6 py-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/kinshasa-transport-bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-700/80 via-slate-800/90 to-slate-900/95" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo and Header */}
        <div className="text-center space-y-4 animate-slide-down">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-lg hover:shadow-yellow-500/30">
              <Truck className="w-8 h-8 text-slate-900" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Créer un Compte</h1>
            <p className="text-gray-200">Rejoignez-nous pour gérer votre entreprise de transport.</p>
          </div>
        </div>

        {/* Signup Form */}
        <div className="space-y-6 animate-slide-up">
          <div className="space-y-4">
            {/* Full Name Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200" />
              </div>
              <Input
                type="text"
                placeholder="Nom complet"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 py-3 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transform transition-all duration-300 hover:bg-white/15"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200" />
              </div>
              <Input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 py-3 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transform transition-all duration-300 hover:bg-white/15"
              />
            </div>

            {/* Phone Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200" />
              </div>
              <Input
                type="tel"
                placeholder="Numéro de téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 py-3 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transform transition-all duration-300 hover:bg-white/15"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200" />
              </div>
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 py-3 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transform transition-all duration-300 hover:bg-white/15"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200" />
              </div>
              <Input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 py-3 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transform transition-all duration-300 hover:bg-white/15"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300 animate-pulse"></div>
            <Button
              className="relative w-full bg-yellow-400/90 backdrop-blur-md hover:bg-yellow-300/95 text-slate-900 font-semibold py-3 text-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20 active:scale-95 border border-transparent"
              size="lg"
            >
              S'inscrire
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center text-gray-200">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/login"
              className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out 0.2s both;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.4s both;
        }
      `}</style>
    </div>
  )
}
