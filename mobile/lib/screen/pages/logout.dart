import 'package:flutter/material.dart';

class MyLogout extends StatefulWidget {
  const MyLogout({Key? key}) : super(key: key);

  @override
  _MyLogoutState createState() => _MyLogoutState();
}

class _MyLogoutState extends State<MyLogout> {
  @override
  Widget build(BuildContext context) {
    return Center(
        child: ElevatedButton(
      onPressed: () {
        showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: const Text('Logout'),
                content: const Text('Are you sure to logout ?'),
                actions: [
                  TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('Cancel')),
                  TextButton(
                      onPressed: () {
                        Navigator.pushNamed(context, "login");
                      },
                      child: const Text('Yes'))
                ],
              );
            });
      },
      child: const Text('Logout'),
    ));
  }
}
