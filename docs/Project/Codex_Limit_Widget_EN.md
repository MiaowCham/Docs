<div align="center">
<img src="/pictures/Codex_Limit_Widget.png" width="20%" alt="Codex Limit Widget icon" style="margin-bottom: -20px;"/>

# Codex Limit Widget

English / [简体中文](Codex_Limit_Widget_CN)

  <a href="https://github.com/MiaowCham/Codex_Limit_Widget/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-orange.svg" alt="Apache 2.0" style="display: inline-block;"></a>
  <a href="https://github.com/search?q=repo%3AMiaowCham%2FCodex_Limit_Widget++language%3AC%23&type=code"><img src="https://img.shields.io/badge/Languages-C%23-blue.svg" alt="Static Badge" style="display: inline-block;"></a>
  <a href="https://github.com/MiaowCham/Codex_Limit_Widget/releases"><img src="https://img.shields.io/github/v/release/MiaowCham/Codex_Limit_Widget" alt="Github Release" style="display: inline-block;"></a>
  <a href="https://github.com/MiaowCham/Codex_Limit_Widget/actions/workflows/build.yml"><img src="https://img.shields.io/github/actions/workflow/status/MiaowCham/Codex_Limit_Widget/.github/workflows/build.yml" alt="GitHub Actions" style="display: inline-block;"></a>
  <a href="https://github.com/MiaowCham/Codex_Limit_Widget/commits/main"><img src="https://img.shields.io/github/last-commit/MiaowCham/Codex_Limit_Widget" alt="GitHub last commit" style="display: inline-block;"></a>

A lightweight cross-platform desktop widget for viewing Codex usage and reset times.

</div>

> [!NOTE]
> This project is Powered by Codex
>
> The new version (≥0.2.x) of the source code is located in the `dev` branch.

## Features

- Shows primary and weekly limits, reset times, credits, and the current plan
- Supports scheduled and manual refreshes
- Supports window dragging and always-on-top toggling
- Provides a system-tray menu to show or hide the window, toggle always-on-top, refresh, open the project page, and exit
- Provides `status` and `watch` CLI modes
- Builds and tests on Windows, Linux, and macOS

## Requirements

The cross-platform desktop app uses Avalonia 12. Production builds use .NET 10; the App, CLI, Core, and test projects fall back to `net8.0` with older SDKs.

The app reads usage limits through `codex app-server`, so it requires:

- Codex CLI installed
- The `codex` command available on `PATH`
- A signed-in Codex CLI session

IDE extensions do not usually include a standalone Codex CLI. Install it separately when needed.

## Usage

### Install a release build

Download an installer or build artifact from [Releases](https://github.com/MiaowCham/Codex_Limit_Widget/releases) or GitHub Actions:

- Windows x64: Inno Setup installer
- Linux x64: self-contained executable and DEB package
- macOS: ad-hoc-signed `.app` bundles for Apple Silicon and Intel

The macOS artifacts are not signed with an Apple Developer ID or notarized. You may need to allow the app manually in system settings on first launch.

### Start the desktop widget

```powershell
dotnet run --project CodexLimitWidget.App -- --interval 60
```

`--interval` is in seconds, accepts `1` through `86400`, and defaults to `60`.

The display language follows the system by default. Override it for a launch with `--language`, for example:

```powershell
dotnet run --project CodexLimitWidget.App -- --language JP
```

Supported translations are English, Simplified Chinese, Traditional Chinese, and Japanese. Unsupported cultures fall back to English.

### Query once

```powershell
dotnet run --project CodexLimitWidget.Cli -- status --language en-US
```

### Watch continuously

```powershell
dotnet run --project CodexLimitWidget.Cli -- watch --interval 60 --language zh-Hant
```

Press `Ctrl+C` to stop watching.

## Build from source

Install the [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0), then run:

```powershell
dotnet build CodexLimitWidget.slnx -c Release
dotnet test CodexLimitWidget.slnx -c Release --no-build
```

### Windows x64

Create a self-contained single-file app:

```powershell
dotnet publish CodexLimitWidget.App/CodexLimitWidget.App.csproj `
  -c Release -r win-x64 --self-contained true `
  -p:PublishSingleFile=true -o publish/win-x64/app
```

To create the Inno Setup installer, install Inno Setup 6 and run:

```powershell
./installer/build-windows.ps1 -Version 0.2.4
```

The script downloads the official Simplified Chinese, Traditional Chinese, and Japanese Inno Setup translations. The installer also includes English.

### Linux

The interactive script supports x64/ARM64, .NET 10/.NET 8, self-contained binaries, and DEB packages:

```bash
bash installer/build-linux.sh
```

Building a DEB also requires `dpkg-deb`.

### macOS

The interactive script supports Apple Silicon/Intel, .NET 10/.NET 8, and can create an `.app` and ZIP:

```bash
bash installer/build-macos.sh
```

.NET 10 is the default target; the script also provides a .NET 8 compatibility build. The application bundle does not declare a minimum macOS version in `Info.plist`; building requires `CodexLimitWidget.icns` in the repository root and the system `codesign` command.

## Logs

- Windows: `%LOCALAPPDATA%\CodexLimitWidget\Logs\widget.log`
- Linux: `$XDG_STATE_HOME/CodexLimitWidget/Logs/widget.log`
- Linux without `XDG_STATE_HOME`: `~/.local/state/CodexLimitWidget/Logs/widget.log`
- macOS: `~/Library/Logs/CodexLimitWidget/widget.log`

## CI and releases

GitHub Actions performs Release builds and tests on Windows, Ubuntu, and macOS. A `v*` tag or a manually triggered workflow also creates:

- Windows x64 installer
- Linux x64 self-contained binary and DEB package
- macOS Apple Silicon and Intel `.app` bundles

## License

This project is licensed under the [Apache License 2.0](https://github.com/MiaowCham/Codex_Limit_Widget/blob/main/LICENSE).
