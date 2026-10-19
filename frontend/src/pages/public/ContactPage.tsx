import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button, Input, useToast } from '@/components/ui';
import { copyToClipboard } from '@/utils/copyToClipboard';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Package,
  Zap,
  Building2,
  Copy,
  ChevronDown,
  ChevronUp,
  Paperclip,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

type InquiryType = 'tracking' | 'api' | 'carrier' | 'enterprise' | 'general';
type UrgencyLevel = 'standard' | 'high' | 'critical';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();

  // Form state
  const [inquiryType, setInquiryType] = useState<InquiryType>('tracking');
  const [urgency, setUrgency] = useState<UrgencyLevel>('standard');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('auto');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    inquiryType: InquiryType;
    urgency: UrgencyLevel;
    timestamp: string;
  } | null>(null);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    if (!message.trim()) {
      showToast('Please describe your inquiry', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic dispatch ticket transmission
    setTimeout(() => {
      const generatedTicketId = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket({
        id: generatedTicketId,
        inquiryType,
        urgency,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      setIsSubmitting(false);
      showToast(`Inquiry received! Ticket #${generatedTicketId} created.`, 'success');
    }, 900);
  };

  const handleCopyTicket = async (ticketId: string) => {
    const ok = await copyToClipboard(ticketId);
    if (ok) {
      showToast('Ticket number copied to clipboard', 'success');
    }
  };

  const resetForm = () => {
    setSubmittedTicket(null);
    setFullName('');
    setEmail('');
    setTrackingNumber('');
    setSubject('');
    setMessage('');
    setAttachedFileName(null);
    setUrgency('standard');
    setInquiryType('tracking');
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFileName(e.target.files[0].name);
      showToast(`Attached: ${e.target.files[0].name}`, 'info');
    }
  };

  const faqItems = [
    {
      q: 'Can ParcelGo change my delivery address or instructions?',
      a: 'ParcelGo is an independent universal multi-carrier tracking platform. Because shipping contracts and physical deliveries are governed directly by individual carriers (DHL, FedEx, UPS, USPS, etc.), rerouting or signature changes must be requested directly via the carrier using your tracking number.',
    },
    {
      q: 'Why hasn\'t my tracking status changed in the last 48 hours?',
      a: 'International packages and long-haul intermodal shipments often travel between major consolidation hubs without intermediate scan events. If your package is within its estimated delivery window, it is typically in transit. If an exception or delay has occurred, our dashboard flags it immediately.',
    },
    {
      q: 'How do I access the multi-carrier tracking API & Webhooks?',
      a: 'We offer RESTful JSON endpoints and real-time webhook push feeds for e-commerce platforms, ERP systems, and logistics brokers. Select "API & Webhook Access" in the contact form above, and our developer operations team will issue sandbox credentials.',
    },
    {
      q: 'What should I do if my shipment status shows "Delivered" but I cannot find it?',
      a: 'Check your property reception, front porch, mail room, or neighbors first. Carriers often take confirmation photos or signature records. If still unaccounted for, contact the carrier hotline listed on this page within 24 hours to file an immediate driver trace inquiry.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-dark-900 font-sans">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Top Hero Banner */}
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            {/* Status Live Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-soft mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Live Support Operations Desk Active</span>
              <span className="text-emerald-500 font-normal">&bull;</span>
              <span className="text-emerald-700 font-medium">Avg response &lt; 15 mins</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              How can our global logistics &amp; support team help you?
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Connect with our parcel specialists for shipment assistance, carrier status escalations, 
              customs clearances, and enterprise multi-carrier API integrations.
            </p>

            {/* SLA / Capability Highlights */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-left">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-soft">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Carrier Feeds</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">1,000+ Couriers</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-soft">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">API Uptime</p>
                <p className="text-lg font-bold text-emerald-600 mt-0.5">99.98% SLA</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-soft">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Support Routing</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">24/7 Global</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-soft">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Avg Response</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">&lt; 15 Minutes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Channel Cards Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Package Support */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-medium transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Package &amp; Tracking Help</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
                Inquiries regarding stalled tracking, exception flags, customs holds, or courier handoffs.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Direct Email</span>
                  <a href="mailto:support@parceltrack.com" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
                    support@parceltrack.com
                  </a>
                </div>
                <button
                  onClick={() => {
                    setInquiryType('tracking');
                    const formElement = document.getElementById('contact-form-section');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all"
                >
                  Write Us
                </button>
              </div>
            </div>

            {/* Carrier & API Partnerships */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-medium transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">API &amp; Developer Hub</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
                Documentation, sandbox tokens, high-throughput webhooks, and carrier scrapers.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Developer Desk</span>
                  <a href="mailto:api@parceltrack.com" className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors">
                    api@parceltrack.com
                  </a>
                </div>
                <button
                  onClick={() => {
                    setInquiryType('api');
                    const formElement = document.getElementById('contact-form-section');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all"
                >
                  API Inquiry
                </button>
              </div>
            </div>

            {/* Enterprise Logistics Solutions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-medium transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Enterprise Solutions</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
                Volume tracking agreements, custom carrier integrations, and dedicated SLA management.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Enterprise Team</span>
                  <a href="mailto:enterprise@parceltrack.com" className="text-sm font-semibold text-purple-700 hover:text-purple-800 transition-colors">
                    enterprise@parceltrack.com
                  </a>
                </div>
                <button
                  onClick={() => {
                    setInquiryType('enterprise');
                    const formElement = document.getElementById('contact-form-section');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all"
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area: Form & Side Directory */}
        <div id="contact-form-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Interactive Ticket Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-medium p-6 sm:p-8">
                {submittedTicket ? (
                  // Submitted Success State
                  <div className="py-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>

                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 mb-2">
                        Ticket Successfully Logged
                      </span>
                      <h3 className="text-2xl font-extrabold text-slate-900">
                        We've received your request!
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                        Our operations dispatch team has been notified. A confirmation has been 
                        dispatched to <span className="font-semibold text-slate-800">{email}</span>.
                      </p>
                    </div>

                    {/* Ticket Reference Box */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Tracking Ticket Reference
                        </span>
                        <p className="text-lg font-mono font-bold text-emerald-700">
                          #{submittedTicket.id}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleCopyTicket(submittedTicket.id)}
                        className="gap-1.5 text-xs"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Ref</span>
                      </Button>
                    </div>

                    <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-4 max-w-md mx-auto text-left text-xs text-emerald-900 space-y-1">
                      <p className="font-semibold flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-emerald-700" />
                        Estimated Response: &lt; 15 Minutes
                      </p>
                      <p className="text-emerald-800">
                        Priority Level: <span className="capitalize font-semibold">{submittedTicket.urgency}</span> &bull; Category: <span className="capitalize font-semibold">{submittedTicket.inquiryType}</span>
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={resetForm} variant="outline" className="text-xs">
                        Submit Another Inquiry
                      </Button>
                      <Link to="/track">
                        <Button className="w-full sm:w-auto text-xs bg-emerald-700 hover:bg-emerald-800 gap-1.5">
                          <span>Return to Tracking</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  // Active Interactive Form
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Submit an Official Dispatch Inquiry
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Select your inquiry topic to route your ticket immediately to the relevant carrier or API engineering queue.
                      </p>
                    </div>

                    {/* Inquiry Type Chips */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                        Inquiry Category
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'tracking', label: 'Package Tracking', icon: Package },
                          { id: 'api', label: 'API & Webhooks', icon: Zap },
                          { id: 'carrier', label: 'Carrier Integration', icon: ShieldCheck },
                          { id: 'enterprise', label: 'Enterprise Plan', icon: Building2 },
                          { id: 'general', label: 'General Questions', icon: Mail },
                        ].map((cat) => {
                          const Icon = cat.icon;
                          const isActive = inquiryType === cat.id;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setInquiryType(cat.id as InquiryType)}
                              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                                isActive
                                  ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm ring-1 ring-emerald-600'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                              }`}
                            >
                              <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                              <span className="truncate">{cat.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2-Column Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Your Full Name <span className="text-rose-500">*</span>
                        </label>
                        <Input
                          placeholder="e.g. Alex Morgan"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="e.g. alex@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {/* Optional Tracking Context (Highlighted if Tracking category selected) */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                          <Package className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Shipment Details (Optional)</span>
                        </label>
                        <span className="text-[11px] text-slate-500">Accelerates investigation</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            placeholder="Tracking # (e.g. JD01460000854921)"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-mono text-slate-800 placeholder-slate-400"
                          />
                        </div>
                        <div>
                          <select
                            value={carrier}
                            onChange={(e) => setCarrier(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-700"
                          >
                            <option value="auto">Auto-Detect Carrier</option>
                            <option value="dhl">DHL Express</option>
                            <option value="fedex">FedEx</option>
                            <option value="ups">UPS</option>
                            <option value="usps">USPS</option>
                            <option value="aramex">Aramex</option>
                            <option value="other">Other Global Carrier</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Urgency Level Selector */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Priority / Urgency
                        </label>
                        <span className="text-[11px] text-slate-500">Determines triage queue</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'standard', label: 'Normal / Routine', desc: 'Response in < 1 hour', color: 'text-slate-700' },
                          { id: 'high', label: 'High Priority', desc: 'Response in < 30 mins', color: 'text-amber-700' },
                          { id: 'critical', label: 'Critical Exception', desc: 'Out for delivery / Urgent', color: 'text-rose-700' },
                        ].map((u) => {
                          const isSelected = urgency === u.id;
                          return (
                            <button
                              key={u.id}
                              type="button"
                              onClick={() => setUrgency(u.id as UrgencyLevel)}
                              className={`p-2.5 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : u.color}`}>
                                {u.label}
                              </p>
                              <p className={`text-[10px] mt-0.5 leading-none ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                                {u.desc}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Subject Line */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Subject Line
                      </label>
                      <Input
                        placeholder="Brief summary of your inquiry..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="text-sm"
                      />
                    </div>

                    {/* Detailed Message */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Detailed Message <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[11px] text-slate-400">
                          {message.length} / 1000 characters
                        </span>
                      </div>
                      <textarea
                        rows={5}
                        placeholder="Please include full details, relevant consignment numbers, error logs, or delivery addresses..."
                        value={message}
                        maxLength={1000}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-slate-900 placeholder-slate-400 resize-y transition-all"
                      />
                    </div>

                    {/* Simulated Attachment Dropzone */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all border border-slate-200/80">
                        <Paperclip className="h-3.5 w-3.5 text-slate-500" />
                        <span>{attachedFileName ? attachedFileName : 'Attach Shipping Label / Screenshot'}</span>
                        <input
                          type="file"
                          onChange={handleSimulatedFileUpload}
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg"
                        />
                      </label>
                      {attachedFileName && (
                        <button
                          type="button"
                          onClick={() => setAttachedFileName(null)}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 border-t border-slate-100">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Routing Inquiry to Support Queue...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>Submit Support Inquiry</span>
                          </>
                        )}
                      </Button>
                      <p className="text-[11px] text-center text-slate-400 mt-2">
                        Guaranteed privacy &bull; 256-bit SSL encrypted &bull; No marketing spam
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Carrier Hotlines & Global Operations Centers */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Direct Carrier Hotline Directory */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Direct Carrier Hotlines</h3>
                    <p className="text-[11px] text-slate-500">Need immediate driver or depot trace?</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  If your package is already on a local delivery van or awaiting customer signature, 
                  contacting the carrier directly with your tracking number is often fastest:
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900">DHL Express</p>
                      <p className="text-[11px] text-slate-500">Mon-Fri 7am-9pm EST</p>
                    </div>
                    <a href="tel:18002255345" className="font-mono font-semibold text-emerald-700 hover:text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      1-800-225-5345
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900">FedEx Customer Care</p>
                      <p className="text-[11px] text-slate-500">24/7 Automated &amp; Reps</p>
                    </div>
                    <a href="tel:18004633339" className="font-mono font-semibold text-emerald-700 hover:text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      1-800-463-3339
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900">UPS Logistics</p>
                      <p className="text-[11px] text-slate-500">Mon-Fri 8am-8pm EST</p>
                    </div>
                    <a href="tel:18007425877" className="font-mono font-semibold text-emerald-700 hover:text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      1-800-742-5877
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900">USPS Postal Support</p>
                      <p className="text-[11px] text-slate-500">Mon-Fri 8am-8:30pm EST</p>
                    </div>
                    <a href="tel:18002758777" className="font-mono font-semibold text-emerald-700 hover:text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      1-800-275-8777
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900">Aramex Global</p>
                      <p className="text-[11px] text-slate-500">24/7 International Desk</p>
                    </div>
                    <a href="tel:+971600544000" className="font-mono font-semibold text-emerald-700 hover:text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      +971 600 544000
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2: Global Operations Centers */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Global Regional Hubs</h3>
                    <p className="text-[11px] text-slate-500">Operational centers across three continents</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-slate-600">
                  <div className="border-l-2 border-emerald-600 pl-3">
                    <p className="font-bold text-slate-900">North America HQ</p>
                    <p className="text-slate-500">100 Montgomery Street, Suite 1400</p>
                    <p className="text-slate-500">San Francisco, CA 94104, USA</p>
                  </div>

                  <div className="border-l-2 border-blue-600 pl-3">
                    <p className="font-bold text-slate-900">Europe &amp; EMEA Logistics</p>
                    <p className="text-slate-500">Speicherstraße 55 (Westhafen Tower)</p>
                    <p className="text-slate-500">60327 Frankfurt am Main, Germany</p>
                  </div>

                  <div className="border-l-2 border-purple-600 pl-3">
                    <p className="font-bold text-slate-900">Asia-Pacific Operations</p>
                    <p className="text-slate-500">Marina Bay Financial Centre, Tower 2</p>
                    <p className="text-slate-500">Singapore 018983</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Security & Operational SLA Guarantee */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-medium">
                <div className="flex items-center gap-2.5 mb-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-bold text-sm">Enterprise SLA Guarantee</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  All enterprise webhook web feeds and multi-carrier polling jobs are continuously monitored with sub-second health-checks.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-slate-700">
                  <div>
                    <span className="text-slate-400 block">System Status</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      All Feeds Normal
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Security Grade</span>
                    <span className="font-semibold text-white mt-0.5 block">
                      SOC2 &amp; GDPR Compliant
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Support Questions
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Common solutions regarding tracking status delays, customs processing, and API integrations.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-soft overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-sm text-slate-900">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/help"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span>Explore Full Knowledge Base in Help Center</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
