# Tesla HMI Mock

A Tesla-inspired vehicle Human-Machine Interface (HMI) mockup built with Electron, React, TypeScript, and TailwindCSS.

![Tesla HMI Mock](https://img.shields.io/badge/Tesla-HMI%20Mock-red?style=for-the-badge)
![Electron](https://img.shields.io/badge/Electron-28.0-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?style=flat-square)

## 📋 项目概述

本项目是一个模拟特斯拉车机界面的桌面应用程序，提供了完整的车辆控制和状态监控功能。适用于：

- 🚗 车载系统开发演示
- 🎓 学习 Electron + React 开发
- 🎨 UI/UX 设计参考
- 🧪 硬件在环 (HIL) 测试

## ✨ 主要功能

### 车辆控制
- **车门控制**: 可视化四门开关状态
- **车窗控制**: 支持四窗独立控制
- **车锁系统**: 一键锁车/解锁
- **充电管理**: 充电状态监控和控制

### 气候控制
- **温度调节**: 16°C - 30°C 范围调节
- **风扇控制**: 0-3 档风速调节
- **实时反馈**: 动态图标动画

### 状态监控
- **实时时钟**: 24小时制显示
- **网络状态**: WiFi/蓝牙连接状态
- **电池电量**: 实时显示剩余电量
- **行驶数据**: 速度、续航、能耗

### 快捷操作
- 灯光控制
- 喇叭
- 后备箱/前备箱

## 🚀 快速开始

### 环境要求

- Node.js >= 16.x
- npm >= 8.x 或 yarn >= 1.22

### 安装依赖

```bash
npm install
```

或使用 yarn:

```bash
yarn install
```

### 开发模式

启动开发服务器（支持热重载）：

```bash
npm start
```

这将会：
1. 启动 Webpack Dev Server (端口 3000)
2. 自动打开 Electron 窗口
3. 启用开发者工具

### 构建应用

构建生产版本：

```bash
npm run build
```

打包成可执行文件：

```bash
npm run package
```

打包后的文件位于 `release/` 目录。

## 📁 项目结构

```
tesla-hmi-mock/
├── src/
│   ├── electron/              # Electron 主进程
│   │   ├── main.ts           # 主进程入口
│   │   └── preload.ts        # 预加载脚本
│   ├── renderer/             # React 渲染进程
│   │   ├── components/       # React 组件
│   │   │   ├── TopBar.tsx
│   │   │   ├── CarVisualization.tsx
│   │   │   ├── ControlPanel.tsx
│   │   │   └── StatusBar.tsx
│   │   ├── pages/            # 页面组件
│   │   │   └── Dashboard.tsx
│   │   ├── styles/           # 样式文件
│   │   │   └── globals.css
│   │   ├── App.tsx           # 根组件
│   │   └── index.tsx         # 渲染进程入口
│   └── types/                # TypeScript 类型定义
│       └── index.d.ts
├── public/                   # 静态资源
│   └── index.html
├── dist/                     # 编译输出 (自动生成)
├── release/                  # 打包输出 (自动生成)
├── package.json              # 项目配置
├── tsconfig.json             # TypeScript 配置
├── webpack.renderer.config.js # Webpack 配置
├── tailwind.config.js        # TailwindCSS 配置
└── README.md
```

## 🎨 技术栈

### 核心框架
- **Electron**: 跨平台桌面应用框架
- **React**: UI 组件库
- **TypeScript**: 类型安全的 JavaScript
- **TailwindCSS**: 实用优先的 CSS 框架

### 开发工具
- **Webpack**: 模块打包工具
- **ESLint**: 代码质量检查
- **PostCSS**: CSS 处理工具

### UI 组件
- **react-icons**: 图标库
- 自定义 SVG 车辆可视化

## 🎯 特色功能

### 1. Tesla 风格设计

采用 Tesla 官方设计语言：
- 深色主题配色
- 简洁的扁平化设计
- 流畅的动画效果
- 直观的交互反馈

### 2. 响应式布局

- 自适应不同屏幕尺寸
- 最小分辨率：1280x720
- 推荐分辨率：1920x1080

### 3. 实时状态更新

- 时钟每秒更新
- 温度平滑过渡
- 风扇动画反馈
- 充电进度动画

### 4. 无边框窗口

类似真实 Tesla 车机的全屏体验

## 🛠️ 开发指南

### 添加新组件

1. 在 `src/renderer/components/` 创建组件文件
2. 使用 TypeScript 编写组件
3. 导入到相应页面

```tsx
import React from 'react';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="bg-tesla-gray p-4 rounded-lg">
      <h3>{title}</h3>
    </div>
  );
};

export default MyComponent;
```

### 自定义样式

在 `tailwind.config.js` 中扩展主题：

```javascript
theme: {
  extend: {
    colors: {
      'my-color': '#hexcode',
    }
  }
}
```

### TypeScript 类型

在 `src/types/index.d.ts` 中定义类型：

```typescript
export interface MyType {
  id: string;
  name: string;
}
```

## 📝 脚本命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发模式 |
| `npm run start:renderer` | 仅启动渲染进程 |
| `npm run start:electron` | 仅启动 Electron |
| `npm run build` | 构建生产版本 |
| `npm run build:renderer` | 构建渲染进程 |
| `npm run build:electron` | 构建主进程 |
| `npm run package` | 打包应用 |
| `npm run lint` | 代码检查 |
| `npm run type-check` | 类型检查 |

## 🎨 颜色方案

```css
tesla-dark:      #000000  /* 主背景 */
tesla-darkgray:  #181818  /* 次要背景 */
tesla-gray:      #222222  /* 卡片背景 */
tesla-lightgray: #393c41  /* 按钮/边框 */
tesla-blue:      #3e6ae1  /* 主题色 */
tesla-accent:    #e82127  /* 强调色 */
```

## 🔧 配置说明

### Electron 窗口配置

在 `src/electron/main.ts` 中修改窗口属性：

```typescript
const mainWindow = new BrowserWindow({
  width: 1920,
  height: 1080,
  frame: false,  // 无边框
  backgroundColor: '#000000',
});
```

### Webpack 配置

在 `webpack.renderer.config.js` 中自定义构建配置

## 🚧 待开发功能

- [ ] 导航地图集成
- [ ] 媒体播放器
- [ ] 语音控制
- [ ] 驾驶员辅助系统可视化
- [ ] 多语言支持
- [ ] 主题切换（日间/夜间）
- [ ] 数据持久化
- [ ] CAN 总线数据集成

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👥 作者

Tesla HMI Mock Team

## 🙏 致谢

- 设计灵感来自 Tesla 官方车机系统
- 使用 React Icons 提供的图标库
- 感谢开源社区的贡献

---

**注意**: 本项目仅用于学习和演示目的，与 Tesla 公司无关。
