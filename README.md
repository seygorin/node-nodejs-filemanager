# File Manager: Node.js

## Description

This is a File Manager implementation using Node.js APIs. The File Manager is capable of performing the following tasks:

- Work using CLI
- Perform basic file operations (copy, move, delete, rename, etc.)
- Utilize Streams API
- Get information about the host machine operating system
- Perform hash calculations
- Compress and decompress files

## Technical Requirements

- No external dependencies are required
- Uses Node.js version 22.x.x (22.9.0 or higher)
- The program is started by npm-script `start` in the following way:
  ```bash
  npm run start -- --username=your_username
  ```

## Features

### General

- Displays a welcome message with the username upon starting
- Shows a goodbye message when exiting
- Prints the current working directory after each operation
- Starts in the user's home directory
- Handles invalid inputs and operation failures gracefully

### Navigation & Working Directory

- `up`: Move up one directory level
- `cd path_to_directory`: Change to a specified directory
- `ls`: List files and folders in the current directory

### File Operations

- `cat path_to_file`: Read and print file contents (uses Readable stream)
- `add new_file_name`: Create an empty file
- `rn path_to_file new_filename`: Rename a file
- `cp path_to_file path_to_new_directory`: Copy a file (uses Readable and Writable streams)
- `mv path_to_file path_to_new_directory`: Move a file (uses Readable and Writable streams)
- `rm path_to_file`: Delete a file

### Operating System Info

- `os --EOL`: Get EOL (default system End-Of-Line)
- `os --cpus`: Get host machine CPUs info
- `os --homedir`: Get home directory
- `os --username`: Get current system user name
- `os --architecture`: Get CPU architecture

### Hash Calculation

- `hash path_to_file`: Calculate and print file hash

### Compression Operations

- `compress path_to_file path_to_destination`: Compress file using Brotli algorithm (uses Streams API)
- `decompress path_to_file path_to_destination`: Decompress file using Brotli algorithm (uses Streams API)

## Implementation Details

- The codebase is written in ESM modules
- Asynchronous Node.js APIs are used throughout
- Streams API is utilized for file reading, copying, moving, and compression operations
- The codebase is separated into multiple modules for better organization

## Usage

1. Clone the repository
2. Run `npm install` to install dependencies
3. Start the File Manager using `npm run start -- --username=your_username`
4. Use the available commands to navigate and manage files
5. Type `.exit` or press `Ctrl+C` to exit the program
