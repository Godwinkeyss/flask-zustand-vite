from myapp import db,app

class Friend(db.Model):
    __tablename__ ='friends'
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(120), nullable=False)
    email=db.Column(db.String(120), nullable=False)
    role=db.Column(db.String(50), nullable=False)
    gender=db.Column(db.String(50), nullable=False)
    image_url=db.Column(db.String(120), nullable=False)
    
    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "email":self.email,
            "role":self.role,
            "gender":self.gender,
            "imageUrl":self.image_ur}
        
        
with app.app_context():
    db.create_all()