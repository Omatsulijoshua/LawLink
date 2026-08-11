import 'package:flutter/material.dart';
import '../models/models.dart';
import '../theme.dart';
import 'checkout_screen.dart';

class BookingScreen extends StatefulWidget {
  final Lawyer lawyer;

  const BookingScreen({super.key, required this.lawyer});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  String _serviceType = 'Legal Advisory (60 Mins)';
  String _channel = 'Video Call';
  String _selectedDate = 'Today, 11:30 AM';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Book Session — ${widget.lawyer.name}')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Lawyer Header Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Row(
                  children: [
                    const CircleAvatar(
                      backgroundColor: LawLinkTheme.royalBlue,
                      child: Icon(Icons.person, color: Colors.white),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(widget.lawyer.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                          Text('${widget.lawyer.title} • ${widget.lawyer.state}', style: const TextStyle(fontSize: 11, color: LawLinkTheme.amberGold)),
                          Text('Bar No: ${widget.lawyer.barNumber}', style: const TextStyle(fontSize: 10, color: Colors.grey)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),

            const Text('Step 1: Select Consultation Service', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 8),
            _buildRadioTile('Legal Advisory (60 Mins)', '₦${widget.lawyer.consultationFee.toString()} NGN'),
            _buildRadioTile('Contract Review & Opinion', '₦${(widget.lawyer.consultationFee * 1.5).round().toString()} NGN'),
            _buildRadioTile('Court Representation Strategy', '₦${(widget.lawyer.consultationFee * 2).round().toString()} NGN'),
            const SizedBox(height: 20),

            const Text('Step 2: Preferred Communication Channel', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 8),
            Row(
              children: [
                ChoiceChip(
                  label: const Text('Video Call'),
                  selected: _channel == 'Video Call',
                  onSelected: (v) => setState(() => _channel = 'Video Call'),
                ),
                const SizedBox(width: 8),
                ChoiceChip(
                  label: const Text('Phone Call'),
                  selected: _channel == 'Phone Call',
                  onSelected: (v) => setState(() => _channel = 'Phone Call'),
                ),
                const SizedBox(width: 8),
                ChoiceChip(
                  label: const Text('Live Chat'),
                  selected: _channel == 'Live Chat',
                  onSelected: (v) => setState(() => _channel = 'Live Chat'),
                ),
              ],
            ),
            const SizedBox(height: 24),

            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => CheckoutScreen(lawyer: widget.lawyer, amount: widget.lawyer.consultationFee),
                  ),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: LawLinkTheme.royalBlue,
                minimumSize: const Size.fromHeight(48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              child: const Text('Proceed to Escrow Checkout', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRadioTile(String title, String fee) {
    return Card(
      child: RadioListTile(
        title: Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
        subtitle: Text(fee, style: const TextStyle(fontSize: 11, color: LawLinkTheme.emeraldGreen, fontWeight: FontWeight.bold)),
        value: title,
        groupValue: _serviceType,
        onChanged: (val) => setState(() => _serviceType = val.toString()),
        activeColor: LawLinkTheme.amberGold,
      ),
    );
  }
}
