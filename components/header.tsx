"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
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

const Header = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added state for menu visibility
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Added state for notification visibility
  const router = useRouter();

    const menuItems = [
    { label: "Accueil", icon: Home, route: "/" },
    { label: "Accueil", icon: LayoutDashboard, route: "/dashboard" },
    { label: "Véhicules", icon: Car, route: "/vehicules" },
    { label: "Chauffeurs", icon: User, route: "/chauffeurs" },
    { label: "Contrats", icon: ClipboardList, route: "/contrats" },
    { label: "Rapports", icon: BarChart3, route: "/rapports" },
  ];
  
  const [selectedCompany] = useState({
    id: 1,
    denomination: "TransKin SARL",
    acronyme: "TK",
    email: "contact@transkin.cd",
    telephone: "+243 123 456 789",
  });

  const upcomingMaintenance = [
    {
      id: 1,
      vehicleName: "Bus Mercedes #001",
      contractId: "2023-001",
      maintenanceType: "Révision générale",
      scheduledDate: "2024-01-15",
      daysUntil: 8,
      priority: "high",
    },
    {
      id: 2,
      vehicleName: "Camion Isuzu #003",
      contractId: "2023-003",
      maintenanceType: "Changement d'huile",
      scheduledDate: "2024-01-20",
      daysUntil: 13,
      priority: "medium",
    },
    {
      id: 3,
      vehicleName: "Minibus Toyota #002",
      contractId: "2023-002",
      maintenanceType: "Contrôle technique",
      scheduledDate: "2024-01-12",
      daysUntil: 5,
      priority: "high",
    },
  ];

  const pendingNotifications = upcomingMaintenance.filter(
    (maintenance) => maintenance.daysUntil <= 14
  );

  const handleMenuNavigation = (route: string) => {
    setIsMenuOpen(false);
    router.push(route);
  };

  const handleCompanyClick = () => {
    router.push("/entreprises");
  };

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white/10 backdrop-blur-md border-b border-white/20 animate-slide-down">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => setIsMenuOpen(true)} // Added click handler to open menu
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div
          onClick={handleCompanyClick}
          className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 rounded-lg px-3 py-2 transition-all duration-300"
        >
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-slate-900 font-bold text-sm">
              {selectedCompany.acronyme}
            </span>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold text-white">
              {selectedCompany.denomination}
            </h1>
            <p className="text-xs text-gray-300">Cliquez pour changer</p>
          </div>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell className="h-6 w-6" />
            {pendingNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {pendingNotifications.length}
              </span>
            )}
          </Button>

          {isNotificationOpen && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsNotificationOpen(false)}
              />

              {/* Notification Panel */}
              <div className="absolute top-12 right-0 w-80 bg-slate-900/95 backdrop-blur-xl border border-white/30 rounded-2xl p-4 z-50 animate-slide-down shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Notifications</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 h-6 w-6 p-0"
                    onClick={() => setIsNotificationOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {pendingNotifications.length === 0 ? (
                  <p className="text-gray-300 text-sm text-center py-4">
                    Aucune notification
                  </p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {pendingNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="bg-slate-800/80 rounded-xl p-3 border border-white/20 hover:bg-slate-700/80 transition-all duration-300"
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              notification.priority === "high"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }`}
                          >
                            <Wrench className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">
                              {notification.maintenanceType}
                            </p>
                            <p className="text-gray-200 text-xs">
                              {notification.vehicleName}
                            </p>
                            <p className="text-gray-300 text-xs">
                              Contrat: {notification.contractId}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-gray-200">
                                Prévu:{" "}
                                {new Date(
                                  notification.scheduledDate
                                ).toLocaleDateString("fr-FR")}
                              </p>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  notification.daysUntil <= 7
                                    ? "bg-red-500/30 text-red-200 border border-red-400/50"
                                    : "bg-yellow-500/30 text-yellow-200 border border-yellow-400/50"
                                }`}
                              >
                                {notification.daysUntil} jour
                                {notification.daysUntil > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-60 animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white/10 backdrop-blur-md border-r border-white/20 z-70 animate-slide-right">
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-white text-xl font-bold">Navigation</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={item.route}
                    onClick={() => handleMenuNavigation(item.route)}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-102"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
