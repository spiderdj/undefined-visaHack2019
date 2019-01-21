from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from sqlalchemy.sql.expression import Tuple
from models import *
from sqlalchemy.orm import load_only

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://flask_user:Flaskiscool123!@localhost/budgit_db'
CORS(app, supports_credentials=True)

db = SQLAlchemy(app)

ma = Marshmallow(app)




#------------ Define Schemas
class MoneyToAwardSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ['MONEY_TO_AWARD']



class HappinessToAwardSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ['HAPPINESS_TO_AWARD']

class ItemsSchema(ma.Schema):
    class Meta:
        fields = ["ITEM_TYPE_ID","ITEM_TYPE_NAME","PRICE","HAPPINESS_BOOST","ITEM_IMG_URL"];

class OwnedItemsSchema(ma.Schema):
    class Meta:
        fields = ["ITEM_TYPE_ID","ITEM_TYPE_NAME","PRICE","HAPPINESS_BOOST","ITEM_IMG_URL", "QUANTITY"];


class UserSchema(ma.Schema):
    class Meta:
        fields = ["USER_ID","USER_NAME","PET_ID","MONEY_AMOUNT", "BUDGET_ID","MONEY_TO_AWARD"]

class PetTypeSchema(ma.Schema):
    class Meta:
        fields = ["PET_TYPE_ID", "PET_TYPE_NAME", "PET_IMG_URL"]

class PetByUserSchema(ma.Schema):
    class Meta:
        fields =  ["USER_ID", "PET_ID"],["PET_ID","PET_TYPE_ID"], ["PET_TYPE_ID"]#,"HAPPINESS_SCORE","HAPPINESS_TO_AWARD"]

class BudgetSchema(ma.Schema):
    class Meta:
        fields = ["BUDGET_ID","LEISURE","SUPERMARKET","TRAVEL", "FOOD_DRINK", "ELECTRONICS_MEDIA","OTHER"];

class ItemTypeUserSchema(ma.Schema):
    class Meta:
        fields = ["ITEM_TYPE_ID", "USER_ID", "QUANTITY"]

#-------------------------------------------------------
class test_table(db.Model):
    test_string = db.Column('test_string', db.String(255), primary_key=True)

    def __init__(self,test_string):
        self.test_string = test_string

@app.route('/')
def show_all():
    resultList = test_table.query.all()
    print(resultList)
    # return jsonify(results = resultList)
    return jsonify(response=resultList)


#----------------------------------------------------
# endpoint to show all users
@app.route("/user", methods=["GET"])
def GetAllUsers():
    all_users = USERTABLE.query.all()
    result = user_schema.dump(all_users)
    return jsonify(result.data)

import json;
# endpoint to get user detail by id
@app.route("/user/<id>", methods=["GET"])
def GetUser(id):

    user = db.session.query(USERTABLE).filter(USERTABLE.USER_ID==id).one_or_none();
    #user =    USERTABLE.query.get(id)

    userschema = UserSchema()
    return userschema.jsonify(user);
    #return json.dumps([row._asdict() for row in user])


# endpoint to get pet by user id
@app.route("/pet/<id>", methods=["GET"])
def GetPetByUserID(id):
    user = db.session.query(USERTABLE).filter(USERTABLE.USER_ID==id).one_or_none();
    pet = db.session.query(PETTABLE).filter(PETTABLE.PET_ID==user.PET_ID).one_or_none();
    pet_info = db.session.query(PETTYPETABLE).filter(PETTYPETABLE.PET_TYPE_ID==pet.PET_TYPE_ID).one_or_none();

    #return json.dumps({"USER_ID": id, "HAPPINESS_SCORE": pet.HAPPINESS_SCORE,"PET_TYPE_ID": pet.PET_TYPE_ID, "PET_TYPE_NAME": pet_info.PET_TYPE_NAME,"PET_IMG_URL": pet_info.PET_IMG_URL})
    return jsonify(USER_ID= id, HAPPINESS_SCORE= pet.HAPPINESS_SCORE,PET_TYPE_ID= pet.PET_TYPE_ID, PET_TYPE_NAME= pet_info.PET_TYPE_NAME,PET_IMG_URL=pet_info.PET_IMG_URL)
    #return petsch.jsonify(pets)
    #return json.dumps(pets);

# endpoint to get money to award of user id
@app.route("/moneytoaward/<id>", methods=["GET"])
def GetMoneyToAward(id):
    user = USERTABLE.query.get(id)
    maschema = MoneyToAwardSchema()
    return maschema.jsonify(user)

# endpoint to reset money to award of user id
@app.route("/resetmoneytoaward/<id>", methods=["POST"])
def ResetMoneyToAward(id):
    user = USERTABLE.query.get(id)
    user.money_to_award = 0;

    db.session.commit();
    usersch = UserSchema()
    return usersch.jsonify(user)


# endpoint to get budget by user id
@app.route("/budget/<id>", methods=["GET"])
def GetBudgetByUserID(id):
    db.session.expire_all();

    user = db.session.query(USERTABLE).filter(USERTABLE.USER_ID == id).first();
    budget = db.session.query(BUDGETTABLE).filter(BUDGETTABLE.BUDGET_ID==user.BUDGET_ID).first();
    bsh = BudgetSchema();
    return bsh.jsonify(budget)


# endpoint to set budget by user id
@app.route("/budget/<id>", methods=["PUT"])
def SetBudget(id):
    db.session.expire_all();

    user = USERTABLE.query.get(id)

    budget = db.session.query(BUDGETTABLE).filter(BUDGETTABLE.BUDGET_ID==user.BUDGET_ID).first()


    budget.LEISURE = int(request.json['LEISURE']);
    budget.SUPERMARKET = int(request.json['SUPERMARKET'])
    budget.TRAVEL = int(request.json['TRAVEL'])
    budget.FOOD_DRINK = int(request.json['FOOD_DRINK'])
    budget.ELECTRONICS_MEDIA = int(request.json['ELECTRONICS_MEDIA'])
    budget.OTHER = int(request.json['OTHER'])


    db.session.commit();
    bsh = BudgetSchema();
    str =  bsh.jsonify(budget)

    db.session.remove();

    return str;
# endpoint to reset money to award of user id
@app.route("/resethappinesstoaward/<id>", methods=["POST"])
def ResetHappinessToAward(id):
    user = USERTABLE.query.get(id)
    pet = PETTABLE.query.get(user.pet_id)

    pet.happiness_to_award = 0;

    db.session.commit();

    ha_schema = HappinessToAwardSchema();

    return ha_schema.jsonify(pet)


#endpoint to get items owned by a user
@app.route("/item_type/<id>", methods=["GET"])
def GetOwnedItems(id):

    seq = db.session.query(ITEMUSERTABLE).filter(ITEMUSERTABLE.USER_ID==id).options(load_only("ITEM_TYPE_ID")).all();

    #owned_items = db.session.query(ITEMTYPETABLE).filter(ITEMTYPETABLE.ITEM_TYPE_ID.in_([r.ITEM_TYPE_ID for r in seq])).all()
    #print(owned_items)
    items_schema = OwnedItemsSchema(many=True);


    query = db.session.query(ITEMUSERTABLE.ITEM_TYPE_ID, ITEMUSERTABLE.QUANTITY, ITEMTYPETABLE.HAPPINESS_BOOST, ITEMTYPETABLE.ITEM_IMG_URL, ITEMTYPETABLE.ITEM_TYPE_NAME, ITEMTYPETABLE.PRICE).filter(ITEMUSERTABLE.USER_ID==id).filter(ITEMTYPETABLE.ITEM_TYPE_ID == ITEMUSERTABLE.ITEM_TYPE_ID).all();
    #print(query.statement)
    return items_schema.jsonify(query)
    #return items_schema.jsonify(owned_items)

# endpoint to show all item
@app.route("/items", methods=["GET"])
def GetAllItems():
    all_items = ITEMTYPETABLE.query.all()
    maschema = ItemsSchema(many=True)
    return maschema.jsonify(all_items)




# endpoint to buy a item to a user
@app.route("/buyitem", methods=["POST"])
def BuyItemForUser():
    item_id = int(request.json['item_type_id']);
    user_id = int(request.json['user_id']);



    item_user = db.session.query(ITEMUSERTABLE).filter(Tuple(ITEMUSERTABLE.USER_ID, ITEMUSERTABLE.ITEM_TYPE_ID).in_([(user_id,item_id)])).one_or_none()
    #Check if user has already bought this item
    if (item_user is None):
        item_user = ITEMUSERTABLE(user_id, item_id, 1);
        db.session.add(item_user)
        #db.session.flush();
        db.session.commit()


    else:
        item_user.QUANTITY = item_user.QUANTITY+1;
        #db.session.commit();


    #Reduce the total amount
    user = db.session.query(USERTABLE).filter(USERTABLE.USER_ID == user_id).one()
    item = ITEMTYPETABLE.query.get(item_id);
    print(user.MONEY_AMOUNT)
    user.MONEY_AMOUNT = user.MONEY_AMOUNT - item.PRICE;
    print(user.MONEY_AMOUNT)
    #db.session.flush();
    #db.session.save();
    try:
        db.session.commit();
    except:
        print("Rollbacked")
        db.session.rollback()
        raise



    sch = ItemTypeUserSchema();
    str = sch.jsonify(item_user);

    db.session.remove();

    return str;

#endpoint to use a item for a user
@app.route("/useitem", methods=["POST"])
def UseItemForUser():
    item_id = int(request.json['item_type_id']);
    user_id = int(request.json['user_id']);



    item_user = db.session.query(ITEMUSERTABLE).filter(Tuple(ITEMUSERTABLE.USER_ID, ITEMUSERTABLE.ITEM_TYPE_ID).in_([(user_id,item_id)])).one_or_none()
    #Check if user has already bought this item
    if (item_user is None or item_user.QUANTITY<=0):
        item_user.QUANTITY=0;
        db.session.delete(item_user)
        try:
            db.session.commit();
        except:
            db.session.rollback()
            raise



    else:
        item_user.QUANTITY = item_user.QUANTITY-1;
        #db.session.commit();


    #Reduce the total amount
    user = USERTABLE.query.get(user_id);
    #get pet from user
    pet = db.session.query(PETTABLE).filter(PETTABLE.PET_ID==user.PET_ID).first()
    item = ITEMTYPETABLE.query.get(item_id);


    pet.HAPPINESS_SCORE = pet.HAPPINESS_SCORE - item.HAPPINESS_BOOST;

    #db.session.flush();
    try:
        db.session.commit();
    except:
        db.session.rollback()
        raise



    sch = ItemTypeUserSchema();
    str = sch.jsonify(item_user);
    db.session.remove();
    return str;



#endpoint to setSpentBudetID
@app.route("/setSpentBudget/<id>", methods=["POST"])
def SetSpentBudgetForUser(id):
    user = USERTABLE.query.get(id)
    budget = BUDGETTABLE.query.get(user.BUDGET_ID)

    total_money_to_award =0;
    total_hapiness_to_award = 0;

    leisure = int(request.json['LEISURE']);
    supermarket = int(request.json['SUPERMARKET'])
    travel = int(request.json['TRAVEL'])
    food_drink = int(request.json['FOOD_DRINK'])
    electronics_media = int(request.json['ELECTRONICS_MEDIA'])
    other = int(request.json['OTHER'])

    if (budget.LEISURE >= leisure):
        total_hapiness_to_award+=20;
        total_money_to_award+=10;
    else:
        total_hapiness_to_award+=20;
        total_money_to_award+=10;

    if (budget.SUPERMARKET >= supermarket):
        total_hapiness_to_award+=20;
        total_money_to_award+=10;
    else:
        total_hapiness_to_award+=20;
        total_money_to_award+=10;

    if (budget.TRAVEL >= travel):
        total_hapiness_to_award+=20;
        total_money_to_award+=10;
    else:
        total_hapiness_to_award+=20;
        total_money_to_award+=10;


    if (budget.FOOD_DRINK >= food_drink):
        total_hapiness_to_award+=20;
        total_money_to_award+=10;
    else:
        total_hapiness_to_award+=20;
        total_money_to_award+=10;

    if (budget.ELECTRONICS_MEDIA >= electronics_media):
        total_hapiness_to_award+=20;
        total_money_to_award+=10;
    else:
        total_hapiness_to_award+=20;
        total_money_to_award+=10;

    if (budget.OTHER >= other):
        total_hapiness_to_award+=20;
        total_money_to_award+=10;
    else:
        total_hapiness_to_award+=20;
        total_money_to_award+=10;

    user.MONEY_TO_AWARD = total_money_to_award
    pet = db.session.query(PETTABLE).filter(PETTABLE.PET_ID==user.PET_ID)
    pet.HAPPINESS_TO_AWARD = total_hapiness_to_award;


    db.session.commit()

    bd = BudgetSchema()
    return bd.jsonify(budget)




#------------------------------------------------

if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0',debug = True)
