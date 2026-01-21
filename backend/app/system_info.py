import socket
import psutil
import shutil

def get_system_info():
    hostname = socket.gethostname()
    ip = socket.gethostbyname(hostname)

    cpu = psutil.cpu_percent()
    cores = psutil.cpu_count()
    ram = psutil.virtual_memory().total // (1024**3)

    disk = shutil.disk_usage("/")
    free_disk = disk.free // (1024**3)

    return {
        "hostname": hostname,
        "ip": ip,
        "cpu_percent": cpu,
        "cores": cores,
        "ram_gb": ram,
        "free_disk_gb": free_disk
    }
