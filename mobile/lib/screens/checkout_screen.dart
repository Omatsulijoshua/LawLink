import 'package:flutter/material.dart';
import '../models/models.dart';
import '../theme.dart';

class CheckoutScreen extends StatefulWidget {
  final Lawyer lawyer;
  final int amount;

  const CheckoutScreen({
    super.key,
    required this.lawyer,
    required this.amount,
  });

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  String _paymentProvider = 'Paystack';
  String _paymentMethod = 'Debit Card';

  @override
  Widget build(BuildContext context) {
    final vat = (widget.amount * 0.075).round();
    final techFee = 2500;
    final total = widget.amount + vat + techFee;

    return Scaffold(
      appBar: AppBar(title: const Text('Paystack / Escrow Checkout')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Escrow Banner
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: LawLinkTheme.emeraldGreen.withOpacity(0.15),
                border: Border.all(color: LawLinkTheme.emeraldGreen.withOpacity(0.4)),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Row(
                children: [
                  Icon(Icons.shield_outlined, color: LawLinkTheme.emeraldGreen, size: 28),
                  SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('LawLink Escrow Protection Active', style: TextStyle(color: LawLinkTheme.emeraldGreen, fontWeight: FontWeight.bold, fontSize: 13)),
                        Text('Funds locked safely until consultation completion.', style: TextStyle(color: Colors.white70, fontSize: 11)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Order Breakdown Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Tax Invoice & Receipt Itemization', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    const Divider(color: LawLinkTheme.borderGray),
                    _buildRow('Counsel Fee (${widget.lawyer.name})', '₦${widget.amount.toString()}'),
                    _buildRow('7.5% Federal VAT', '₦${vat.toString()}'),
                    _buildRow('LawLink Platform Tech Fee', '₦${techFee.toString()}'),
                    const Divider(color: LawLinkTheme.borderGray),
                    _buildRow('Total Amount Payable', '₦${total.toString()} NGN', isBold: true),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),

            const Text('Payment Gateway Provider', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 8),
            Row(
              children: [
                ChoiceChip(
                  label: const Text('Paystack NGN'),
                  selected: _paymentProvider == 'Paystack',
                  onSelected: (v) => setState(() => _paymentProvider = 'Paystack'),
                ),
                const SizedBox(width: 10),
                ChoiceChip(
                  label: const Text('Flutterwave NGN'),
                  selected: _paymentProvider == 'Flutterwave',
                  onSelected: (v) => setState(() => _paymentProvider = 'Flutterwave'),
                ),
              ],
            ),
            const SizedBox(height: 24),

            ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Payment of ₦$total successful via $_paymentProvider Escrow!')),
                );
                Navigator.pop(context);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: LawLinkTheme.emeraldGreen,
                minimumSize: const Size.fromHeight(48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              child: Text('Pay ₦$total NGN via $_paymentProvider', style: const TextStyle(fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRow(String title, String val, {bool isBold = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.between,
        children: [
          Text(title, style: TextStyle(fontSize: 12, color: isBold ? Colors.white : Colors.grey)),
          Text(val, style: TextStyle(fontSize: 12, fontWeight: isBold ? FontWeight.bold : FontWeight.normal, color: isBold ? LawLinkTheme.emeraldGreen : Colors.white)),
        ],
      ),
    );
  }
}
