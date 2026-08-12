import 'package:flutter/material.dart';
import '../theme.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  final _barNoController = TextEditingController();

  String _selectedRole = 'CLIENT';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign In / Register'),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: LawLinkTheme.amberGold,
          tabs: const [
            Tab(text: 'Sign In'),
            Tab(text: 'Create Account'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildSignInTab(),
          _buildSignUpTab(),
        ],
      ),
    );
  }

  Widget _buildSignInTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Welcome Back to LawLink', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
          const Text('Sign in to access your consultations, vault, and active cases.', style: TextStyle(fontSize: 12, color: Colors.grey)),
          const SizedBox(height: 24),

          TextField(
            controller: _emailController,
            decoration: const InputDecoration(
              labelText: 'Email Address',
              prefixIcon: Icon(Icons.email_outlined, size: 20),
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _passwordController,
            obscureText: true,
            decoration: const InputDecoration(
              labelText: 'Password',
              prefixIcon: Icon(Icons.lock_outline, size: 20),
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 24),

          ElevatedButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Authenticated successfully!')),
              );
              Navigator.pop(context);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: LawLinkTheme.royalBlue,
              minimumSize: const Size.fromHeight(48),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: const Text('Sign In to Account', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _buildSignUpTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              ChoiceChip(
                label: const Text('Client'),
                selected: _selectedRole == 'CLIENT',
                onSelected: (val) => setState(() => _selectedRole = 'CLIENT'),
              ),
              ChoiceChip(
                label: const Text('Solo Counsel'),
                selected: _selectedRole == 'LAWYER',
                onSelected: (val) => setState(() => _selectedRole = 'LAWYER'),
              ),
              ChoiceChip(
                label: const Text('Law Firm Business'),
                selected: _selectedRole == 'LAW_FIRM_ADMIN',
                onSelected: (val) => setState(() => _selectedRole = 'LAW_FIRM_ADMIN'),
              ),
            ],
          ),
          const SizedBox(height: 20),

          TextField(
            controller: _nameController,
            decoration: InputDecoration(
              labelText: _selectedRole == 'LAW_FIRM_ADMIN' ? 'Law Firm Business Name' : 'Full Legal Name',
              hintText: _selectedRole == 'LAW_FIRM_ADMIN' ? 'e.g. Bello & Partners LLP' : 'e.g. Barrister Emeka Okafor',
              border: const OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _emailController,
            decoration: InputDecoration(
              labelText: _selectedRole == 'LAW_FIRM_ADMIN' ? 'Corporate Firm Email' : 'Email Address',
              border: const OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _passwordController,
            obscureText: true,
            decoration: const InputDecoration(labelText: 'Create Password', border: OutlineInputBorder()),
          ),
          const SizedBox(height: 12),

          if (_selectedRole == 'LAW_FIRM_ADMIN') ...[
            TextField(
              decoration: const InputDecoration(
                labelText: 'CAC Business Registration RC No.',
                hintText: 'e.g. RC-1049281 or BN-918234',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
          ],

          if (_selectedRole == 'LAWYER' || _selectedRole == 'LAW_FIRM_ADMIN') ...[
            TextField(
              controller: _barNoController,
              decoration: InputDecoration(
                labelText: _selectedRole == 'LAW_FIRM_ADMIN' ? 'Managing Partner Call to Bar SCN No.' : 'Supreme Court Call to Bar No. (SCN)',
                hintText: 'e.g. SCN/048291',
                border: const OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
          ],

          ElevatedButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Registered as ${_selectedRole == "LAW_FIRM_ADMIN" ? "Law Firm Business" : _selectedRole} successfully! Verification pending.')),
              );
              Navigator.pop(context);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: _selectedRole == 'LAW_FIRM_ADMIN' ? LawLinkTheme.amberGold : LawLinkTheme.emeraldGreen,
              minimumSize: const Size.fromHeight(48),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: Text(
              _selectedRole == 'LAW_FIRM_ADMIN' ? 'Register Law Firm Business' : 'Register Account',
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }
}
