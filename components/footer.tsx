"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
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

const navItems = [
  {
    id: "dashboard",
    label: "Accueil",
    icon: LayoutDashboard,
    route: "/dashboard",
  },
  { id: "vehicles", label: "Véhicules", icon: Car, route: "/vehicules" },
  { id: "drivers", label: "Chauffeurs", icon: User, route: "/chauffeurs" },
  {
    id: "contracts",
    label: "Contrats",
    icon: ClipboardList,
    route: "/contrats",
  },
  { id: "reports", label: "Rapports", icon: BarChart3, route: "/rapports" }, // Added reports navigation item
];

const Footer = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  const handleNavigation = (route: string, id: string) => {
    setActiveTab(id);
    router.push(route);
  };

  return (
    <div>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 p-4 z-50 animate-slide-up">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.route, item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                activeTab === item.id
                  ? "text-yellow-400 bg-yellow-400/10"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Footer;
