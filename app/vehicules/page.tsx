"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Menu,
  Plus,
  ChevronRight,
  LayoutDashboard,
  Car,
  User,
  ClipboardList,
  X,
  Edit,
  Trash2,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/page-header";

export default function VehiculesPage() {
  const [activeTab, setActiveTab] = useState("vehicles");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "",
    plateNumber: "",
    model: "",
    year: "",
    purchasePrice: "",
    receptionDate: "",
    mileage: "",
  });
  const router = useRouter();

  const vehicles = [
    {
      id: 1,
      name: "Moto 1",
      type: "Moto 2 roues",
      image: "/classic-motorcycle.png",
      bgColor: "bg-amber-100",
      plateNumber: "KIN-001",
      model: "Honda CB125",
      year: "2022",
      purchasePrice: "2500",
      receptionDate: "2022-03-15",
      mileage: "15000",
      assignedDriver: "Jean-Pierre Kabila",
      hasActiveContract: true,
      contractId: "001",
    },
    {
      id: 2,
      name: "Moto 2",
      type: "Moto 3 roues",
      image: "/three-wheel-motorcycle.jpg",
      bgColor: "bg-teal-100",
      plateNumber: "KIN-002",
      model: "Bajaj RE",
      year: "2021",
      purchasePrice: "3200",
      receptionDate: "2021-08-20",
      mileage: "28000",
      assignedDriver: "Marie N'Goyi",
      hasActiveContract: true,
      contractId: "002",
    },
    {
      id: 3,
      name: "Voiture 1",
      type: "Petite voiture",
      image: "/small-car.jpg",
      bgColor: "bg-gray-100",
      plateNumber: "KIN-003",
      model: "Toyota Vitz",
      year: "2020",
      purchasePrice: "8500",
      receptionDate: "2020-11-10",
      mileage: "45000",
      assignedDriver: null,
      hasActiveContract: false,
      contractId: null,
    },
    {
      id: 4,
      name: "Minibus 1",
      type: "Minibus",
      image: "/colorful-minibus.png",
      bgColor: "bg-green-100",
      plateNumber: "KIN-004",
      model: "Toyota Hiace",
      year: "2019",
      purchasePrice: "15000",
      receptionDate: "2019-05-25",
      mileage: "78000",
      assignedDriver: "Antoine Tshisekedi",
      hasActiveContract: false,
      contractId: "003",
    },
    {
      id: 5,
      name: "Bus 1",
      type: "Bus",
      image: "/city-bus.jpg",
      bgColor: "bg-blue-100",
      plateNumber: "KIN-005",
      model: "Mercedes Sprinter",
      year: "2018",
      purchasePrice: "25000",
      receptionDate: "2018-12-03",
      mileage: "120000",
      assignedDriver: null,
      hasActiveContract: false,
      contractId: null,
    },
    {
      id: 6,
      name: "Camion 1",
      type: "Camion",
      image: "/classic-red-pickup.png",
      bgColor: "bg-slate-100",
      plateNumber: "KIN-006",
      model: "Ford Ranger",
      year: "2021",
      purchasePrice: "18000",
      receptionDate: "2021-07-14",
      mileage: "32000",
      assignedDriver: null,
      hasActiveContract: false,
      contractId: null,
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
    { id: "reports", label: "Rapports", icon: BarChart3, route: "/rapports" },
  ];

  const handleNavigation = (route: string, id: string) => {
    setActiveTab(id);
    router.push(route);
  };

  const handleAddVehicle = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setPhotoPreview(null);
    setNewVehicle({
      name: "",
      type: "",
      plateNumber: "",
      model: "",
      year: "",
      purchasePrice: "",
      receptionDate: "",
      mileage: "",
    });
  };

  const handleVehicleClick = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsDetailsModalOpen(true);
  };

  const handleEditVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setPhotoPreview(vehicle.image || null);
    setNewVehicle({
      name: vehicle.name,
      type: vehicle.type,
      plateNumber: vehicle.plateNumber,
      model: vehicle.model,
      year: vehicle.year,
      purchasePrice: vehicle.purchasePrice,
      receptionDate: vehicle.receptionDate,
      mileage: vehicle.mileage,
    });
    setIsEditing(true);
    setIsModalOpen(true);
    setIsDetailsModalOpen(false);
  };

  const handleDeleteVehicle = (vehicle: any) => {
    if (vehicle.hasActiveContract || vehicle.assignedDriver) {
      alert(
        "Impossible de supprimer ce véhicule car il a un chauffeur assigné ou un contrat actif."
      );
      return;
    }
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${vehicle.name} ?`)) {
      console.log("Véhicule supprimé:", vehicle.id);
      setIsDetailsModalOpen(false);
    }
  };

  const handleSubmitVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      console.log("Véhicule modifié:", { ...selectedVehicle, ...newVehicle });
    } else {
      console.log("Nouveau véhicule:", newVehicle);
    }
    setIsModalOpen(false);
    setIsDetailsModalOpen(false);
    setPhotoPreview(null);
    setNewVehicle({
      name: "",
      type: "",
      plateNumber: "",
      model: "",
      year: "",
      purchasePrice: "",
      receptionDate: "",
      mileage: "",
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewVehicle((prev) => ({ ...prev, [field]: value }));
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

        <PageHeader title="Véhicules" onSubmit={handleAddVehicle} />

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-4 pb-20">
          <div className="space-y-3 animate-fade-in">
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between transform transition-all duration-300 hover:bg-white/15 hover:scale-102 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleVehicleClick(vehicle)}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 ${vehicle.bgColor} rounded-xl flex items-center justify-center overflow-hidden`}
                  >
                    <img
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {vehicle.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{vehicle.type}</p>
                    <p className="text-yellow-400 text-xs mt-1">
                      {vehicle.assignedDriver
                        ? `Chauffeur: ${vehicle.assignedDriver}`
                        : "Aucun chauffeur assigné"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </main>

        {/* Bottom Navigation */}
        {/*         <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 p-4 z-50 animate-slide-up">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.route, item.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                  activeTab === item.id ? "text-yellow-400 bg-yellow-400/10" : "text-gray-400 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav> */}
      </div>

      {isDetailsModalOpen && selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDetailsModalOpen(false)}
          />
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                Détails du Véhicule
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className={`w-20 h-20 ${selectedVehicle.bgColor} rounded-xl flex items-center justify-center overflow-hidden`}
                >
                  <img
                    src={selectedVehicle.image || "/placeholder.svg"}
                    alt={selectedVehicle.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">
                    {selectedVehicle.name}
                  </h3>
                  <p className="text-gray-300">{selectedVehicle.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Plaque</p>
                  <p className="text-white font-semibold">
                    {selectedVehicle.plateNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Année</p>
                  <p className="text-white font-semibold">
                    {selectedVehicle.year}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-sm">Modèle</p>
                  <p className="text-white font-semibold">
                    {selectedVehicle.model}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Prix d'achat</p>
                  <p className="text-green-400 font-semibold">
                    ${selectedVehicle.purchasePrice} USD
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Kilométrage</p>
                  <p className="text-blue-400 font-semibold">
                    {selectedVehicle.mileage} km
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-sm">Date de réception</p>
                  <p className="text-white font-semibold">
                    {new Date(selectedVehicle.receptionDate).toLocaleDateString(
                      "fr-FR"
                    )}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-sm">Chauffeur assigné</p>
                  <p className="text-yellow-400 font-semibold">
                    {selectedVehicle.assignedDriver ||
                      "Aucun chauffeur assigné"}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-sm">Statut du contrat</p>
                  <p
                    className={`font-semibold ${
                      selectedVehicle.hasActiveContract
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    {selectedVehicle.hasActiveContract
                      ? "Contrat actif"
                      : "Aucun contrat actif"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => handleEditVehicle(selectedVehicle)}
                className="flex-1 bg-blue-500/90 hover:bg-blue-400/95 text-white font-semibold flex items-center justify-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Modifier</span>
              </Button>
              <Button
                onClick={() => handleDeleteVehicle(selectedVehicle)}
                disabled={
                  selectedVehicle.hasActiveContract ||
                  selectedVehicle.assignedDriver
                }
                className="flex-1 bg-red-500/90 hover:bg-red-400/95 disabled:bg-gray-500/50 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Supprimer</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding/editing vehicle */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 w-full max-w-md animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? "Modifier le Véhicule" : "Ajouter un Véhicule"}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10"
                onClick={() => {
                  setIsModalOpen(false);
                  setPhotoPreview(null);
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmitVehicle} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Photo du véhicule
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-300 border-2 border-white/20 flex items-center justify-center">
                    {photoPreview ? (
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Car className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="vehicle-photo-upload"
                    />
                    <label
                      htmlFor="vehicle-photo-upload"
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom du véhicule
                </label>
                <input
                  type="text"
                  value={newVehicle.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="Ex: Moto 3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type de véhicule
                </label>
                <select
                  value={newVehicle.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  required
                >
                  <option value="" className="bg-slate-800">
                    Sélectionner un type
                  </option>
                  <option value="Moto 2 roues" className="bg-slate-800">
                    Moto 2 roues
                  </option>
                  <option value="Moto 3 roues" className="bg-slate-800">
                    Moto 3 roues
                  </option>
                  <option value="Petite voiture" className="bg-slate-800">
                    Petite voiture
                  </option>
                  <option value="Minibus" className="bg-slate-800">
                    Minibus
                  </option>
                  <option value="Bus" className="bg-slate-800">
                    Bus
                  </option>
                  <option value="Camion" className="bg-slate-800">
                    Camion
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Numéro de plaque
                </label>
                <input
                  type="text"
                  value={newVehicle.plateNumber}
                  onChange={(e) =>
                    handleInputChange("plateNumber", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="Ex: KIN-123"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Modèle
                </label>
                <input
                  type="text"
                  value={newVehicle.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="Ex: Toyota Hiace"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Année
                </label>
                <input
                  type="number"
                  value={newVehicle.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="Ex: 2020"
                  min="1990"
                  max="2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prix d'achat (USD)
                </label>
                <input
                  type="number"
                  value={newVehicle.purchasePrice}
                  onChange={(e) =>
                    handleInputChange("purchasePrice", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="Ex: 15000"
                  min="0"
                  step="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date de réception
                </label>
                <input
                  type="date"
                  value={newVehicle.receptionDate}
                  onChange={(e) =>
                    handleInputChange("receptionDate", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kilométrage (km)
                </label>
                <input
                  type="number"
                  value={newVehicle.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="Ex: 50000"
                  min="0"
                  step="1000"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1 text-gray-300 hover:text-white hover:bg-white/10 border border-white/20"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-yellow-400/90 hover:bg-yellow-300/95 text-slate-900 font-semibold"
                >
                  {isEditing ? "Modifier" : "Ajouter"}
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
