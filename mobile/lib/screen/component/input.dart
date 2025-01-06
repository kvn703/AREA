import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final Color color;
  final bool hide;
  final String errorText;

  const CustomTextField({
    super.key,
    required this.controller,
    required this.hintText,
    required this.color,
    required this.hide,
    required this.errorText,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: hide,
      decoration: InputDecoration(
        fillColor: Colors.white,
        filled: true,
        hintText: hintText,
        errorText: color == Colors.red ? errorText : null,
      ),
    );
  }
}
