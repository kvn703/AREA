import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebViewPage extends StatefulWidget {
  const WebViewPage({
    super.key,
  });

  @override
  State<StatefulWidget> createState() => _WebViewPageState();
}

class _WebViewPageState extends State<WebViewPage> {
  WebViewController? _controller;
  late double _progress;
  String? token;

  @override
  void initState() {
    _progress = 0;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    _controller ??= WebViewController()
        ..setJavaScriptMode(JavaScriptMode.unrestricted)
        ..setBackgroundColor(Colors.white)
        ..setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N)')
        ..setNavigationDelegate(
          NavigationDelegate(
            onProgress: (int progress) {
            },
            onPageStarted: (String url) {},
            onPageFinished: (String url) {},
            onWebResourceError: (WebResourceError error) {},
            onNavigationRequest: (NavigationRequest request) {
              if (request.url.startsWith('https://are4-51.com:8081')) {
                Uri uri = Uri.parse(request.url);
                token = uri.queryParameters['token'];
                Navigator.pop(context, token);
                return NavigationDecision.prevent;
              }
              return NavigationDecision.navigate;
            },
          ),
        )
        ..loadRequest(Uri.parse('https://are4-51.com:8080/api/auth/google/Register'));

    final theme = Theme.of(context);
    return Scaffold(
        appBar: AppBar(
          title: const Text('Google Login'),
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(6.0),
            child: LinearProgressIndicator(
              backgroundColor: theme.colorScheme.onPrimary,
              valueColor:
                  AlwaysStoppedAnimation<Color>(theme.colorScheme.primary),
              value: _progress,
            ),
          ),
        ),
        body: WebViewWidget(
          controller: _controller!,
        ));
  }
}
