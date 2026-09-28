"""
VETTRI TN AI OS — Master Seed Data for Government of Tamil Nadu
Contains authentic information for all 38 Districts, Taluks, Flagship Schemes, Ministries, and Administrative Personas.
"""

TN_38_DISTRICTS = [
    {"code": "CHE", "name_en": "Chennai", "name_ta": "சென்னை", "hq_en": "Chennai", "hq_ta": "சென்னை", "zone": "North", "lat": 13.0827, "lng": 80.2707, "pop": 7088403, "area": 426.0, "score": 92.4, "collector": "Rashmi Siddharth Zagade, IAS"},
    {"code": "CBE", "name_en": "Coimbatore", "name_ta": "கோயம்புத்தூர்", "hq_en": "Coimbatore", "hq_ta": "கோயம்புத்தூர்", "zone": "West", "lat": 11.0168, "lng": 76.9558, "pop": 3458045, "area": 4723.0, "score": 91.8, "collector": "Kranthi Kumar Pati, IAS"},
    {"code": "MDU", "name_en": "Madurai", "name_ta": "மதுரை", "hq_en": "Madurai", "hq_ta": "மதுரை", "zone": "South", "lat": 9.9252, "lng": 78.1198, "pop": 3038252, "area": 3741.0, "score": 86.5, "collector": "M. S. Sangeetha, IAS"},
    {"code": "TPR", "name_en": "Tirupur", "name_ta": "திருப்பூர்", "hq_en": "Tirupur", "hq_ta": "திருப்பூர்", "zone": "West", "lat": 11.1085, "lng": 77.3411, "pop": 2479052, "area": 5186.0, "score": 83.2, "collector": "T. Christuraj, IAS"},
    {"code": "SLM", "name_en": "Salem", "name_ta": "சேலம்", "hq_en": "Salem", "hq_ta": "சேலம்", "zone": "West", "lat": 11.6643, "lng": 78.1460, "pop": 3482056, "area": 5245.0, "score": 87.9, "collector": "R. Brindha Devi, IAS"},
    {"code": "TRZ", "name_en": "Tiruchirappalli", "name_ta": "திருச்சிராப்பள்ளி", "hq_en": "Tiruchirappalli", "hq_ta": "திருச்சிராப்பள்ளி", "zone": "Central", "lat": 10.7905, "lng": 78.7047, "pop": 2722290, "area": 4404.0, "score": 89.1, "collector": "M. Pradeep Kumar, IAS"},
    {"code": "TNJ", "name_en": "Thanjavur", "name_ta": "தஞ்சாவூர்", "hq_en": "Thanjavur", "hq_ta": "தஞ்சாவூர்", "zone": "Central", "lat": 10.7870, "lng": 79.1378, "pop": 2405890, "area": 3411.0, "score": 88.0, "collector": "Priyanka Pankajam, IAS"},
    {"code": "CUD", "name_en": "Cuddalore", "name_ta": "கடலூர்", "hq_en": "Cuddalore", "hq_ta": "கடலூர்", "zone": "North", "lat": 11.7480, "lng": 79.7714, "pop": 2605914, "area": 3703.0, "score": 81.5, "collector": "A. Arun Thamburaj, IAS"},
    {"code": "VLR", "name_en": "Vellore", "name_ta": "வேலூர்", "hq_en": "Vellore", "hq_ta": "வேலூர்", "zone": "North", "lat": 12.9165, "lng": 79.1325, "pop": 1614242, "area": 2036.0, "score": 85.3, "collector": "V. R. Subbulaxmi, IAS"},
    {"code": "ERD", "name_en": "Erode", "name_ta": "ஈரோடு", "hq_en": "Erode", "hq_ta": "ஈரோடு", "zone": "West", "lat": 11.3410, "lng": 77.7172, "pop": 2251744, "area": 5722.0, "score": 90.1, "collector": "Raja Gopal Sunkara, IAS"},
    {"code": "TNV", "name_en": "Tirunelveli", "name_ta": "திருநெல்வேலி", "hq_en": "Tirunelveli", "hq_ta": "திருநெல்வேலி", "zone": "South", "lat": 8.7139, "lng": 77.7567, "pop": 1665253, "area": 3842.0, "score": 87.4, "collector": "K. P. Karthikeyan, IAS"},
    {"code": "TUT", "name_en": "Thoothukudi", "name_ta": "தூத்துக்குடி", "hq_en": "Thoothukudi", "hq_ta": "தூத்துக்குடி", "zone": "South", "lat": 8.7642, "lng": 78.1348, "pop": 1750176, "area": 4707.0, "score": 86.8, "collector": "K. Elambahavath, IAS"},
    {"code": "KAN", "name_en": "Kanchipuram", "name_ta": "காஞ்சிபுரம்", "hq_en": "Kanchipuram", "hq_ta": "காஞ்சிபுரம்", "zone": "North", "lat": 12.8342, "lng": 79.7036, "pop": 1166401, "area": 1656.0, "score": 89.6, "collector": "Kalaiselvi Mohan, IAS"},
    {"code": "CGL", "name_en": "Chengalpattu", "name_ta": "செங்கல்பட்டு", "hq_en": "Chengalpattu", "hq_ta": "செங்கல்பட்டு", "zone": "North", "lat": 12.6819, "lng": 79.9888, "pop": 2556244, "area": 2945.0, "score": 90.5, "collector": "S. Arunraj, IAS"},
    {"code": "TVL", "name_en": "Tiruvallur", "name_ta": "திருவள்ளூர்", "hq_en": "Tiruvallur", "hq_ta": "திருவள்ளூர்", "zone": "North", "lat": 13.1437, "lng": 79.9083, "pop": 3728104, "area": 3422.0, "score": 88.7, "collector": "T. Prabhushankar, IAS"},
    {"code": "DGL", "name_en": "Dindigul", "name_ta": "திண்டுக்கல்", "hq_en": "Dindigul", "hq_ta": "திண்டுக்கல்", "zone": "South", "lat": 10.3673, "lng": 77.9803, "pop": 2159775, "area": 6266.0, "score": 86.2, "collector": "M. N. Poongodi, IAS"},
    {"code": "KRI", "name_en": "Krishnagiri", "name_ta": "கிருஷ்ணகிரி", "hq_en": "Krishnagiri", "hq_ta": "கிருஷ்ணகிரி", "zone": "North", "lat": 12.5186, "lng": 78.2137, "pop": 1879809, "area": 5143.0, "score": 88.3, "collector": "K. M. Sarayu, IAS"},
    {"code": "DHP", "name_en": "Dharmapuri", "name_ta": "தருமபுரி", "hq_en": "Dharmapuri", "hq_ta": "தருமபுரி", "zone": "West", "lat": 12.1211, "lng": 78.1582, "pop": 1506843, "area": 4497.0, "score": 84.9, "collector": "K. Shanthi, IAS"},
    {"code": "NKL", "name_en": "Namakkal", "name_ta": "நாமக்கல்", "hq_en": "Namakkal", "hq_ta": "நாமக்கல்", "zone": "West", "lat": 11.2189, "lng": 78.1674, "pop": 1726601, "area": 3368.0, "score": 90.7, "collector": "S. Uma, IAS"},
    {"code": "KRR", "name_en": "Karur", "name_ta": "கரூர்", "hq_en": "Karur", "hq_ta": "கரூர்", "zone": "Central", "lat": 10.9601, "lng": 78.0766, "pop": 1064493, "area": 2897.0, "score": 89.4, "collector": "M. Thangavel, IAS"},
    {"code": "NIL", "name_en": "Nilgiris", "name_ta": "நீலகிரி", "hq_en": "Udhagamandalam", "hq_ta": "உதகமண்டலம்", "zone": "West", "lat": 11.4102, "lng": 76.6950, "pop": 735394, "area": 2545.0, "score": 93.1, "collector": "Lakshmi Bhavya Tanneeru, IAS"},
    {"code": "KKI", "name_en": "Kanniyakumari", "name_ta": "கன்னியாகுமரி", "hq_en": "Nagercoil", "hq_ta": "நாகர்கோவில்", "zone": "South", "lat": 8.0883, "lng": 77.5385, "pop": 1870374, "area": 1725.0, "score": 94.0, "collector": "R. Alagumeena, IAS"},
    {"code": "VNR", "name_en": "Virudhunagar", "name_ta": "விருதுநகர்", "hq_en": "Virudhunagar", "hq_ta": "விருதுநகர்", "zone": "South", "lat": 9.5680, "lng": 77.9624, "pop": 1942288, "area": 4241.0, "score": 88.5, "collector": "V. P. Jeyaseelan, IAS"},
    {"code": "RMD", "name_en": "Ramanathapuram", "name_ta": "இராமநாதபுரம்", "hq_en": "Ramanathapuram", "hq_ta": "இராமநாதபுரம்", "zone": "South", "lat": 9.3639, "lng": 78.8395, "pop": 1353445, "area": 4068.0, "score": 83.7, "collector": "B. Vishnu Chandran, IAS"},
    {"code": "SVG", "name_en": "Sivaganga", "name_ta": "சிவகங்கை", "hq_en": "Sivaganga", "hq_ta": "சிவகங்கை", "zone": "South", "lat": 9.8433, "lng": 78.4809, "pop": 1339101, "area": 4189.0, "score": 85.0, "collector": "Asha Ajith, IAS"},
    {"code": "PUD", "name_en": "Pudukkottai", "name_ta": "புதுக்கோட்டை", "hq_en": "Pudukkottai", "hq_ta": "புதுக்கோட்டை", "zone": "Central", "lat": 10.3797, "lng": 78.8208, "pop": 1618345, "area": 4663.0, "score": 86.1, "collector": "I. S. Mercy Ramya, IAS"},
    {"code": "TVR", "name_en": "Tiruvarur", "name_ta": "திருவாரூர்", "hq_en": "Tiruvarur", "hq_ta": "திருவாரூர்", "zone": "Central", "lat": 10.7725, "lng": 79.6365, "pop": 1264277, "area": 2274.0, "score": 84.2, "collector": "T. Charushree, IAS"},
    {"code": "NGP", "name_en": "Nagapattinam", "name_ta": "நாகப்பட்டினம்", "hq_en": "Nagapattinam", "hq_ta": "நாகப்பட்டினம்", "zone": "Central", "lat": 10.7672, "lng": 79.8449, "pop": 697069, "area": 1397.0, "score": 82.8, "collector": "P. Akash, IAS"},
    {"code": "MYL", "name_en": "Mayiladuthurai", "name_ta": "மயிலாடுதுறை", "hq_en": "Mayiladuthurai", "hq_ta": "மயிலாடுதுறை", "zone": "Central", "lat": 11.1075, "lng": 79.6524, "pop": 918356, "area": 1172.0, "score": 84.7, "collector": "A. P. Mahabharathi, IAS"},
    {"code": "ARI", "name_en": "Ariyalur", "name_ta": "அரியலூர்", "hq_en": "Ariyalur", "hq_ta": "அரியலூர்", "zone": "Central", "lat": 11.1401, "lng": 79.0786, "pop": 754894, "area": 1949.0, "score": 85.6, "collector": "J. Anne Mary Swarna, IAS"},
    {"code": "PER", "name_en": "Perambalur", "name_ta": "பெரம்பலூர்", "hq_en": "Perambalur", "hq_ta": "பெரம்பலூர்", "zone": "Central", "lat": 11.2333, "lng": 78.8824, "pop": 565223, "area": 1757.0, "score": 87.0, "collector": "K. Karpagam, IAS"},
    {"code": "VPM", "name_en": "Viluppuram", "name_ta": "விழுப்புரம்", "hq_en": "Viluppuram", "hq_ta": "விழுப்புரம்", "zone": "North", "lat": 11.9401, "lng": 79.4861, "pop": 2093003, "area": 3725.0, "score": 83.9, "collector": "C. Palani, IAS"},
    {"code": "KLK", "name_en": "Kallakurichi", "name_ta": "கள்ளக்குறிச்சி", "hq_en": "Kallakurichi", "hq_ta": "கள்ளக்குறிச்சி", "zone": "North", "lat": 11.7384, "lng": 78.9639, "pop": 1370281, "area": 3520.0, "score": 82.3, "collector": "M. S. Prasanth, IAS"},
    {"code": "TVM", "name_en": "Tiruvannamalai", "name_ta": "திருவண்ணாமலை", "hq_en": "Tiruvannamalai", "hq_ta": "திருவண்ணாமலை", "zone": "North", "lat": 12.2253, "lng": 79.0747, "pop": 2464875, "area": 6191.0, "score": 85.7, "collector": "D. Bhaskara Pandian, IAS"},
    {"code": "RPN", "name_en": "Ranipet", "name_ta": "இராணிப்பேட்டை", "hq_en": "Ranipet", "hq_ta": "இராணிப்பேட்டை", "zone": "North", "lat": 12.9272, "lng": 79.3330, "pop": 1210277, "area": 2234.0, "score": 87.3, "collector": "J. U. Chandrakala, IAS"},
    {"code": "TPT", "name_en": "Tirupathur", "name_ta": "திருப்பத்தூர்", "hq_en": "Tirupathur", "hq_ta": "திருப்பத்தூர்", "zone": "North", "lat": 12.4958, "lng": 78.5678, "pop": 1111812, "area": 1798.0, "score": 86.4, "collector": "K. Tharpagaraj, IAS"},
    {"code": "TEN", "name_en": "Tenkasi", "name_ta": "தென்காசி", "hq_en": "Tenkasi", "hq_ta": "தென்காசி", "zone": "South", "lat": 8.9594, "lng": 77.3150, "pop": 1407627, "area": 2916.0, "score": 88.6, "collector": "A. K. Kamal Kishore, IAS"},
    {"code": "THN", "name_en": "Theni", "name_ta": "தேனி", "hq_en": "Theni", "hq_ta": "தேனி", "zone": "South", "lat": 10.0104, "lng": 77.4768, "pop": 1245899, "area": 2889.0, "score": 89.2, "collector": "R. V. Shajeevana, IAS"}
]

FLAGSHIP_SCHEMES = [
    {
        "code": "SCHEME_KMUT",
        "name_en": "Kalaignar Magalir Urimai Thittam",
        "name_ta": "கலைஞர் மகளிர் உரிமைத் திட்டம்",
        "budget_cr": 13722.00,
        "target": 11600000,
        "active": 11548290,
        "disbursement_pct": 99.8,
        "status": "EXCELLENT"
    },
    {
        "code": "SCHEME_BREAKFAST",
        "name_en": "Chief Minister's Breakfast Scheme",
        "name_ta": "முதலமைச்சரின் காலை உணவுத் திட்டம்",
        "budget_cr": 404.00,
        "target": 1850000,
        "active": 1850000,
        "disbursement_pct": 100.0,
        "status": "EXCELLENT"
    },
    {
        "code": "SCHEME_PUDHUMAI_PENN",
        "name_en": "Pudhumai Penn Scheme (Higher Education Assistance)",
        "name_ta": "புதுமைப் பெண் திட்டம்",
        "budget_cr": 370.00,
        "target": 500000,
        "active": 482100,
        "disbursement_pct": 96.4,
        "status": "GOOD"
    },
    {
        "code": "SCHEME_TAMIZH_PUTHALVAN",
        "name_en": "Tamizh Pudhalvan Scheme (Boys Higher Ed Assistance)",
        "name_ta": "தமிழ்ப் புதல்வன் திட்டம்",
        "budget_cr": 360.00,
        "target": 328000,
        "active": 312500,
        "disbursement_pct": 95.2,
        "status": "GOOD"
    },
    {
        "code": "SCHEME_MTM",
        "name_en": "Makkalai Thedi Maruthuvam (Doorstep Healthcare)",
        "name_ta": "மக்களைத் தேடி மருத்துவம்",
        "budget_cr": 250.00,
        "target": 10000000,
        "active": 10450000,
        "disbursement_pct": 104.5,
        "status": "EXCELLENT"
    },
    {
        "code": "SCHEME_INN_UYIR_KAAPOM",
        "name_en": "Innuyir Kaappom - Nammai Kaakkum 48 (Road Accident Care)",
        "name_ta": "இன்னுயிர் காப்போம் - நம்மை காக்கும் 48",
        "budget_cr": 160.00,
        "target": 250000,
        "active": 242000,
        "disbursement_pct": 96.8,
        "status": "GOOD"
    }
]

PRIORITY_ALERTS_FEED = [
    {
        "id": "alert-001",
        "district_code": "TPR",
        "district_name_en": "Tirupur",
        "district_name_ta": "திருப்பூர்",
        "title_en": "Industrial Water Stress & Tax Deficit",
        "title_ta": "தொழில்துறை நீர் தட்டுப்பாடு மற்றும் வரி குறைவு",
        "description_en": "Groundwater level dropped by 1.8m in Kangeyam Taluk. Monthly GST compliance fell 6.4% in dyeing clusters.",
        "description_ta": "காங்கேயம் தாலுகாவில் நிலத்தடி நீர்மட்டம் 1.8 மீ குறைந்துள்ளது. சாயப்பட்டறை பகுதிகளில் ஜிஎஸ்டி வருவாய் 6.4% குறைந்துள்ளது.",
        "severity": "CRITICAL",
        "domain": "economy_water",
        "action_recommended_en": "Authorize emergency canal water release from Amaravathi & initiate tax assessment audit.",
        "action_recommended_ta": "அமராவதி அணையிலிருந்து அவசர கால்வாய் நீர் திறப்பு மற்றும் வரி தணிக்கையைத் தொடங்கவும்."
    },
    {
        "id": "alert-002",
        "district_code": "MDU",
        "district_name_en": "Madurai",
        "district_name_ta": "மதுரை",
        "title_en": "GRH Madurai Anti-D Globulin Stockout Alert",
        "title_ta": "மதுரை அரசு மருத்துவமனையில் மருந்து இருப்பு பற்றாக்குறை",
        "description_en": "Government Rajaji Hospital reports essential obstetric emergency drugs below 15% safety stock limit.",
        "description_ta": "மதுரை அரசு ராஜாஜி மருத்துவமனையில் அத்தியாவசிய மகப்பேறு அவசர மருந்துகள் 15% க்கும் கீழ் குறைந்துள்ளது.",
        "severity": "CRITICAL",
        "domain": "health",
        "action_recommended_en": "Trigger TNMSC central drug depot immediate priority dispatch.",
        "action_recommended_ta": "TNMSC மத்திய கிடங்கிலிருந்து உடனடியாக மருந்து விநியோகத்தை மேற்கொள்ள உத்தரவிடவும்."
    },
    {
        "id": "alert-003",
        "district_code": "CUD",
        "district_name_en": "Cuddalore",
        "district_name_ta": "கடலூர்",
        "title_en": "Coastal Heavy Rainfall Warning",
        "title_ta": "கடலோர கனமழை முன்னெச்சரிக்கை",
        "description_en": "IMD models indicate 140mm rainfall in Chidambaram & Kurinjipadi blocks over next 18 hours.",
        "description_ta": "சிதம்பரம் மற்றும் குறிஞ்சிப்பாடி பகுதிகளில் அடுத்த 18 மணி நேரத்தில் 140 மிமீ வரை கனமழை பெய்ய வாய்ப்புள்ளது.",
        "severity": "WARNING",
        "domain": "disaster",
        "action_recommended_en": "Pre-position 4 SDRF rescue boats and open 12 relief shelters.",
        "action_recommended_ta": "4 மீட்பு படகுகளை தயார் நிலையில் வைக்கவும், 12 நிவாரண முகாம்களை திறக்கவும்."
    }
]
