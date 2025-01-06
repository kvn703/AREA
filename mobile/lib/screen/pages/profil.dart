import 'package:flutter/material.dart';
import 'package:mobile/screen/component/dialoglogout.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/screen/component/serviceslist.dart';

class MyProfil extends StatefulWidget {
  final String token;
  const MyProfil({Key? key, required this.token}) : super(key: key);

  @override
  _MyProfilState createState() => _MyProfilState();
}

class UserProfile {
  final String lastName;
  final String firstName;
  final String email;
  final String password;

  UserProfile({
    required this.lastName,
    required this.firstName,
    required this.email,
    required this.password,
  });
}

class _MyProfilState extends State<MyProfil> {
  var connectedSercices = [];
  List<Services> connected_services = [];

  Future<UserProfile> fetchUser(String token) async {
    var url = "https://are4-51.com:8080/api/auth/profile";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    var response = await http.get(Uri.parse(url), headers: headers);
    if (response.statusCode == 200) {
      final user = jsonDecode(response.body);
      return UserProfile(
        lastName: user['name'],
        firstName: user['surname'],
        email: user['email'],
        password: "********",
      );
    } else {
      throw Exception('Failed to load user');
    }
  }

  void fetchUserServices(String token) async {
    var url = "https://are4-51.com:8080/api/user/services/get";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    var response = await http.get(Uri.parse(url), headers: headers);
    if (response.statusCode == 200) {
      if (response.body == "No user services") {
        connected_services = [];
        return;
      }
      final user = jsonDecode(response.body);
      connectedSercices = user;
      for (var i = 0; i < connectedSercices.length; i++) {
        for (var j = 0; j < services.length; j++) {
          if (connectedSercices[i].toUpperCase() ==
              services[j].serviceName.toUpperCase()) {
            connected_services.add(services[j]);
          }
        }
      }
      setState(() {
        connected_services = connected_services;
      });
    } else {
      throw Exception('Failed to load user');
    }
  }

  final lastName = TextEditingController();
  final firstName = TextEditingController();
  final email = TextEditingController();
  final password = TextEditingController();
  UserProfile user = UserProfile(
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  );
  bool _isHidden = true;
  @override
  void initState() {
    super.initState();
    fetchUser(widget.token).then((value) {
      setState(() {
        user = value;
      });
    });
    fetchUserServices(widget.token);
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil'),
        automaticallyImplyLeading: false,
        backgroundColor: const Color.fromRGBO(30, 41, 133, 1),
        actions: [
          IconButton(
              onPressed: () {
                showLogoutConfirmationDialog(context);
              },
              icon: const Icon(Icons.logout))
        ],
      ),
      backgroundColor: const Color.fromRGBO(254, 254, 241, 1),
      body: Container(
        padding: const EdgeInsets.only(left: 15, top: 20, right: 15),
        child: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: SingleChildScrollView(
            child: Card(
              elevation: 6,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
                side: const BorderSide(
                  color: Color.fromRGBO(30, 41, 133, 1),
                  width: 1,
                ),
              ),
              color: Colors.grey[200],
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    Center(
                      child: Stack(
                        children: [
                          CircleAvatar(
                            backgroundColor: Colors.white,
                            radius: 60,
                            child: Text(
                              (user.firstName.isNotEmpty)
                                  ? user.lastName[0].toUpperCase()
                                  : "?",
                              style: const TextStyle(
                                color: Colors.black,
                                fontSize: 40,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          )
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),
                    buildTextField("Lastname", user.lastName, lastName, false),
                    buildTextField(
                        "Firstname", user.firstName, firstName, false),
                    buildTextField("Email", user.email, email, false),
                    const SizedBox(height: 5),
                    ...connected_services
                        .map((e) => buildServiceConnected(e))
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget buildTextField(String label, String placeholder,
      TextEditingController controller, bool isPassword) {
    return Padding(
        padding: const EdgeInsets.only(bottom: 20),
        child: TextField(
          controller: controller,
          obscureText: isPassword ? _isHidden : false,
          decoration: InputDecoration(
            fillColor: Colors.white,
            filled: true,
            hintText: placeholder,
            hintStyle: const TextStyle(
              color: Colors.black,
              fontSize: 18,
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
              borderSide: const BorderSide(
                color: Color.fromRGBO(30, 41, 133, 1),
                width: 5,
              ),
            ),
          ),
          enabled: false,
        ));
  }

  Widget buildServiceConnected(Services servicesarray) {
    return Card(
      elevation: 2,
      margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
      child: ListTile(
        tileColor: Colors.white,
        leading: Container(
          width: 50,
          height: 50,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            image: DecorationImage(
              image: servicesarray.image.image,
              fit: BoxFit.cover,
            ),
          ),
        ),
        title: const Text(
          "You're connected to",
          style: TextStyle(
            fontSize: 18.0,
          ),
        ),
        subtitle: Text(
          servicesarray.serviceName.toUpperCase(),
          style: const TextStyle(
            fontSize: 14.0,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
