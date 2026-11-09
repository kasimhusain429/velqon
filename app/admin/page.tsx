"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  LogOut,
  Users,
  FolderKanban,
  Wrench,
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  MessageCircle,
  Mail,
  Phone,
  Search,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { Enquiry, Project, Service, projectsData, servicesData, studioInfo } from "@/lib/data";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"enquiries" | "projects" | "services" | "settings">("enquiries");

  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [enquiryFilter, setEnquiryFilter] = useState<string>("All");
  const [enquirySearch, setEnquirySearch] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Projects state
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    slug: "",
    category: "Residential",
    location: "Dubai, UAE",
    year: "2026",
    area: "12,000 sq ft",
    client: "Private Client",
    duration: "12 Months",
    coverImage: "/images/projects/project-1.jpg",
    tagline: "Minimalist Architectural Haven",
    overview: "A bespoke residence conceived with quiet proportions.",
    concept: "Continuous travertine flooring and acoustic wall panels.",
    materials: [
      { name: "Roman Travertine", type: "Stone", color: "#d6ceb8" },
      { name: "Smoked Oak", type: "Millwork", color: "#362e26" },
    ],
    gallery: ["/images/projects/project-1.jpg"],
  });

  // Services state
  const [services, setServices] = useState<Service[]>(servicesData);
  const [newServiceModal, setNewServiceModal] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({
    number: "07",
    id: "bespoke-acoustics",
    title: "Acoustic Engineering",
    tagline: "Sound Architecture",
    description: "Custom acoustic isolation and micro-perforated timber panelling.",
    scope: ["Acoustic mapping", "Bespoke perforated oak walls"],
    deliverables: ["Full decibel analysis report", "White-glove fit-out"],
    timeline: "4 - 6 Weeks",
    image: "/images/rooms/room-4.jpg",
  });

  // Settings state
  const [settings, setSettings] = useState(studioInfo);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");

  // Check auth session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("velqon_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch enquiries
  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnquiries();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === "velqon2026" || passkey === "admin" || passkey === "velqon") {
      setIsAuthenticated(true);
      sessionStorage.setItem("velqon_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid access passkey. (Hint: velqon2026)");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("velqon_admin_auth");
  };

  // Update enquiry status
  const updateEnquiryStatus = async (id: string, newStatus: Enquiry["status"]) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete enquiry
  const deleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    const slug =
      newProject.slug ||
      newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const proj: Project = {
      slug,
      title: newProject.title!,
      category: (newProject.category as any) || "Residential",
      location: newProject.location || "Dubai, UAE",
      year: newProject.year || "2026",
      area: newProject.area || "10,000 sq ft",
      client: newProject.client || "Private Client",
      duration: newProject.duration || "12 Months",
      coverImage: newProject.coverImage || "/images/projects/project-1.jpg",
      tagline: newProject.tagline || "Architectural Haven",
      overview: newProject.overview || "",
      concept: newProject.concept || "",
      materials: newProject.materials || [],
      gallery: newProject.gallery || [newProject.coverImage!],
    };

    setProjects([proj, ...projects]);
    setNewProjectModal(false);
  };

  // Delete project
  const handleDeleteProject = (slug: string) => {
    if (!confirm(`Delete project "${slug}"?`)) return;
    setProjects((prev) => prev.filter((p) => p.slug !== slug));
  };

  // Add service
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title) return;
    const svc: Service = {
      number: newService.number || `0${services.length + 1}`,
      id: newService.id || `svc-${Date.now()}`,
      title: newService.title!,
      tagline: newService.tagline || "",
      description: newService.description || "",
      scope: newService.scope || [],
      deliverables: newService.deliverables || [],
      timeline: newService.timeline || "4 - 8 Weeks",
      image: newService.image || "/images/rooms/room-1.jpg",
    };
    setServices([...services, svc]);
    setNewServiceModal(false);
  };

  // Delete service
  const handleDeleteService = (id: string) => {
    if (!confirm(`Delete service?`)) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Save settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsMessage("Website settings updated successfully.");
      }
    } catch (e: any) {
      setSettingsMessage("Error saving settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesFilter = enquiryFilter === "All" || e.status === enquiryFilter;
    const matchesSearch =
      e.fullName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.projectType.toLowerCase().includes(enquirySearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Login screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#070707] text-[#fafafa] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#0f0f0f] border border-white/10 p-8 md:p-10 rounded-sm shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <span className="font-serif text-3xl tracking-[0.2em] text-[#fafafa] block">
              VELQON
            </span>
            <span className="text-[10px] tracking-[0.35em] text-[#c9a96e] uppercase">
              Admin & Content Management Portal
            </span>
            <p className="text-xs text-[#737373] pt-2">
              Authorized atelier personnel only. Enter studio passkey.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.25em] text-[#737373] uppercase block">
                Access Passkey
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter passkey (e.g. velqon2026)"
                  className="w-full bg-white/[0.04] border border-white/15 pl-10 pr-4 py-3 text-sm text-[#fafafa] focus:outline-none focus:border-[#c9a96e] transition-colors rounded-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#fafafa] hover:bg-[#c9a96e] text-black text-xs tracking-[0.2em] uppercase font-medium transition-colors rounded-sm"
            >
              Sign In to Portal
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-[11px] text-[#737373] hover:text-[#fafafa] tracking-wider transition-colors"
            >
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Admin Dashboard
  return (
    <main className="min-h-screen bg-[#080808] text-[#fafafa]">
      {/* Top Admin Header */}
      <header className="bg-[#0f0f0f] border-b border-white/[0.08] px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl tracking-[0.15em] text-[#fafafa]">
            VELQON
            <span className="text-[9px] font-sans tracking-[0.2em] px-2 py-0.5 rounded bg-[#c9a96e]/20 border border-[#c9a96e]/40 text-[#c9a96e] uppercase">
              Admin
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs tracking-[0.15em]">
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`px-3.5 py-2 rounded transition-colors uppercase ${
                activeTab === "enquiries" ? "bg-white/10 text-white font-medium" : "text-[#888888] hover:text-white"
              }`}
            >
              Enquiries ({enquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-3.5 py-2 rounded transition-colors uppercase ${
                activeTab === "projects" ? "bg-white/10 text-white font-medium" : "text-[#888888] hover:text-white"
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`px-3.5 py-2 rounded transition-colors uppercase ${
                activeTab === "services" ? "bg-white/10 text-white font-medium" : "text-[#888888] hover:text-white"
              }`}
            >
              Services ({services.length})
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-3.5 py-2 rounded transition-colors uppercase ${
                activeTab === "settings" ? "bg-white/10 text-white font-medium" : "text-[#888888] hover:text-white"
              }`}
            >
              Website Settings
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#888888] hover:text-white tracking-wider"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#a3a3a3] hover:text-white hover:bg-white/5 rounded border border-white/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-8">
        {/* TAB 1: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            {/* Header + Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl text-[#fafafa]">Customer Enquiries</h1>
                <p className="text-xs text-[#888888] mt-1">
                  Manage incoming project briefs, lead assignments, and WhatsApp communications.
                </p>
              </div>

              <button
                onClick={fetchEnquiries}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-[#a3a3a3] hover:text-white rounded"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingEnquiries ? "animate-spin" : ""}`} />
                <span>Refresh Registry</span>
              </button>
            </div>

            {/* Filter pills + search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#111111] border border-white/[0.06] rounded-sm">
              <div className="flex flex-wrap items-center gap-2">
                {["All", "New", "Contacted", "Proposal Sent", "In Progress", "Closed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setEnquiryFilter(st)}
                    className={`px-3 py-1 text-[10px] tracking-wider rounded uppercase transition-colors ${
                      enquiryFilter === st
                        ? "bg-[#c9a96e] text-black font-medium"
                        : "bg-white/5 text-[#888888] hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter name, email, type..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded pl-8 pr-3 py-1.5 text-xs text-[#fafafa] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-[#111111] border border-white/[0.06] rounded-sm overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#161616] border-b border-white/[0.08] text-[10px] tracking-[0.2em] text-[#737373] uppercase">
                  <tr>
                    <th className="py-4 px-6">Client / Ref</th>
                    <th className="py-4 px-6">Project Scope</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Received</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredEnquiries.map((enq) => (
                    <tr
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="font-medium text-[#fafafa]">{enq.fullName}</div>
                        <div className="text-[11px] text-[#737373]">{enq.email}</div>
                        <div className="text-[10px] text-[#737373] font-mono">{enq.phone}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[#fafafa]">{enq.projectType}</span>
                        <p className="text-[11px] text-[#737373] line-clamp-1 max-w-xs">{enq.message}</p>
                      </td>
                      <td className="py-4 px-6 text-[#a3a3a3]">{enq.location}</td>
                      <td className="py-4 px-6 text-[#737373] font-mono text-[11px]">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 text-[9px] tracking-wider uppercase rounded-full whitespace-nowrap inline-block ${
                            enq.status === "New"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : enq.status === "Contacted"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                              : enq.status === "Proposal Sent"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                              : enq.status === "In Progress"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/40"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                            enq.fullName
                          )},%20this%20is%20VELQON%20Interior%20Design%20Studio%20regarding%20your%20project%20enquiry.`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex p-1.5 rounded hover:bg-[#25D366]/20 text-[#25D366]"
                          title="Message on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <a
                          href={`mailto:${enq.email}?subject=VELQON%20Studio%20—%20${encodeURIComponent(
                            enq.projectType
                          )}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex p-1.5 rounded hover:bg-white/10 text-[#a3a3a3] hover:text-white"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEnquiry(enq.id);
                          }}
                          className="inline-flex p-1.5 rounded hover:bg-red-500/20 text-[#737373] hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Selected Enquiry Detail Modal */}
            {selectedEnquiry && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="bg-[#121212] border border-white/15 p-8 max-w-xl w-full rounded-sm space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] tracking-widest text-[#c9a96e] uppercase">
                        Ref #{selectedEnquiry.id}
                      </span>
                      <h3 className="font-serif text-2xl text-white">{selectedEnquiry.fullName}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedEnquiry(null)}
                      className="text-xs text-[#737373] hover:text-white"
                    >
                      Close ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-[#737373] uppercase block">Email Address</span>
                      <span className="text-white">{selectedEnquiry.email}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#737373] uppercase block">Contact Phone</span>
                      <span className="text-white">{selectedEnquiry.phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#737373] uppercase block">Project Category</span>
                      <span className="text-white">{selectedEnquiry.projectType}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#737373] uppercase block">Site Location</span>
                      <span className="text-white">{selectedEnquiry.location}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] text-[#737373] uppercase block">Full Brief / Message</span>
                    <div className="p-4 bg-black/40 border border-white/10 rounded text-xs text-[#d4d4d4] leading-relaxed">
                      {selectedEnquiry.message}
                    </div>
                  </div>

                  {/* Status changer */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-[#737373] uppercase block">Update Status</span>
                    <div className="flex flex-wrap gap-2">
                      {(["New", "Contacted", "Proposal Sent", "In Progress", "Closed"] as const).map(
                        (st) => (
                          <button
                            key={st}
                            onClick={() => updateEnquiryStatus(selectedEnquiry.id, st)}
                            className={`px-3 py-1.5 text-[10px] tracking-wider rounded uppercase transition-colors ${
                              selectedEnquiry.status === st
                                ? "bg-[#c9a96e] text-black font-medium"
                                : "bg-white/5 text-[#888888] hover:text-white"
                            }`}
                          >
                            {st}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                        selectedEnquiry.fullName
                      )},%20this%20is%20VELQON%20Interior%20Design%20Studio.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-black text-xs font-medium rounded"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Client</span>
                    </a>

                    <button
                      onClick={() => deleteEnquiry(selectedEnquiry.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete Enquiry
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl text-[#fafafa]">Projects Portfolio</h1>
                <p className="text-xs text-[#888888] mt-1">
                  Manage portfolio commissions, imagery, categories, and client stories.
                </p>
              </div>

              <button
                onClick={() => setNewProjectModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#fafafa] hover:bg-[#c9a96e] text-black text-xs tracking-wider uppercase font-medium rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.slug}
                  className="bg-[#111111] border border-white/[0.06] rounded overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={proj.coverImage}
                      alt={proj.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded bg-black/70 text-[9px] uppercase tracking-wider text-[#c9a96e] border border-white/10">
                        {proj.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-[#737373] font-mono">
                      <span>{proj.location}</span>
                      <span>{proj.year}</span>
                    </div>

                    <h3 className="font-serif text-xl text-white">{proj.title}</h3>
                    <p className="text-xs text-[#888888] line-clamp-2">{proj.tagline}</p>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <Link
                        href={`/projects/${proj.slug}`}
                        target="_blank"
                        className="text-[11px] text-[#c9a96e] hover:underline flex items-center gap-1"
                      >
                        <span>View Page</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>

                      <button
                        onClick={() => handleDeleteProject(proj.slug)}
                        className="text-xs text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Project Modal */}
            {newProjectModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <form
                  onSubmit={handleAddProject}
                  className="bg-[#121212] border border-white/15 p-8 max-w-2xl w-full rounded space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="font-serif text-2xl text-white">Add New Commission</h3>
                    <button
                      type="button"
                      onClick={() => setNewProjectModal(false)}
                      className="text-xs text-[#737373] hover:text-white"
                    >
                      Close ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-[#737373]">Title *</label>
                      <input
                        type="text"
                        required
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white rounded"
                        placeholder="e.g. Villa Solarium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-[#737373]">Category</label>
                      <select
                        value={newProject.category}
                        onChange={(e) =>
                          setNewProject({ ...newProject, category: e.target.value as any })
                        }
                        className="w-full bg-[#181818] border border-white/10 p-2 text-xs text-white rounded"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Hospitality">Hospitality</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-[#737373]">Location</label>
                      <input
                        type="text"
                        value={newProject.location}
                        onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white rounded"
                        placeholder="e.g. Palm Jumeirah, Dubai"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-[#737373]">Footprint Area</label>
                      <input
                        type="text"
                        value={newProject.area}
                        onChange={(e) => setNewProject({ ...newProject, area: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white rounded"
                        placeholder="e.g. 15,000 sq ft"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-[#737373]">Tagline</label>
                    <input
                      type="text"
                      value={newProject.tagline}
                      onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white rounded"
                      placeholder="e.g. Monolithic Beachfront Sanctuary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-[#737373]">Cover Image URL / Path</label>
                    <input
                      type="text"
                      value={newProject.coverImage}
                      onChange={(e) => setNewProject({ ...newProject, coverImage: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white rounded"
                      placeholder="/images/projects/project-1.jpg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-[#737373]">Architectural Overview</label>
                    <textarea
                      rows={3}
                      value={newProject.overview}
                      onChange={(e) => setNewProject({ ...newProject, overview: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white rounded"
                      placeholder="Detailed spatial concept and design narrative..."
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setNewProjectModal(false)}
                      className="px-4 py-2 text-xs text-[#888888] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#fafafa] hover:bg-[#c9a96e] text-black text-xs font-medium uppercase tracking-wider rounded"
                    >
                      Publish Project
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl text-[#fafafa]">Services Management</h1>
                <p className="text-xs text-[#888888] mt-1">
                  Add, edit, or adjust company capabilities, deliverables, and timelines.
                </p>
              </div>

              <button
                onClick={() => setNewServiceModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#fafafa] hover:bg-[#c9a96e] text-black text-xs tracking-wider uppercase font-medium rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="space-y-4">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="p-6 bg-[#111111] border border-white/[0.06] rounded flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg text-[#c9a96e]">{svc.number}</span>
                      <h3 className="font-serif text-xl text-white">{svc.title}</h3>
                      <span className="text-[10px] text-[#737373] uppercase font-mono">
                        ({svc.timeline})
                      </span>
                    </div>
                    <p className="text-xs text-[#888888] font-light leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <Link
                      href={`/services#${svc.id}`}
                      target="_blank"
                      className="text-xs text-[#c9a96e] hover:underline"
                    >
                      View on Live Page
                    </Link>
                    <button
                      onClick={() => handleDeleteService(svc.id)}
                      className="text-xs text-red-400 hover:text-red-300 p-2"
                      title="Remove Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Service Modal */}
            {newServiceModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <form
                  onSubmit={handleAddService}
                  className="bg-[#121212] border border-white/15 p-8 max-w-lg w-full rounded space-y-5 shadow-2xl"
                >
                  <h3 className="font-serif text-2xl text-white border-b border-white/10 pb-3">
                    Add New Service
                  </h3>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-[#737373]">Service Title *</label>
                    <input
                      type="text"
                      required
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white rounded"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-[#737373]">Tagline</label>
                    <input
                      type="text"
                      value={newService.tagline}
                      onChange={(e) => setNewService({ ...newService, tagline: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white rounded"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-[#737373]">Description</label>
                    <textarea
                      rows={3}
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white rounded"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-[#737373]">Timeline</label>
                    <input
                      type="text"
                      value={newService.timeline}
                      onChange={(e) => setNewService({ ...newService, timeline: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white rounded"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setNewServiceModal(false)}
                      className="px-4 py-2 text-xs text-[#888888] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#fafafa] hover:bg-[#c9a96e] text-black text-xs font-medium uppercase tracking-wider rounded"
                    >
                      Save Service
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: WEBSITE SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h1 className="font-serif text-3xl text-[#fafafa]">Website & SEO Settings</h1>
              <p className="text-xs text-[#888888] mt-1">
                Update brand identity, phone numbers, WhatsApp concierge, and Dubai address.
              </p>
            </div>

            {settingsMessage && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs rounded flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{settingsMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6 bg-[#111111] p-8 border border-white/[0.06] rounded">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#737373]">
                  Studio Brand Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white rounded"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#737373]">
                    Official Telephone
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white rounded"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#737373]">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#737373]">
                    Enquiry Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white rounded"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#737373]">
                    Press / PR Email
                  </label>
                  <input
                    type="email"
                    value={settings.pressEmail}
                    onChange={(e) => setSettings({ ...settings, pressEmail: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white rounded"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#737373]">
                  Dubai Studio Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white rounded"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#737373]">
                  Google SEO Meta Title
                </label>
                <input
                  type="text"
                  value={settings.meta.title}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      meta: { ...settings.meta, title: e.target.value },
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white rounded"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#737373]">
                  Google SEO Meta Description
                </label>
                <textarea
                  rows={3}
                  value={settings.meta.description}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      meta: { ...settings.meta, description: e.target.value },
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white rounded"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-8 py-3 bg-[#fafafa] hover:bg-[#c9a96e] text-black text-xs font-medium uppercase tracking-wider rounded transition-colors disabled:opacity-50"
                >
                  {savingSettings ? "Saving Settings..." : "Save Website Settings"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

