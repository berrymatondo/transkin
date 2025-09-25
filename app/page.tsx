"use client"

import { Button } from "@/components/ui/button"
import { TranskinLogo } from "@/components/transkin-logo"
import { useEffect, useState } from "react"
import { Truck } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleStartClick = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center max-md:justify-between px-6 py-4: md:py-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear animate-pulse"
        style={{
          backgroundImage: "url('/images/kinshasa-transport-bg.jpg')",
          transform: isLoaded ? "scale(1.05)" : "scale(1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-700/80 via-slate-800/90 to-slate-900/95" />

      {/* Content */}

      <div className=" max-md:pt-8 relative z-10 flex flex-col items-center text-center max-w-md mx-auto ">
        {/* Logo */}
        <div
          className={`w-full mb-4 transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 space-y-8 scale-95"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <TranskinLogo />
        </div>

        {/* Brand Name */}
        <div
          className={`space-y-2 transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <h1 className="text-4xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
            Transkin<span className="text-blue-500 animate-pulse">.</span>
          </h1>
        </div>

        {/* Description */}
        <div
          className={`space-y-4 transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-base text-gray-200 leading-relaxed">
            Simplifiez toute votre activité de transport. Gérez vos véhicules, vos chauffeurs, vos contrats et vos
            finances en toute simplicité… grâce à une seule application puissante.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col w-full space-y-4 pt-8 transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="max-md:mt-8 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300 animate-pulse"></div>
            <Button
              size="lg"
              className="relative w-full bg-yellow-400/90 backdrop-blur-md hover:bg-yellow-300/95 text-slate-900 font-semibold py-4 text-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20 active:scale-95 border border-transparent"
              onClick={handleStartClick}
            >
              <Truck className="w-5 h-5 mr-2" />
              Démarrer
            </Button>
          </div>

          <p className="text-gray-300 text-sm text-center mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
            En savoir plus ...
          </p>
        </div>
      </div>
    </div>
  )
}
