import 'package:flutter/material.dart';
import './component/input.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MyRegister extends StatefulWidget {
  const MyRegister({Key? key}) : super(key: key);

  @override
  _MyRegisterState createState() => _MyRegisterState();
}

class _MyRegisterState extends State<MyRegister> {
  final firstName = TextEditingController();
  final lastName = TextEditingController();
  final email = TextEditingController();
  final password = TextEditingController();
  Color firstNameborder = Colors.blue;
  Color lastNameborder = Colors.blue;
  Color emailborder = Colors.blue;
  Color passwordborder = Colors.blue;

  @override
  Widget build(BuildContext context) {
    firstName.addListener(() {
      setState(() {
        if (firstName.text.isEmpty) {
          firstNameborder = Colors.red;
        } else {
          firstNameborder = Colors.blue;
        }
      });
    });

    lastName.addListener(() {
      setState(() {
        if (lastName.text.isEmpty) {
          lastNameborder = Colors.red;
        } else {
          lastNameborder = Colors.blue;
        }
      });
    });

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

    void RegisterAuth() async {
      if (emailborder == Colors.red ||
          passwordborder == Colors.red ||
          firstNameborder == Colors.red ||
          lastNameborder == Colors.red) {
        return;
      }
      var url = Uri.parse('https://are4-51.com:8080/api/auth/register');
      var response = await http.post(url,
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(<String, String>{
            'name': firstName.text,
            'surname': lastName.text,
            'email': email.text,
            'password': password.text,
          }));
      if (response.statusCode == 201) {
        Navigator.pushNamed(context, "login");
      } else {
        var error = json.decode(response.body)['message'];
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
                  top: 60,
                ),
                child: const Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Sign Up',
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
                    top: MediaQuery.of(context).size.height * 0.2,
                    right: 35,
                    left: 35),
                child: Column(
                  children: [
                    const SizedBox(
                      height: 10,
                    ),
                    CustomTextField(
                      controller: firstName,
                      hintText: 'FirstName',
                      color: firstNameborder,
                      hide: false,
                      errorText: "Please enter your first name",
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    CustomTextField(
                      controller: lastName,
                      hintText: 'LastName',
                      color: lastNameborder,
                      hide: false,
                      errorText: "Please enter your last name",
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    CustomTextField(
                      controller: email,
                      hintText: 'Email',
                      color: emailborder,
                      hide: false,
                      errorText: "a valid Email is required",
                    ),
                    const SizedBox(
                      height: 20,
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
                            RegisterAuth();
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
                    // Row(
                    //   mainAxisAlignment: MainAxisAlignment.center,
                    //   children: [
                    //     ServiceButton(
                    //       onPressed: () {},
                    //       path: 'google.png',
                    //     ),
                    //     const SizedBox(
                    //       width: 20,
                    //     ),
                    //     ServiceButton(
                    //       onPressed: () {},
                    //       path: 'facebook.png',
                    //     ),
                    //   ],
                    // ),
                    // const SizedBox(
                    //   height: 20,
                    // ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Already have an account?',
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
                            Navigator.pushNamed(context, "login");
                          },
                          child: const Text(
                            'Sign In',
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
