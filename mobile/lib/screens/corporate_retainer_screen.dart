import 'package:flutter/material.dart';
import '../theme.dart';

class CorporateRetainerScreen extends StatelessWidget {
  const CorporateRetainerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Corporate Legal Retainers')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('On-Demand Legal Counsel for Your Business', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
            const Text('Unlimited legal advisory, CAC compliance, contract drafting, and dedicated Senior Advocate counsel.', style: TextStyle(fontSize: 11, color: Colors.grey)),
            const SizedBox(height: 20),

            _buildPlanCard(
              title: 'Startup Growth Retainer',
              price: '₦150,000 / mo',
              desc: 'CAC annual filings, 2 monthly contract reviews, dedicated junior associate counsel.',
              features: ['CAC Annual Returns Assistance', '2 Commercial Contract Reviews', '24-hr Advice Response'],
              isPopular: false,
              context: context,
            ),
            const SizedBox(height: 12),

            _buildPlanCard(
              title: 'Corporate Business Retainer',
              price: '₦350,000 / mo',
              desc: '5 monthly contracts, trademark & IP filing, tax advisory, senior counsel lead.',
              features: ['Everything in Startup Plan', '5 Contract Reviews / Month', 'Trademark & IP Filing', 'Priority 4-hr Response'],
              isPopular: true,
              context: context,
            ),
            const SizedBox(height: 12),

            _buildPlanCard(
              title: 'Enterprise SAN Retainer',
              price: '₦850,000 / mo',
              desc: 'Unlimited contract reviews, Senior Advocate of Nigeria lead counsel, 24/7 station hotline.',
              features: ['Unlimited Contract & Deal Reviews', 'Senior Advocate of Nigeria (SAN) Advisory', '24/7 Police / Station Hotline', 'High Court Litigation Defense'],
              isPopular: false,
              context: context,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlanCard({
    required String title,
    required String price,
    required String desc,
    required List<String> features,
    required bool isPopular,
    required BuildContext context,
  }) {
    return Card(
      color: isPopular ? LawLinkTheme.royalBlue.withOpacity(0.15) : LawLinkTheme.cardNavy,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(color: isPopular ? LawLinkTheme.royalBlue : LawLinkTheme.borderGray, width: isPopular ? 2 : 1),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (isPopular)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: LawLinkTheme.royalBlue, borderRadius: BorderRadius.circular(8)),
                child: const Text('MOST POPULAR', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.white)),
              ),
            const SizedBox(height: 6),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            Text(price, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: LawLinkTheme.amberGold)),
            const SizedBox(height: 6),
            Text(desc, style: const TextStyle(fontSize: 11, color: Colors.white70)),
            const SizedBox(height: 12),

            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: features.map((f) => Padding(
                padding: const EdgeInsets.symmetric(vertical: 2),
                child: Row(
                  children: [
                    const Icon(Icons.check_circle, size: 14, color: LawLinkTheme.emeraldGreen),
                    const SizedBox(width: 6),
                    Text(f, style: const TextStyle(fontSize: 11, color: Colors.white)),
                  ],
                ),
              )).toList(),
            ),
            const SizedBox(height: 16),

            ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Subscribed to $title successfully!')),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: isPopular ? LawLinkTheme.royalBlue : Colors.white12,
                minimumSize: const Size.fromHeight(42),
              ),
              child: const Text('Subscribe Retainer', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }
}
