/**
 * @file window_controller.c
 * @brief BCM Window Controller Implementation
 * @author STM32 HIL-GUI Project
 * @date 2025-11-29
 */

#include "window_controller.h"
#include <string.h>

#define MOTOR_SPEED_NORMAL      80  // Normal speed percentage
#define MOTOR_SPEED_SLOW        40  // Slow speed for precise positioning
#define POSITION_TOLERANCE      2   // Position tolerance

/**
 * @brief Initialize window controller
 * @param ctrl Pointer to window controller structure
 */
void Window_Init(WindowController_t *ctrl) {
    if (ctrl == NULL) return;

    memset(ctrl, 0, sizeof(WindowController_t));
    ctrl->position = 0;
    ctrl->target_position = 0;
    ctrl->state = WINDOW_IDLE;
    ctrl->ctrl_mode = CTRL_MODE_MANUAL;
    ctrl->anti_pinch_enabled = true;
    ctrl->last_update_ms = 0;
    ctrl->error_code = 0;

    // Initialize hardware
    Window_HAL_InitMotor();
}

/**
 * @brief Update window controller state machine
 * @param ctrl Pointer to window controller structure
 * @param current_time_ms Current system time in milliseconds
 */
void Window_Update(WindowController_t *ctrl, uint32_t current_time_ms) {
    if (ctrl == NULL) return;

    ctrl->last_update_ms = current_time_ms;

    // Read current sensor
    ctrl->current_mA = Window_HAL_ReadCurrent();

    // Check anti-pinch
    if (ctrl->anti_pinch_enabled && Window_CheckAntiPinch(ctrl)) {
        ctrl->state = WINDOW_ANTI_PINCH_ACTIVE;
        Window_Stop(ctrl);
        // Reverse direction slightly
        if (ctrl->position < WINDOW_MAX_POS - 10) {
            ctrl->target_position = ctrl->position + 10;
            Window_HAL_SetMotorSpeed(-MOTOR_SPEED_SLOW);
        }
        return;
    }

    // State machine
    switch (ctrl->state) {
        case WINDOW_IDLE:
            Window_HAL_SetMotorSpeed(0);
            break;

        case WINDOW_MOVING_UP:
            if (ctrl->position >= ctrl->target_position) {
                Window_Stop(ctrl);
            } else {
                int8_t speed = MOTOR_SPEED_NORMAL;
                if ((ctrl->target_position - ctrl->position) < 5) {
                    speed = MOTOR_SPEED_SLOW;
                }
                Window_HAL_SetMotorSpeed(speed);
                ctrl->position++;
            }
            break;

        case WINDOW_MOVING_DOWN:
            if (ctrl->position <= ctrl->target_position) {
                Window_Stop(ctrl);
            } else {
                int8_t speed = -MOTOR_SPEED_NORMAL;
                if ((ctrl->position - ctrl->target_position) < 5) {
                    speed = -MOTOR_SPEED_SLOW;
                }
                Window_HAL_SetMotorSpeed(speed);
                ctrl->position--;
            }
            break;

        case WINDOW_ANTI_PINCH_ACTIVE:
            // Wait for manual intervention
            if (ctrl->position >= ctrl->target_position) {
                ctrl->state = WINDOW_IDLE;
                Window_HAL_SetMotorSpeed(0);
            }
            break;

        case WINDOW_ERROR:
            Window_HAL_SetMotorSpeed(0);
            break;

        default:
            ctrl->state = WINDOW_IDLE;
            break;
    }
}

/**
 * @brief Move window up
 * @param ctrl Pointer to window controller structure
 * @param auto_mode True for one-touch auto mode, false for manual
 */
void Window_MoveUp(WindowController_t *ctrl, bool auto_mode) {
    if (ctrl == NULL || ctrl->state == WINDOW_ERROR) return;

    if (auto_mode) {
        ctrl->ctrl_mode = CTRL_MODE_AUTO_UP;
        ctrl->target_position = WINDOW_MAX_POS;
    } else {
        ctrl->ctrl_mode = CTRL_MODE_MANUAL;
        if (ctrl->position < WINDOW_MAX_POS) {
            ctrl->target_position = ctrl->position + 1;
        }
    }

    ctrl->state = WINDOW_MOVING_UP;
}

/**
 * @brief Move window down
 * @param ctrl Pointer to window controller structure
 * @param auto_mode True for one-touch auto mode, false for manual
 */
void Window_MoveDown(WindowController_t *ctrl, bool auto_mode) {
    if (ctrl == NULL || ctrl->state == WINDOW_ERROR) return;

    if (auto_mode) {
        ctrl->ctrl_mode = CTRL_MODE_AUTO_DOWN;
        ctrl->target_position = WINDOW_MIN_POS;
    } else {
        ctrl->ctrl_mode = CTRL_MODE_MANUAL;
        if (ctrl->position > WINDOW_MIN_POS) {
            ctrl->target_position = ctrl->position - 1;
        }
    }

    ctrl->state = WINDOW_MOVING_DOWN;
}

/**
 * @brief Stop window movement
 * @param ctrl Pointer to window controller structure
 */
void Window_Stop(WindowController_t *ctrl) {
    if (ctrl == NULL) return;

    ctrl->state = WINDOW_IDLE;
    ctrl->target_position = ctrl->position;
    Window_HAL_SetMotorSpeed(0);
}

/**
 * @brief Set window to specific position
 * @param ctrl Pointer to window controller structure
 * @param position Target position (0-100)
 */
void Window_SetPosition(WindowController_t *ctrl, uint8_t position) {
    if (ctrl == NULL || ctrl->state == WINDOW_ERROR) return;

    if (position > WINDOW_MAX_POS) {
        position = WINDOW_MAX_POS;
    }

    ctrl->target_position = position;

    if (ctrl->target_position > ctrl->position) {
        ctrl->state = WINDOW_MOVING_UP;
    } else if (ctrl->target_position < ctrl->position) {
        ctrl->state = WINDOW_MOVING_DOWN;
    } else {
        ctrl->state = WINDOW_IDLE;
    }
}

/**
 * @brief Get current window position
 * @param ctrl Pointer to window controller structure
 * @return Current position (0-100)
 */
uint8_t Window_GetPosition(WindowController_t *ctrl) {
    if (ctrl == NULL) return 0;
    return ctrl->position;
}

/**
 * @brief Get current window state
 * @param ctrl Pointer to window controller structure
 * @return Current state
 */
WindowState_t Window_GetState(WindowController_t *ctrl) {
    if (ctrl == NULL) return WINDOW_ERROR;
    return ctrl->state;
}

/**
 * @brief Enable or disable anti-pinch feature
 * @param ctrl Pointer to window controller structure
 * @param enable True to enable, false to disable
 */
void Window_EnableAntiPinch(WindowController_t *ctrl, bool enable) {
    if (ctrl == NULL) return;
    ctrl->anti_pinch_enabled = enable;
}

/**
 * @brief Check if anti-pinch condition is detected
 * @param ctrl Pointer to window controller structure
 * @return True if anti-pinch detected, false otherwise
 */
bool Window_CheckAntiPinch(WindowController_t *ctrl) {
    if (ctrl == NULL || !ctrl->anti_pinch_enabled) return false;

    // Check if moving up and current exceeds threshold
    if (ctrl->state == WINDOW_MOVING_UP &&
        ctrl->current_mA > ANTI_PINCH_THRESHOLD) {
        return true;
    }

    return false;
}

// Hardware abstraction layer - Weak implementations (to be overridden)
__attribute__((weak)) void Window_HAL_InitMotor(void) {
    // To be implemented for specific hardware
}

__attribute__((weak)) void Window_HAL_SetMotorSpeed(int8_t speed) {
    // To be implemented for specific hardware
    // speed: -100 (full down) to 100 (full up)
}

__attribute__((weak)) uint16_t Window_HAL_ReadCurrent(void) {
    // To be implemented for specific hardware
    return 0;
}

__attribute__((weak)) void Window_HAL_SetPWM(uint8_t duty_cycle) {
    // To be implemented for specific hardware
}
