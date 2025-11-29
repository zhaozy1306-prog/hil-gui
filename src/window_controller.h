/**
 * @file window_controller.h
 * @brief BCM Window Controller Header File
 * @author STM32 HIL-GUI Project
 * @date 2025-11-29
 */

#ifndef WINDOW_CONTROLLER_H
#define WINDOW_CONTROLLER_H

#include <stdint.h>
#include <stdbool.h>

// Window position range: 0 (fully closed) to 100 (fully open)
#define WINDOW_MIN_POS          0
#define WINDOW_MAX_POS          100

// Anti-pinch detection threshold (current in mA)
#define ANTI_PINCH_THRESHOLD    800

// Motor control parameters
#define MOTOR_PWM_FREQ          1000    // Hz
#define MOTOR_MAX_DUTY          100     // %

// Window states
typedef enum {
    WINDOW_IDLE = 0,
    WINDOW_MOVING_UP,
    WINDOW_MOVING_DOWN,
    WINDOW_ANTI_PINCH_ACTIVE,
    WINDOW_ERROR
} WindowState_t;

// Window control modes
typedef enum {
    CTRL_MODE_MANUAL = 0,      // Manual up/down
    CTRL_MODE_AUTO_UP,         // One-touch auto up
    CTRL_MODE_AUTO_DOWN        // One-touch auto down
} ControlMode_t;

// Window controller structure
typedef struct {
    uint8_t position;           // Current position (0-100)
    uint8_t target_position;    // Target position
    WindowState_t state;        // Current state
    ControlMode_t ctrl_mode;    // Control mode
    uint16_t current_mA;        // Motor current in mA
    bool anti_pinch_enabled;    // Anti-pinch feature enabled
    uint32_t last_update_ms;    // Last update timestamp
    uint8_t error_code;         // Error code
} WindowController_t;

// Function prototypes
void Window_Init(WindowController_t *ctrl);
void Window_Update(WindowController_t *ctrl, uint32_t current_time_ms);
void Window_MoveUp(WindowController_t *ctrl, bool auto_mode);
void Window_MoveDown(WindowController_t *ctrl, bool auto_mode);
void Window_Stop(WindowController_t *ctrl);
void Window_SetPosition(WindowController_t *ctrl, uint8_t position);
uint8_t Window_GetPosition(WindowController_t *ctrl);
WindowState_t Window_GetState(WindowController_t *ctrl);
void Window_EnableAntiPinch(WindowController_t *ctrl, bool enable);
bool Window_CheckAntiPinch(WindowController_t *ctrl);

// Hardware interface functions (to be implemented for specific STM32)
void Window_HAL_InitMotor(void);
void Window_HAL_SetMotorSpeed(int8_t speed); // -100 to 100
uint16_t Window_HAL_ReadCurrent(void);
void Window_HAL_SetPWM(uint8_t duty_cycle);

#endif // WINDOW_CONTROLLER_H
