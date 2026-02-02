import json

def parse_status_detailed(path):
    table = []
    current_container = None
    current_entry = {}

    with open(path, 'r') as f:
        for line in f:
            line = line.rstrip()
            if not line or line.startswith("#"):
                continue

            # Identify a new container (no leading spaces)
            if not line.startswith(" "):
                current_container = line.split(":")[0].strip()
                continue

            # Identify the start of a list item
            if "-" in line:
                # If we were already building an entry, save it before starting a new one
                if current_entry:
                    table.append(current_entry)
                
                current_entry = {"container": current_container}
                # Check if there's data on the same line as the dash
                line = line.split("-", 1)[1]

            # Parse key-value pairs (timestamp, result, message)
            if ":" in line:
                key, value = line.split(":", 1)
                key = key.strip()
                value = value.strip().strip('"') # Remove quotes
                
                if key in ["timestamp", "result", "message"]:
                    current_entry[key] = value

        # Append the very last entry processed
        if current_entry:
            table.append(current_entry)

    return table

def parse_last_errors(path, limit=10):
    errors = []
    current_container = None
    current_entry = {}

    with open(path, 'r') as f:
        for line in f:
            line = line.rstrip()
            if not line or line.startswith("#"):
                continue

            # 1. Identify Container (e.g., vault:)
            if not line.startswith(" "):
                current_container = line.split(":")[0].strip()
                continue

            # 2. Identify start of list item
            if "-" in line:
                if current_entry and current_entry.get("backupstatus") == "error":
                    errors.append(current_entry)
                
                current_entry = {"container": current_container}
                line = line.split("-", 1)[1]

            # 3. Parse timestamp and backupstatus
            if ":" in line:
                key, value = line.split(":", 1)
                key = key.strip()
                value = value.strip().strip('"')
                
                if key in ["timestamp", "backupstatus"]:
                    current_entry[key] = value

        # Check the final entry in the file
        if current_entry and current_entry.get("backupstatus") == "error":
            errors.append(current_entry)

    # Return the last 'limit' items (newest at the bottom of file)
    return errors[-limit:]

