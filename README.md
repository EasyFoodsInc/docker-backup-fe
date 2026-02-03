This looks like a solid monitoring tool for your backup engine! I've structured the README to highlight the system-level access your backend requires and the modern stack you're using.

---

# 🐳 Docker Backup Dashboard

A full-stack monitoring solution designed to provide real-time visibility into the **docker-backup** engine. This dashboard allows you to track container states, verify backup integrity, and monitor system resources through a clean, unified interface.

## 🏗️ Architecture

* **Frontend**: React + Vite (serving on port `4173`).
* **Backend**: FastAPI (Python 3.12) utilizing Uvicorn (serving on port `8000`).
* **Data Sources**:
* Direct access to `/var/run/docker.sock` for container states.
* System metrics via `/proc` and `/sys`.
* Log/Config parsing from the `docker-backup` engine via shared volumes.



---

## 🚀 Getting Started

### Prerequisites

* Docker and Docker Compose installed.
* The `docker-backup` engine running on the host, with configuration and result files located at `/home/master/docker_backup/`.

### Installation & Deployment

1. **Clone the repository**:
```bash
git clone https://github.com/raskitoma/docker-backup-fe.git
cd docker-backup-fe

```


2. **Configuration**:
The dashboard expects specific files on the host system to function correctly:
* `/home/master/docker_backup/config.ini`: Main engine configuration.
* `/home/master/docker_backup/docker.version`: Version tracking.
* `/home/master/docker_backup/results/`: Directory containing `.yml` status files.


3. **Start the application**:
```bash
docker compose up -d --build

```


4. **Access the Dashboard**:
* **Frontend**: [http://localhost:4173](https://www.google.com/search?q=http://localhost:4173)
* **Backend API**: [http://localhost:18246/docs](https://www.google.com/search?q=http://localhost:18246/docs) (Swagger UI)



---

## ⚙️ Environment & Volumes

### Backend Service

The backend requires elevated read-only access to monitor the host environment effectively:

| Volume Path (Host) | Container Path | Description |
| --- | --- | --- |
| `/home/master/docker_backup/` | `/configs/params/` | Access to config and status YAMLs. |
| `/backupssh` | `/backupssh` | List and verify backup files. |
| `/var/run/docker.sock` | `/var/run/docker.sock` | Queries Docker API for container health. |
| `/proc`, `/sys`, `/` | `/host/...` | System info (CPU, RAM, Disk usage). |

---

## 🛠️ Tech Stack

### Backend

* **FastAPI**: High-performance Python framework.
* **SQLAlchemy**: Used for caching container states (SQLite).
* **Uvicorn**: ASGI server implementation.

### Frontend

* **React**: UI Library.
* **PrimeReact**: Component library (DataTable, Status tags).
* **Vite**: Next-generation frontend tooling.

---

## 📝 API Endpoints

* `GET /api/system`: Returns host CPU, Memory, and Disk metrics.
* `GET /api/containers`: Returns list of containers, filtered to exclude internal dashboard components.
* `GET /api/status`: Parses the `status.yml` from the backup engine.
* `GET /api/backups/{container}`: Scans the backup storage for specific container archives.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

**License**: [Specify your license, e.g., MIT]

---

**Would you like me to add a "Troubleshooting" section specifically for common Docker volume permission issues?**