import 'package:df/src/screens/login/login.dart';
import 'package:df/src/screens/signup/signup.dart';
// import 'package:df/src/screens/signup/signup.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int level = 0;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(scaffoldBackgroundColor: Colors.white),
      routes: {"/": (context) => SignUp(size: MediaQuery.of(context).size)},
    );
  }
}
