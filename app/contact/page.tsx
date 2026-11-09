"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { studioInfo } from "@/lib/data";

const projectTypes = [
  "Residential Villa",
  "Penthouse Duplex",
  "Commercial / Private Office",
  "Hospitality & Lounge",
  "Bespoke Millwork & Furniture",
  "Turnkey Renovation & Fit-Out",
];

const locations = [
  "Palm Jumeirah, Dubai",
  "Downtown Dubai / DIFC",
  "Emirates Hills / JGE",
  "Jumeirah Bay Island",
  "Abu Dhabi / Saadiyat Island",
  "Riyadh / Saudi Arabia",
  "Other UAE / International",
];

function ContactForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";
  const initialProject = searchParams.get("project") || "";
  const initialRef = searchParams.get("ref") || "";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState(
    initialService ? "Turnkey Renovation & Fit-Out" : projectTypes[0]
  );
  const [location, setLocation] = useState(locations[0]);
  const [message, setMessage] = useState(
    initialProject
      ? `Hello VELQON team, I am interested in commissioning a project similar to ${initialProject}.`
      : initialRef
      ? `Hello VELQON team, I am inquiring about the ${initialRef} specification.`
      : initialService
      ? `Hello VELQON team, I am inquiring about ${initialService}.`
      : ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          projectType,
          location,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setSubmittedEnquiryId(data.enquiry?.id || "");
      } else {
        setErrorMsg(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppPrefilledUrl = () => {
    const text = `Hello VELQON Studio,\n\nName: ${fullName || "Client"}\nProject Type: ${projectType}\nLocation: ${location}\nPhone: ${phone}\nMessage: ${message || "I would like to discuss an interior architecture project."}`;
    return `https://wa.me/971501234567?text=${encodeURIComponent(text)}`;
  };

  if (submitted) {
    return (
      <div className="p-8 md:p-12 bg-[#0c0c10] border border-[#c5a880]/40 rounded-sm space-y-6 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-[#c5a880]/20 border border-[#c5a880] flex items-center justify-center text-[#c5a880]">
          <CheckCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.3em] text-[#c5a880] uppercase">
            Transmission Confirmed · Ref #{submittedEnquiryId}
          </span>
          <h3 className="font-serif text-3xl text-[#fafafa]">
            Thank you, {fullName}.
          </h3>
        </div>

        <p className="text-sm text-[#a3a3a3] font-light leading-relaxed">
          Your enquiry has been securely logged into the VELQON client registry. A senior partner will review your project brief and respond within 24 hours.
        </p>

        <div className="pt-4 border-t border-white/10 space-y-3">
          <p className="text-xs text-[#737373] uppercase tracking-wider">
            Prefer instant direct messaging?
          </p>
          <a
            href={getWhatsAppPrefilledUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] text-black text-xs tracking-[0.2em] uppercase font-medium hover:brightness-110 transition-all rounded-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Continue Via WhatsApp Now</span>
          </a>
        </div>

        <div className="pt-4">
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-[#888888] underline hover:text-white"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[#0c0c10]/90 backdrop-blur-2xl p-8 md:p-12 border border-white/10 rounded-[2px] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
      <div className="space-y-2 border-b border-white/[0.08] pb-6">
        <span className="text-[10px] tracking-[0.3em] text-[#c5a880] uppercase font-mono block">
          Confidential Client Intake
        </span>
        <h2 className="font-serif text-2xl md:text-3xl text-[#fafafa] font-normal">
          Tell us about your project
        </h2>
        <p className="text-xs text-[#8c8c94] font-light">
          All client discussions are subject to strict privacy and non-disclosure standards.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded">
          {errorMsg}
        </div>
      )}

      {/* 1. Full Name */}
      <div className="space-y-2">
        <label className="text-[10px] tracking-[0.25em] text-[#a3a3a8] uppercase font-mono block">
          Full Name / Representative *
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Tariq Al-Hashimi"
          className="form-input-luxury text-sm"
        />
      </div>

      {/* 2. Email & Phone in 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] tracking-[0.25em] text-[#a3a3a8] uppercase font-mono block">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@company.com"
            className="form-input-luxury text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] tracking-[0.25em] text-[#a3a3a8] uppercase font-mono block">
            Contact Number / Mobile *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+971 50 000 0000"
            className="form-input-luxury text-sm"
          />
        </div>
      </div>

      {/* 3. Project Type & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] tracking-[0.25em] text-[#a3a3a8] uppercase font-mono block">
            Project Typology
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full bg-[#141418] border border-white/10 rounded-[2px] py-3 px-3 text-xs text-[#fafafa] focus:outline-none focus:border-[#c5a880]"
          >
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-[#141418] text-[#fafafa]">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] tracking-[0.25em] text-[#a3a3a8] uppercase font-mono block">
            Spatial Location / Development
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-[#141418] border border-white/10 rounded-[2px] py-3 px-3 text-xs text-[#fafafa] focus:outline-none focus:border-[#c5a880]"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc} className="bg-[#141418] text-[#fafafa]">
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Project Requirements / Message */}
      <div className="space-y-2">
        <label className="text-[10px] tracking-[0.25em] text-[#a3a3a8] uppercase font-mono block">
          Project Brief / Spatial Requirements *
        </label>
        <textarea
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your property, approx. square footage, desired timeline, or aesthetic preferences..."
          className="w-full bg-white/[0.02] border border-white/10 rounded-[2px] p-4 text-sm text-[#fafafa] placeholder-[#55555c] focus:outline-none focus:border-[#c5a880] transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#f7f7f5] hover:bg-[#c5a880] text-black text-[11px] tracking-[0.24em] uppercase font-medium rounded-[2px] transition-all duration-300 shadow-[0_8px_25px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_25px_rgba(197,168,128,0.35)] disabled:opacity-50 cursor-pointer"
        >
          <span>{isSubmitting ? "Transmitting Brief..." : "Submit Confidential Brief"}</span>
          <Send className="w-4 h-4" />
        </button>

        <a
          href={getWhatsAppPrefilledUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-[#25D366] hover:text-[#25D366]/80 tracking-wider transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Send directly via WhatsApp</span>
        </a>
      </div>
    </form>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#08080a] text-[#fafafa]">
      <Navbar />

      {/* Header */}
      <section className="relative pt-44 pb-16 border-b border-white/[0.06] overflow-hidden">
        <div className="velqon-container relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#c5a880]" />
            <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase">
              Private Enquiries & Studio
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] text-[#fafafa]">
            Initiate A Dialogue
          </h1>
          <p className="text-base sm:text-lg text-[#a3a3a3] font-light leading-relaxed">
            We welcome conversations regarding private residential commissions, architectural penthouses, and bespoke furniture engineering.
          </p>
        </div>
      </section>

      {/* Contact Grid: Form on Left, Studio Info & Map on Right */}
      <section className="py-20 md:py-28">
        <div className="velqon-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="p-12 bg-[#0c0c10] border border-white/10 text-xs text-[#737373]">
                    Loading inquiry form...
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Studio Info & Map Column */}
            <div className="lg:col-span-5 space-y-10">
              <div className="p-8 bg-[#0c0c10] border border-white/[0.08] rounded-sm space-y-6">
                <h3 className="font-serif text-2xl text-[#fafafa]">
                  Dubai Studio Headquarters
                </h3>

                <div className="space-y-4 text-xs font-light text-[#888888] leading-relaxed">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#fafafa] block">Address</strong>
                      <span>{studioInfo.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#fafafa] block">Telephone</strong>
                      <a href={`tel:${studioInfo.phone}`} className="hover:text-white">
                        {studioInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#fafafa] block">Official Email</strong>
                      <a href={`mailto:${studioInfo.email}`} className="hover:text-white">
                        {studioInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#fafafa] block">Studio Hours</strong>
                      <span>{studioInfo.workingHours}</span>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Callout */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <span className="text-[10px] tracking-[0.25em] text-[#737373] uppercase block">
                    Immediate WhatsApp Concierge
                  </span>
                  <a
                    href={studioInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-[#141418] hover:bg-[#1a1a20] border border-white/10 rounded transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-[#fafafa] font-medium">WhatsApp Direct</p>
                        <p className="text-[10px] text-[#737373]">{studioInfo.whatsappNumber}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#737373] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>

              {/* Styled Interactive Google Maps Integration */}
              <div className="rounded-sm overflow-hidden border border-white/10 shadow-2xl relative">
                <div className="bg-[#141418] px-4 py-2.5 flex items-center justify-between text-[10px] text-[#737373] tracking-widest uppercase border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Dubai Studio Location</span>
                  </div>
                  <span>Al Quoz 1 · Alserkal</span>
                </div>
                <iframe
                  title="VELQON Dubai Studio Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14444.606230784966!2d55.225725!3d25.13897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6a2b8e3923bb%3A0x633d262d0577db19!2sAlserkal%20Avenue!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                  width="100%"
                  height="280"
                  style={{
                    border: 0,
                    filter: "grayscale(100%) invert(92%) contrast(85%)",
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
