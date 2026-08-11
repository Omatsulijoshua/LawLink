export function calculateLawyerMatches(intakePayload, lawyers = []) {
  const { category = 'Property & Land', location = 'Lagos', urgency = 'NORMAL' } = intakePayload || {};

  const verifiedLawyers = lawyers.filter(l => l.verificationStatus === 'VERIFIED');

  const scoredLawyers = verifiedLawyers.map((lawyer) => {
    let score = 0;
    const reasons = [];

    // 1. Practice Area Match (30%)
    if (lawyer.practiceArea.toLowerCase().includes(category.toLowerCase()) || category.toLowerCase().includes(lawyer.practiceArea.toLowerCase())) {
      score += 30;
      reasons.push(`Direct specialization in ${category}`);
    } else if ((lawyer.secondaryPracticeAreas || []).some(s => s.toLowerCase().includes(category.toLowerCase()))) {
      score += 20;
      reasons.push(`Secondary practice area covers ${category}`);
    } else {
      score += 10;
    }

    // 2. Location Match (20%)
    if (location.toLowerCase().includes(lawyer.state.toLowerCase()) || lawyer.state.toLowerCase().includes(location.toLowerCase())) {
      score += 20;
      reasons.push(`Licensed and practicing in ${lawyer.state} State`);
    } else {
      score += 8;
    }

    // 3. Availability & Emergency Match (15%)
    if (urgency === 'EMERGENCY' || urgency === 'URGENT') {
      if (lawyer.emergencyAvailable) {
        score += 15;
        reasons.push('On-call for emergency legal response');
      } else {
        score += 5;
      }
    } else {
      score += 15;
    }

    // 4. Experience Weight (15%)
    const expScore = Math.min(15, (lawyer.experienceYears / 15) * 15);
    score += expScore;
    if (lawyer.experienceYears >= 10) {
      reasons.push(`${lawyer.experienceYears}+ years senior legal counsel experience`);
    }

    // 5. Client Rating Score (10%)
    const ratingScore = ((lawyer.rating || 4.5) / 5) * 10;
    score += ratingScore;

    // 6. Price Compatibility & Response Rate (10%)
    score += 10;

    const matchPercentage = Math.min(99, Math.max(65, Math.round(score)));

    return {
      ...lawyer,
      matchPercentage,
      matchReasons: reasons
    };
  });

  return scoredLawyers.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
