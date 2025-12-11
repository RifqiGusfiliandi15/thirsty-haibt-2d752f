import React, { useState, useMemo } from "react";
import {
  Search,
  LogOut,
  DollarSign,
  TrendingUp,
  Users,
  ShoppingCart,
  Filter,
  Check,
  X,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const JasaInDashboard = () => {
  // Akun admin yang valid
  const adminAccounts = [
    {
      username: "admin1",
      password: "jasain2024",
      name: "Farid Budi Ramadhan",
      role: "CEO",
    },
    {
      username: "admin2",
      password: "jasain2024",
      name: "Rifqi Gusfiliandi",
      role: "CTO",
    },
    {
      username: "admin3",
      password: "jasain2024",
      name: "Muhammad Nawval Shazali",
      role: "Head of Marketing",
    },
  ];

  // State untuk autentikasi
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Data transaksi realistis dari website JasaIn
  const [transactions, setTransactions] = useState([
    {
      id: "TRX001",
      buyer: "Rizki Pratama",
      seller: "Bambang Sutrisno",
      service: "Survey Tanah Perumahan",
      amount: 800000,
      status: "pending",
      date: "2024-12-11",
      category: "Surveyor",
      buyerEmail: "rizki.pratama@email.com",
      sellerEmail: "bambang.sutrisno@jasain.com",
      description: "Pengukuran tanah untuk proyek perumahan seluas 5 hektar",
    },
    {
      id: "TRX002",
      buyer: "Ahmad Fauzi",
      seller: "Dewi Sartika",
      service: "Valuasi Gedung Perkantoran",
      amount: 1500000,
      status: "approved",
      date: "2024-12-10",
      category: "Penilai Tanah",
      buyerEmail: "ahmad.fauzi@email.com",
      sellerEmail: "dewi.sartika@jasain.com",
      description: "Penilaian properti komersial untuk keperluan bank",
    },
    {
      id: "TRX003",
      buyer: "Sari Dewi",
      seller: "Joko Prasetyo",
      service: "Renovasi Rumah Lengkap",
      amount: 25000000,
      status: "completed",
      date: "2024-12-08",
      category: "Kontraktor",
      buyerEmail: "sari.dewi@email.com",
      sellerEmail: "joko.prasetyo@jasain.com",
      description: "Renovasi total rumah 2 lantai dengan konsep modern",
    },
    {
      id: "TRX004",
      buyer: "Andi Wijaya",
      seller: "Maya Indah Sari",
      service: "Desain Rumah Modern Minimalis",
      amount: 2500000,
      status: "pending",
      date: "2024-12-11",
      category: "Arsitek",
      buyerEmail: "andi.wijaya@email.com",
      sellerEmail: "maya.sari@jasain.com",
      description: "Desain rumah minimalis dengan konsep sustainable",
    },
    {
      id: "TRX005",
      buyer: "Rina Wijaya",
      seller: "Ahmad Fauzi",
      service: "Pengembangan Web E-commerce",
      amount: 15000000,
      status: "approved",
      date: "2024-12-09",
      category: "Web Development",
      buyerEmail: "rina.wijaya@email.com",
      sellerEmail: "ahmad.fauzi.dev@jasain.com",
      description: "Pengembangan platform e-commerce dengan React & Node.js",
    },
    {
      id: "TRX006",
      buyer: "Budi Santoso",
      seller: "Diana Putri",
      service: "Content Writing SEO (10 Artikel)",
      amount: 3000000,
      status: "completed",
      date: "2024-12-07",
      category: "Content Writing",
      buyerEmail: "budi.santoso@email.com",
      sellerEmail: "diana.putri@jasain.com",
      description: "Pembuatan 10 artikel SEO-optimized untuk blog perusahaan",
    },
    {
      id: "TRX007",
      buyer: "Linda Wijaya",
      seller: "Andi Pratama",
      service: "Paket Foto Prewedding",
      amount: 2000000,
      status: "approved",
      date: "2024-12-10",
      category: "Fotografi",
      buyerEmail: "linda.wijaya@email.com",
      sellerEmail: "andi.pratama@jasain.com",
      description: "Sesi foto prewedding dengan 200+ foto hasil edit",
    },
    {
      id: "TRX008",
      buyer: "Doni Pratama",
      seller: "Hendra Kurniawan",
      service: "Digital Marketing Campaign",
      amount: 1200000,
      status: "pending",
      date: "2024-12-11",
      category: "Digital Marketing",
      buyerEmail: "doni.pratama@email.com",
      sellerEmail: "hendra.kurniawan@jasain.com",
      description:
        "Campaign optimization dan social media management untuk 1 bulan",
    },
    {
      id: "TRX009",
      buyer: "Fajar Rahman",
      seller: "Lisa Anggraeni",
      service: "Paket Perawatan Facial Premium",
      amount: 250000,
      status: "completed",
      date: "2024-12-09",
      category: "Kecantikan",
      buyerEmail: "fajar.rahman@email.com",
      sellerEmail: "lisa.anggraeni@jasain.com",
      description: "Perawatan wajah dengan produk premium dan teknik terkini",
    },
    {
      id: "TRX010",
      buyer: "Nina Safitri",
      seller: "Dr. Rudi Hartono",
      service: "Les Privat Matematika & Fisika",
      amount: 400000,
      status: "approved",
      date: "2024-12-10",
      category: "Pendidikan",
      buyerEmail: "nina.safitri@email.com",
      sellerEmail: "rudi.hartono@jasain.com",
      description: "Les privat 4 pertemuan untuk persiapan UTBK",
    },
    {
      id: "TRX011",
      buyer: "Yoga Pratama",
      seller: "Ari Wibowo",
      service: "Service Mobil Lengkap",
      amount: 350000,
      status: "completed",
      date: "2024-12-08",
      category: "Otomotif",
      buyerEmail: "yoga.pratama@email.com",
      sellerEmail: "ari.wibowo@jasain.com",
      description: "Service mesin, ganti oli, dan check kelistrikan mobil",
    },
    {
      id: "TRX012",
      buyer: "Indah Permata",
      seller: "Rina Handayani",
      service: "Laundry Sepatu Premium (5 Pasang)",
      amount: 250000,
      status: "pending",
      date: "2024-12-11",
      category: "Laundry",
      buyerEmail: "indah.permata@email.com",
      sellerEmail: "rina.handayani@jasain.com",
      description: "Deep cleaning 5 pasang sepatu sneakers dan kulit",
    },
  ]);

  // State untuk filter dan pencarian
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handler login
  const handleLogin = (e) => {
    e.preventDefault();
    const admin = adminAccounts.find(
      (acc) =>
        acc.username === loginForm.username &&
        acc.password === loginForm.password
    );

    if (admin) {
      setIsLoggedIn(true);
      setCurrentAdmin(admin);
      setLoginError("");
    } else {
      setLoginError("Username atau password salah!");
    }
  };

  // Handler logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentAdmin(null);
    setLoginForm({ username: "", password: "" });
  };

  // Handler update status transaksi
  const updateTransactionStatus = (id, newStatus) => {
    setTransactions(
      transactions.map((tx) =>
        tx.id === id ? { ...tx, status: newStatus } : tx
      )
    );
    setShowModal(false);
  };

  // Filter dan search transaksi
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || tx.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, statusFilter]);

  // Hitung statistik
  const stats = useMemo(() => {
    const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const pending = transactions.filter((tx) => tx.status === "pending").length;
    const completed = transactions.filter(
      (tx) => tx.status === "completed"
    ).length;
    const approved = transactions.filter(
      (tx) => tx.status === "approved"
    ).length;

    return {
      total,
      pending,
      completed,
      approved,
      totalTx: transactions.length,
    };
  }, [transactions]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      approved: "bg-blue-100 text-blue-800 border-blue-300",
      completed: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };

    const icons = {
      pending: <Clock className="w-3 h-3" />,
      approved: <CheckCircle className="w-3 h-3" />,
      completed: <Check className="w-3 h-3" />,
      rejected: <XCircle className="w-3 h-3" />,
    };

    const labels = {
      pending: "Pending",
      approved: "Disetujui",
      completed: "Selesai",
      rejected: "Ditolak",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${styles[status]}`}
      >
        {icons[status]}
        {labels[status]}
      </span>
    );
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <img
                  src="https://i.imgur.com/5lHTAqG.png"
                  alt="JasaIn Logo"
                  className="w-24 h-24 rounded-full shadow-lg"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">JasaIn</h1>
              <p className="text-gray-600">Dashboard Manajemen Transaksi</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleLogin(e)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Masukkan username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleLogin(e)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Masukkan password"
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {loginError}
                </div>
              )}

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
              >
                Login
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold mb-2">
                Akun Demo:
              </p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>
                  • <strong>admin1</strong> / jasain2024 (CEO)
                </p>
                <p>
                  • <strong>admin2</strong> / jasain2024 (CTO)
                </p>
                <p>
                  • <strong>admin3</strong> / jasain2024 (HMC)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://i.imgur.com/5lHTAqG.png"
                alt="JasaIn Logo"
                className="w-12 h-12 rounded-full border-2 border-white/30"
              />
              <div>
                <h1 className="text-2xl font-bold">JasaIn Dashboard</h1>
                <p className="text-sm text-blue-100">
                  Platform Freelance Terpercaya Indonesia
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold">{currentAdmin.name}</p>
                <p className="text-xs text-blue-100">{currentAdmin.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-10 h-10 opacity-80" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                Total
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {formatCurrency(stats.total)}
            </h3>
            <p className="text-blue-100 text-sm">Total Nilai Transaksi</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-10 h-10 opacity-80" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                Pending
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.pending}</h3>
            <p className="text-yellow-100 text-sm">Menunggu Approval</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-10 h-10 opacity-80" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                Success
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.completed}</h3>
            <p className="text-green-100 text-sm">Transaksi Selesai</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-10 h-10 opacity-80" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.totalTx}</h3>
            <p className="text-purple-100 text-sm">Total Transaksi</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berdasarkan ID, Pembeli, Penjual, Layanan, atau Kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Disetujui</option>
                <option value="completed">Selesai</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pembeli
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Freelancer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Layanan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-semibold text-blue-600">
                        {tx.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {tx.buyer}
                      </div>
                      <div className="text-xs text-gray-500">
                        {tx.buyerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {tx.seller}
                      </div>
                      <div className="text-xs text-gray-500">
                        {tx.sellerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{tx.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tx.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => {
                          setSelectedTransaction(tx);
                          setShowModal(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">
                Tidak ada transaksi yang ditemukan
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Detail */}
      {showModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.imgur.com/5lHTAqG.png"
                    alt="JasaIn"
                    className="w-10 h-10 rounded-full border-2 border-white/30"
                  />
                  <h2 className="text-2xl font-bold">Detail Transaksi</h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">ID Transaksi</p>
                  <p className="text-2xl font-bold text-gray-900 font-mono">
                    {selectedTransaction.id}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Pembeli</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedTransaction.buyer}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedTransaction.buyerEmail}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Freelancer</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedTransaction.seller}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedTransaction.sellerEmail}
                  </p>
                </div>

                <div className="col-span-2 bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Layanan</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedTransaction.service}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Deskripsi:</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedTransaction.description}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Kategori</p>
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mt-1">
                    {selectedTransaction.category}
                  </span>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Jumlah</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(selectedTransaction.amount)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Status</p>
                  <StatusBadge status={selectedTransaction.status} />
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">
                    Tanggal Transaksi
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedTransaction.date}
                  </p>
                </div>
              </div>

              {selectedTransaction.status === "pending" && (
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() =>
                      updateTransactionStatus(
                        selectedTransaction.id,
                        "approved"
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold"
                  >
                    <Check className="w-5 h-5" />
                    Setujui Transaksi
                  </button>
                  <button
                    onClick={() =>
                      updateTransactionStatus(
                        selectedTransaction.id,
                        "rejected"
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold"
                  >
                    <X className="w-5 h-5" />
                    Tolak Transaksi
                  </button>
                </div>
              )}

              {selectedTransaction.status === "approved" && (
                <button
                  onClick={() =>
                    updateTransactionStatus(selectedTransaction.id, "completed")
                  }
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
                >
                  <CheckCircle className="w-5 h-5" />
                  Tandai Sebagai Selesai
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JasaInDashboard;
