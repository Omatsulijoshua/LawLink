import 'package:flutter/material.dart';
import 'theme.dart';

void main() {
  runApp(const LawLinkApp());
}

class LawLinkApp extends StatelessWidget {
  const LawLinkApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LawLink AI',
      debugShowCheckedModeBanner: false,
      theme: LawLinkTheme.darkTheme,
      home: const MainNavigationHub(),
    );
  }
}

class MainNavigationHub extends StatefulWidget {
  const MainNavigationHub({super.key});

  @override
  State<MainNavigationHub> createState() => _MainNavigationHubState();
}

class _MainNavigationHubState extends State<MainNavigationHub> {
  int _currentIndex = 0;

  final List<Widget> _pages = const [
    HomeScreen(),
    DirectoryScreen(),
    WorkspaceScreen(),
    DocGeneratorScreen(),
    VaultScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        backgroundColor: LawLinkTheme.cardNavy,
        selectedItemColor: LawLinkTheme.amberGold,
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_filled), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.gavel), label: 'Lawyers'),
          BottomNavigationBarItem(icon: Icon(Icons.forum), label: 'Workspace'),
          BottomNavigationBarItem(icon: Icon(Icons.description), label: 'Draft AI'),
          BottomNavigationBarItem(icon: Icon(Icons.lock), label: 'Vault'),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: LawLinkTheme.royalBlue,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.balance, size: 20, color: Colors.white),
            ),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('LAWLINK AI', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                Text('The right lawyer. Right when you need one.', style: TextStyle(fontSize: 9, color: LawLinkTheme.amberGold)),
              ],
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Quick Action Cards
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [LawLinkTheme.cardNavy, Color(0xFF1E293B)],
                ),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: LawLinkTheme.borderGray),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('AI Legal Assistant', style: TextStyle(color: LawLinkTheme.amberGold, fontSize: 12, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 6),
                  const Text('Describe your legal case or question...', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  ElevatedButton.icon(
                    onPressed: () {
                      Navigator.push(context, MaterialPageRoute(builder: (_) => const IntakeWizardScreen()));
                    },
                    icon: const Icon(Icons.auto_awesome, size: 18),
                    label: const Text('Start AI Intake Wizard'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: LawLinkTheme.royalBlue,
                      minimumSize: const Size.fromHeight(42),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Emergency Banner
            InkWell(
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const EmergencyScreen()));
              },
              child: Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.red.withOpacity(0.15),
                  border: Border.all(color: Colors.red.withOpacity(0.4)),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.warning_amber_rounded, color: Colors.redAccent, size: 28),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('🚨 GET EMERGENCY LEGAL HELP NOW', style: TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold, fontSize: 13)),
                          Text('Police arrest, unlawful eviction, asset seizure, or court emergency.', style: TextStyle(color: Colors.white70, fontSize: 11)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class IntakeWizardScreen extends StatelessWidget {
  const IntakeWizardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('4-Step Legal Intake Wizard')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const Text('Step 1 of 4: Select Legal Category', style: TextStyle(fontWeight: FontWeight.bold, color: LawLinkTheme.amberGold)),
            const SizedBox(height: 16),
            Expanded(
              child: ListView(
                children: [
                  _buildCategoryTile('🏡 Property & Land Law', 'Tenancy, Land Disputes, Title Search'),
                  _buildCategoryTile('💼 Corporate & Commercial', 'CAC Compliance, Contracts, Mergers'),
                  _buildCategoryTile('⚖️ Criminal Defense Law', 'Police Arrest, Bail, High Court Trial'),
                  _buildCategoryTile('👨‍👩‍👧 Family & Matrimonial', 'Divorce, Custody, Child Maintenance'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryTile(String title, String desc) {
    return Card(
      child: ListTile(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
        subtitle: Text(desc, style: const TextStyle(fontSize: 11, color: Colors.grey)),
        trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: LawLinkTheme.amberGold),
      ),
    );
  }
}

class DirectoryScreen extends StatelessWidget {
  const DirectoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Verified Nigerian Lawyers')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildLawyerCard('Barrister Nnamdi Bello (SAN)', 'SCN/048291', 'Constitutional & Criminal Defense', 'Abuja, FCT', 75000),
          _buildLawyerCard('Barrister Emeka Okafor', 'SCN/109283', 'Corporate & Business Law', 'Lagos, NG', 45000),
          _buildLawyerCard('Barrister Folake Adebayo', 'SCN/077291', 'Property & Land Law', 'Ikeja, Lagos', 35000),
        ],
      ),
    );
  }

  Widget _buildLawyerCard(String name, String barNo, String area, String loc, int fee) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(child: Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14))),
                const Icon(Icons.verified, color: LawLinkTheme.emeraldGreen, size: 16),
              ],
            ),
            Text('Bar No: $barNo • $loc', style: const TextStyle(fontSize: 11, color: LawLinkTheme.amberGold)),
            const SizedBox(height: 4),
            Text(area, style: const TextStyle(fontSize: 12, color: Colors.white70)),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('₦${fee.toString()} / hr', style: const TextStyle(fontWeight: FontWeight.bold, color: LawLinkTheme.emeraldGreen)),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(backgroundColor: LawLinkTheme.royalBlue),
                  child: const Text('Book Consultation', style: TextStyle(fontSize: 11)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class WorkspaceScreen extends StatelessWidget {
  const WorkspaceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Attorney-Client Workspace')),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.lock, size: 48, color: LawLinkTheme.amberGold),
            SizedBox(height: 12),
            Text('AES-256 Attorney-Client Encrypted Workspace', style: TextStyle(fontWeight: FontWeight.bold)),
            Text('Live Chat • Audio Call • Video Call Active', style: TextStyle(fontSize: 11, color: Colors.grey)),
          ],
        ),
      ),
    );
  }
}

class DocGeneratorScreen extends StatelessWidget {
  const DocGeneratorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AI Legal Instrument Generator')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          ListTile(title: Text('🏡 Residential Tenancy Agreement'), subtitle: Text('Lagos State Tenancy Law Compliant')),
          ListTile(title: Text('💼 Mutual Non-Disclosure Agreement (NDA)'), subtitle: Text('Corporate Business Protection')),
          ListTile(title: Text('📜 General Power of Attorney'), subtitle: Text('Legal Agent Authorization')),
          ListTile(title: Text('📝 Statutory Affidavit of Loss / Age'), subtitle: Text('High Court Oath Office Format')),
        ],
      ),
    );
  }
}

class VaultScreen extends StatelessWidget {
  const VaultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Encrypted Document Vault')),
      body: const Center(child: Text('AES-256 TLS 1.3 Encrypted Vault Active')),
    );
  }
}

class EmergencyScreen extends StatelessWidget {
  const EmergencyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('🚨 Emergency Network')),
      body: const Center(child: Text('Connecting to On-Call Barrister...')),
    );
  }
}
