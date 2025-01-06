import 'package:flutter/material.dart';
import 'package:mobile/screen/component/dialoglogout.dart';
import 'package:mobile/screen/component/webviewconnect.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/screen/component/serviceslist.dart';

class myHome extends StatefulWidget {
  final String token;
  const myHome({Key? key, required this.token}) : super(key: key);

  @override
  _myHomeState createState() => _myHomeState();
}

class Area {
  final int id;
  final String title;
  final Action actions;
  final Reaction reactions;
  final bool active;

  Area({
    required this.id,
    required this.title,
    required this.actions,
    required this.reactions,
    this.active = false,
  });
}

class Action {
  final String serviceName;
  final String actionName;
  final Image image;

  Action({
    required this.serviceName,
    required this.actionName,
    required this.image,
  });
}

class Reaction {
  final String serviceName;
  final String reactionName;
  final Image image;

  Reaction({
    required this.serviceName,
    required this.reactionName,
    required this.image,
  });
}

class _myHomeState extends State<myHome> {
  List<Area> areasList = [];
  var connected_services = [];
  List<Services> filterServices = services;

  void deleteArea(int id) async {
    var url = "https://are4-51.com:8080/api/areas/delete?areaId=$id";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    var response = await http.delete(Uri.parse(url), headers: headers);

    if (response.statusCode == 200) {
      setState(() {
        areasList.removeWhere((element) => element.id == id);
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Area deleted successfully'),
          backgroundColor: Colors.green,
          duration: Duration(seconds: 1),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Error deleting area'),
          backgroundColor: Colors.red,
          duration: Duration(seconds: 1),
        ),
      );
    }
  }

  void showDeleteConfirmationDialog(BuildContext context, int id) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Delete Area'),
          content: Text('Are you sure you want to delete this area $id ?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                deleteArea(id);
                Navigator.pop(context);
              },
              child: const Text('Yes'),
            ),
          ],
        );
      },
    );
  }

  void fetchAreas() async {
    var url = "https://are4-51.com:8080/api/areas/get";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    var response = await http.get(Uri.parse(url), headers: headers);

    if (response.statusCode == 200) {
      if (response.body == "No areas") {
        areasList = [];
        return;
      }
      var areasJson = json.decode(response.body);
      print(areasJson);
      areasList = areasJson
          .map<Area>((json) => Area(
                id: json['areaId'],
                title: json['areaName'],
                actions: Action(
                  serviceName: services
                      .firstWhere((element) => element.id == json['actionId'])
                      .serviceName,
                  actionName: json['actionName'],
                  image: services
                      .firstWhere((element) => element.id == json['actionId'])
                      .image,
                ),
                reactions: Reaction(
                  serviceName: services
                      .firstWhere((element) => element.id == json['reactionId'])
                      .serviceName,
                  reactionName: json['reactionName'],
                  image: services
                      .firstWhere((element) => element.id == json['reactionId'])
                      .image,
                ),
                active: true,
              ))
          .toList();
      setState(() {
        areasList = areasList;
      });
    } else {
      print("error");
    }
  }

  void fetchconnectedservices() async {
    var url = "https://are4-51.com:8080/api/user/services/get";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    var response = await http.get(Uri.parse(url), headers: headers);

    if (response.statusCode == 200) {
      if (response.body == "No user services") {
        connected_services = [];
        return;
      }
      final user = jsonDecode(response.body);
      setState(() {
        connected_services = user;
      });
    } else {
      print("FETCH connected services error");
    }
  }

  @override
  void initState() {
    super.initState();
    fetchconnectedservices();
    fetchAreas();
  }

  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(254, 254, 241, 1),
      appBar: AppBar(
        title: const Text('Home'),
        backgroundColor: const Color.fromRGBO(30, 41, 133, 1),
        actions: [
          IconButton(
              onPressed: () {
                showLogoutConfirmationDialog(context);
              },
              icon: const Icon(Icons.logout))
        ],
      ),
      drawer: SideBar(),
      body: Container(
        padding: const EdgeInsets.only(left: 15, top: 20, right: 15),
        child: ListView(
          children: [
            const Center(
              child: Text(
                "My Areas",
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 30),
            if (areasList.isEmpty)
              const Center(
                child: Text(
                  "No areas created",
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ...areasList.map((area) => areaCard(area)).toList()
          ],
        ),
      ),
    );
  }

  Widget SideBar() {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
              color: Color.fromRGBO(30, 41, 133, 1),
            ),
            child: TextField(
              decoration: InputDecoration(
                prefixIcon: const Icon(
                  Icons.search,
                  color: Colors.white,
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: const BorderSide(
                    color: Colors.white,
                    width: 3,
                  ),
                ),
                fillColor: Colors.white,
                labelText: 'Search a service',
                labelStyle: const TextStyle(color: Colors.white),
                hintStyle: const TextStyle(
                  color: Colors.white,
                ),
              ),
              style: const TextStyle(
                color: Colors.white,
              ),
              onChanged: (value) => {
                setState(() {
                  filterServices = services
                      .where((element) => element.serviceName
                          .toLowerCase()
                          .contains(value.toLowerCase()))
                      .toList();
                })
              },
            ),
          ),
          ...filterServices
              .where((element) => element.auth == true)
              .map((service) => servicecard(service))
              .toList(),
        ],
      ),
    );
  }

  Widget servicecard(Services service) {
    return Center(
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
          side: const BorderSide(
            color: Color.fromRGBO(30, 41, 133, 1),
            width: 1,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            ListTile(
              leading: service.image,
              title: Text(
                service.serviceName.toUpperCase(),
                style: const TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            ButtonBar(
              children: <Widget>[
                ElevatedButton(
                  onPressed: () {
                    if (connected_services.contains(service.serviceName) && service.serviceName == "google") {
                      return;
                    }
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => WebViewConnect(
                                  apiUrl: service.url,
                                  urlCallBack: service.callbackUrl,
                                  token: widget.token,
                                )));
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor:
                        (connected_services.contains(service.serviceName))
                            ? Colors.green
                            : const Color.fromRGBO(30, 41, 133, 1),
                  ),
                  child: (connected_services.contains(service.serviceName))
                      ? const Text('Connected')
                      : const Text('Connect'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget areaCard(Area area) {
    return Center(
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
          side: const BorderSide(
            color: Color.fromRGBO(30, 41, 133, 1),
            width: 1,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                area.title,
                style: const TextStyle(
                  fontSize: 24.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            ListTile(
              leading: area.actions.image,
              title: Text(
                area.actions.serviceName.toUpperCase(),
                style: const TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(area.actions.actionName.toUpperCase()),
            ),
            ListTile(
              leading: area.reactions.image,
              title: Text(
                area.reactions.serviceName.toUpperCase(),
                style: const TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(area.reactions.reactionName.toUpperCase()),
            ),
            ButtonBar(
              children: <Widget>[
                Switch(
                  activeColor: Colors.black,
                  value: area.active,
                  onChanged: (value) {},
                ),
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () {},
                ),
                IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () {
                    showDeleteConfirmationDialog(context, area.id);
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
