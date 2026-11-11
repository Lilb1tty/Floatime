# Floatime

简体中文 | [English](README.en.md)

Floatime 是一款 Windows 桌面悬浮时钟。它支持自定义时区、字体、颜色与透明度，可调整窗口位置和大小。

- 三种主题与极简模式
- 自定义时间、日期和星期的显示
- 右键菜单、位置锁定和可选置顶
- 可隐藏任务栏图标，支持开机启动
- 可在主显示器任务栏上显示附加时钟，并隐藏桌面时钟

附加时钟是鼠标穿透的独立窗口，不接收点击。Windows 不为它预留空间，因此可能与任务栏图标在视觉上重叠；可在设置中调整位置。自动隐藏任务栏时，附加时钟可能不可见。

## 产品预览

| 桌面日历（默认） | 极简玻璃 |
| --- | --- |
| ![桌面日历](assets/calendar.png) | ![极简玻璃](assets/glass.png) |

| 圆形仪表 | 极简模式 |
| --- | --- |
| <img src="assets/dial.png" alt="圆形仪表" width="260"> | ![极简模式](assets/minimal.png) |

## 安装

在 GitHub Releases 下载 Windows 安装程序。安装向导支持选择安装目录。安装后右键时钟可打开菜单与设置。

## 更新

应用启动后自动检查更新，也可在设置中手动检查。新版本下载完成并通过 SHA-256 校验后，将打开安装程序；确认安装后即可更新。发布时需将 `Floatime Setup <版本号>.exe` 上传到公开的 GitHub Release，并使用 `v<版本号>` 标签。

## 开发

需要 Node.js 和 npm。在项目目录运行：

```powershell
npm install
npm start
```

运行 `npm run dist` 构建 Windows 安装包，输出位于 `release/`。
