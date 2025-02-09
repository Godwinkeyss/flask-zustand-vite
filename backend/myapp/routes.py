from flask import jsonify, request, abort, url_for, redirect
from myapp import app, db
from .models import Friend

@app.route('/api/friends', methods=['GET'])
def index():
    friends = Friend.query.all()
    return jsonify([friend.to_json() for friend in friends])
    
    
@app.route('/friends', methods=['POST'])
def friends():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        role = data.get('role')
        gender = data.get('gender')
        if gender.lower() == "male":
            imageUrl = f'https://avatar.iran.liara.run/public/boy?username={name}'
        elif gender.lower() == "female":
            imageUrl = f'https://avatar.iran.liara.run/public/girl?username={name}'
        else:
            imageUrl = None
        
        new_friends = Friend(name=name, email=email, role=role, gender=gender, image_url=imageUrl)
        db.session.add(new_friends)
        db.session.commit()
        return jsonify(new_friends.to_json())
    except Exception as e:
        db.session.rollback()
        print(f'Error: str({e})')
        return redirect(url_for('index'))
    finally:
        db.session.close()
        
        
        
@app.route('/friends/<int:id>', methods=['GET'])
def get_friend(id):
    try:
        friend = Friend.query.get_or_404(id)
        return jsonify(friend.to_json())
    except Exception as e:
        print(f'Error: {str(e)}')
        return jsonify({"error": "Something went wrong"}), 500
    finally:
        db.session.close()
    
@app.route('/friends/<int:id>', methods=['DELETE'])
def delete_friend(id):
    try:
        friend = Friend.query.get_or_404(id)
        db.session.delete(friend)
        db.session.commit()
        
        return jsonify({"msg":"Friend deleted successfully"}), 200
    except Exception as e:
        print(f'Error: {str(e)}')
        return jsonify({"error": "Something went wrong"}), 500
    finally:
        db.session.close()
    
    
    
@app.route('/friend/<int:id>', methods=['PUT'])
def edit_friend(id):
    try:
        friend = Friend.query.get_or_404(id)
        data = request.json
        friend.name = data.get("name", friend.name)
        friend.email = data.get("email", friend.email)
        friend.role = data.get("role", friend.role)
       
        
        
        db.session.commit()
        return jsonify(friend.to_json()), 200
    except Exception as e:
        db.session.rollback()
        print(f'Error: {str(e)}')
        return jsonify({"error": "Something went wrong"}), 500
    finally:
        db.session.close()
        
        
        