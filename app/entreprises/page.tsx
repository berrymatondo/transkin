"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Building2,
  Plus,
  MapPin,
  Phone,
  Mail,
  Users,
  Car,
  Calendar,
  ArrowLeft,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/page-header";

interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  driverCount: number;
  vehicleCount: number;
  createdDate: string;
  logo?: string;
}

export default function EntreprisesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Transport Kinshasa Express",
      address: "Avenue Lumumba, Kinshasa, RDC",
      phone: "+243 81 234 5678",
      email: "contact@kinexpress.cd",
      driverCount: 12,
      vehicleCount: 8,
      createdDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Transkin Logistics",
      address: "Boulevard du 30 Juin, Kinshasa, RDC",
      phone: "+243 99 876 5432",
      email: "info@transkin.cd",
      driverCount: 8,
      vehicleCount: 5,
      createdDate: "2023-06-20",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    driverCount: 0,
    vehicleCount: 0,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setNewCompany((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const company: Company = {
      id: Date.now().toString(),
      ...newCompany,
      createdDate: new Date().toISOString().split("T")[0],
    };
    setCompanies((prev) => [...prev, company]);
    setNewCompany({
      name: "",
      address: "",
      phone: "",
      email: "",
      driverCount: 0,
      vehicleCount: 0,
    });
    setIsAddModalOpen(false);
  };

  const handleEditCompany = (company: Company, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent company selection when clicking edit
    setSelectedCompany(company);
    setIsEditModalOpen(true);
  };

  const handleUpdateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const updatedCompany: Company = {
      ...selectedCompany,
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      driverCount: Number(formData.get("driverCount")) || 0,
      vehicleCount: Number(formData.get("vehicleCount")) || 0,
    };

    setCompanies((prev) =>
      prev.map((company) =>
        company.id === selectedCompany.id ? updatedCompany : company
      )
    );
    setIsEditModalOpen(false);
    setSelectedCompany(null);
  };

  const handleDeleteCompany = (company: Company, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent company selection when clicking delete

    if (company.driverCount > 0 || company.vehicleCount > 0) {
      alert(
        "Impossible de supprimer cette entreprise car elle a des chauffeurs ou des véhicules associés."
      );
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer ${company.name} ?`)) {
      setCompanies((prev) => prev.filter((c) => c.id !== company.id));
    }
  };

  const handleCompanyClick = (companyId: string) => {
    // Store selected company in localStorage and redirect to dashboard
    localStorage.setItem("selectedCompanyId", companyId);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/kinshasa-transport-bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-700/80 via-slate-800/90 to-slate-900/95" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/*           <div className="flex items-center space-x-4">
            <Button onClick={() => router.back()} variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">Mes Entreprises</h1>
              <p className="text-gray-200">Sélectionnez une entreprise pour continuer</p>
            </div>
          </div> */}

          <PageHeader title="Mes Entreprises" />

          {/* Add Company Button */}
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30 rounded-full"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800/95 backdrop-blur-md border-white/20 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Ajouter une Nouvelle Entreprise
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Nom de l'entreprise
                  </label>
                  <Input
                    value={newCompany.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="Ex: Transport Express SARL"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Adresse
                  </label>
                  <Input
                    value={newCompany.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="Adresse complète"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Téléphone
                  </label>
                  <Input
                    value={newCompany.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="+243 XX XXX XXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={newCompany.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="contact@entreprise.cd"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Nombre de chauffeurs
                  </label>
                  <Input
                    type="number"
                    value={newCompany.driverCount}
                    onChange={(e) =>
                      handleInputChange(
                        "driverCount",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Nombre de véhicules
                  </label>
                  <Input
                    type="number"
                    value={newCompany.vehicleCount}
                    onChange={(e) =>
                      handleInputChange(
                        "vehicleCount",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold"
                  >
                    Ajouter
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              onClick={() => handleCompanyClick(company.id)}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transform transition-all duration-300 hover:bg-white/15 hover:scale-105 cursor-pointer group relative"
            >
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={(e) => handleEditCompany(company, e)}
                  size="sm"
                  variant="ghost"
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-400/30 p-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={(e) => handleDeleteCompany(company, e)}
                  size="sm"
                  variant="ghost"
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-400/30 p-2"
                  disabled={company.driverCount > 0 || company.vehicleCount > 0}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Company Logo/Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-2xl mb-4 group-hover:bg-yellow-500/30 transition-colors duration-300">
                <Building2 className="w-8 h-8 text-yellow-400" />
              </div>

              {/* Company Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">
                  {company.name}
                </h3>

                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{company.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{company.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{company.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{company.driverCount} chauffeurs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-gray-400" />
                    <span>{company.vehicleCount} véhicules</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>
                      Créée le{" "}
                      {new Date(company.createdDate).toLocaleDateString(
                        "fr-FR"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-yellow-400 text-sm font-medium">
                  Cliquer pour accéder →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {companies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucune entreprise
            </h3>
            <p className="text-gray-300 mb-6">
              Commencez par ajouter votre première entreprise
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une Entreprise
            </Button>
          </div>
        )}
      </div>

      {isEditModalOpen && selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          />

          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Modifier Entreprise
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

            <form onSubmit={handleUpdateCompany} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Nom de l'entreprise
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={selectedCompany.name}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="Ex: Transport Express SARL"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Adresse
                </label>
                <input
                  name="address"
                  type="text"
                  required
                  defaultValue={selectedCompany.address}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="Adresse complète"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Téléphone
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  defaultValue={selectedCompany.phone}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="+243 XX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={selectedCompany.email}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="contact@entreprise.cd"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Nombre de chauffeurs
                </label>
                <input
                  name="driverCount"
                  type="number"
                  min="0"
                  defaultValue={selectedCompany.driverCount}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Nombre de véhicules
                </label>
                <input
                  name="vehicleCount"
                  type="number"
                  min="0"
                  defaultValue={selectedCompany.vehicleCount}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  placeholder="0"
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
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  Mettre à jour
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
