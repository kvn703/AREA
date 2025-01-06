import 'package:flutter/material.dart';
import './screen/login.dart';
import './screen/register.dart';
import 'screen/navigation.dart';
import 'screen/pages/webview.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    initialRoute: 'login',
    routes: {
      'Webview': (context) => const WebViewPage(),
      'register': (context) => const MyRegister(),
      'login': (context) => const MyLogin(),
      'home': (context) => const HomePage(),
    },
  ));
}
