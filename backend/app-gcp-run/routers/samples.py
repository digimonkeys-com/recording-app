from fastapi import APIRouter, status, Depends, HTTPException
from db.database import get_db
from sqlalchemy.orm import Session

from models.user import User
from models.sample import Sample
from models.recording import Recording
from auth.jwt_helper import get_current_user
from schemas import raw_text_schemas, status_schemas, sample_schemas, info_schemas, user_schemas
from settings import get_settings

app_settings = get_settings()
router = APIRouter(prefix=f"{app_settings.root_path}", tags=["Samples"])


@router.post(
    "/sample",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_current_user)],
    response_model=info_schemas.Info
)
async def add_samples(
        text: raw_text_schemas.RawText,
        db: Session = Depends(get_db)
):
    sentences = text.content.split(". ")
    samples = []
    for sentence in sentences:
        samples.append(Sample(transcription=(sentence + '.')))

    db.add_all(samples)
    db.commit()
    db.begin()

    for n in samples:
        db.refresh(n)

    users = User.get_all_users(db)
    to_create = []
    for sample in samples:
        for user in users:
            to_create.append(Recording(sample_id=sample.id, user_id=user.id))

    db.add_all(to_create)
    db.commit()
    return {"info": f"{len(samples)} samples created."}


@router.get(
    "/sample",
    status_code=status.HTTP_200_OK,
    response_model=sample_schemas.UnrecordedSample

)
async def get_unrecorded_sample(
        db: Session = Depends(get_db),
        current_user: user_schemas.User = Depends(get_current_user)
):
    record = db.query(Recording).filter(
        Recording.user_id == current_user.id,
        Recording.is_recorded.is_(None)
    ).first()

    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="There is no unrecorded sample left."
        )

    sample = db.query(Sample).filter(Sample.id == record.sample_id).first()
    return sample


@router.get("/status",
            status_code=status.HTTP_200_OK,
            response_model=status_schemas.Status
            )
async def get_status(
        db: Session = Depends(get_db),
        current_user: user_schemas.UserDetail = Depends(get_current_user)
):
    dur = current_user.total_duration
    all_samples = len(db.query(Recording).filter(Recording.user_id == current_user.id).all())
    unrecorded_samples = len(db.query(Recording).filter(Recording.user_id == current_user.id,
                                                        Recording.is_recorded.is_(None)).all())
    recorded_samples = all_samples - unrecorded_samples
    return {"duration": dur, "all_samples": all_samples, "unrecorded_samples": unrecorded_samples,
            "recorded_samples": recorded_samples}


@router.delete(
    "/sample/{id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_current_user)],
    response_model=info_schemas.Info
)
async def delete_sample(
        sample_id: int,
        db: Session = Depends(get_db)
):
    db.query(Sample).filter(Sample.id == sample_id).delete()
    db.commit()
    return {'info': f'Sample with id {sample_id} deleted'}
