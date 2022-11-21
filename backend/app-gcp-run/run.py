import uvicorn
import os

if __name__ == '__main__':
    uvicorn.run(
        "main:create_app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8080)),
        reload=True,
        log_config="./logging.yaml"
    )
