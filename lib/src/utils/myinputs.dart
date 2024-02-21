import 'package:flutter/material.dart';

class MyTextInputField extends StatelessWidget {
  const MyTextInputField(
      {required this.screen, required this.label, super.key});
  final String label;
  final Size screen;
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      decoration: InputDecoration(
          label: Text(label),
          labelStyle: const TextStyle(
            color: Color.fromRGBO(181, 182, 185, 1),
          ),
          focusedBorder: OutlineInputBorder(
              borderSide: const BorderSide(
                color: Color.fromRGBO(80, 0, 244, 1),
                width: 2.0,
              ),
              borderRadius: BorderRadius.circular(screen.height * 0.020)),
          border: OutlineInputBorder(
              borderSide: const BorderSide(),
              borderRadius: BorderRadius.circular(screen.height * 0.020))),
    );
  }
}
