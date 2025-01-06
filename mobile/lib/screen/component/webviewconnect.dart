import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebViewConnect extends StatefulWidget {
  final String token;
  final String apiUrl;
  final String urlCallBack;

  const WebViewConnect({
    Key? key,
    required this.token,
    required this.apiUrl,
    required this.urlCallBack,
  }) : super(key: key);

  @override
  State<StatefulWidget> createState() => _WebViewConnectState();
}

class _WebViewConnectState extends State<WebViewConnect> {
  WebViewController? _controller;
  double _progress = 0;

  @override
  Widget build(BuildContext context) {
    if (_controller == null) {
      Map<String, String> headers = {"Authorization": "Bearer ${widget.token}"};
      _controller = WebViewController()
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
              print(request.url);
              if (request.url.startsWith(widget.urlCallBack)) {
                print("URL: ${request.url}");
                Navigator.pop(context);
                return NavigationDecision.prevent;
              }
              return NavigationDecision.navigate;
            },
          ),
        )
        ..loadRequest(Uri.parse("${widget.apiUrl}?token=${widget.token}"),
            method: LoadRequestMethod.get, headers: headers);
    }
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Connexion'),
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
      ),
    );
  }
}
