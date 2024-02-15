import 'package:flutter/material.dart';


class Login extends StatelessWidget {
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        // color: Colors.white,
        children: [
          Expanded(
          flex: 1,
          child: Container(
            padding: const EdgeInsets.all(20),
            // color: Colors.amber,
            child: const Center(
              child:  Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children:  [
                    Text("We'll manage", style: TextStyle(
                      fontFamily: "Poppins-Light",
                      fontSize: 35,
                      // fontWeight: FontWeight.w100
                    ),),
                    Row(
                      children: [
                      Text("your", style: TextStyle(
                      fontFamily: "Poppins-Light",
                      fontSize: 35,

                    ),),
                      SizedBox(width: 10),
                      Text("Appointment", style: TextStyle(
                      fontFamily: "poppins",
                      fontSize: 35,
                      color: Color.fromRGBO(88, 44, 245, 1),
                      fontWeight: FontWeight.bold,

                    ),),
                      ],
                    ),
                    Text("seamlessly.", style: TextStyle(
                        fontFamily: "Poppins-Light",
                        fontSize: 35,

                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
        Expanded(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 30),
          color: Colors.black26,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
            TextFormField(
              autocorrect: true,
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderSide: const BorderSide(), 
                  borderRadius: BorderRadius.circular(20.0)
                )
              ),
            )
          ]),
        ))
        ]
      ),
    );
  }
}