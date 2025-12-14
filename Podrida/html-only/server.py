#!/usr/bin/env python3
"""
Simple HTTP server for hosting score-tracker files on Tailscale network.
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent.absolute()

# Default port
PORT = 8000

# Allow port to be specified via command line
if len(sys.argv) > 1:
    try:
        PORT = int(sys.argv[1])
    except ValueError:
        print(f"Invalid port number: {sys.argv[1]}")
        print(f"Using default port: {PORT}")

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SCRIPT_DIR), **kwargs)
    
    def end_headers(self):
        # Add CORS headers to allow access from any origin
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Change to the script directory
    os.chdir(SCRIPT_DIR)
    
    # Create server
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Server starting on port {PORT}")
        print(f"Serving files from: {SCRIPT_DIR}")
        print(f"\nAccess the score tracker at:")
        print(f"  http://localhost:{PORT}/score-tracker.html")
        print(f"\nTo access via Tailscale:")
        print(f"  1. Find your Tailscale IP: tailscale ip")
        print(f"  2. Access: http://<your-tailscale-ip>:{PORT}/score-tracker.html")
        print(f"\nPress Ctrl+C to stop the server\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped.")

if __name__ == "__main__":
    main()

