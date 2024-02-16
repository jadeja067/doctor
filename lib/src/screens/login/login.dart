import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Login extends StatelessWidget {
  const Login({required this.size, super.key});
  final Size size;
  @override
  Widget build(BuildContext context) {
    final keyboard = MediaQuery.of(context).viewInsets.bottom;
    return Scaffold(
      body: Column(
          // color: Colors.white,
          children: [
            TopSection(size: size, keyboard: keyboard),
            Form(size: size, keyboard: keyboard)
          ]),
    );
  }
}

class Form extends StatelessWidget {
  const Form({super.key, required this.size, required this.keyboard});
  final Size size;
  final double keyboard;
  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: Container(
      padding: EdgeInsets.symmetric(
          horizontal: size.width * 0.060,
          vertical: keyboard == 0.0 ? size.height * 0.040 : 0),
      child: Column(
        mainAxisAlignment:
            keyboard == 0.0 ? MainAxisAlignment.end : MainAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                "Login",
                style: TextStyle(
                  fontSize: size.height * 0.035,
                  fontFamily: "Poppins-Bold",
                ),
              ),
              Text(
                " or ",
                style: TextStyle(
                  fontSize: size.height * 0.035,
                  fontFamily: "Poppins",
                  color: const Color.fromRGBO(140, 139, 144, 1),
                  fontWeight: FontWeight.w400,
                ),
              ),
              Text(
                "SignUp",
                style: TextStyle(
                  fontSize: size.height * 0.035,
                  fontFamily: "Poppins-Bold",
                ),
              ),
            ],
          ),
          SizedBox(
            height: size.height * 0.025,
          ),
          TextField(
            autocorrect: true,
            keyboardType: TextInputType.emailAddress,
            style: TextStyle(fontSize: size.height * 0.022),
            decoration: InputDecoration(
                fillColor: Colors.white,
                filled: true,
                hintText: "Email Address",
                hintStyle: const TextStyle(
                    color: Color.fromRGBO(124, 123, 128, 1),
                    fontWeight: FontWeight.w400),
                contentPadding: const EdgeInsets.symmetric(
                    vertical: 12.0, horizontal: 20.0),
                prefixIcon: Icon(
                  Icons.email_outlined,
                  size: size.height * 0.030,
                  color: const Color.fromRGBO(180, 180, 183, 1),
                ),
                // enabled: true,
                focusedBorder: OutlineInputBorder(
                  borderSide: const BorderSide(
                    color: Colors.black,
                    width: 2.0,
                  ),
                  borderRadius: BorderRadius.circular(10.0),
                ),
                border: OutlineInputBorder(
                  borderSide: const BorderSide(),
                  borderRadius: BorderRadius.circular(10.0),
                )),
          ),
          SizedBox(
            height: size.height * 0.025,
          ),
          Row(
            children: [
              Text(
                "By continuing i agree to ",
                style: TextStyle(
                    fontFamily: "poppins",
                    fontSize: size.height * 0.016,
                    color: const Color.fromRGBO(140, 139, 144, 1)),
              ),
              Text(
                "Terms & Conditions",
                style: TextStyle(
                    fontFamily: "poppins",
                    fontSize: size.height * 0.016,
                    fontWeight: FontWeight.w700),
              ),
            ],
          ),
          SizedBox(
            height: size.height * 0.010,
          ),
          CupertinoButton(
            onPressed: null,
            padding: EdgeInsets.zero,
            child: Container(
              width: double.infinity,
              alignment: Alignment.center,
              padding: EdgeInsets.symmetric(vertical: size.height * 0.020),
              decoration: BoxDecoration(
                  color: const Color.fromRGBO(80, 0, 244, 1),
                  borderRadius: BorderRadius.circular(10.0)),
              child: const Text(
                "Login",
                style: TextStyle(color: Colors.white),
              ),
            ),
          ),
        ],
      ),
    ));
  }
}

class TopSection extends StatelessWidget {
  const TopSection({super.key, required this.size, required this.keyboard});
  final Size size;
  final double keyboard;
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.only(left: size.width * 0.060),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: keyboard == 0.0
              ? MainAxisAlignment.end
              : MainAxisAlignment.center,
          children: [
            Text(
              "We'll manage",
              style: TextStyle(
                fontFamily: "Poppins-Light",
                fontSize: size.height * 0.038,
                // fontWeight: FontWeight.w100
              ),
            ),
            Row(
              children: [
                Text(
                  "your",
                  style: TextStyle(
                    fontFamily: "Poppins-Light",
                    fontSize: size.height * 0.038,
                  ),
                ),
                const SizedBox(width: 10),
                Text(
                  "Appointment",
                  style: TextStyle(
                    fontFamily: "poppins",
                    fontSize: size.height * 0.038,
                    color: const Color.fromRGBO(88, 44, 245, 1),
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ],
            ),
            Text(
              "seamlessly.",
              style: TextStyle(
                fontFamily: "Poppins-Light",
                fontSize: size.height * 0.038,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
