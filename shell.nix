{ pkgs ? import <nixpkgs> { } }:

with pkgs;

mkShell {
  buildInputs = [
    nodejs-16_x
  ]
  ++ lib.optionals stdenv.isLinux [
    # For ExUnit Notifier on Linux
    libnotify

    # For file_system on Linux
    inotify-tools
  ]
  ++ lib.optionals stdenv.isDarwin ([
    # For ExUnit Notifier on macOS
    terminal-notifier

    # For file_system on macOS
    darwin.apple_sdk.frameworks.CoreFoundation
    darwin.apple_sdk.frameworks.CoreServices
  ]);
}
