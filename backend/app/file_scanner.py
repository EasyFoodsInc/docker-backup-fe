import os
import re

def scan_backups(base_path, container):

    folder = os.path.join(base_path, container)

    stats = {"full": 0, "diff": 0, "incr": 0, "files": []}

    if not os.path.exists(folder):
        return stats

    for f in os.listdir(folder):
        if f.startswith("full"):
            stats["full"] += 1
        elif f.startswith("diff"):
            stats["diff"] += 1
        elif f.startswith("incr"):
            stats["incr"] += 1

        stats["files"].append(f)

    return stats
