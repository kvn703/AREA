# AREA Flutter APP

## Installation

### Requirements

- Flutter SDK
- Android Studio (for Android development)
- XCode (for iOS development)

### Setup

1. Clone the repository or download the zip file


2. Install dependencies

```bash
flutter pub get
```

3. Run the app

```bash
flutter run
```

## Development

### Project Structure

- `lib/` - Contains all the source code for the app
  - `main.dart` - The entry point to the app
  - `screen/` - Contains all the screens of the app
    - `components/` - Contains all the components used in the screens
        - `dialoglogout.dart` - The dialog for logout
        - `input.dart` - The text input component
        - `serviceslist.dart` - The list of services component
        - `webviewconnnect.dart` - The webview component to open the service

    - `pages/` - Contains all the pages of the app
        - `home.dart` - The home page
        - `login.dart` - The login page
        - `register.dart` - The register page
        - `profil.dart` - The profil page

    - `navigation.dart` - The navigation bar component

- `assets/` - Contains all the assets of the app
  - `fonts/` - Contains all the fonts of the app
  - `images/` - Contains all the images of the app

### Mobile APP Diagram

<img src="../docs/Mobile-Tree.png" alt="Mobile APP Diagram" width="400"
/>

