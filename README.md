# BCM Window Controller - HIL GUI

基于STM32的车身控制模块(BCM)车窗控制器及硬件在环(HIL)测试界面

## 项目概述

本项目实现了一个完整的车窗控制系统，包括：

- **STM32车窗控制器核心逻辑**：支持四个车窗的独立控制
- **防夹功能**：基于电流检测的智能防夹保护
- **一键升降**：支持自动和手动两种控制模式
- **可视化GUI测试界面**：用于硬件在环测试和功能验证

## 主要功能

### 车窗控制功能
- ✅ 四窗独立控制（FL/FR/RL/RR）
- ✅ 手动上升/下降控制
- ✅ 一键自动升降
- ✅ 精确位置控制（0-100%）
- ✅ 防夹保护功能
- ✅ 电流监测
- ✅ 状态机管理

### 安全功能
- **防夹检测**：实时监测电机电流
- **自动反转**：检测到障碍物时自动反向
- **可调阈值**：防夹灵敏度可配置
- **错误处理**：完善的错误状态管理

## 项目结构

```
hil-gui/
├── src/
│   ├── window_controller.h      # 车窗控制器头文件
│   ├── window_controller.c      # 车窗控制器实现
│   ├── stm32_hal_impl.c        # STM32硬件抽象层
│   └── main.c                   # 主程序示例
├── gui/
│   ├── window_controller_gui.py # Python GUI界面
│   └── requirements.txt         # Python依赖
├── .gitignore
└── README.md
```

## 快速开始

### 1. STM32固件编译

#### 准备工作
- STM32开发环境（STM32CubeIDE / Keil / GCC）
- STM32F4xx系列MCU（或其他系列，需修改HAL实现）

#### 编译步骤
```bash
# 使用GCC编译（示例）
arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb \
    -c src/window_controller.c -o build/window_controller.o

arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb \
    -c src/stm32_hal_impl.c -o build/stm32_hal_impl.o

arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb \
    -c src/main.c -o build/main.o

# 链接
arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb \
    build/*.o -o build/window_controller.elf
```

或者在STM32CubeIDE中：
1. 导入项目
2. 将`src/`目录下的文件添加到项目
3. 配置硬件引脚（参考代码注释）
4. 编译并下载到MCU

### 2. 运行GUI测试界面

#### 安装Python
确保已安装Python 3.6+（tkinter已内置）

#### 运行GUI
```bash
cd gui
python3 window_controller_gui.py
```

或者在Windows上：
```bash
cd gui
python window_controller_gui.py
```

## 硬件连接

### STM32引脚配置（示例 - STM32F4）

| 功能 | 引脚 | 说明 |
|------|------|------|
| 电机方向1 (IN1) | PA8 | H桥输入1 |
| 电机方向2 (IN2) | PA9 | H桥输入2 |
| PWM使能 (EN) | PA10 | TIM3_CH3 PWM输出 |
| 电流检测 | PA0 | ADC1_IN0 |

### H桥电机驱动器
推荐使用：
- L298N
- DRV8871
- TB6612FNG

### 电流传感器
推荐使用：
- ACS712 (5A/20A/30A)
- INA219

## GUI界面使用说明

### 界面布局
- **左侧**：四个独立的车窗控制面板
- **中间**：全局控制和防夹设置
- **右侧**：系统状态日志

### 控制按钮
- **↑ Up / ↓ Down**：手动控制，按住时移动
- **Auto ↑ / Auto ↓**：一键自动升降
- **STOP**：立即停止当前窗口
- **Simulate Obstacle**：模拟障碍物测试防夹功能

### 防夹测试
1. 启用"Enable Anti-Pinch"
2. 设置阈值（默认800mA）
3. 勾选"Simulate Obstacle"
4. 点击"Auto ↑"上升
5. 观察车窗自动反转

## 代码示例

### 基本使用
```c
#include "window_controller.h"

WindowController_t window;

// 初始化
Window_Init(&window);

// 主循环
while (1) {
    uint32_t current_time = HAL_GetTick();
    Window_Update(&window, current_time);

    // 处理用户输入
    if (button_up_pressed) {
        Window_MoveUp(&window, true);  // 自动上升
    }

    HAL_Delay(10);
}
```

### 自定义位置控制
```c
// 移动到50%位置
Window_SetPosition(&window, 50);

// 获取当前位置
uint8_t pos = Window_GetPosition(&window);
```

### 防夹功能配置
```c
// 启用防夹
Window_EnableAntiPinch(&window, true);

// 在Update中会自动检测和处理
if (window.state == WINDOW_ANTI_PINCH_ACTIVE) {
    // 防夹已触发
}
```

## 技术参数

| 参数 | 值 | 说明 |
|------|-----|------|
| 位置范围 | 0-100% | 0=全关，100=全开 |
| PWM频率 | 1kHz | 电机驱动频率 |
| 更新周期 | 10ms | 状态机更新周期 |
| 防夹阈值 | 800mA | 可配置 |
| 正常电流 | 200-600mA | 取决于电机 |

## 状态机说明

```
IDLE (空闲)
  ↓ MoveUp/MoveDown
MOVING_UP / MOVING_DOWN (运动中)
  ↓ 检测到高电流
ANTI_PINCH_ACTIVE (防夹激活)
  ↓ 反转完成
IDLE
```

## 扩展功能建议

- [ ] CAN总线通信
- [ ] EEPROM位置记忆
- [ ] 多级速度控制
- [ ] 温度保护
- [ ] 遥控器学习
- [ ] 车门联动控制

## 故障排除

### 问题：电机不转
- 检查H桥连接
- 验证PWM输出
- 检查电源电压

### 问题：防夹不工作
- 检查电流传感器连接
- 调整阈值设置
- 验证ADC配置

### 问题：GUI无法启动
- 确认Python版本 ≥ 3.6
- 确认tkinter已安装（通常内置）

## 开发环境

- **STM32**: STM32CubeIDE 1.8+
- **编译器**: GCC ARM Embedded
- **Python**: Python 3.6+
- **GUI**: Tkinter (内置)

## 许可证

本项目仅供学习和研究使用。

## 作者

STM32 HIL-GUI Project Team

## 更新日志

### v1.0.0 (2025-11-29)
- 初始版本发布
- 实现核心车窗控制功能
- 添加防夹保护
- 创建HIL测试GUI
