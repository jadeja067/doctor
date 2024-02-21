import 'package:flutter/material.dart';
import 'package:df/src/utils/myinputs.dart';

class SignUp extends StatelessWidget {
  const SignUp({required this.screen, super.key});
  final Size screen;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Expanded(
          flex: 1,
          child: SingleChildScrollView(
            child: Container(
              padding: EdgeInsets.all(screen.width * 0.02),
              child: Column(
                children: [
                  Header(screen: screen),
                  SignUpForm(screen: screen),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class SignUpForm extends StatefulWidget {
  const SignUpForm({required this.screen, super.key});
  final Size screen;
  @override
  State<SignUpForm> createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final _signUpKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    final Size screen = widget.screen;
    return Form(
      key: _signUpKey,
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: screen.width * 0.02),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(
              height: screen.height * 0.02,
              width: screen.width,
            ),
            SizedBox(
              width: screen.height * 0.14,
              height: screen.height * 0.14,
              child: IconButton(
                onPressed: null,
                icon: const Icon(
                    Icons.person), //Image.asset('assets/profile.png'),
                style: ButtonStyle(
                    backgroundColor: const MaterialStatePropertyAll(
                        Color.fromRGBO(237, 237, 237, 1)),
                    iconColor: const MaterialStatePropertyAll(
                        Color.fromRGBO(80, 0, 244, 1)),
                    shape: MaterialStatePropertyAll(RoundedRectangleBorder(
                        borderRadius:
                            BorderRadius.circular(screen.height * 0.03))),
                    iconSize:
                        const MaterialStatePropertyAll(double.minPositive),
                    padding: const MaterialStatePropertyAll(EdgeInsets.zero)),
              ),
            ),
            SizedBox(
              height: screen.height * 0.05,
              width: screen.width,
            ),
            Row(
              children: [
                Expanded(
                    child:
                        MyTextInputField(screen: screen, label: "First Name*")),
                SizedBox(
                  width: screen.width * 0.05,
                ),
                Expanded(
                    child:
                        MyTextInputField(screen: screen, label: "Last Name*"))
              ],
            ),
            SizedBox(
              height: screen.height * 0.05,
              width: screen.width,
            ),
            MyTextInputField(screen: screen, label: "Email Address*"),
            SizedBox(
              height: screen.height * 0.05,
              width: screen.width,
            ),
            MyTextInputField(
                screen: screen, label: "WhatsApp Bussiness Number"),
            SizedBox(
              height: screen.height * 0.05,
              width: screen.width,
            ),
            SizedBox(height: screen.height * 0.05),
            Text(
              "Note :",
              style: TextStyle(
                  color: const Color.fromRGBO(144, 144, 144, 1),
                  fontSize: screen.height * 0.02,
                  fontWeight: FontWeight.w500),
            ),
            Wrap(
              // mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  "You'll get updates on ",
                  style: TextStyle(
                    fontFamily: "Poppins",
                    color: const Color.fromRGBO(177, 177, 177, 1),
                    fontSize: screen.height * 0.02,
                  ),
                ),
                Text(
                  "WhatsApp",
                  style: TextStyle(
                    fontFamily: "Poppins",
                    color: const Color.fromRGBO(0, 207, 55, 1),
                    fontSize: screen.height * 0.02,
                  ),
                ),
                Text(
                  "to not a single thing.",
                  style: TextStyle(
                    fontFamily: "Poppins",
                    color: const Color.fromRGBO(177, 177, 177, 1),
                    fontSize: screen.height * 0.02,
                  ),
                ),
              ],
            ),
            SizedBox(
              height: screen.height * 0.02,
            ),
            TextButton(
              onPressed: null,
              style: const ButtonStyle(
                  padding: MaterialStatePropertyAll(EdgeInsets.zero)),
              child: Container(
                width: double.infinity,
                alignment: Alignment.center,
                padding: EdgeInsets.symmetric(vertical: screen.height * 0.020),
                decoration: BoxDecoration(
                    color: const Color.fromRGBO(80, 0, 244, 1),
                    borderRadius: BorderRadius.circular(10.0)),
                child: const Text(
                  "Finish",
                  style: TextStyle(
                      color: Colors.white,
                      fontFamily: "Poppins",
                      fontWeight: FontWeight.w700),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Header extends StatelessWidget {
  const Header({required this.screen, super.key});
  final Size screen;

  @override
  Widget build(BuildContext context) {
    return Container(
        width: double.maxFinite,
        padding: const EdgeInsets.all(10.0),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(
            "Let's build",
            style: TextStyle(
                fontFamily: "Poppins-Bold", fontSize: screen.height * 0.037),
          ),
          Text(
            "your profile first",
            style: TextStyle(
                fontFamily: "Poppins-Bold", fontSize: screen.height * 0.037),
          ),
        ]));
  }
}
