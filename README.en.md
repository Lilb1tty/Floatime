# Floatime

[简体中文](README.md) | English

Floatime is a floating desktop clock for Windows. Customize the time zone, font, colors, and background opacity, and adjust the window's position and size.

- Three themes and a minimal mode
- Configurable time, date, and weekday display
- Context menu, position lock, and optional always-on-top mode
- Optional taskbar icon and launch at startup
- Optional additional clock over the primary taskbar, with the desktop clock hidden

The additional clock is a click-through overlay; it does not receive mouse input. Windows does not reserve space for it, so it may visually overlap taskbar icons. Adjust its position in Settings. It may be unavailable when the taskbar is set to auto-hide.

## Preview

| Desktop calendar (default) | Minimal glass |
| --- | --- |
| ![Desktop calendar](assets/calendar.png) | ![Minimal glass](assets/glass.png) |

| Circular dial | Minimal mode |
| --- | --- |
| <img src="assets/dial.png" alt="Circular dial" width="260"> | ![Minimal mode](assets/minimal.png) |

## Installation

Download the Windows installer from [GitHub Releases](https://github.com/Lilb1tty/Floatime/releases). The installation wizard lets you choose the installation folder. Right-click the clock to open the menu and settings.

## Updates

Floatime checks for updates at startup. You can also check in Settings. After downloading and verifying the update, Floatime opens the installer for confirmation. Publish `Floatime Setup <version>.exe` to a public GitHub Release tagged `v<version>`.

## Development

Node.js and npm are required. Run these commands in the project directory:

```powershell
npm install
npm start
```

Run `npm run dist` to build the Windows installer. The output is saved in `release/`.
