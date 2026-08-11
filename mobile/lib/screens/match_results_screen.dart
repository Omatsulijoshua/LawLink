import 'package:flutter/material.dart';
import '../models/models.dart';
import '../theme.dart';

class MatchResultsScreen extends StatelessWidget {
  final String category;
  final String state;
  final String urgency;

  const MatchResultsScreen({
    super.key,
    required this.category,
    required this.state,
    required this.urgency,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Lawyer Matches'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: LawLinkTheme.royalBlue.withOpacity(0.15),
                border: Border.all(color: LawLinkTheme.royalBlue.withOpacity(0.4)),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('AI Intake Summary', style: TextStyle(color: LawLinkTheme.amberGold, fontSize: 11, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  Text('$category • $state • $urgency', style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
            const SizedBox(height: 20),

            const Text('Top Matched Advocates', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 12),

            _buildMatchCard(
              lawyer: mockLawyersList[0],
              matchPercent: 96,
              badges: ['Specialization 30%', 'Location 20%', 'SAN Seniority 15%'],
              context: context,
            ),
            _buildMatchCard(
              lawyer: mockLawyersList[2],
              matchPercent: 92,
              badges: ['Property Expert', 'Lagos Jurisdiction', 'Emergency Available'],
              context: context,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMatchCard({
    required Lawyer lawyer,
    required int matchPercent,
    required List<String> badges,
    required BuildContext context,
  }) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                Expanded(
                  child: Text(lawyer.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: LawLinkTheme.emeraldGreen.withOpacity(0.2),
                    border: Border.all(color: LawLinkTheme.emeraldGreen),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text('$matchPercent% Match', style: const TextStyle(color: LawLinkTheme.emeraldGreen, fontWeight: FontWeight.bold, fontSize: 12)),
                ),
              ],
            ),
            Text('${lawyer.title} • ${lawyer.state}', style: const TextStyle(color: LawLinkTheme.amberGold, fontSize: 11)),
            const SizedBox(height: 8),

            Wrap(
              spacing: 6,
              runSpacing: 4,
              children: badges.map((b) => Chip(
                label: Text(b, style: const TextStyle(fontSize: 10, color: Colors.white)),
                backgroundColor: LawLinkTheme.midnightSlate,
                padding: EdgeInsets.zero,
                visualDensity: VisualDensity.compact,
              )).toList(),
            ),
            const SizedBox(height: 12),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('₦${lawyer.consultationFee.toString()} / hr', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: LawLinkTheme.emeraldGreen)),
                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Booking session with ${lawyer.name}')),
                    );
                  },
                  style: ElevatedButton.styleFrom(backgroundColor: LawLinkTheme.royalBlue),
                  child: const Text('Book Match', style: TextStyle(fontSize: 11)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
