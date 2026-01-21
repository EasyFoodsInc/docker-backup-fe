import docker

client = docker.from_env()

def get_running_containers():
    result = []
    for c in client.containers.list(all=True):
        result.append({
            "name": c.name,
            "status": c.status,
            "image": c.image.tags
        })
    return result
