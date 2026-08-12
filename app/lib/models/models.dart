class Lawyer {
  final String id;
  final String name;
  final String title;
  final String barNumber;
  final String lawFirm;
  final String practiceArea;
  final String state;
  final double rating;
  final int reviewsCount;
  final int experienceYears;
  final int consultationFee;
  final int casesTaken;
  final int casesCompleted;
  final String entityType; // 'LAW_FIRM' | 'SOLO_PRACTITIONER'
  final bool showAssociateRoster;
  final List<Map<String, String>> associateRoster;
  final Map<String, String> socialLinks;
  final bool isVerified;
  final bool isEmergencyOnCall;
  final String bio;

  const Lawyer({
    required this.id,
    required this.name,
    required this.title,
    required this.barNumber,
    required this.lawFirm,
    required this.practiceArea,
    required this.state,
    required this.rating,
    required this.reviewsCount,
    required this.experienceYears,
    required this.consultationFee,
    this.casesTaken = 148,
    this.casesCompleted = 142,
    this.entityType = 'LAW_FIRM',
    this.showAssociateRoster = true,
    this.associateRoster = const [
      {'name': 'Barrister Tunde Bakare', 'title': 'Senior Associate', 'barNumber': 'SCN/099128'},
      {'name': 'Barrister Ngozi Eze', 'title': 'Junior Associate Counsel', 'barNumber': 'SCN/114920'}
    ],
    this.socialLinks = const {
      'linkedin': 'https://linkedin.com',
      'twitter': 'https://x.com',
      'website': 'https://firm.ng'
    },
    this.isVerified = true,
    this.isEmergencyOnCall = true,
    required this.bio,
  });
}

class Appointment {
  final String id;
  final String lawyerName;
  final String lawyerTitle;
  final String channel;
  final String date;
  final String time;
  final int fee;
  final String status;

  const Appointment({
    required this.id,
    required this.lawyerName,
    required this.lawyerTitle,
    required this.channel,
    required this.date,
    required this.time,
    required this.fee,
    required this.status,
  });
}

class CaseItem {
  final String id;
  final String title;
  final String category;
  final String leadCounsel;
  final String status;
  final int progressPercent;
  final List<String> milestones;

  const CaseItem({
    required this.id,
    required this.title,
    required this.category,
    required this.leadCounsel,
    required this.status,
    required this.progressPercent,
    required this.milestones,
  });
}

class VaultDoc {
  final String id;
  final String title;
  final String category;
  final String date;
  final String size;

  const VaultDoc({
    required this.id,
    required this.title,
    required this.category,
    required this.date,
    required this.size,
  });
}

final List<Lawyer> mockLawyersList = [
  const Lawyer(
    id: 'lawyer-1',
    name: 'Barrister Nnamdi Bello (SAN)',
    title: 'Senior Advocate of Nigeria',
    barNumber: 'SCN/048291',
    lawFirm: 'Bello & Associates SAN',
    practiceArea: 'Constitutional Rights & Criminal Defense',
    state: 'Abuja, FCT',
    rating: 4.95,
    reviewsCount: 142,
    experienceYears: 24,
    consultationFee: 75000,
    isVerified: true,
    isEmergencyOnCall: true,
    bio: 'Lead SAN partner specializing in fundamental rights enforcement, Supreme Court appellate litigation, and high-stakes criminal defense.',
  ),
  const Lawyer(
    id: 'lawyer-2',
    name: 'Barrister Emeka Okafor',
    title: 'Partner, Corporate Law',
    barNumber: 'SCN/109283',
    lawFirm: 'Okafor & Legal Partners',
    practiceArea: 'Corporate & Business Law',
    state: 'Lagos, NG',
    rating: 4.88,
    reviewsCount: 98,
    experienceYears: 12,
    consultationFee: 45000,
    isVerified: true,
    isEmergencyOnCall: false,
    bio: 'Expert commercial attorney handling CAC business incorporation, venture capital contracts, shareholder agreements, and tax advisory.',
  ),
  const Lawyer(
    id: 'lawyer-3',
    name: 'Barrister Folake Adebayo',
    title: 'Principal Counsel',
    barNumber: 'SCN/077291',
    lawFirm: 'Adebayo Chambers LLP',
    practiceArea: 'Property & Real Estate Law',
    state: 'Ikeja, Lagos',
    rating: 4.90,
    reviewsCount: 115,
    experienceYears: 15,
    consultationFee: 35000,
    isVerified: true,
    isEmergencyOnCall: true,
    bio: 'Property specialist handling Land Use Act C of O acquisitions, tenancy disputes, Governor consent perfection, and deed drafting.',
  ),
];
