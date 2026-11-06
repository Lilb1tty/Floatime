# Floatime

[简体中文](README.md) | English

Floatime is a floating desktop clock for Windows. Customize the time zone, font, colors, and background opacity, and adjust the window's position and size.

- Three themes and a minimal mode
- Configurable time, date, and weekday display
- Context menu, position lock, and optional always-on-top mode
- Optional taskbar icon and launch at startup

## Preview

| Desktop calendar (default) | Minimal glass |
| --- | --- |
| ![Desktop calendar](assets/calendar.png) | ![Minimal glass](assets/glass.png) |

| Circular dial | Minimal mode |
| --- | --- |
| <img src="assets/dial.png" alt="Circular dial" width="260"> | ![Minimal mode](assets/minimal.png) |

## Installation

Download the Windows installer from [GitHub Releases](https://github.com/Lilb1tty/Floatime/releases). The installation wizard lets you choose the installation folder. Right-click the clock to open the menu and settings.

## Development

Node.js and npm are required. Run these commands in the project directory:

```powershell
npm install
npm start
```

Run `npm run dist` to build the Windows installer. The output is saved in `release/`.
