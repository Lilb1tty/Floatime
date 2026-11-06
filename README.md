# Floatime

Floatime 是一款 Windows 桌面悬浮时钟。它支持自定义时区、字体、颜色与透明度，可调整窗口位置和大小。

- 三种主题与极简模式
- 自定义时间、日期和星期的显示
- 右键菜单、位置锁定和可选置顶
- 可隐藏任务栏图标，支持开机启动

## 产品预览

| 桌面日历（默认） | 极简玻璃 |
| --- | --- |
| ![桌面日历](assets/calendar.png) | ![极简玻璃](assets/glass.png) |

| 圆形仪表 | 极简模式 |
| --- | --- |
| <img src="assets/dial.png" alt="圆形仪表" width="260"> | ![极简模式](assets/minimal.png) |

## 安装

在 GitHub Releases 下载 Windows 安装程序。安装后右键时钟可打开菜单与设置。

## 开发

需要 Node.js 和 npm。在项目目录运行：

```powershell
npm install
npm start
```

运行 `npm run dist` 构建 Windows 安装包，输出位于 `release/`。
