import uvicorn
import os
import subprocess

if __name__ == '__main__':
    migrations = subprocess.run(["alembic", "upgrade", "head"], stdout=subprocess.PIPE, text=True)
    print(migrations.stdout)
    uvicorn.run(
        "main:create_app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8080)),
        reload=True,
        log_config="./logging.yaml"
    )
