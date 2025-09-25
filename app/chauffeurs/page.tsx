"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronRight,
  LayoutDashboard,
  Car,
  User,
  ClipboardList,
  X,
  Edit,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/page-header";

export default function ChauffeursPage() {
  const [activeTab, setActiveTab] = useState("drivers");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const router = useRouter();

  const drivers = [
    {
      id: 12345,
      name: "Jean-Pierre Kabila",
      avatar: "/african-man-portrait.jpg",
      phone: "+243 123 456 789",
      license: "DL123456789",
      experience: 8,
      address: "Avenue Lumumba, Kinshasa",
      assignedVehicle: "Camion 123",
      vehicleId: "TRK-123",
      hasActiveContract: true,
    },
    {
      id: 67890,
      name: "Marie N'Goyi",
      avatar: "/african-woman-portrait.jpg",
      phone: "+243 987 654 321",
      license: "DL987654321",
      experience: 5,
      address: "Boulevard du 30 Juin, Kinshasa",
      assignedVehicle: "Camion 456",
      vehicleId: "TRK-456",
      hasActiveContract: true,
    },
    {
      id: 24680,
      name: "Josephine Mukendi",
      avatar: "/african-woman-portrait-2.jpg",
      phone: "+243 555 123 456",
      license: "DL555123456",
      experience: 3,
      address: "Avenue Kasavubu, Kinshasa",
      assignedVehicle: null,
      vehicleId: null,
      hasActiveContract: false,
    },
    {
      id: 13579,
      name: "Antoine Tshisekedi",
      avatar: "/african-man-portrait-2.jpg",
      phone: "+243 777 888 999",
      license: "DL777888999",
      experience: 12,
      address: "Avenue de la Paix, Kinshasa",
      assignedVehicle: null,
      vehicleId: null,
      hasActiveContract: false,
    },
  ];

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
  ];

  const handleNavigation = (route: string, id: string) => {
    setActiveTab(id);
    router.push(route);
  };

  const handleAddDriver = () => {
    setIsAddModalOpen(true);
  };

  const handleDriverClick = (driver: any) => {
    setSelectedDriver(driver);
    setIsDetailsModalOpen(true);
  };

  const handleEditDriver = (driver: any) => {
    setSelectedDriver(driver);
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleDeleteDriver = (driver: any) => {
    if (driver.hasActiveContract || driver.assignedVehicle) {
      alert(
        "Impossible de supprimer ce chauffeur car il a un véhicule assigné ou un contrat actif."
      );
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer ${driver.name} ?`)) {
      console.log("Deleting driver:", driver.id);
      setIsDetailsModalOpen(false);
    }
  };

  const handleSubmitDriver = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding new driver...");
    setIsAddModalOpen(false);
    setPhotoPreview(null);
  };

  const handleUpdateDriver = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating driver:", selectedDriver?.id);
    setIsEditModalOpen(false);
    setPhotoPreview(null);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        <PageHeader title="Chauffeurs" />

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6 pb-20">
          {/* Driver List Header */}
          <div className="flex items-center justify-between animate-fade-in">
            <h2 className="text-white text-lg font-semibold">
              Liste des Chauffeurs
            </h2>
            <button className="text-yellow-400 text-sm font-medium flex items-center space-x-1 hover:text-yellow-300 transition-colors">
              <span>Voir Tout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Drivers List */}
          <div className="space-y-3 animate-slide-up">
            {drivers.map((driver, index) => (
              <div
                key={driver.id}
                onClick={() => handleDriverClick(driver)}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between transform transition-all duration-300 hover:bg-white/15 hover:scale-102 cursor-pointer"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                    <img
                      src={driver.avatar || "/placeholder.svg"}
                      alt={driver.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{driver.name}</h3>
                    <p className="text-gray-300 text-sm">ID: {driver.id}</p>
                    <p className="text-yellow-400 text-xs">
                      {driver.assignedVehicle
                        ? `Véhicule: ${driver.assignedVehicle}`
                        : "Aucun véhicule assigné"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </main>

        {/* Add New Driver Button */}
        <div className="p-4 animate-slide-up pb-20">
          <Button
            onClick={handleAddDriver}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25"
          >
            + Ajouter Nouveau Chauffeur
          </Button>
        </div>

        {/* Bottom Navigation */}
        {/*         <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 p-4 z-50 animate-slide-up">
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
        </nav> */}
      </div>

      {isDetailsModalOpen && selectedDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDetailsModalOpen(false)}
          />

          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Détails du Chauffeur
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-white hover:bg-white/10 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300">
                  <img
                    src={selectedDriver.avatar || "/placeholder.svg"}
                    alt={selectedDriver.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">
                    {selectedDriver.name}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    ID: {selectedDriver.id}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-sm">
                    Téléphone
                  </label>
                  <p className="text-white">{selectedDriver.phone}</p>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm">
                    Numéro de Permis
                  </label>
                  <p className="text-white">{selectedDriver.license}</p>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm">
                    Expérience
                  </label>
                  <p className="text-white">
                    {selectedDriver.experience} années
                  </p>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm">Adresse</label>
                  <p className="text-white">{selectedDriver.address}</p>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm">
                    Véhicule Assigné
                  </label>
                  <p className="text-yellow-400">
                    {selectedDriver.assignedVehicle
                      ? `${selectedDriver.assignedVehicle} (${selectedDriver.vehicleId})`
                      : "Aucun véhicule assigné"}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm">Statut</label>
                  <p
                    className={
                      selectedDriver.hasActiveContract
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    {selectedDriver.hasActiveContract
                      ? "Contrat actif"
                      : "Disponible"}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 pt-6">
                <Button
                  onClick={() => handleEditDriver(selectedDriver)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Modifier</span>
                </Button>
                <Button
                  onClick={() => handleDeleteDriver(selectedDriver)}
                  disabled={
                    selectedDriver.hasActiveContract ||
                    selectedDriver.assignedVehicle
                  }
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Supprimer</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && selectedDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          />

          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Modifier Chauffeur
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditModalOpen(false)}
                className="text-white hover:bg-white/10 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleUpdateDriver} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Nom Complet
                </label>
                <input
                  type="text"
                  required
                  defaultValue={selectedDriver.name}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Numéro de Téléphone
                </label>
                <input
                  type="tel"
                  required
                  defaultValue={selectedDriver.phone}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Numéro de Permis
                </label>
                <input
                  type="text"
                  required
                  defaultValue={selectedDriver.license}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Expérience (années)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  defaultValue={selectedDriver.experience}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Adresse
                </label>
                <textarea
                  rows={3}
                  defaultValue={selectedDriver.address}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 text-white border border-white/20 hover:bg-white/10 py-3 rounded-xl"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  Mettre à jour
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for adding new driver */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md animate-fade-in max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Nouveau Chauffeur
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setPhotoPreview(null);
                }}
                className="text-white hover:bg-white/10 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitDriver} className="space-y-4">
              {/* Photo upload section */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Photo de profil
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300 border-2 border-white/20">
                    {photoPreview ? (
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-400/30 rounded-lg px-4 py-2 text-sm font-medium transition-colors inline-block"
                    >
                      Choisir une photo
                    </label>
                    <p className="text-gray-400 text-xs mt-1">
                      JPG, PNG max 5MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Nom Complet
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Ex: Jean-Pierre Kabila"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Numéro de Téléphone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Ex: +243 123 456 789"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Numéro de Permis
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Ex: DL123456789"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Expérience (années)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Ex: 5"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Adresse
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                  placeholder="Adresse complète..."
                />
              </div>

              {/* Modal Actions */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 text-white border border-white/20 hover:bg-white/10 py-3 rounded-xl"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  Ajouter
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

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
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.4s both;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
