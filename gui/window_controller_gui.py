#!/usr/bin/env python3
"""
BCM Window Controller GUI
Hardware-in-the-Loop Testing Interface
Author: STM32 HIL-GUI Project
Date: 2025-11-29
"""

import tkinter as tk
from tkinter import ttk, messagebox
import threading
import time


class WindowControllerGUI:
    """GUI for BCM Window Controller HIL Testing"""

    def __init__(self, root):
        self.root = root
        self.root.title("BCM Window Controller - HIL Testing")
        self.root.geometry("900x650")
        self.root.resizable(False, False)

        # Window states
        self.windows = {
            'FL': {'position': 0, 'state': 'IDLE', 'current': 0, 'target': 0},
            'FR': {'position': 0, 'state': 'IDLE', 'current': 0, 'target': 0},
            'RL': {'position': 0, 'state': 'IDLE', 'current': 0, 'target': 0},
            'RR': {'position': 0, 'state': 'IDLE', 'current': 0, 'target': 0},
        }

        # Anti-pinch settings
        self.anti_pinch_enabled = True
        self.anti_pinch_threshold = 800  # mA

        # Simulation state
        self.simulation_running = False
        self.obstacle_enabled = {'FL': False, 'FR': False, 'RL': False, 'RR': False}

        # Create UI
        self.create_ui()

        # Start simulation thread
        self.start_simulation()

    def create_ui(self):
        """Create the user interface"""
        # Main frame
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        # Title
        title_label = ttk.Label(main_frame, text="BCM Window Controller",
                               font=('Arial', 16, 'bold'))
        title_label.grid(row=0, column=0, columnspan=2, pady=10)

        # Create window controls
        self.create_window_controls(main_frame)

        # Create control panel
        self.create_control_panel(main_frame)

        # Create status display
        self.create_status_display(main_frame)

    def create_window_controls(self, parent):
        """Create individual window control panels"""
        windows_frame = ttk.LabelFrame(parent, text="Window Controls", padding="10")
        windows_frame.grid(row=1, column=0, columnspan=2, pady=10, sticky=(tk.W, tk.E))

        positions = [
            ('FL', 0, 0), ('FR', 0, 1),
            ('RL', 1, 0), ('RR', 1, 1)
        ]

        self.window_widgets = {}

        for window_id, row, col in positions:
            frame = ttk.Frame(windows_frame, relief=tk.RIDGE, borderwidth=2)
            frame.grid(row=row, column=col, padx=10, pady=10, sticky=(tk.W, tk.E, tk.N, tk.S))

            # Window label
            label = ttk.Label(frame, text=f"{window_id} Window",
                            font=('Arial', 12, 'bold'))
            label.pack(pady=5)

            # Position slider
            position_var = tk.IntVar(value=0)
            position_label = ttk.Label(frame, text="Position: 0%")
            position_label.pack()

            position_slider = ttk.Scale(frame, from_=0, to=100,
                                       orient=tk.VERTICAL, variable=position_var,
                                       command=lambda v, wid=window_id: self.on_slider_change(wid, v))
            position_slider.pack(pady=5)
            position_slider.config(state='disabled')  # Display only

            # Control buttons
            btn_frame = ttk.Frame(frame)
            btn_frame.pack(pady=5)

            btn_up = ttk.Button(btn_frame, text="↑ Up", width=8,
                              command=lambda wid=window_id: self.move_window(wid, 'up'))
            btn_up.grid(row=0, column=0, columnspan=2, pady=2)

            btn_auto_up = ttk.Button(btn_frame, text="Auto ↑", width=8,
                                    command=lambda wid=window_id: self.auto_up(wid))
            btn_auto_up.grid(row=1, column=0, padx=2)

            btn_stop = ttk.Button(btn_frame, text="STOP", width=8,
                                command=lambda wid=window_id: self.stop_window(wid))
            btn_stop.grid(row=1, column=1, padx=2)

            btn_auto_down = ttk.Button(btn_frame, text="Auto ↓", width=8,
                                      command=lambda wid=window_id: self.auto_down(wid))
            btn_auto_down.grid(row=2, column=0, padx=2)

            btn_down = ttk.Button(btn_frame, text="↓ Down", width=8,
                                command=lambda wid=window_id: self.move_window(wid, 'down'))
            btn_down.grid(row=3, column=0, columnspan=2, pady=2)

            # Current indicator
            current_label = ttk.Label(frame, text="Current: 0 mA",
                                     font=('Arial', 9))
            current_label.pack(pady=5)

            # State indicator
            state_label = ttk.Label(frame, text="State: IDLE",
                                   font=('Arial', 9))
            state_label.pack()

            # Obstacle simulation
            obstacle_var = tk.BooleanVar(value=False)
            obstacle_check = ttk.Checkbutton(frame, text="Simulate Obstacle",
                                           variable=obstacle_var,
                                           command=lambda wid=window_id, var=obstacle_var:
                                           self.toggle_obstacle(wid, var))
            obstacle_check.pack(pady=5)

            # Store widgets
            self.window_widgets[window_id] = {
                'position_var': position_var,
                'position_label': position_label,
                'current_label': current_label,
                'state_label': state_label,
                'obstacle_var': obstacle_var
            }

    def create_control_panel(self, parent):
        """Create global control panel"""
        control_frame = ttk.LabelFrame(parent, text="Global Controls", padding="10")
        control_frame.grid(row=2, column=0, pady=10, sticky=(tk.W, tk.E, tk.N, tk.S))

        # Anti-pinch control
        anti_pinch_var = tk.BooleanVar(value=True)
        anti_pinch_check = ttk.Checkbutton(control_frame, text="Enable Anti-Pinch",
                                          variable=anti_pinch_var,
                                          command=lambda: self.toggle_anti_pinch(anti_pinch_var))
        anti_pinch_check.pack(pady=5)

        # Threshold setting
        threshold_frame = ttk.Frame(control_frame)
        threshold_frame.pack(pady=5)
        ttk.Label(threshold_frame, text="Anti-Pinch Threshold (mA):").pack(side=tk.LEFT)

        threshold_var = tk.IntVar(value=800)
        threshold_spinbox = ttk.Spinbox(threshold_frame, from_=100, to=2000,
                                       textvariable=threshold_var, width=10,
                                       command=lambda: self.set_threshold(threshold_var))
        threshold_spinbox.pack(side=tk.LEFT, padx=5)

        # All windows control
        ttk.Label(control_frame, text="All Windows:", font=('Arial', 10, 'bold')).pack(pady=10)

        btn_all_up = ttk.Button(control_frame, text="All Auto Up",
                               command=self.all_windows_up)
        btn_all_up.pack(pady=2)

        btn_all_down = ttk.Button(control_frame, text="All Auto Down",
                                 command=self.all_windows_down)
        btn_all_down.pack(pady=2)

        btn_all_stop = ttk.Button(control_frame, text="All Stop",
                                 command=self.all_windows_stop)
        btn_all_stop.pack(pady=2)

        # Reset button
        ttk.Separator(control_frame, orient=tk.HORIZONTAL).pack(fill=tk.X, pady=10)
        btn_reset = ttk.Button(control_frame, text="Reset All",
                              command=self.reset_all)
        btn_reset.pack(pady=5)

    def create_status_display(self, parent):
        """Create status display panel"""
        status_frame = ttk.LabelFrame(parent, text="System Status", padding="10")
        status_frame.grid(row=2, column=1, pady=10, sticky=(tk.W, tk.E, tk.N, tk.S))

        # Status text
        self.status_text = tk.Text(status_frame, height=15, width=40,
                                   state='disabled', font=('Courier', 9))
        self.status_text.pack(fill=tk.BOTH, expand=True)

        # Scrollbar
        scrollbar = ttk.Scrollbar(status_frame, command=self.status_text.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.status_text.config(yscrollcommand=scrollbar.set)

        self.log_message("System initialized")
        self.log_message("Ready for testing")

    def on_slider_change(self, window_id, value):
        """Handle slider change (display only)"""
        pass

    def move_window(self, window_id, direction):
        """Manual window movement"""
        window = self.windows[window_id]
        if direction == 'up':
            window['target'] = min(100, window['position'] + 5)
            window['state'] = 'MOVING_UP'
            self.log_message(f"{window_id}: Manual up")
        else:
            window['target'] = max(0, window['position'] - 5)
            window['state'] = 'MOVING_DOWN'
            self.log_message(f"{window_id}: Manual down")

    def auto_up(self, window_id):
        """Auto up (one-touch)"""
        window = self.windows[window_id]
        window['target'] = 100
        window['state'] = 'AUTO_UP'
        self.log_message(f"{window_id}: Auto up started")

    def auto_down(self, window_id):
        """Auto down (one-touch)"""
        window = self.windows[window_id]
        window['target'] = 0
        window['state'] = 'AUTO_DOWN'
        self.log_message(f"{window_id}: Auto down started")

    def stop_window(self, window_id):
        """Stop window movement"""
        window = self.windows[window_id]
        window['target'] = window['position']
        window['state'] = 'IDLE'
        window['current'] = 0
        self.log_message(f"{window_id}: Stopped")

    def all_windows_up(self):
        """Move all windows up"""
        for window_id in self.windows.keys():
            self.auto_up(window_id)

    def all_windows_down(self):
        """Move all windows down"""
        for window_id in self.windows.keys():
            self.auto_down(window_id)

    def all_windows_stop(self):
        """Stop all windows"""
        for window_id in self.windows.keys():
            self.stop_window(window_id)

    def toggle_anti_pinch(self, var):
        """Toggle anti-pinch feature"""
        self.anti_pinch_enabled = var.get()
        status = "enabled" if self.anti_pinch_enabled else "disabled"
        self.log_message(f"Anti-pinch {status}")

    def set_threshold(self, var):
        """Set anti-pinch threshold"""
        self.anti_pinch_threshold = var.get()
        self.log_message(f"Anti-pinch threshold set to {self.anti_pinch_threshold} mA")

    def toggle_obstacle(self, window_id, var):
        """Toggle obstacle simulation"""
        self.obstacle_enabled[window_id] = var.get()
        status = "enabled" if var.get() else "disabled"
        self.log_message(f"{window_id}: Obstacle simulation {status}")

    def reset_all(self):
        """Reset all windows to initial state"""
        for window_id in self.windows.keys():
            self.windows[window_id] = {
                'position': 0, 'state': 'IDLE', 'current': 0, 'target': 0
            }
            self.obstacle_enabled[window_id] = False
            self.window_widgets[window_id]['obstacle_var'].set(False)
        self.log_message("All windows reset")

    def log_message(self, message):
        """Log message to status display"""
        self.status_text.config(state='normal')
        timestamp = time.strftime('%H:%M:%S')
        self.status_text.insert(tk.END, f"[{timestamp}] {message}\n")
        self.status_text.see(tk.END)
        self.status_text.config(state='disabled')

    def update_simulation(self):
        """Update simulation state"""
        for window_id, window in self.windows.items():
            if window['state'] in ['MOVING_UP', 'AUTO_UP']:
                # Move up
                if window['position'] < window['target']:
                    window['position'] += 1
                    window['current'] = 200 + (60 * 5)  # Simulate current

                    # Check anti-pinch
                    if (self.anti_pinch_enabled and
                        self.obstacle_enabled[window_id] and
                        window['position'] > 30):
                        window['current'] = 1000  # High current
                        if window['current'] > self.anti_pinch_threshold:
                            window['state'] = 'ANTI_PINCH'
                            window['target'] = max(0, window['position'] - 10)
                            self.log_message(f"{window_id}: Anti-pinch activated!")
                            messagebox.showwarning("Anti-Pinch",
                                                 f"{window_id} window: Obstacle detected!")
                else:
                    window['state'] = 'IDLE'
                    window['current'] = 0

            elif window['state'] in ['MOVING_DOWN', 'AUTO_DOWN']:
                # Move down
                if window['position'] > window['target']:
                    window['position'] -= 1
                    window['current'] = 200 + (60 * 5)
                else:
                    window['state'] = 'IDLE'
                    window['current'] = 0

            elif window['state'] == 'ANTI_PINCH':
                # Reverse movement
                if window['position'] > window['target']:
                    window['position'] -= 1
                    window['current'] = 200
                else:
                    window['state'] = 'IDLE'
                    window['current'] = 0

            elif window['state'] == 'IDLE':
                window['current'] = 0

            # Update UI
            self.window_widgets[window_id]['position_var'].set(window['position'])
            self.window_widgets[window_id]['position_label'].config(
                text=f"Position: {window['position']}%")
            self.window_widgets[window_id]['current_label'].config(
                text=f"Current: {window['current']} mA")
            self.window_widgets[window_id]['state_label'].config(
                text=f"State: {window['state']}")

    def start_simulation(self):
        """Start simulation thread"""
        self.simulation_running = True

        def simulation_loop():
            while self.simulation_running:
                self.update_simulation()
                time.sleep(0.1)  # 100ms update rate

        thread = threading.Thread(target=simulation_loop, daemon=True)
        thread.start()

    def on_closing(self):
        """Handle window closing"""
        self.simulation_running = False
        self.root.destroy()


def main():
    """Main function"""
    root = tk.Tk()
    app = WindowControllerGUI(root)
    root.protocol("WM_DELETE_WINDOW", app.on_closing)
    root.mainloop()


if __name__ == '__main__':
    main()
