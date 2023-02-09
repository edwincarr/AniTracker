from app.models import db, User_List

def seed_lists():
  demo_aot = User_List(user_id=1,anime_id=16498,progress=3, status=1)

  db.session.add(demo_aot)
  db.session.commit()
