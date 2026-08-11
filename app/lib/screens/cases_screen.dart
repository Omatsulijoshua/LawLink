import 'package:flutter/material.dart';
import '../models/models.dart';
import '../theme.dart';

class CasesScreen extends StatelessWidget {
  const CasesScreen({super.key});

  final List<CaseItem> mockCases = const [
    CaseItem(
      id: 'CASE-9021',
      title: 'Commercial Land Title Dispute',
      category: 'Property & Land Law',
      leadCounsel: 'Barrister Nnamdi Bello (SAN)',
      status: 'IN_PROGRESS',
      progressPercent: 70,
      milestones: [
        'AI Intake Submitted',
        'Counsel SAN Assigned',
        'Lands Registry Search Completed',
        'High Court Filings Drafted',
      ],
    ),
    CaseItem(
      id: 'CASE-9022',
      title: 'CAC Share Capital Restructuring',
      category: 'Corporate & Commercial',
      leadCounsel: 'Barrister Emeka Okafor',
      status: 'LAWYER_MATCHED',
      progressPercent: 40,
      milestones: [
        'AI Intake Submitted',
        'Counsel Matched',
        'Board Resolution Drafted',
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Legal Cases')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: mockCases.length,
        itemBuilder: (context, index) {
          final c = mockCases[index];
          return Card(
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      Text(c.id, style: const TextStyle(color: LawLinkTheme.amberGold, fontWeight: FontWeight.bold, fontSize: 12)),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: LawLinkTheme.royalBlue.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(c.status, style: const TextStyle(color: LawLinkTheme.royalBlue, fontSize: 10, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(c.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  Text('${c.category} • Lead Counsel: ${c.leadCounsel}', style: const TextStyle(fontSize: 11, color: Colors.grey)),
                  const SizedBox(height: 12),

                  // Progress Bar
                  LinearProgressIndicator(
                    value: c.progressPercent / 100,
                    backgroundColor: LawLinkTheme.midnightSlate,
                    color: LawLinkTheme.emeraldGreen,
                    minHeight: 6,
                  ),
                  const SizedBox(height: 6),
                  Text('${c.progressPercent}% Milestone Progress', style: const TextStyle(fontSize: 10, color: LawLinkTheme.emeraldGreen, fontWeight: FontWeight.bold)),

                  const SizedBox(height: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: c.milestones.map((m) => Padding(
                      padding: const EdgeInsets.symmetric(vertical: 2),
                      child: Row(
                        children: [
                          const Icon(Icons.check_circle_outline, size: 12, color: LawLinkTheme.emeraldGreen),
                          const SizedBox(width: 6),
                          Text(m, style: const TextStyle(fontSize: 11, color: Colors.white70)),
                        ],
                      ),
                    )).toList(),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
