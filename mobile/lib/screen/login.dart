import 'package:flutter/material.dart';
import './component/input.dart';
import 'component/servicebutton.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MyLogin extends StatefulWidget {
  const MyLogin({Key? key}) : super(key: key);

  @override
  _MyLoginState createState() => _MyLoginState();
}

class _MyLoginState extends State<MyLogin> {
  final email = TextEditingController();
  final password = TextEditingController();
  Color emailborder = Colors.blue;
  Color passwordborder = Colors.blue;

  @override
  Widget build(BuildContext context) {
    email.addListener(() {
      final regexEmail = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
      setState(() {
        if (email.text.isEmpty || !regexEmail.hasMatch(email.text)) {
          emailborder = Colors.red;
        } else {
          emailborder = Colors.blue;
        }
      });
    });
    password.addListener(() {
      setState(() {
        if (password.text.isEmpty) {
          passwordborder = Colors.red;
        } else {
          passwordborder = Colors.blue;
        }
      });
    });

    void LoginAuth() async {
      if (emailborder == Colors.red || passwordborder == Colors.red) {
        return;
      }

      var url = Uri.parse('https://are4-51.com:8080/api/auth/login');
      var response = await http.post(url,
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(<String, String>{
            'email': email.text,
            'password': password.text,
          }));

      final Map<String, dynamic> responseBody = json.decode(response.body);

      if (response.statusCode == 201) {
        Navigator.pushNamed(context, 'home',
            arguments: responseBody['access_token'] as String);
      } else {
        var error = responseBody['message'];
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(error),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 2),
          ),
        );
      }
    }

    return Scaffold(
        backgroundColor: Colors.white,
        body: Stack(
          children: [
            Container(
                padding: const EdgeInsets.only(
                  top: 130,
                ),
                child: const Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Hello Again !',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(
                      height: 10,
                    ),
                  ],
                )),
            SingleChildScrollView(
              child: Container(
                padding: EdgeInsets.only(
                    top: MediaQuery.of(context).size.height * 0.3,
                    right: 35,
                    left: 35),
                child: Column(
                  children: [
                    CustomTextField(
                      controller: email,
                      hintText: 'Email',
                      color: emailborder,
                      hide: false,
                      errorText: "A valid email is required",
                    ),
                    const SizedBox(
                      height: 30,
                    ),
                    CustomTextField(
                      controller: password,
                      hintText: 'Password',
                      color: passwordborder,
                      hide: true,
                      errorText: "Password is required",
                    ),
                    const SizedBox(
                      height: 40,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        FloatingActionButton.extended(
                          onPressed: () {
                            LoginAuth();
                          },
                          label: const Text('Submit'),
                          backgroundColor: Colors.black,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Expanded(
                          child: Divider(color: Colors.black),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 8.0),
                          child: Text(
                            'OR',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 18,
                            ),
                          ),
                        ),
                        Expanded(
                          child: Divider(color: Colors.black),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ServiceButton(
                          onPressed: () async {
                            final token =
                                await Navigator.pushNamed(context, 'Webview');
                            (token != null)
                                ? print("token : ${token}")
                                : print('null');
                            Navigator.pushNamed(context, 'home',
                                arguments: token);
                          },
                          path: 'google.png',
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Not have account?',
                          style: TextStyle(
                            color: Colors.grey,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        TextButton(
                          onPressed: () {
                            Navigator.pushNamed(context, 'register');
                          },
                          child: const Text(
                            'Sign Up here',
                            style: TextStyle(
                              color: Colors.blue,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              decoration: TextDecoration.underline,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ));
  }
}
