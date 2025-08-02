# Password Saver - A React Native Application

Password Saver is a mobile application built with React Native and Expo that allows users to securely store and manage their passwords. It provides a simple and intuitive interface for adding, viewing, copying, and deleting login credentials for various apps and websites.

## Features

- **User Authentication:** Secure registration and login system to protect user data.
- **PIN Protection:** An additional layer of security with PIN-based login for quick and secure access.
- **User-Specific Data:** Passwords are saved on a per-user basis, ensuring that a user can only see their own saved passwords. Data is cleared upon logout to prevent data leakage between accounts.
- **Add and Manage Passwords:** Easily add new passwords with fields for "App or Site Name," "Username/Email," and "Password."
- **View and Search:** A clean interface to view all saved passwords.
- **Copy to Clipboard:** A one-tap option to copy a password to the clipboard.
- **Delete Passwords:** Securely delete individual passwords or clear all saved passwords at once.
- **Modern UI/UX:** A minimal and modern user interface with smooth animations.

## Technologies Used

- **React Native:** A framework for building native apps using React.
- **Expo:** A platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
- **React Navigation:** For handling routing and navigation between screens.
- **AsyncStorage:** For persisting user data and passwords locally on the device.
- **`expo-clipboard`:** For clipboard functionality.
- **`@expo/vector-icons`:** For icons used throughout the application.

## How to Run the Project

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/PasswordSaver.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd PasswordSaver
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the Expo development server:**
    ```bash
    npx expo start
    ```
5.  **Run on your device:**
    - Install the **Expo Go** app on your iOS or Android device.
    - Scan the QR code from the terminal with the Expo Go app.
