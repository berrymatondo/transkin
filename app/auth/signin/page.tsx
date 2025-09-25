"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SigninForm from "@/components/form/signin-form";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally validate credentials
    // For now, we'll just redirect to the companies page
    router.push("/entreprises");
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start px-6 py-8 overflow-hidden">
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
            <h1 className="text-3xl font-bold text-white">
              Gestionnaire de Transport
            </h1>
            <p className="text-gray-200">
              Gérez votre entreprise de transport en toute simplicité.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <SigninForm />
      </div>
    </div>
  );
}
