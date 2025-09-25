"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  LayoutDashboard,
  Car,
  User,
  ClipboardList,
  Plus,
  ArrowLeft,
  X,
  Edit,
  Trash2,
  Wrench,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ContratsPage() {
  const [activeTab, setActiveTab] = useState("contracts")
  const [selectedContract, setSelectedContract] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddHistoryModal, setShowAddHistoryModal] = useState(false)
  const [contractToEdit, setContractToEdit] = useState<any>(null)
  const [contractToDelete, setContractToDelete] = useState<any>(null)
  const [contractHistory, setContractHistory] = useState({
    "001": [
      {
        date: "20 Juillet 2024",
        departure: "08:00",
        return: "17:00",
        distance: "150 km",
        payment: "$250",
        remarks: "Voyage sans problème",
        type: "transport",
      },
      {
        date: "19 Juillet 2024",
        departure: "09:00",
        return: "18:00",
        distance: "180 km",
        payment: "$300",
        remarks: "Léger retard dû au trafic",
        type: "transport",
      },
      {
        date: "18 Juillet 2024",
        departure: "07:30",
        return: "16:30",
        distance: "120 km",
        payment: "$200",
        remarks: "Terminé plus tôt, client satisfait",
        type: "transport",
      },
    ],
  })
  const [newHistoryEntry, setNewHistoryEntry] = useState({
    date: "",
    departure: "",
    return: "",
    distance: "",
    payment: "",
    remarks: "",
    type: "transport",
  })
  const [newContract, setNewContract] = useState({
    vehicle: "",
    driver: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  const [editHistoryModal, setEditHistoryModal] = useState(false)
  const [deleteHistoryModal, setDeleteHistoryModal] = useState(false)
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState<number | null>(null)
  const [editHistoryForm, setEditHistoryForm] = useState({
    type: "transport",
    departure: "",
    return: "",
    distance: "",
    payment: "",
    remarks: "",
  })

  const router = useRouter()

  const activeContracts = [
    {
      id: "001",
      vehicle: "Camion 123",
      driver: "Jean-Pierre",
      startDate: "15/07/2024",
      endDate: "14/08/2024",
      status: "Actif",
      company: "Trans Congo",
    },
    {
      id: "002",
      vehicle: "Camion 456",
      driver: "Marie",
      startDate: "10/07/2024",
      endDate: "09/09/2024",
      status: "Actif",
      company: "Express Kinshasa",
    },
  ]

  const pendingContracts = [
    {
      id: "003",
      vehicle: "Camion 789",
      driver: "Antoine",
      startDate: "20/08/2024",
      endDate: "",
      status: "En attente",
      company: "Logistics Plus",
    },
  ]

  const completedContracts = [
    {
      id: "000",
      vehicle: "Fourgon 001",
      driver: "Luc",
      startDate: "01/06/2024",
      endDate: "30/06/2024",
      status: "Terminé",
      company: "City Transport",
    },
  ]

  const navItems = [
    { id: "dashboard", label: "Accueil", icon: LayoutDashboard, route: "/dashboard" },
    { id: "vehicles", label: "Véhicules", icon: Car, route: "/vehicules" },
    { id: "drivers", label: "Chauffeurs", icon: User, route: "/chauffeurs" },
    { id: "contracts", label: "Contrats", icon: ClipboardList, route: "/contrats" },
  ]

  const handleNavigation = (route: string, id: string) => {
    setActiveTab(id)
    router.push(route)
  }

  const handleContractClick = (contractId: string) => {
    setSelectedContract(contractId)
  }

  const handleBackToContracts = () => {
    setSelectedContract(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Terminé":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateContractTotal = (contractId: string) => {
    const history = contractHistory[contractId as keyof typeof contractHistory] || []
    let total = 0

    history.forEach((entry) => {
      // Parse payment string to extract numeric value
      const paymentStr = entry.payment.replace(/[$,]/g, "") // Remove $ and commas
      const paymentValue = Number.parseFloat(paymentStr) || 0
      total += paymentValue
    })

    return total
  }

  const formatCurrency = (amount: number) => {
    const isNegative = amount < 0
    const absAmount = Math.abs(amount)
    const formatted = `$${absAmount.toLocaleString()}`
    return isNegative ? `-${formatted}` : formatted
  }

  const renderContractHistory = () => {
    const history = contractHistory[selectedContract as keyof typeof contractHistory] || []
    const contract = [...activeContracts, ...pendingContracts, ...completedContracts].find(
      (c) => c.id === selectedContract,
    )

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
          <header className="flex items-center justify-between p-4 animate-slide-down">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={handleBackToContracts}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-white">Historique du Contrat</h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30 rounded-full"
              onClick={() => setShowAddHistoryModal(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 space-y-6 pb-20">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-fade-in">
              <p className="text-white text-lg font-semibold">
                Entreprise: <span className="text-yellow-400">{contract?.company}</span>
              </p>
            </div>

            <div className="space-y-4 animate-slide-up">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-lg font-semibold">{entry.date}</h3>
                    <div className="flex items-center gap-2">
                      {entry.type === "maintenance" ? (
                        <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded-full">
                          <Wrench className="h-4 w-4 text-orange-400" />
                          <span className="text-orange-400 text-xs font-medium">Entretien</span>
                        </div>
                      ) : entry.type === "autre" ? (
                        // Added display for "autre" type
                        <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded-full">
                          <ClipboardList className="h-4 w-4 text-purple-400" />
                          <span className="text-purple-400 text-xs font-medium">Autre</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded-full">
                          <Car className="h-4 w-4 text-blue-400" />
                          <span className="text-blue-400 text-xs font-medium">Transport</span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-yellow-400 hover:bg-yellow-400/10"
                        onClick={() => handleEditHistory(index)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400 hover:bg-red-400/10"
                        onClick={() => handleDeleteHistory(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {entry.type === "transport" ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-300 text-sm">Départ</p>
                          <p className="text-white font-semibold">{entry.departure}</p>
                        </div>
                        <div>
                          <p className="text-gray-300 text-sm">Retour</p>
                          <p className="text-white font-semibold">{entry.return}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-300 text-sm">Distance</p>
                        <p className="text-white font-semibold">{entry.distance}</p>
                      </div>

                      <div>
                        <p className="text-gray-300 text-sm">Paiement</p>
                        <p className="text-yellow-400 font-semibold text-lg">{entry.payment}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-gray-300 text-sm">
                          {entry.type === "maintenance" ? "Coût de l'entretien" : "Coût"}
                        </p>
                        <p
                          className={`font-semibold text-lg ${entry.type === "maintenance" || entry.type === "autre" ? "text-red-400" : "text-orange-400"}`}
                        >
                          {entry.payment}
                        </p>
                      </div>
                    </>
                  )}

                  <div>
                    <p className="text-gray-300 text-sm">Remarques</p>
                    <p className="text-white">{entry.remarks}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

        {renderAddHistoryModal()}
        {editHistoryModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/20 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Modifier l'Historique</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditHistoryModal(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleEditHistorySubmit} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Type</label>
                  <select
                    value={editHistoryForm.type}
                    onChange={(e) => setEditHistoryForm({ ...editHistoryForm, type: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="transport" className="bg-gray-800">
                      Transport
                    </option>
                    <option value="maintenance" className="bg-gray-800">
                      Entretien
                    </option>
                    <option value="autre" className="bg-gray-800">
                      Autre
                    </option>
                  </select>
                </div>

                {editHistoryForm.type === "transport" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Heure de départ</label>
                        <input
                          type="time"
                          value={editHistoryForm.departure}
                          onChange={(e) => setEditHistoryForm({ ...editHistoryForm, departure: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Heure de retour</label>
                        <input
                          type="time"
                          value={editHistoryForm.return}
                          onChange={(e) => setEditHistoryForm({ ...editHistoryForm, return: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Distance (km)</label>
                      <input
                        type="text"
                        value={editHistoryForm.distance}
                        onChange={(e) => setEditHistoryForm({ ...editHistoryForm, distance: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="ex: 150 km"
                        required
                      />
                    </div>
                  </>
                ) : null}

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    {editHistoryForm.type === "transport"
                      ? "Paiement"
                      : editHistoryForm.type === "maintenance"
                        ? "Coût de l'entretien"
                        : "Coût"}
                  </label>
                  <input
                    type="text"
                    value={editHistoryForm.payment}
                    onChange={(e) => setEditHistoryForm({ ...editHistoryForm, payment: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="ex: $250"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Remarques</label>
                  <textarea
                    value={editHistoryForm.remarks}
                    onChange={(e) => setEditHistoryForm({ ...editHistoryForm, remarks: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-yellow-400 h-24 resize-none"
                    placeholder="Détails supplémentaires..."
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setEditHistoryModal(false)}
                    className="flex-1 border border-white/20 text-white hover:bg-white/10"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-yellow-400/90 hover:bg-yellow-300/95 text-slate-900 font-semibold"
                  >
                    Modifier
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteHistoryModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/20">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 mb-4">
                  <Trash2 className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Supprimer l'historique</h3>
                <p className="text-gray-300 mb-6">
                  Êtes-vous sûr de vouloir supprimer cette entrée d'historique ? Cette action ne peut pas être annulée.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => setDeleteHistoryModal(false)}
                    className="flex-1 border border-white/20 text-white hover:bg-white/10"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={confirmDeleteHistory}
                    className="flex-1 bg-red-500/90 hover:bg-red-600/95 text-white font-semibold"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderEditContractModal = () => {
    if (!showEditModal) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Modifier Contrat</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowEditModal(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleUpdateContract} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Véhicule</label>
              <select
                value={newContract.vehicle}
                onChange={(e) => handleInputChange("vehicle", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                required
              >
                <option value="" className="bg-slate-800">
                  Sélectionner un véhicule
                </option>
                <option value="Camion 123" className="bg-slate-800">
                  Camion 123
                </option>
                <option value="Camion 456" className="bg-slate-800">
                  Camion 456
                </option>
                <option value="Camion 789" className="bg-slate-800">
                  Camion 789
                </option>
                <option value="Fourgon 001" className="bg-slate-800">
                  Fourgon 001
                </option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Chauffeur</label>
              <select
                value={newContract.driver}
                onChange={(e) => handleInputChange("driver", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                required
              >
                <option value="" className="bg-slate-800">
                  Sélectionner un chauffeur
                </option>
                <option value="Jean-Pierre" className="bg-slate-800">
                  Jean-Pierre
                </option>
                <option value="Marie" className="bg-slate-800">
                  Marie
                </option>
                <option value="Antoine" className="bg-slate-800">
                  Antoine
                </option>
                <option value="Luc" className="bg-slate-800">
                  Luc
                </option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Entreprise</label>
              <input
                type="text"
                value={newContract.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                placeholder="Nom de l'entreprise"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Date de début</label>
              <input
                type="date"
                value={newContract.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Date de fin</label>
              <input
                type="date"
                value={newContract.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Description</label>
              <textarea
                value={newContract.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 h-24 resize-none"
                placeholder="Description du contrat (optionnel)"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowEditModal(false)}
                className="flex-1 text-white border border-white/20 hover:bg-white/10"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-yellow-400/90 hover:bg-yellow-300/95 text-slate-900 font-semibold"
              >
                Mettre à jour
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const renderDeleteConfirmationModal = () => {
    if (!showDeleteModal || !contractToDelete) return null

    const canDelete = canDeleteContract(contractToDelete.id)

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Confirmer la suppression</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDeleteModal(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {canDelete ? (
            <div className="space-y-4">
              <p className="text-white">Êtes-vous sûr de vouloir supprimer le contrat #{contractToDelete.id} ?</p>
              <p className="text-gray-300 text-sm">Cette action est irréversible.</p>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 text-white border border-white/20 hover:bg-white/10"
                >
                  Annuler
                </Button>
                <Button
                  onClick={confirmDeleteContract}
                  className="flex-1 bg-red-500/90 hover:bg-red-600/95 text-white font-semibold"
                >
                  Supprimer
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-white">Impossible de supprimer le contrat #{contractToDelete.id}</p>
              <p className="text-gray-300 text-sm">Ce contrat a un historique associé et ne peut pas être supprimé.</p>
              <div className="pt-4">
                <Button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full bg-yellow-400/90 hover:bg-yellow-300/95 text-slate-900 font-semibold"
                >
                  Compris
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderAddContractModal = () => {
    if (!showAddModal) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal} />
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Ajouter Contrat</h2>
            <Button variant="ghost" size="icon" onClick={handleCloseModal} className="text-white hover:bg-white/10">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmitContract} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Véhicule</label>
              <select
                value={newContract.vehicle}
                onChange={(e) => handleInputChange("vehicle", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                required
              >
                <option value="" className="bg-slate-800">
                  Sélectionner un véhicule
                </option>
                <option value="Camion 123" className="bg-slate-800">
                  Camion 123
                </option>
                <option value="Camion 456" className="bg-slate-800">
                  Camion 456
                </option>
                <option value="Camion 789" className="bg-slate-800">
                  Camion 789
                </option>
                <option value="Fourgon 001" className="bg-slate-800">
                  Fourgon 001
                </option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Chauffeur</label>
              <select
                value={newContract.driver}
                onChange={(e) => handleInputChange("driver", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                required
              >
                <option value="" className="bg-slate-800">
                  Sélectionner un chauffeur
                </option>
                <option value="Jean-Pierre" className="bg-slate-800">
                  Jean-Pierre
                </option>
                <option value="Marie" className="bg-slate-800">
                  Marie
                </option>
                <option value="Antoine" className="bg-slate-800">
                  Antoine
                </option>
                <option value="Luc" className="bg-slate-800">
                  Luc
                </option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Entreprise</label>
              <input
                type="text"
                value={newContract.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                placeholder="Nom de l'entreprise"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Date de début</label>
              <input
                type="date"
                value={newContract.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Date de fin</label>
              <input
                type="date"
                value={newContract.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Description</label>
              <textarea
                value={newContract.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 h-24 resize-none"
                placeholder="Description du contrat (optionnel)"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCloseModal}
                className="flex-1 text-white border border-white/20 hover:bg-white/10"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-yellow-400/90 hover:bg-yellow-300/95 text-slate-900 font-semibold"
              >
                Ajouter
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const renderAddHistoryModal = () => {
    if (!showAddHistoryModal) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddHistoryModal(false)} />
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Ajouter Historique</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddHistoryModal(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmitHistoryEntry} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Type d'historique</label>
              <select
                value={newHistoryEntry.type}
                onChange={(e) => handleHistoryInputChange("type", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                required
              >
                <option value="transport" className="bg-slate-800">
                  Transport
                </option>
                <option value="maintenance" className="bg-slate-800">
                  Entretien
                </option>
                <option value="autre" className="bg-slate-800">
                  Autre
                </option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                value={newHistoryEntry.date}
                onChange={(e) => handleHistoryInputChange("date", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                required
              />
            </div>

            {newHistoryEntry.type === "transport" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Heure de départ</label>
                    <input
                      type="time"
                      value={newHistoryEntry.departure}
                      onChange={(e) => handleHistoryInputChange("departure", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Heure de retour</label>
                    <input
                      type="time"
                      value={newHistoryEntry.return}
                      onChange={(e) => handleHistoryInputChange("return", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Distance parcourue</label>
                  <input
                    type="text"
                    value={newHistoryEntry.distance}
                    onChange={(e) => handleHistoryInputChange("distance", e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    placeholder="ex: 150 km"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                {newHistoryEntry.type === "transport"
                  ? "Paiement"
                  : newHistoryEntry.type === "maintenance"
                    ? "Coût de l'entretien"
                    : "Coût"}
              </label>
              <input
                type="text"
                value={newHistoryEntry.payment}
                onChange={(e) => handleHistoryInputChange("payment", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                placeholder="ex: $250"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Remarques</label>
              <textarea
                value={newHistoryEntry.remarks}
                onChange={(e) => handleHistoryInputChange("remarks", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 h-24 resize-none"
                placeholder={
                  newHistoryEntry.type === "transport"
                    ? "Détails du voyage..."
                    : newHistoryEntry.type === "maintenance"
                      ? "Détails de l'entretien..."
                      : "Détails..."
                }
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAddHistoryModal(false)}
                className="flex-1 text-white border border-white/20 hover:bg-white/10"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-yellow-400/90 hover:bg-yellow-300/95 text-slate-900 font-semibold"
              >
                Ajouter
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setNewContract((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEditContract = (e: React.MouseEvent, contract: any) => {
    e.stopPropagation() // Prevent opening history view
    setContractToEdit(contract)
    setNewContract({
      vehicle: contract.vehicle,
      driver: contract.driver,
      company: contract.company,
      startDate: contract.startDate,
      endDate: contract.endDate,
      description: contract.description || "",
    })
    setShowEditModal(true)
  }

  const handleDeleteContract = (e: React.MouseEvent, contract: any) => {
    e.stopPropagation() // Prevent opening history view
    setContractToDelete(contract)
    setShowDeleteModal(true)
  }

  const canDeleteContract = (contractId: string) => {
    // Check if contract has history, vehicles, or drivers associated
    const hasHistory = contractHistory[contractId as keyof typeof contractHistory]
    return !hasHistory // Can only delete if no history exists
  }

  const confirmDeleteContract = () => {
    if (contractToDelete) {
      console.log("Suppression du contrat:", contractToDelete.id)
      // Here you would typically delete from your backend
      setShowDeleteModal(false)
      setContractToDelete(null)
    }
  }

  const handleUpdateContract = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Mise à jour du contrat:", contractToEdit.id, newContract)
    // Here you would typically update in your backend
    setShowEditModal(false)
    setContractToEdit(null)
    setNewContract({
      vehicle: "",
      driver: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    })
  }

  const handleHistoryInputChange = (field: string, value: string) => {
    setNewHistoryEntry((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      }

      if (field === "type" && (value === "maintenance" || value === "autre")) {
        // If payment exists and doesn't start with minus, make it negative
        if (updated.payment && !updated.payment.startsWith("-")) {
          updated.payment = updated.payment.startsWith("$")
            ? "-" + updated.payment
            : "-$" + updated.payment.replace("$", "")
        }
      } else if (field === "type" && value === "transport") {
        // If switching to transport, remove negative sign if present
        if (updated.payment && updated.payment.startsWith("-")) {
          updated.payment = updated.payment.substring(1)
        }
      } else if (field === "payment" && (updated.type === "maintenance" || updated.type === "autre")) {
        // Ensure payment is negative for maintenance and autre
        if (value && !value.startsWith("-")) {
          updated.payment = value.startsWith("$") ? "-" + value : "-$" + value.replace("$", "")
        } else {
          updated.payment = value
        }
      }

      return updated
    })
  }

  const handleSubmitHistoryEntry = (e: React.FormEvent) => {
    e.preventDefault()

    // Format the date for display
    const formattedDate = new Date(newHistoryEntry.date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    const newEntry = {
      ...newHistoryEntry,
      date: formattedDate,
    }

    // Add the new entry to the contract history
    setContractHistory((prev) => ({
      ...prev,
      [selectedContract as string]: [newEntry, ...(prev[selectedContract as keyof typeof prev] || [])],
    }))

    // Reset form and close modal
    setNewHistoryEntry({
      date: "",
      departure: "",
      return: "",
      distance: "",
      payment: "",
      remarks: "",
      type: "transport",
    })
    setShowAddHistoryModal(false)
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setNewContract({
      vehicle: "",
      driver: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    })
  }

  const handleSubmitContract = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the contract to your backend
    console.log("Nouveau contrat:", newContract)
    handleCloseModal()
  }

  const handleAddContract = () => {
    setShowAddModal(true)
  }

  const handleEditHistory = (index: number) => {
    const history = contractHistory[selectedContract as keyof typeof contractHistory] || []
    const entry = history[index]
    setSelectedHistoryIndex(index)
    setEditHistoryForm({
      type: entry.type,
      departure: entry.departure || "",
      return: entry.return || "",
      distance: entry.distance || "",
      payment: entry.payment,
      remarks: entry.remarks,
    })
    setEditHistoryModal(true)
  }

  const handleDeleteHistory = (index: number) => {
    setSelectedHistoryIndex(index)
    setDeleteHistoryModal(true)
  }

  const confirmDeleteHistory = () => {
    if (selectedHistoryIndex !== null && selectedContract) {
      const updatedHistory = contractHistory[selectedContract].filter((_, index) => index !== selectedHistoryIndex)
      setContractHistory((prev) => ({
        ...prev,
        [selectedContract]: updatedHistory,
      }))
      console.log("Deleting history entry at index:", selectedHistoryIndex)
    }
    setDeleteHistoryModal(false)
    setSelectedHistoryIndex(null)
  }

  const handleEditHistorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedHistoryIndex !== null && selectedContract) {
      const formattedDate = new Date(contractHistory[selectedContract][selectedHistoryIndex].date).toLocaleDateString(
        "fr-FR",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      )
      const updatedEntry = {
        ...editHistoryForm,
        date: formattedDate, // Keep original date format
      }
      setContractHistory((prev) => ({
        ...prev,
        [selectedContract]: prev[selectedContract].map((entry, index) =>
          index === selectedHistoryIndex ? updatedEntry : entry,
        ),
      }))
      console.log("Updating history entry at index:", selectedHistoryIndex, editHistoryForm)
    }
    setEditHistoryModal(false)
    setSelectedHistoryIndex(null)
  }

  if (selectedContract) {
    return renderContractHistory()
  }

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
        <header className="flex items-center justify-between p-4 animate-slide-down">
{/*           <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button> */}
          <h1 className="w-full texte-center text-xl font-bold text-white">Contrats</h1>
          <div className="w-10" />
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6">
          {/* Active Contracts */}
          <div className="animate-fade-in">
            <h2 className="text-white text-lg font-semibold mb-4">Contrats Actifs</h2>
            <div className="space-y-3">
              {activeContracts.map((contract, index) => (
                <div
                  key={contract.id}
                  onClick={() => handleContractClick(contract.id)}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transform transition-all duration-300 hover:bg-white/15 hover:scale-102 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold">Contrat #{contract.id}</h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}
                          >
                            {contract.status}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleEditContract(e, contract)}
                              className="h-8 w-8 text-yellow-400 hover:bg-yellow-400/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleDeleteContract(e, contract)}
                              className="h-8 w-8 text-red-400 hover:bg-red-400/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Véhicule: {contract.vehicle}, Chauffeur: {contract.driver}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {contract.startDate} - {contract.endDate}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-gray-400 text-xs">Total paiements:</span>
                        <span
                          className={`text-sm font-semibold ${
                            calculateContractTotal(contract.id) >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {formatCurrency(calculateContractTotal(contract.id))}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Contracts */}
          <div className="animate-slide-up">
            <h2 className="text-white text-lg font-semibold mb-4">Contrats en Attente</h2>
            <div className="space-y-3">
              {pendingContracts.map((contract, index) => (
                <div
                  key={contract.id}
                  onClick={() => handleContractClick(contract.id)}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transform transition-all duration-300 hover:bg-white/15 hover:scale-102 cursor-pointer"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold">Contrat #{contract.id}</h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}
                          >
                            {contract.status}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleEditContract(e, contract)}
                              className="h-8 w-8 text-yellow-400 hover:bg-yellow-400/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleDeleteContract(e, contract)}
                              className="h-8 w-8 text-red-400 hover:bg-red-400/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Véhicule: {contract.vehicle}, Chauffeur: {contract.driver}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">Commence le {contract.startDate}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-gray-400 text-xs">Total paiements:</span>
                        <span
                          className={`text-sm font-semibold ${
                            calculateContractTotal(contract.id) >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {formatCurrency(calculateContractTotal(contract.id))}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Contracts */}
          <div className="animate-slide-up">
            <h2 className="text-white text-lg font-semibold mb-4">Contrats Terminés</h2>
            <div className="space-y-3">
              {completedContracts.map((contract, index) => (
                <div
                  key={contract.id}
                  onClick={() => handleContractClick(contract.id)}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transform transition-all duration-300 hover:bg-white/15 hover:scale-102 cursor-pointer"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold">Contrat #{contract.id}</h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}
                          >
                            {contract.status}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleEditContract(e, contract)}
                              className="h-8 w-8 text-yellow-400 hover:bg-yellow-400/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleDeleteContract(e, contract)}
                              className="h-8 w-8 text-red-400 hover:bg-red-400/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Véhicule: {contract.vehicle}, Chauffeur: {contract.driver}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {contract.startDate} - {contract.endDate}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-gray-400 text-xs">Total paiements:</span>
                        <span
                          className={`text-sm font-semibold ${
                            calculateContractTotal(contract.id) >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {formatCurrency(calculateContractTotal(contract.id))}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Add Contract Button */}
        <div className="absolute bottom-20 right-4">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-yellow-400/90 hover:bg-yellow-300/95 text-slate-900 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110"
            onClick={handleAddContract}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 p-4 z-50 animate-slide-up">
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
        </nav>
      </div>
    </div>
  )
}
