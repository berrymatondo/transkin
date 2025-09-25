import SignupForm from "@/components/form/signup-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  return (
    <div>
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
              <h1 className="text-3xl font-bold text-white">Créer un Compte</h1>
              <p className="text-gray-200">
                Rejoignez-nous pour gérer votre entreprise de transport.
              </p>
              <div>
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    /*     <Card className="bg-red-500  z-10">
      xxxxxxx qsdqdq dsqq q
      <CardHeader>
        <CardTitle>Créer un Compte</CardTitle>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-semibold text-blue-800 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card> */
  );
};

export default SignupPage;
