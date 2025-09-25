"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ArrowLeft,
  Share,
  TrendingUp,
  LayoutDashboard,
  Car,
  User,
  ClipboardList,
  BarChart3,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RapportsPage() {
  const [activeTab, setActiveTab] = useState("reports");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [startDate, setStartDate] = useState("2023-10-01");
  const [endDate, setEndDate] = useState("2023-10-31");
  const router = useRouter();

  // Sample data for the chart
  const earningsData = [
    { month: "Juil", earnings: 28000 },
    { month: "Août", earnings: 31000 },
    { month: "Sep", earnings: 29500 },
    { month: "Oct", earnings: 33000 },
    { month: "Nov", earnings: 35500 },
    { month: "Déc", earnings: 32450 },
    { month: "Jan", earnings: 30000 },
  ];

  const vehicles = [
    {
      id: "1",
      name: "Véhicule 1",
      earnings: 4200,
      image: "/classic-red-pickup.png",
    },
    { id: "2", name: "Véhicule 2", earnings: 3800, image: "/city-bus.png" },
    {
      id: "3",
      name: "Véhicule 3",
      earnings: 4500,
      image: "/classic-panel-van.png",
    },
  ];

  const drivers = [
    { id: "1", name: "Jean-Pierre", earnings: 4200, avatar: "/man-driver.jpg" },
    { id: "2", name: "Marie", earnings: 3800, avatar: "/woman-driver.jpg" },
    {
      id: "3",
      name: "Antoine",
      earnings: 4500,
      avatar: "/young-man-driver.jpg",
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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

        <header className="flex items-center justify-between p-4 animate-slide-down">
          {/*           <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <Menu className="h-6 w-6" />
          </Button> */}
          <h1 className="w-full text-center text-xl font-bold text-white">
            Rapports Financiers
          </h1>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6 pb-24">
          {/* Total Earnings Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-300 text-sm font-medium">
                  Revenus Totaux
                </p>
                <p className="text-white text-3xl font-bold">
                  {formatCurrency(32450.75)}
                </p>
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+15%</span>
              </div>
            </div>

            {/* Chart */}
            <div className="h-48 mt-6">
              <ChartContainer
                config={{
                  earnings: {
                    label: "Revenus",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={earningsData}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                      fill="url(#colorGradient)"
                    />
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Period Tabs */}
          <div className="flex space-x-1 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20 animate-slide-up">
            {["daily", "weekly", "monthly"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedPeriod === period
                    ? "bg-yellow-400 text-slate-900"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {period === "daily"
                  ? "Quotidien"
                  : period === "weekly"
                  ? "Hebdomadaire"
                  : "Mensuel"}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="space-y-4 animate-slide-up">
            <h3 className="text-white text-lg font-semibold">Filtres</h3>

            <div className="space-y-3">
              <Select
                value={selectedVehicle}
                onValueChange={setSelectedVehicle}
              >
                <SelectTrigger className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <SelectValue placeholder="Sélectionner un véhicule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les véhicules</SelectItem>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                <SelectTrigger className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <SelectValue placeholder="Sélectionner un chauffeur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les chauffeurs</SelectItem>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-slide-up">
            <h3 className="text-white text-lg font-semibold mb-2">
              Résumé des Revenus
            </h3>
            <p className="text-white text-2xl font-bold">
              {formatCurrency(12500)}
            </p>
            <p className="text-gray-300 text-sm">1 Oct - 31 Oct 2023</p>
          </div>

          {/* Vehicle Performance */}
          <div className="animate-slide-up">
            <h3 className="text-white text-lg font-semibold mb-4">
              Performance des Véhicules
            </h3>
            <div className="space-y-3">
              {vehicles.map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between transform transition-all duration-300 hover:bg-white/15 hover:scale-102"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      className="w-10 h-10 rounded-lg bg-gray-600"
                    />
                    <div>
                      <p className="text-white font-medium">{vehicle.name}</p>
                      <p className="text-gray-300 text-sm">
                        Revenus: {formatCurrency(vehicle.earnings)}
                      </p>
                    </div>
                  </div>
                  <p className="text-yellow-400 font-bold text-lg">
                    {formatCurrency(vehicle.earnings)
                      .replace(",00", "K")
                      .replace("$", "$")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Driver Performance */}
          <div className="animate-slide-up">
            <h3 className="text-white text-lg font-semibold mb-4">
              Performance des Chauffeurs
            </h3>
            <div className="space-y-3">
              {drivers.map((driver, index) => (
                <div
                  key={driver.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between transform transition-all duration-300 hover:bg-white/15 hover:scale-102"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={driver.avatar || "/placeholder.svg"}
                      alt={driver.name}
                      className="w-10 h-10 rounded-full bg-gray-600"
                    />
                    <div>
                      <p className="text-white font-medium">
                        Chauffeur: {driver.name}
                      </p>
                      <p className="text-gray-300 text-sm">
                        Revenus: {formatCurrency(driver.earnings)}
                      </p>
                    </div>
                  </div>
                  <p className="text-yellow-400 font-bold text-lg">
                    {formatCurrency(driver.earnings)
                      .replace(",00", "K")
                      .replace("$", "$")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      {/* Bottom Navigation */}
      {/*       <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 p-4 z-50 animate-slide-up">
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
