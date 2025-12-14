# Score Tracker - Tailscale Hosting

This directory contains the score tracker application files that can be hosted on a Tailscale network.

## Files

- `score-tracker.html` - Main HTML file
- `score-tracker.js` - JavaScript functionality
- `score-tracker.css` - Styling
- `server.py` - Python HTTP server script
- `start-server.sh` - Shell script alternative

## Quick Start

### Option 1: Using Python Script (Recommended)

```bash
# Start server on default port 8000
python3 server.py

# Or specify a custom port
python3 server.py 8080
```

## Accessing via Tailscale

1. **Find your Tailscale IP:**
   ```bash
   tailscale ip
   ```
   This will show your Tailscale IPv4 address (e.g., `100.x.x.x`)

2. **Access the application:**
   - From any device on your Tailscale network, open:
     ```
     http://<your-tailscale-ip>:8000/score-tracker.html
     ```
   - Replace `<your-tailscale-ip>` with the IP from step 1
   - Replace `8000` with your chosen port if different

3. **Local access:**
   - You can also access it locally at:
     ```
     http://localhost:8000/score-tracker.html
     ```

## Notes

- The server binds to `0.0.0.0`, which means it listens on all network interfaces, including Tailscale
- Make sure your firewall allows incoming connections on the chosen port
- The server will continue running until you press `Ctrl+C`
- All devices on your Tailscale network will be able to access the application

## Troubleshooting

- **Can't access from other devices:** Check that Tailscale is running and connected on both devices
- **Port already in use:** Try a different port (e.g., 8080, 3000)
- **Firewall blocking:** You may need to allow the port through your firewall:
  ```bash
  # Ubuntu/Debian
  sudo ufw allow 8000/tcp
  
  # Or for specific Tailscale interface
  sudo ufw allow in on tailscale0 to any port 8000
  ```

