import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/screen/component/webviewconnect.dart';
import 'package:mobile/screen/component/serviceslist.dart';

class MyAreas extends StatefulWidget {
  final String token;
  const MyAreas({Key? key, required this.token}) : super(key: key);

  @override
  _MyAreasState createState() => _MyAreasState();
}

class SOCIAL_SERVICES {
  final int id;
  final String serviceName;
  final Image image;

  SOCIAL_SERVICES({
    required this.id,
    required this.serviceName,
    required this.image,
  });
}

class Field {
  final String key;
  final String field;
  TextEditingController controller = TextEditingController();

  Field({
    required this.key,
    required this.controller,
    required this.field,
  });

  void setControllerValue(String newValue) {
    controller.text = newValue;
  }

  String getControllerValue() {
    return controller.text;
  }
}

class ACTION {
  final int id;
  final String description;
  final List<Field> fields;

  ACTION({
    required this.id,
    required this.description,
    required this.fields,
  });
}

class REACTION {
  final int id;
  final String description;
  final List<Field> fields;

  REACTION({
    required this.id,
    required this.description,
    required this.fields,
  });
}

class _MyAreasState extends State<MyAreas> {
  List<SOCIAL_SERVICES> scocialService = [];
  List<ACTION> action = [];
  List<Field> args_action = [];
  List<REACTION> reaction = [];
  List<Field> args_reaction = [];
  String? selectedService1;
  String? selectedAction;
  String? selectedService2;
  String? selectedReaction;
  TextEditingController areaTitleController = TextEditingController();

  Future<List<SOCIAL_SERVICES>> fetchServices(String token) {
    var url = "https://are4-51.com:8080/api/services/get";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    return http.get(Uri.parse(url), headers: headers).then((response) {
      if (response.statusCode == 200) {
        final services = jsonDecode(response.body);
        return services.map<SOCIAL_SERVICES>((service) {
          return SOCIAL_SERVICES(
            id: service['id'],
            serviceName: service['name'].toUpperCase(),
            image: Image.network(
              service['logo_url'],
              height: 30,
              width: 30,
            ),
          );
        }).toList();
      } else {
        throw Exception('Failed to load services');
      }
    });
  }

  Future<List<ACTION>> fetchAction(String token, int serviceId) {
    List<Field> tmp = [];
    var url = "https://are4-51.com:8080/api/actions/get?serviceId=$serviceId";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    return http.get(Uri.parse(url), headers: headers).then((response) {
      if (response.statusCode == 200) {
        if (response.body == "No actions") {
          return [];
        }
        final actions = jsonDecode(response.body);
        return actions.map<ACTION>((action) {
          final args = jsonDecode(action['args_action']);
          Map<String, dynamic> myMap = args[0];
          myMap.forEach((key, value) {
            tmp.add(Field(
              key: key,
              controller: TextEditingController(),
              field: value,
            ));
          });
          args_action = tmp;
          tmp = [];
          return ACTION(
            id: action['id'],
            description: action['description'],
            fields: args_action,
          );
        }).toList();
      } else {
        throw Exception('Failed to load actions');
      }
    });
  }

  Future<List<REACTION>> fetchReaction(String token, int serviceId) {
    List<Field> tmp = [];
    var url = "https://are4-51.com:8080/api/reactions/get?serviceId=$serviceId";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    return http.get(Uri.parse(url), headers: headers).then((response) {
      if (response.statusCode == 200) {
        final reactions = jsonDecode(response.body);
        return reactions.map<REACTION>((reaction) {
          final args = jsonDecode(reaction['args_reaction']);
          Map<String, dynamic> myMap = args[0];
          myMap.forEach((key, value) {
            tmp.add(Field(
              key: key,
              controller: TextEditingController(),
              field: value,
            ));
          });
          args_reaction = tmp;
          tmp = [];
          return REACTION(
            id: reaction['id'],
            description: reaction['description'],
            fields: args_reaction,
          );
        }).toList();
      } else {
        throw Exception('Failed to load reactions');
      }
    });
  }

  void addArea() async {
    bool done = true;
    if (areaTitleController.text.isEmpty) {
      done = false;
    }
    ACTION action_args =
        action.firstWhere((action) => action.description == selectedAction);
    REACTION reaction_args = reaction
        .firstWhere((reaction) => reaction.description == selectedReaction);

    for (Field field in action_args.fields) {
      if (field.getControllerValue().isEmpty) {
        done = false;
      }
    }
    for (Field field in reaction_args.fields) {
      if (field.getControllerValue().isEmpty) {
        done = false;
      }
    }

    if (!done) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please fill all fields'),
          backgroundColor: Colors.red,
          duration: Duration(seconds: 1),
        ),
      );
      return;
    }

    Map<String, dynamic> myJson = {
      "areaName": areaTitleController.text,
      "id_Action": action_args.id,
      "id_Reaction": reaction_args.id,
      "argsAction": {
        for (Field field in action_args.fields)
          field.key: field.getControllerValue()
      },
      "argsReaction": {
        for (Field field in reaction_args.fields)
          field.key: field.getControllerValue()
      },
    };
    var body = jsonEncode(myJson);
    print(body);

    var response = await http.post(
      Uri.parse("https://are4-51.com:8080/api/area/create"),
      headers: <String, String>{
        'Authorization': 'Bearer ${widget.token}',
        'Content-Type': 'application/json',
      },
      body: body,
    );

    if (response.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Area added'),
          backgroundColor: Colors.green,
          duration: Duration(seconds: 1),
        ),
      );
    } else {
      var error = "";
      int id = 0;
      if (response.statusCode == 406) {
        var getID = RegExp(r'User not connected to service: (\d+)');
        id = int.parse(
            getID.firstMatch(json.decode(response.body)['message'])!.group(1)!);
        var serviceName = scocialService
            .firstWhere((service) => service.id == id)
            .serviceName
            .toUpperCase();
        error = "User not connected to service: $serviceName";
      } else {
        error = json.decode(response.body)['message'];
      }
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(error),
          backgroundColor: Colors.red,
          duration: const Duration(seconds: 2),
          action: SnackBarAction(
            label: 'CONNECT',
            onPressed: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => WebViewConnect(
                            apiUrl: services
                                .firstWhere((service) => service.id == id)
                                .url,
                            urlCallBack: services
                                .firstWhere((service) => service.id == id)
                                .callbackUrl,
                            token: widget.token,
                          )));
            },
          ),
        ),
      );
    }
  }

  @override
  void initState() {
    super.initState();
    fetchServices(widget.token).then((value) {
      setState(() {
        scocialService = value;
      });
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(254, 254, 241, 1),
      appBar: AppBar(
        title: const Text('Areas'),
        automaticallyImplyLeading: false,
        backgroundColor: const Color.fromRGBO(30, 41, 133, 1),
        actions: [
          IconButton(
            onPressed: () {
              (selectedReaction != null) ? addArea() : print("Can't ADD");
            },
            icon: const Icon(Icons.add),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: TextField(
                  controller: areaTitleController,
                  decoration: const InputDecoration(
                    hintText: 'AREA\'s title',
                  ),
                ),
              ),
              const Text(
                "IF",
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              FieldServiceAction(),
              if (selectedService1 != null) FieldAction(),
              const SizedBox(height: 20),
              const Text(
                "THEN",
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              if (selectedAction != null) FieldServiceReaction(),
              if (selectedService2 != null) FieldReaction(),
            ],
          ),
        ),
      ),
    );
  }

  Widget FieldServiceReaction() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          ListTile(
            shape: RoundedRectangleBorder(
              side: const BorderSide(
                width: 2,
                color: Color.fromRGBO(30, 41, 133, 1),
              ),
              borderRadius: BorderRadius.circular(20),
            ),
            title: DropdownButton<String>(
              value: selectedService2,
              onChanged: (String? newValue) {
                setState(() {
                  selectedService2 = newValue;
                  selectedReaction = null;
                  fetchReaction(
                          widget.token,
                          scocialService
                              .firstWhere((service) =>
                                  service.serviceName == selectedService2)
                              .id)
                      .then((value) {
                    setState(() {
                      reaction = value;
                    });
                  });
                });
              },
              items: scocialService.map<DropdownMenuItem<String>>(
                (SOCIAL_SERVICES service) {
                  return DropdownMenuItem<String>(
                    value: service.serviceName,
                    child: Row(
                      children: [
                        service.image,
                        const SizedBox(width: 8),
                        Text(
                          service.serviceName,
                          style: const TextStyle(
                            fontSize: 16,
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Select a service'),
            ),
          ),
        ],
      ),
    );
  }

  Widget FieldServiceAction() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          ListTile(
            shape: RoundedRectangleBorder(
              side: const BorderSide(
                width: 2,
                color: Color.fromRGBO(30, 41, 133, 1),
              ),
              borderRadius: BorderRadius.circular(20),
            ),
            title: DropdownButton<String>(
              value: selectedService1,
              onChanged: (String? newValue) {
                setState(() {
                  selectedService1 = newValue;
                  selectedService2 = null;
                  selectedAction = null;
                  selectedReaction = null;
                  fetchAction(
                          widget.token,
                          scocialService
                              .firstWhere((service) =>
                                  service.serviceName == selectedService1)
                              .id)
                      .then((value) {
                    setState(() {
                      action = value;
                    });
                  });
                });
              },
              items: scocialService.map<DropdownMenuItem<String>>(
                (SOCIAL_SERVICES service) {
                  return DropdownMenuItem<String>(
                    value: service.serviceName,
                    child: Row(
                      children: [
                        service.image,
                        const SizedBox(width: 8),
                        Text(
                          service.serviceName,
                          style: const TextStyle(
                            fontSize: 16,
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Select a service'),
            ),
          ),
        ],
      ),
    );
  }

  Widget FieldActionParameters(ACTION actions) {
    if (actions.fields.isEmpty) {
      return const SizedBox();
    }
    return Column(
      children: [
        for (Field field in actions.fields)
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: field.field,
              ),
              onChanged: (text) {
                setState(() {
                  action
                      .firstWhere(
                          (action) => action.description == selectedAction)
                      .fields
                      .firstWhere((champs) => champs.field == field.field)
                      .setControllerValue(text);
                });
              },
            ),
          ),
      ],
    );
  }

  Widget FieldAction() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          ListTile(
            subtitle: DropdownButton<String>(
              value: selectedAction,
              onChanged: (String? newValue) {
                setState(() {
                  selectedAction = newValue;
                  selectedReaction = null;
                  fetchAction(
                          widget.token,
                          scocialService
                              .firstWhere((service) =>
                                  service.serviceName == selectedService1)
                              .id)
                      .then((value) {
                    setState(() {
                      action = value;
                    });
                  });
                });
              },
              items: action.map<DropdownMenuItem<String>>(
                (ACTION action) {
                  return DropdownMenuItem<String>(
                    value: action.description,
                    child: Text(action.description),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Select an action'),
            ),
          ),
          for (ACTION actions in action)
            Visibility(
              visible: selectedAction == actions.description,
              child: Column(
                children: [
                  FieldActionParameters(actions),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget FieldRectionParameters(REACTION reactions) {
    if (reactions.fields.isEmpty) {
      return const SizedBox();
    }
    return Column(
      children: [
        for (Field field in reactions.fields)
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: field.field,
              ),
              onChanged: (text) {
                setState(() {
                  reaction
                      .firstWhere((reaction) =>
                          reaction.description == selectedReaction)
                      .fields
                      .firstWhere((champs) => champs.field == field.field)
                      .setControllerValue(text);
                });
              },
            ),
          ),
      ],
    );
  }

  Widget FieldReaction() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          ListTile(
            subtitle: DropdownButton<String>(
              value: selectedReaction,
              onChanged: (String? newValue) {
                setState(() {
                  fetchReaction(
                          widget.token,
                          scocialService
                              .firstWhere((service) =>
                                  service.serviceName == selectedService2)
                              .id)
                      .then((value) {
                    setState(() {
                      reaction = value;
                    });
                  });
                  selectedReaction = newValue;
                });
              },
              items: reaction.map<DropdownMenuItem<String>>(
                (REACTION reaction) {
                  return DropdownMenuItem<String>(
                    value: reaction.description,
                    child: Text(reaction.description),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Select a reaction'),
            ),
          ),
          for (REACTION reaction in reaction)
            Visibility(
              visible: selectedReaction == reaction.description,
              child: Column(
                children: [
                  FieldRectionParameters(reaction),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
