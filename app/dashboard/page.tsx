"use client";

import { Button } from "@/components/ui/button";
import {
  Menu,
  Bell,
  FileText,
  UserPlus,
  Wrench,
  ChevronRight,
  LayoutDashboard,
  Car,
  User,
  ClipboardList,
  BarChart3,
  Home,
  X,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/page-header";

export default function DashboardPage() {
  const router = useRouter();

  const stats = [
    { title: "Véhicules Actifs", value: "12" },
    { title: "Chauffeurs Disponibles", value: "8" },
    { title: "Contrats en Attente", value: "3" },
    { title: "Alertes", value: "5" },
  ];

  const recentActivities = [
    {
      icon: Wrench,
      title: "Maintenance Véhicule",
      subtitle: "Contrat #2023-001",
      iconBg: "bg-blue-500",
    },
    {
      icon: UserPlus,
      title: "Nouveau Chauffeur Ajouté",
      subtitle: "Chauffeur: Jean-Pierre",
      iconBg: "bg-green-500",
    },
    {
      icon: FileText,
      title: "Nouveau Contrat Créé",
      subtitle: "Contrat #2023-002",
      iconBg: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/kinshasa-transport-bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-700/80 via-slate-800/90 to-slate-900/95" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <PageHeader title="Tableau de Bord" />

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6 pb-20">
          {/*           <h2 className="text-white text-center text-lg font-semibold mb-4">
            Tableau de bord
          </h2> */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            <div
              key={stats[0].title}
              onClick={() => router.push("/vehicules")}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transform transition-all duration-300 hover:bg-white/15 hover:scale-105 cursor-pointer"
              style={{ animationDelay: "0s" }}
            >
              <p className="text-gray-300 text-sm font-medium">
                {stats[0].title}
              </p>
              <p className="text-white text-3xl font-bold mt-1">
                {stats[0].value}
              </p>
            </div>

            <div
              key={stats[1].title}
              onClick={() => router.push("/chauffeurs")}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transform transition-all duration-300 hover:bg-white/15 hover:scale-105 cursor-pointer"
              style={{ animationDelay: "0.1s" }}
            >
              <p className="text-gray-300 text-sm font-medium">
                {stats[1].title}
              </p>
              <p className="text-white text-3xl font-bold mt-1">
                {stats[1].value}
              </p>
            </div>

            {/* Third card spans full width on smaller screens */}
            <div
              className="col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transform transition-all duration-300 hover:bg-white/15 hover:scale-105 cursor-pointer"
              onClick={() => router.push("/contrats")}
              style={{ animationDelay: "0.2s" }}
            >
              <p className="text-gray-300 text-sm font-medium">
                {stats[2].title}
              </p>
              <p className="text-white text-3xl font-bold mt-1">
                {stats[2].value}
              </p>
            </div>

            <div
              className="col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transform transition-all duration-300 hover:bg-white/15 hover:scale-105 cursor-pointer"
              onClick={() => router.push("/rapports")}
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-gray-300 text-sm font-medium">Rapports</p>
              <p className="text-white text-3xl font-bold mt-1">4</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="animate-slide-up">
            <h2 className="text-white text-lg font-semibold mb-4">
              Activité Récente
            </h2>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div
                  key={activity.title}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between transform transition-all duration-300 hover:bg-white/15 hover:scale-102 cursor-pointer"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 ${activity.iconBg} rounded-xl flex items-center justify-center`}
                    >
                      <activity.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{activity.title}</p>
                      <p className="text-gray-300 text-sm">
                        {activity.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-down {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-right {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.4s both;
        }
        .animate-slide-right {
          animation: slide-right 0.3s ease-out;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        .z-60 {
          z-index: 60;
        }
        .z-70 {
          z-index: 70;
        }
      `}</style>
    </div>
  );
}
