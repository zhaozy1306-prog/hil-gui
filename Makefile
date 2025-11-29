# Makefile for BCM Window Controller
# Author: STM32 HIL-GUI Project
# Date: 2025-11-29

# Compiler and flags
CC = gcc
CFLAGS = -Wall -Wextra -std=c99 -I./src

# Directories
SRC_DIR = src
BUILD_DIR = build

# Source files
SOURCES = $(SRC_DIR)/window_controller.c \
          $(SRC_DIR)/stm32_hal_impl.c \
          $(SRC_DIR)/main.c

# Object files
OBJECTS = $(BUILD_DIR)/window_controller.o \
          $(BUILD_DIR)/stm32_hal_impl.o \
          $(BUILD_DIR)/main.o

# Target executable
TARGET = $(BUILD_DIR)/window_controller_sim

# Default target
all: $(TARGET)

# Create build directory
$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

# Compile source files
$(BUILD_DIR)/%.o: $(SRC_DIR)/%.c | $(BUILD_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

# Link executable
$(TARGET): $(OBJECTS)
	$(CC) $(OBJECTS) -o $@
	@echo "Build complete: $(TARGET)"

# Run simulation
run: $(TARGET)
	./$(TARGET)

# Run GUI
gui:
	cd gui && python3 window_controller_gui.py

# Clean build files
clean:
	rm -rf $(BUILD_DIR)

# Help
help:
	@echo "BCM Window Controller - Makefile"
	@echo "=================================="
	@echo "Targets:"
	@echo "  all     - Build the simulation (default)"
	@echo "  run     - Build and run simulation"
	@echo "  gui     - Run the GUI interface"
	@echo "  clean   - Remove build files"
	@echo "  help    - Show this help message"

.PHONY: all run gui clean help
