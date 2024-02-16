import 'package:flutter/material.dart';

class SignUp extends StatelessWidget {
  const SignUp({required this.size, super.key});
  final Size size;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Expanded(
            flex: 1,
            child: Column(
              children: [
                Header(size: size),
                SignUpForm(size: size),
                Footer(size: size),
              ],
            )),
      ),
    );
  }
}

// Header
class Header extends StatelessWidget {
  const Header({required this.size, super.key});
  final Size size;

  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(
        "Let's build",
        style: TextStyle(
            fontFamily: "Poppins-Bold", fontSize: size.height * 0.037),
      ),
      Text(
        "your profile first",
        style: TextStyle(
            fontFamily: "Poppins-Bold", fontSize: size.height * 0.037),
      ),
    ]));
  }
}

// Body/ Form
class SignUpForm extends StatefulWidget {
  const SignUpForm({required this.size, super.key});
  final Size size;

  @override
  State<SignUpForm> createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final _formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Expanded(
        flex: 4,
        child: Form(
          key: _formKey,
          child: const Column(children: [
            Text(
              "Let's build",
              style: TextStyle(fontFamily: "Poppins-Bold"),
            ),
          ]),
        ));
  }
}

// Footer
class Footer extends StatelessWidget {
  const Footer({required this.size, super.key});
  final Size size;

  @override
  Widget build(BuildContext context) {
    return const Expanded(
        child: Column(children: [
      Text(
        "Let's build",
        style: TextStyle(fontFamily: "Poppins-Bold"),
      )
    ]));
  }
}
