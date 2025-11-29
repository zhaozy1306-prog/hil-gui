/**
 * @file main.c
 * @brief Main application for BCM Window Controller
 * @author STM32 HIL-GUI Project
 * @date 2025-11-29
 */

#include "window_controller.h"
#include <stdio.h>

// Global window controller instances (4 windows)
WindowController_t window_fl;  // Front Left
WindowController_t window_fr;  // Front Right
WindowController_t window_rl;  // Rear Left
WindowController_t window_rr;  // Rear Right

// System tick counter (milliseconds)
volatile uint32_t system_tick_ms = 0;

/**
 * @brief System initialization
 */
void System_Init(void) {
    // Initialize all window controllers
    Window_Init(&window_fl);
    Window_Init(&window_fr);
    Window_Init(&window_rl);
    Window_Init(&window_rr);

    printf("BCM Window Controller System Initialized\n");
    printf("========================================\n");
}

/**
 * @brief Main system update loop
 */
void System_Update(void) {
    // Update all window controllers
    Window_Update(&window_fl, system_tick_ms);
    Window_Update(&window_fr, system_tick_ms);
    Window_Update(&window_rl, system_tick_ms);
    Window_Update(&window_rr, system_tick_ms);
}

/**
 * @brief Print system status
 */
void System_PrintStatus(void) {
    printf("\n=== Window Controller Status ===\n");
    printf("FL: Pos=%3d%% State=%d Current=%4dmA\n",
           window_fl.position, window_fl.state, window_fl.current_mA);
    printf("FR: Pos=%3d%% State=%d Current=%4dmA\n",
           window_fr.position, window_fr.state, window_fr.current_mA);
    printf("RL: Pos=%3d%% State=%d Current=%4dmA\n",
           window_rl.position, window_rl.state, window_rl.current_mA);
    printf("RR: Pos=%3d%% State=%d Current=%4dmA\n",
           window_rr.position, window_rr.state, window_rr.current_mA);
    printf("================================\n");
}

/**
 * @brief Example usage and testing
 */
void Example_Usage(void) {
    // Example 1: Manual control
    printf("\n--- Example 1: Manual Up/Down ---\n");
    Window_MoveUp(&window_fl, false);
    for (int i = 0; i < 5; i++) {
        system_tick_ms += 100;
        System_Update();
    }
    Window_Stop(&window_fl);
    printf("FL Window Position: %d%%\n", window_fl.position);

    // Example 2: Auto mode (one-touch)
    printf("\n--- Example 2: Auto Up ---\n");
    Window_MoveUp(&window_fr, true);
    for (int i = 0; i < 120; i++) {
        system_tick_ms += 100;
        System_Update();
    }
    printf("FR Window Position: %d%%\n", window_fr.position);

    // Example 3: Set specific position
    printf("\n--- Example 3: Set Position to 50%% ---\n");
    Window_SetPosition(&window_rl, 50);
    for (int i = 0; i < 60; i++) {
        system_tick_ms += 100;
        System_Update();
    }
    printf("RL Window Position: %d%%\n", window_rl.position);

    // Example 4: Anti-pinch simulation
    printf("\n--- Example 4: Anti-Pinch Test ---\n");
    Window_MoveUp(&window_rr, true);
    // Simulate obstacle after some movement
    for (int i = 0; i < 30; i++) {
        system_tick_ms += 100;
        if (i == 20) {
            // Simulate high current (obstacle)
            window_rr.current_mA = 900;
        }
        System_Update();
    }
    printf("RR Window Position: %d%% (Anti-pinch activated)\n", window_rr.position);
}

/**
 * @brief Main function
 */
int main(void) {
    // System initialization
    System_Init();

    // Run examples
    Example_Usage();

    // Print final status
    System_PrintStatus();

    // Main loop (in real system, this would be infinite)
    /*
    while (1) {
        System_Update();

        // Process user inputs, CAN messages, etc.
        // ...

        // Delay or wait for next tick
        HAL_Delay(10);  // 10ms update rate
    }
    */

    return 0;
}

/**
 * @brief SysTick interrupt handler (for real STM32)
 */
void SysTick_Handler(void) {
    system_tick_ms++;
}
