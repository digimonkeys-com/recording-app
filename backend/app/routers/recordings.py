from fastapi import APIRouter, status, Depends, UploadFile
from sqlalchemy.orm import Session
from fastapi import File, Form

import os
import uuid

from db.database import get_db
from models.recording import Recording
from models.sample import Sample
from utils.convert import convert_and_save_file, convert_to_wav_and_save_file
from schemas import user_schemas, info_schemas
from auth.jwt_helper import get_current_user
from settings import get_settings

app_settings = get_settings()
router = APIRouter(prefix=f"{app_settings.root_path}", tags=["Recordings"])


@router.post(
    "/recording",
    status_code=status.HTTP_200_OK,
    response_model=info_schemas.Info
)
async def store_recorded_sample(
        file: bytes = File(),
        browser: str = Form(),
        id_: int = Form(),
        db: Session = Depends(get_db),
        current_user: user_schemas.UserDetail = Depends(get_current_user),
):
    if not os.path.exists("data/temp"):
        os.mkdir("data/temp")

    recording = Recording.get_recording_by_user_id_and_sample_id(db, id_, current_user)
    filename, location, duration = convert_and_save_file(id_, browser, file, current_user)

    if recording:
        current_user.total_duration += duration
        recording.is_recorded = True
        db.commit()
    else:
        return {"info": f"Sample with ID {id_} for user {current_user.id} doesn't exist.'"}
    return {"info": f"File saved at '{location}'"}


@router.post(
    "/recording-file",
    status_code=status.HTTP_201_CREATED,
    response_model=info_schemas.Info
)
async def upload_new_sample(
        file: UploadFile,
        current_user: user_schemas.User = Depends(get_current_user)
):
    temp_dir = "data/temp/"
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)

    filename = f"{current_user.name}-{uuid.uuid4()}" + file.filename[-4:]

    with open(temp_dir + filename, "wb") as my_file:
        content = await file.read()
        my_file.write(content)
        my_file.close()

    converted_file_location = convert_to_wav_and_save_file(temp_dir, filename)
    os.remove(temp_dir + filename)

    return {"info": f"file saved at '{converted_file_location}'"}


def create_recordings_for_user(db, user):
    samples = Sample.get_all_samples(db)
    to_create = []
    for sample in samples:
        record = db.query(Recording).filter(
            Recording.sample_id == sample.id,
            Recording.user_id == user.id
        ).first()

        if not record:
            to_create.append(Recording(user_id=user.id, sample_id=sample.id))

    db.add_all(to_create)
    db.commit()

    if not os.path.exists("data"):
        os.mkdir("data")
    if not os.path.exists(f"data/{user.id}"):
        os.mkdir(f"data/{user.id}")
