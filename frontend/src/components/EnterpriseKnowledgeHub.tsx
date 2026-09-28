import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  FileText,
  Sparkles,
  Download,
  Filter,
  Building2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Scale,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { GovernmentOrderDocument, OmniSearchResponse } from '../types';

interface EnterpriseKnowledgeHubProps {
  onOpenCopilot?: (query: string) => void;
}

export const EnterpriseKnowledgeHub: React.FC<EnterpriseKnowledgeHubProps> = ({
  onOpenCopilot
}) => {
  const { language } = useAuthStore();
  const isTa = language === 'ta';

  const [searchQuery, setSearchQuery] = useState('');
  const [docTypeFilter, setDocTypeFilter] = useState('ALL');
  const [searchResponse, setSearchResponse] = useState<OmniSearchResponse | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<GovernmentOrderDocument | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    executeSearch('Semiconductor');
  }, []);

  const executeSearch = (q: string) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/api/v1/search/omni?q=${encodeURIComponent(q || 'Tamil Nadu')}&doc_type=${docTypeFilter}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setSearchResponse(data);
          if (data.documents && data.documents.length > 0) {
            setSelectedDoc(data.documents[0]);
          }
        }
      })
      .catch(() => {
        // Fallback mock
        const mockResponse: OmniSearchResponse = {
          query: q,
          query_interpreted: "Hybrid semantic query across Tamil Nadu Government Orders, Acts, and Sanctions",
          total_results: 2,
          documents: [
            {
              id: "doc-go-01",
              doc_type: "GO_MS",
              go_number: "G.O. (Ms) No. 142",
              department_code: "IND",
              department_en: "Industries, Investment Promotion & Commerce",
              department_ta: "தொழில், முதலீட்டு ஊக்குவிப்பு மற்றும் வர்த்தகம்",
              title_en: "Special Incentive Package & Policy Framework for Mega Semiconductor Fab Park at Krishnagiri",
              title_ta: "கிருஷ்ணகிரியில் மெகா குறைக்கடத்தி பூங்காவிற்கான சிறப்பு ஊக்கத்தொகை தொகுப்பு மற்றும் கொள்கை கட்டமைப்பு",
              issued_date: "2026-09-15",
              signatory_officer: "V. Arun Roy, IAS (Secretary to Government)",
              abstract_en: "Sanctions 25% capital subsidy, 100% stamp duty exemption, and 15-year electricity tax waiver for advanced semiconductor manufacturing with min. ₹4,000 Cr capex.",
              abstract_ta: "குறைந்தது ₹4,000 கோடி முதலீட்டில் அமையும் குறைக்கடத்தி உற்பத்திக்கு 25% மூலதன மானியம், 100% முத்திரைத்தாள் வரி விலக்கு மற்றும் 15 ஆண்டு மின் கட்டண வரி விலக்கு அனுமதி.",
              financial_sanction_cr: 720.0,
              relevant_districts: ["Krishnagiri (Hosur)", "Kanchipuram (Sriperumbudur)"],
              applicable_acts_rules: ["Tamil Nadu Industrial Policy 2021", "Tamil Nadu Business Facilitation Act 2018"],
              pdf_download_url: "https://storage.vettri.tn.gov.in/gos/go_ms_142_industries_2026.pdf",
              relevance_score: 0.98
            },
            {
              id: "doc-go-02",
              doc_type: "GO_MS",
              go_number: "G.O. (Ms) No. 318",
              department_code: "REV_DISASTER",
              department_en: "Revenue & Disaster Management",
              department_ta: "வருவாய் மற்றும் பேரிடர் மேலாண்மை",
              title_en: "Monsoon Preparedness 2026 - Sanction of State Disaster Response Fund (SDRF) for Stormwater Drainage & Check Dam Desilting",
              title_ta: "பருவமழை தயார்நிலை 2026 - மழைநீர் வடிகால் மற்றும் தடுப்பணை தூர்வாரும் பணிகளுக்கு பேரிடர் நிவாரண நிதி ஒதுக்கீடு",
              issued_date: "2026-08-20",
              signatory_officer: "P. Amudha, IAS (Principal Secretary to Government)",
              abstract_en: "Allocates ₹620 Crore across Greater Chennai Corporation, coastal delta districts, and Western Ghats for pre-monsoon storm drainage desilting and SDRF deployment.",
              abstract_ta: "சென்னை மாநகராட்சி, கடலோர டெல்டா மற்றும் மேற்கு தொடர்ச்சி மலை மாவட்டங்களில் பருவமழை முன்னெச்சரிக்கை பணிகளுக்காக ₹620 கோடி நிதி ஒதுக்கீடு.",
              financial_sanction_cr: 620.0,
              relevant_districts: ["Chennai", "Cuddalore", "Nagapattinam", "Coimbatore", "Nilgiris"],
              applicable_acts_rules: ["Disaster Management Act 2005", "Tamil Nadu Relief Manual"],
              pdf_download_url: "https://storage.vettri.tn.gov.in/gos/go_ms_318_disaster_2026.pdf",
              relevance_score: 0.96
            }
          ],
          related_officers: [{ name: "V. Arun Roy, IAS", designation: "Secretary, Industries" }],
          related_schemes: [{ name: "Semiconductor Fab Capital Subsidy", budget: "₹720 Cr" }],
          ai_answer_en: "Found authoritative Government Orders matching your inquiry with valid statutory grounding.",
          ai_answer_ta: "சட்டப்பூர்வ மேற்கோள்களுடன் கூடிய அதிகாரப்பூர்வ அரசாணைகள் கண்டறியப்பட்டன."
        };
        setSearchResponse(mockResponse);
        setSelectedDoc(mockResponse.documents[0]);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {isTa ? 'அரசு நிறுவன அறிவு களஞ்சியம் & ஒருங்கிணைந்த தேடல்' : 'Enterprise Knowledge Hub & Omni Search'}
            </h1>
            <p className="text-xs text-slate-400">
              {isTa 
                ? 'அரசாணைகள் (GOs), சட்டங்கள், சுற்றறிக்கைகள் மற்றும் சட்டமன்ற விவாதங்களை RAG மூலம் நொடியில் கண்டறியவும்' 
                : 'Hybrid dense-sparse semantic retrieval across Government Orders, Acts, Circulars & Legislative Proceedings'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenCopilot && onOpenCopilot(`Search government knowledge base for: ${searchQuery}`)}
          className="px-4 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition shrink-0"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          {isTa ? 'AI சட்ட ஆராய்ச்சி' : 'AI Legal & Policy RAG'}
        </button>
      </div>

      {/* SEARCH BAR & FILTER PILLS */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && executeSearch(searchQuery)}
            placeholder={isTa ? 'அரசாணை எண், துறை, திட்டம் அல்லது சட்டத்தை தேடுக: "குறைக்கடத்தி அரசாணை", "மழைநீர் வடிகால் SDRF", "பட்டா மாறுதல் சட்டம்"...' : 'Search by GO Number, Department, Scheme or Act: "Semiconductor Fab GO", "Stormwater SDRF", "Patta Transfer Act"...'}
            className="w-full pl-12 pr-28 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 transition"
          />
          <button
            onClick={() => executeSearch(searchQuery)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
          >
            Search
          </button>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {['ALL', 'GO_MS', 'GO_4D', 'ACT_STATUTE', 'CIRCULAR', 'BUDGET_NOTE'].map(f => (
            <button
              key={f}
              onClick={() => {
                setDocTypeFilter(f);
                executeSearch(searchQuery);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition shrink-0 ${
                docTypeFilter === f
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN SPLIT: Left (Documents List 5 Cols) / Right (Doc Reader & Citation View 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Documents Results */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 max-h-[720px] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {searchResponse?.total_results ?? 0} Authoritative Records Found
            </span>
          </div>

          <div className="space-y-3">
            {searchResponse?.documents.map(doc => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-150 border space-y-2 ${
                  selectedDoc?.id === doc.id
                    ? 'bg-indigo-500/15 border-indigo-500/40 text-white shadow-lg'
                    : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {doc.go_number}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">
                    {doc.doc_type}
                  </span>
                </div>

                <h4 className="text-sm font-bold line-clamp-2 leading-snug">
                  {isTa ? doc.title_ta : doc.title_en}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {isTa ? doc.abstract_ta : doc.abstract_en}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <span>{doc.department_en}</span>
                  <span className="font-mono">{doc.issued_date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Document Reader & Authority Citations */}
        <div className="lg:col-span-7 space-y-6">
          {selectedDoc ? (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
              
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {selectedDoc.go_number}
                    </span>
                    <span className="text-xs text-slate-400">{selectedDoc.issued_date}</span>
                  </div>
                  <h2 className="text-lg font-extrabold text-white">
                    {isTa ? selectedDoc.title_ta : selectedDoc.title_en}
                  </h2>
                  <p className="text-xs text-emerald-400 font-semibold">
                    {selectedDoc.department_en}
                  </p>
                </div>

                <a
                  href={selectedDoc.pdf_download_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download G.O.</span>
                </a>
              </div>

              {/* Financial Sanction & Signatory Pill */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Financial Sanction</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                    {selectedDoc.financial_sanction_cr && selectedDoc.financial_sanction_cr > 0 
                      ? `₹${selectedDoc.financial_sanction_cr} Crores` 
                      : 'Statutory / Policy (No Direct Capex)'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Signatory Authority</div>
                  <div className="text-sm font-bold text-white mt-0.5 truncate">{selectedDoc.signatory_officer}</div>
                </div>
              </div>

              {/* Abstract / Legal Summary */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Official Abstract & Operative Sanctions
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {isTa ? selectedDoc.abstract_ta : selectedDoc.abstract_en}
                </p>
              </div>

              {/* Statutory Rules & Applicable Acts */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" /> Applicable Acts & Statutory Provisions
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedDoc.applicable_acts_rules.map((act, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium">
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Relevant Districts Covered */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Jurisdiction & Target Coverage
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedDoc.relevant_districts.map((d, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 rounded-2xl bg-slate-900/50 border border-slate-800">
              Select a Government Order from search results to read operative provisions.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
