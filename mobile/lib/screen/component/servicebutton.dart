import 'package:flutter/material.dart';

class ServiceButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String path;

  const ServiceButton({
    super.key,
    required this.onPressed,
    required this.path,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => onPressed(),
      child: Image(
        image: AssetImage("assets/images/$path"),
        width: 50,
        height: 50,
      ),
    );
  }
}
