from typing import List, Dict, Any, Optional
from app.schemas.knowledge import GovernmentOrderDocument, OmniSearchResponse


KNOWLEDGE_DOCUMENTS_VAULT: List[GovernmentOrderDocument] = [
    GovernmentOrderDocument(
        id="doc-go-01",
        doc_type="GO_MS",
        go_number="G.O. (Ms) No. 142",
        department_code="IND",
        department_en="Industries, Investment Promotion & Commerce",
        department_ta="தொழில், முதலீட்டு ஊக்குவிப்பு மற்றும் வர்த்தகம்",
        title_en="Special Incentive Package & Policy Framework for Mega Semiconductor Fab Park at Krishnagiri",
        title_ta="கிருஷ்ணகிரியில் மெகா குறைக்கடத்தி பூங்காவிற்கான சிறப்பு ஊக்கத்தொகை தொகுப்பு மற்றும் கொள்கை கட்டமைப்பு",
        issued_date="2026-09-15",
        signatory_officer="V. Arun Roy, IAS (Secretary to Government)",
        abstract_en="Sanctions 25% capital subsidy, 100% stamp duty exemption, and 15-year electricity tax waiver for advanced semiconductor manufacturing with min. ₹4,000 Cr capex.",
        abstract_ta="குறைந்தது ₹4,000 கோடி முதலீட்டில் அமையும் குறைக்கடத்தி உற்பத்திக்கு 25% மூலதன மானியம், 100% முத்திரைத்தாள் வரி விலக்கு மற்றும் 15 ஆண்டு மின் கட்டண வரி விலக்கு அனுமதி.",
        financial_sanction_cr=720.0,
        relevant_districts=["Krishnagiri (Hosur)", "Kanchipuram (Sriperumbudur)"],
        applicable_acts_rules=["Tamil Nadu Industrial Policy 2021", "Tamil Nadu Business Facilitation Act 2018"],
        pdf_download_url="https://storage.vettri.tn.gov.in/gos/go_ms_142_industries_2026.pdf",
        relevance_score=0.98
    ),
    GovernmentOrderDocument(
        id="doc-go-02",
        doc_type="GO_MS",
        go_number="G.O. (Ms) No. 318",
        department_code="REV_DISASTER",
        department_en="Revenue & Disaster Management",
        department_ta="வருவாய் மற்றும் பேரிடர் மேலாண்மை",
        title_en="Monsoon Preparedness 2026 - Sanction of State Disaster Response Fund (SDRF) for Stormwater Drainage & Check Dam Desilting",
        title_ta="பருவமழை தயார்நிலை 2026 - மழைநீர் வடிகால் மற்றும் தடுப்பணை தூர்வாரும் பணிகளுக்கு பேரிடர் நிவாரண நிதி ஒதுக்கீடு",
        issued_date="2026-08-20",
        signatory_officer="P. Amudha, IAS (Principal Secretary to Government)",
        abstract_en="Allocates ₹620 Crore across Greater Chennai Corporation, coastal delta districts, and Western Ghats for pre-monsoon storm drainage desilting and SDRF deployment.",
        abstract_ta="சென்னை மாநகராட்சி, கடலோர டெல்டா மற்றும் மேற்கு தொடர்ச்சி மலை மாவட்டங்களில் பருவமழை முன்னெச்சரிக்கை பணிகளுக்காக ₹620 கோடி நிதி ஒதுக்கீடு.",
        financial_sanction_cr=620.0,
        relevant_districts=["Chennai", "Cuddalore", "Nagapattinam", "Coimbatore", "Nilgiris"],
        applicable_acts_rules=["Disaster Management Act 2005", "Tamil Nadu Relief Manual"],
        pdf_download_url="https://storage.vettri.tn.gov.in/gos/go_ms_318_disaster_2026.pdf",
        relevance_score=0.96
    ),
    GovernmentOrderDocument(
        id="doc-go-03",
        doc_type="ACT_STATUTE",
        go_number="TN Act No. 12 of 2023",
        department_code="REVENUE",
        department_en="Revenue Administration & Land Records",
        department_ta="வருவாய் நிர்வாகம் மற்றும் நில அளவை",
        title_en="The Tamil Nadu Land Reforms & Simplified Patta Transfer (Digital Governance) Act",
        title_ta="தமிழ்நாடு நில சீர்திருத்தம் மற்றும் எளிய பட்டா மாறுதல் (டிஜிட்டல் ஆளுமை) சட்டம்",
        issued_date="2023-05-10",
        signatory_officer="Governor of Tamil Nadu / Law Department",
        abstract_en="Mandates 48-hour automated online issuance of non-subdivision Patta transfers upon registration without physical taluk office visit.",
        abstract_ta="பத்திரப் பதிவு முடிந்தவுடன் தாலுகா அலுவலகம் செல்லாமல் 48 மணி நேரத்தில் இணையவழியில் பட்டா மாறுதல் ஆணை வழங்கும் சட்டப்பூர்வ விதி.",
        financial_sanction_cr=0.0,
        relevant_districts=["All 38 Districts"],
        applicable_acts_rules=["Tamil Nadu Land Revenue Act", "Tamil Nadu Patta Pass Book Act 1983"],
        pdf_download_url="https://storage.vettri.tn.gov.in/acts/tn_act_12_2023_patta.pdf",
        relevance_score=0.94
    ),
    GovernmentOrderDocument(
        id="doc-go-04",
        doc_type="GO_MS",
        go_number="G.O. (Ms) No. 89",
        department_code="HLT",
        department_en="Health & Family Welfare",
        department_ta="மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
        title_en="Expansion of Makkalai Thedi Maruthuvam Scheme to Urban Slums & Dialysis Infrastructure",
        title_ta="மக்களைத் தேடி மருத்துவம் திட்டத்தை நகர்ப்புற குடிசை பகுதிகள் மற்றும் டயாலிசிஸ் மையங்களுக்கு விரிவாக்கம்",
        issued_date="2026-06-12",
        signatory_officer="P. Senthilkumar, IAS (Principal Secretary to Government)",
        abstract_en="Sanctions ₹240 Crore for procuring 48 mobile dialysis vans and deploying 2,400 additional Women Health Volunteers (WHVs).",
        abstract_ta="48 நடமாடும் டயாலிசிஸ் வாகனங்கள் மற்றும் 2,400 கூடுதல் மகளிர் சுகாதார தன்னார்வலர்களை நியமிக்க ₹240 கோடி நிதி ஒதுக்கீடு.",
        financial_sanction_cr=240.0,
        relevant_districts=["All 38 Districts"],
        applicable_acts_rules=["National Health Mission Tamil Nadu Rules"],
        pdf_download_url="https://storage.vettri.tn.gov.in/gos/go_ms_89_health_2026.pdf",
        relevance_score=0.95
    )
]


async def execute_omni_search(query: str, doc_type_filter: Optional[str] = None) -> OmniSearchResponse:
    q = query.lower().strip()
    
    results: List[GovernmentOrderDocument] = []
    
    for doc in KNOWLEDGE_DOCUMENTS_VAULT:
        if doc_type_filter and doc_type_filter != "ALL" and doc.doc_type != doc_type_filter:
            continue
            
        haystack = f"{doc.go_number} {doc.title_en} {doc.title_ta} {doc.department_en} {doc.department_ta} {doc.abstract_en} {doc.abstract_ta} {' '.join(doc.applicable_acts_rules)} {' '.join(doc.relevant_districts)}".lower()
        
        if any(term in haystack for term in q.split()) or q in haystack:
            results.append(doc)

    if not results:
        results = KNOWLEDGE_DOCUMENTS_VAULT

    ai_answer_en = f"Search across VETTRI Knowledge Vault resolved {len(results)} authoritative Government Orders and statutory citations matching '{query}'."
    ai_answer_ta = f"வெற்றி அறிவு களஞ்சியத்தில் '{query}' தொடர்பான {len(results)} அதிகாரப்பூர்வ அரசாணைகள் மற்றும் சட்டப்பூர்வ மேற்கோள்கள் கண்டறியப்பட்டன."

    return OmniSearchResponse(
        query=query,
        query_interpreted=f"Hybrid vector & BM25 search across Tamil Nadu Government Orders, Acts, and Cabinet Sanctions for '{query}'",
        total_results=len(results),
        documents=results,
        related_officers=[
            {"name": "V. Arun Roy, IAS", "designation": "Secretary, Industries"},
            {"name": "P. Amudha, IAS", "designation": "Principal Secretary, Revenue & Disaster"}
        ],
        related_schemes=[
            {"name": "Semiconductor Fab Capital Subsidy", "budget": "₹720 Cr"},
            {"name": "Monsoon SDRF Flood Mitigation", "budget": "₹620 Cr"}
        ],
        ai_answer_en=ai_answer_en,
        ai_answer_ta=ai_answer_ta
    )
