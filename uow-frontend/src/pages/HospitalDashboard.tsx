import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users, Activity, Search, Building2, LogOut, RefreshCw, 
  FileImage, Clock, AlertCircle, ChevronRight, User, Calendar,
  Image, Eye, X
} from "lucide-react";

// Types
interface DashboardStats {
  total_clients: number;
  total_analyses: number;
  analyses_this_month: number;
  hospital_name: string;
}

interface Client {
  client_profile_id: number;
  user_id: number;
  client_id: string;
  name: string | null;
  email: string;
  organization: string | null;
  assigned_at: string;
  total_analyses: number;
}

interface ClientDetail {
  client_profile_id: number;
  user_id: number;
  client_id: string;
  name: string | null;
  email: string;
  organization: string | null;
  phone: string | null;
  address: string | null;
  assigned_at: string;
  analyses: Analysis[];
}

interface Analysis {
  id: number;
  image_type: string;
  original_filename: string;
  created_at: string;
  detections: string | null;
}

interface HospitalProfile {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  staff: {
    id: number;
    staff_id: string;
    department: string | null;
    position: string | null;
    can_manage_clients: boolean;
  };
  hospital: {
    id: number;
    name: string;
    code: string;
    address: string | null;
    phone: string | null;
    email: string | null;
  } | null;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Backend timestamps are naive UTC (no timezone suffix). Appending "Z" when no
// timezone is present forces a UTC parse so the value renders correctly in the
// viewer's local timezone (otherwise it shows hours off).
const toLocalDate = (s?: string | null): Date | null => {
  if (!s) return null;
  const hasTz = /[zZ]|[+-]\d{2}:?\d{2}$/.test(s);
  const d = new Date(hasTz ? s : `${s}Z`);
  return isNaN(d.getTime()) ? null : d;
};
const formatDateTime = (s?: string | null): string => {
  const d = toLocalDate(s);
  return d ? d.toLocaleString() : "—";
};
const formatDate = (s?: string | null): string => {
  const d = toLocalDate(s);
  return d ? d.toLocaleDateString() : "—";
};

const HospitalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "clients" | "analyze">("overview");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [profile, setProfile] = useState<HospitalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Client detail view
  const [selectedClient, setSelectedClient] = useState<ClientDetail | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [loadingClient, setLoadingClient] = useState(false);
  
  // Search
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 401) {
      localStorage.removeItem("token");
      navigate("/signin");
      throw new Error("Unauthorized");
    }
    return response;
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, clientsRes, profileRes] = await Promise.all([
        fetchWithAuth(`${API_BASE}/hospital/dashboard/stats`),
        fetchWithAuth(`${API_BASE}/hospital/clients${searchQuery ? `?search=${searchQuery}` : ""}`),
        fetchWithAuth(`${API_BASE}/hospital/profile`),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (clientsRes.ok) setClients(await clientsRes.json());
      if (profileRes.ok) setProfile(await profileRes.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadClientDetail = async (clientProfileId: number) => {
    setLoadingClient(true);
    try {
      const res = await fetchWithAuth(`${API_BASE}/hospital/clients/${clientProfileId}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedClient(data);
        setShowClientModal(true);
      }
    } catch (err) {
      alert("Failed to load client details");
    } finally {
      setLoadingClient(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/select-role");
  };

  const handleStartAnalysis = () => {
    navigate("/start");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">
                  {profile?.hospital?.name || "Hospital Dashboard"}
                </h1>
                <p className="text-xs text-slate-400">
                  {profile?.staff?.position || "Staff"} • {profile?.staff?.department || "General"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={loadDashboardData}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-800/30 border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "clients", label: "My Clients", icon: Users },
              { id: "analyze", label: "Analyze Image", icon: FileImage },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => tab.id === "analyze" ? handleStartAnalysis() : setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatsCard
                  title="Assigned Clients"
                  value={stats?.total_clients || 0}
                  icon={Users}
                  color="teal"
                />
                <StatsCard
                  title="Total Analyses"
                  value={stats?.total_analyses || 0}
                  icon={Activity}
                  color="blue"
                />
                <StatsCard
                  title="This Month"
                  value={stats?.analyses_this_month || 0}
                  icon={Calendar}
                  color="purple"
                />
              </div>

              {/* Hospital Info Card */}
              {profile?.hospital && (
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Hospital Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-sm">Hospital Name</p>
                      <p className="text-white font-medium">{profile.hospital.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Code</p>
                      <p className="text-white font-medium">{profile.hospital.code}</p>
                    </div>
                    {profile.hospital.phone && (
                      <div>
                        <p className="text-slate-400 text-sm">Phone</p>
                        <p className="text-white font-medium">{profile.hospital.phone}</p>
                      </div>
                    )}
                    {profile.hospital.email && (
                      <div>
                        <p className="text-slate-400 text-sm">Email</p>
                        <p className="text-white font-medium">{profile.hospital.email}</p>
                      </div>
                    )}
                    {profile.hospital.address && (
                      <div className="md:col-span-2">
                        <p className="text-slate-400 text-sm">Address</p>
                        <p className="text-white font-medium">{profile.hospital.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleStartAnalysis}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-xl hover:from-teal-500/30 hover:to-cyan-500/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-500/30 flex items-center justify-center">
                      <FileImage className="w-6 h-6 text-teal-300" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">New Analysis</p>
                      <p className="text-slate-400 text-sm">Upload and analyze X-Ray</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setActiveTab("clients")}
                    className="flex items-center gap-4 p-4 bg-slate-700/30 border border-slate-600/50 rounded-xl hover:bg-slate-700/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-300" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">View Clients</p>
                      <p className="text-slate-400 text-sm">{stats?.total_clients || 0} assigned clients</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Clients Tab */}
          {activeTab === "clients" && (
            <motion.div
              key="clients"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Search */}
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search clients by name, email, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Clients List */}
              {clients.length === 0 ? (
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-12 text-center">
                  <Users className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-300 mb-2">No clients assigned yet</p>
                  <p className="text-slate-500 text-sm">Clients will appear here once assigned by an administrator</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clients.map((client) => (
                    <div
                      key={client.client_profile_id}
                      className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6 hover:border-teal-500/50 transition-colors cursor-pointer"
                      onClick={() => loadClientDetail(client.client_profile_id)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                          {(client.name || client.email).charAt(0).toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 text-sm">
                          <Activity className="w-4 h-4" />
                          {client.total_analyses}
                        </div>
                      </div>
                      <h3 className="text-white font-medium mb-1">{client.name || "—"}</h3>
                      <p className="text-slate-400 text-sm mb-2">{client.email}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">ID: {client.client_id}</span>
                        <span className="text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(client.assigned_at)}
                        </span>
                      </div>
                      {client.organization && (
                        <p className="text-slate-500 text-sm mt-2 truncate">{client.organization}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {showClientModal && selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                    {(selectedClient.name || selectedClient.email).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{selectedClient.name || "—"}</h2>
                    <p className="text-slate-400">{selectedClient.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowClientModal(false); setSelectedClient(null); }}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Client Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-slate-400 text-sm">Client ID</p>
                    <p className="text-white font-medium">{selectedClient.client_id}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-slate-400 text-sm">Assigned Since</p>
                    <p className="text-white font-medium">
                      {formatDate(selectedClient.assigned_at)}
                    </p>
                  </div>
                  {selectedClient.organization && (
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <p className="text-slate-400 text-sm">Organization</p>
                      <p className="text-white font-medium">{selectedClient.organization}</p>
                    </div>
                  )}
                  {selectedClient.phone && (
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <p className="text-slate-400 text-sm">Phone</p>
                      <p className="text-white font-medium">{selectedClient.phone}</p>
                    </div>
                  )}
                </div>

                {/* Analysis History */}
                <h3 className="text-lg font-semibold text-white mb-4">Analysis History</h3>
                {selectedClient.analyses.length === 0 ? (
                  <div className="bg-slate-700/30 rounded-lg p-8 text-center">
                    <Image className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-400">No analyses yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedClient.analyses.map((analysis) => (
                      <div
                        key={analysis.id}
                        className="bg-slate-700/30 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-600/50 flex items-center justify-center">
                            <FileImage className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{analysis.original_filename}</p>
                            <p className="text-slate-400 text-sm">
                              {analysis.image_type.toUpperCase()} • {formatDateTime(analysis.created_at)}
                            </p>
                          </div>
                        </div>
                        {analysis.detections && (
                          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                            Detected
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: "teal" | "blue" | "purple";
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    teal: "from-teal-500 to-teal-600",
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{title}</div>
    </div>
  );
};

export default HospitalDashboard;

