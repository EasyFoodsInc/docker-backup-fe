import re

def parse_config(path):
    sections = {}
    current = None

    with open(path) as f:
        for line in f:
            line = line.strip()

            if not line or line.startswith("#"):
                continue

            m = re.match(r"\[\[(.*)\]\]", line)
            if m:
                current = m.group(1)
                sections[current] = {}
                continue

            m2 = re.match(r"\[(.*)\]", line)
            if m2:
                current = m2.group(1)
                sections[current] = {}
                continue

            if "=" in line and current:
                k, v = line.split("=", 1)
                sections[current][k.strip()] = v.strip()

    return sections
