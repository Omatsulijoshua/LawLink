import 'package:flutter/material.dart';
import '../models/models.dart';
import '../theme.dart';

class ReviewScreen extends StatefulWidget {
  final Lawyer lawyer;

  const ReviewScreen({super.key, required this.lawyer});

  @override
  State<ReviewScreen> createState() => _ReviewScreenState();
}

class _ReviewScreenState extends State<ReviewScreen> {
  int _userRating = 5;
  final _commentController = TextEditingController();

  final List<Map<String, dynamic>> _publicReviews = [
    {
      'author': 'Chief O. Adeleke',
      'role': 'Verified Land Purchaser',
      'rating': 5,
      'date': 'Yesterday',
      'comment': 'Barrister Bello handled our Land Use Act Title perfection seamlessly. Highly authoritative counsel.'
    },
    {
      'author': 'Dr. K. Nwachukwu',
      'role': 'Corporate Tech Founder',
      'rating': 5,
      'date': '3 days ago',
      'comment': 'Exceptional speed on CAC shareholders agreement review. Prevented potential equity disputes.'
    },
    {
      'author': 'Mrs. A. Danjuma',
      'role': 'Verified Retainer Client',
      'rating': 4,
      'date': '1 week ago',
      'comment': 'Very knowledgeable advocate with clear strategic communication throughout our court hearing.'
    },
  ];

  void _submitReview() {
    if (_commentController.text.trim().isEmpty) return;

    setState(() {
      _publicReviews.insert(0, {
        'author': 'You (Verified Client)',
        'role': 'Verified Consultation Client',
        'rating': _userRating,
        'date': 'Just now',
        'comment': _commentController.text.trim(),
      });
      _commentController.clear();
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Verified Public Review submitted successfully!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Public Ratings — ${widget.lawyer.name}')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Rating Summary Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: LawLinkTheme.cardNavy,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: LawLinkTheme.borderGray),
              ),
              child: Row(
                children: [
                  Column(
                    children: [
                      Text('${widget.lawyer.rating}', style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: LawLinkTheme.amberGold)),
                      Row(
                        children: List.generate(5, (i) => Icon(Icons.star, size: 14, color: i < widget.lawyer.rating.floor() ? LawLinkTheme.amberGold : Colors.grey)),
                      ),
                      const SizedBox(height: 4),
                      Text('${widget.lawyer.reviewsCount} Total Reviews', style: const TextStyle(fontSize: 10, color: Colors.grey)),
                    ],
                  ),
                  const SizedBox(width: 20),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('100% Verified Client Feedback', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
                        SizedBox(height: 4),
                        Text('Public ratings are audited by LawLink Moderation Desk to ensure zero spam or defamation.', style: TextStyle(fontSize: 10, color: Colors.white70)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Submit Review Section
            const Text('Write a Public Client Review', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 10),

            Row(
              children: List.generate(5, (index) {
                final starVal = index + 1;
                return IconButton(
                  icon: Icon(
                    Icons.star,
                    size: 28,
                    color: starVal <= _userRating ? LawLinkTheme.amberGold : Colors.grey,
                  ),
                  onPressed: () => setState(() => _userRating = starVal),
                );
              }),
            ),

            TextField(
              controller: _commentController,
              maxLines: 3,
              decoration: const InputDecoration(
                hintText: 'Share details of your consultation experience...',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 10),

            ElevatedButton.icon(
              onPressed: _submitReview,
              icon: const Icon(Icons.send, size: 16),
              label: const Text('Post Verified Public Review'),
              style: ElevatedButton.styleFrom(
                backgroundColor: LawLinkTheme.royalBlue,
                minimumSize: const Size.fromHeight(42),
              ),
            ),

            const SizedBox(height: 24),
            const Text('Verified Client Testimonials', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 12),

            ..._publicReviews.map((r) => Card(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.between,
                      children: [
                        Text(r['author'], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                        Text(r['date'], style: const TextStyle(fontSize: 10, color: Colors.grey)),
                      ],
                    ),
                    Row(
                      children: [
                        Text(r['role'], style: const TextStyle(fontSize: 10, color: LawLinkTheme.amberGold)),
                        const SizedBox(width: 8),
                        Row(
                          children: List.generate(r['rating'], (_) => const Icon(Icons.star, size: 10, color: LawLinkTheme.amberGold)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(r['comment'], style: const TextStyle(fontSize: 12, color: Colors.white70)),
                  ],
                ),
              ),
            )),
          ],
        ),
      ),
    );
  }
}
