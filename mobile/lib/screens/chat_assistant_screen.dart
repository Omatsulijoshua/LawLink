import 'package:flutter/material.dart';
import '../theme.dart';

class ChatAssistantScreen extends StatefulWidget {
  const ChatAssistantScreen({super.key});

  @override
  State<ChatAssistantScreen> createState() => _ChatAssistantScreenState();
}

class _ChatAssistantScreenState extends State<ChatAssistantScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Map<String, String>> _messages = [
    {
      'role': 'assistant',
      'text': 'Hello! I am LawLink AI, your legal assistant. How can I help you under Nigerian Law today? You can ask about land rights, CAC business registration, police bail, or tenancy law.'
    }
  ];
  bool _isGenerating = false;

  void _sendMessage(String text) {
    if (text.trim().isEmpty) return;

    setState(() {
      _messages.add({'role': 'user', 'text': text});
      _isGenerating = true;
    });
    _controller.clear();

    Future.delayed(const Duration(milliseconds: 1200), () {
      setState(() {
        _messages.add({
          'role': 'assistant',
          'text': 'Under Section 35 of the 1999 Constitution of the Federal Republic of Nigeria (as amended), every citizen holds the fundamental right to personal liberty. No person shall be deprived of such liberty except in accordance with a procedure prescribed by law.\n\n**In conclusion:** If detained, you are entitled to remain silent until consulting legal counsel, and bail is officially free.'
        });
        _isGenerating = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('LawLink AI Assistant'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              setState(() {
                _messages.clear();
                _messages.add({
                  'role': 'assistant',
                  'text': 'Chat history cleared. How can LawLink AI assist you today?'
                });
              });
            },
          )
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isUser = msg['role'] == 'user';
                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  containerMargin: const EdgeInsets.only(bottom: 12),
                  child: Container(
                    padding: const EdgeInsets.all(14),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
                    decoration: BoxDecoration(
                      color: isUser ? LawLinkTheme.royalBlue : LawLinkTheme.cardNavy,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: isUser ? LawLinkTheme.royalBlue : LawLinkTheme.borderGray),
                    ),
                    child: Text(
                      msg['text']!,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        height: 1.4,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          if (_isGenerating)
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: LawLinkTheme.amberGold)),
                  SizedBox(width: 8),
                  Text('LawLink AI is analyzing Nigerian Legal Statutes...', style: TextStyle(fontSize: 11, color: LawLinkTheme.amberGold)),
                ],
              ),
            ),
          Container(
            padding: const EdgeInsets.all(12),
            color: LawLinkTheme.cardNavy,
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    style: const TextStyle(fontSize: 13, color: Colors.white),
                    decoration: const InputDecoration(
                      hintText: 'Ask a legal question...',
                      hintStyle: TextStyle(color: Colors.grey, fontSize: 12),
                      border: InputBorder.none,
                    ),
                    onSubmitted: _sendMessage,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send, color: LawLinkTheme.amberGold),
                  onPressed: () => _sendMessage(_controller.text),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
