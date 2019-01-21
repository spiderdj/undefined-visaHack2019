# coding: utf-8
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class BUDGETTABLE(db.Model):
    __tablename__ = 'BUDGET_TABLE'

    BUDGET_ID = db.Column(db.Integer, primary_key=True)
    LEISURE = db.Column(db.Integer, nullable=False)
    SUPERMARKET = db.Column(db.Integer, nullable=False)
    TRAVEL = db.Column(db.Integer, nullable=False)
    FOOD_DRINK = db.Column(db.Integer, nullable=False)
    ELECTRONICS_MEDIA = db.Column(db.Integer, nullable=False)
    OTHER = db.Column(db.Integer, nullable=False)


class ITEMTYPETABLE(db.Model):
    __tablename__ = 'ITEM_TYPE_TABLE'

    ITEM_TYPE_ID = db.Column(db.Integer, primary_key=True)
    ITEM_TYPE_NAME = db.Column(db.String(50), nullable=False)
    PRICE = db.Column(db.Integer, nullable=False)
    HAPPINESS_BOOST = db.Column(db.Integer, nullable=False)
    ITEM_IMG_URL = db.Column(db.String(255), nullable=False)


class ITEMUSERTABLE(db.Model):
    __tablename__ = 'ITEM_USER_TABLE'

    USER_ID = db.Column(db.ForeignKey('USER_TABLE.USER_ID'), primary_key=True, nullable=False)
    ITEM_TYPE_ID = db.Column(db.ForeignKey('ITEM_TYPE_TABLE.ITEM_TYPE_ID'), primary_key=True, nullable=False, index=True)
    QUANTITY = db.Column(db.Integer, nullable=False)

    ITEM_TYPE_TABLE = db.relationship('ITEMTYPETABLE', primaryjoin='ITEMUSERTABLE.ITEM_TYPE_ID == ITEMTYPETABLE.ITEM_TYPE_ID', backref='itemusertables')
    USER_TABLE = db.relationship('USERTABLE', primaryjoin='ITEMUSERTABLE.USER_ID == USERTABLE.USER_ID', backref='itemusertables')

    def __init__(self, USER_ID, ITEM_TYPE_ID, QUANTITY):
        self.USER_ID=USER_ID;
        self.ITEM_TYPE_ID= ITEM_TYPE_ID;
        self.QUANTITY = QUANTITY;

class PETTABLE(db.Model):
    __tablename__ = 'PET_TABLE'

    PET_ID = db.Column(db.Integer, primary_key=True)
    PET_TYPE_ID = db.Column(db.ForeignKey('PET_TYPE_TABLE.PET_TYPE_ID'), nullable=False, index=True)
    HAPPINESS_SCORE = db.Column(db.Integer, nullable=False)
    HAPPINESS_TO_AWARD = db.Column(db.Integer, nullable=False)

    PET_TYPE_TABLE = db.relationship('PETTYPETABLE', primaryjoin='PETTABLE.PET_TYPE_ID == PETTYPETABLE.PET_TYPE_ID', backref='pettables')


class PETTYPETABLE(db.Model):
    __tablename__ = 'PET_TYPE_TABLE'

    PET_TYPE_ID = db.Column(db.Integer, primary_key=True)
    PET_TYPE_NAME = db.Column(db.String(50), nullable=False)
    PET_IMG_URL = db.Column(db.String(255), nullable=False)


class USERTABLE(db.Model):
    __tablename__ = 'USER_TABLE'

    USER_ID = db.Column(db.Integer, primary_key=True)
    USER_NAME = db.Column(db.String(50), nullable=False)
    PET_ID = db.Column(db.ForeignKey('PET_TABLE.PET_ID'), nullable=False, index=True)
    MONEY_AMOUNT = db.Column(db.Integer, nullable=False)
    BUDGET_ID = db.Column(db.Integer, nullable=False)
    MONEY_TO_AWARD = db.Column(db.Integer, nullable=False)

    PET_TABLE = db.relationship('PETTABLE', primaryjoin='USERTABLE.PET_ID == PETTABLE.PET_ID', backref='usertables')

    def __init__(self, USER_ID, USER_NAME, PET_ID, MONEY_AMOUNT, BUDGET_ID, MONEY_TO_AWARD):
        self.USER_ID = USER_ID;
        self.USER_NAME = USER_NAME;
        self.BUDGET_ID = BUDGET_ID;
        self.MONEY_AMOUNT = MONEY_AMOUNT
        self.MONEY_TO_AWARD = MONEY_TO_AWARD

class TestTable(db.Model):
    __tablename__ = 'test_table'

    test_string = db.Column(db.String(255), primary_key=True)
