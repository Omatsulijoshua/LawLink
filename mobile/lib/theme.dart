import 'package:flutter/material.dart';

class LawLinkTheme {
  static const Color midnightSlate = Color(0xFF0B0F19);
  static const Color cardNavy = Color(0xFF111827);
  static const Color royalBlue = Color(0xFF2563EB);
  static const Color electricBlue = Color(0xFF3B82F6);
  static const Color legalGold = Color(0xFFD97706);
  static const Color amberGold = Color(0xFFF59E0B);
  static const Color emeraldGreen = Color(0xFF059669);
  static const Color borderGray = Color(0xFF1F2937);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: midnightSlate,
      primaryColor: royalBlue,
      colorScheme: const ColorScheme.dark(
        primary: royalBlue,
        secondary: legalGold,
        surface: cardNavy,
        background: midnightSlate,
      ),
      cardTheme: const CardTheme(
        color: cardNavy,
        elevation: 4,
        margin: EdgeInsets.all(8),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: cardNavy,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: Colors.white,
          fontSize: 18,
          fontWeight: FontWeight.bold,
          fontFamily: 'serif',
        ),
      ),
    );
  }
}
