# coding: utf-8
from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.dialects.mysql import INTEGER
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class BUDGETTABLE(Base):
    __tablename__ = 'BUDGET_TABLE'

    BUDGET_ID = Column(INTEGER(11), primary_key=True)
    LEISURE = Column(INTEGER(11), nullable=False)
    SUPERMARKET = Column(INTEGER(11), nullable=False)
    TRAVEL = Column(INTEGER(11), nullable=False)
    FOOD_DRINK = Column(INTEGER(11), nullable=False)
    ELECTRONICS_MEDIA = Column(INTEGER(11), nullable=False)
    OTHER = Column(INTEGER(11), nullable=False)


class ITEMTYPETABLE(Base):
    __tablename__ = 'ITEM_TYPE_TABLE'

    ITEM_TYPE_ID = Column(INTEGER(11), primary_key=True)
    ITEM_TYPE_NAME = Column(String(50), nullable=False)
    PRICE = Column(INTEGER(11), nullable=False)
    HAPPINESS_BOOST = Column(INTEGER(11), nullable=False)
    ITEM_IMG_URL = Column(String(255), nullable=False)


class PETTYPETABLE(Base):
    __tablename__ = 'PET_TYPE_TABLE'

    PET_TYPE_ID = Column(INTEGER(11), primary_key=True)
    PET_TYPE_NAME = Column(String(50), nullable=False)
    PET_IMG_URL = Column(String(255), nullable=False)


class PETTABLE(Base):
    __tablename__ = 'PET_TABLE'

    PET_ID = Column(INTEGER(11), primary_key=True)
    PET_TYPE_ID = Column(ForeignKey('PET_TYPE_TABLE.PET_TYPE_ID'), nullable=False, index=True)
    HAPPINESS_SCORE = Column(INTEGER(11), nullable=False)
    HAPPINESS_TO_AWARD = Column(INTEGER(11), nullable=False)

    PET_TYPE_TABLE = relationship('PETTYPETABLE')


class USERTABLE(Base):
    __tablename__ = 'USER_TABLE'

    USER_ID = Column(INTEGER(11), primary_key=True)
    USER_NAME = Column(String(50), nullable=False)
    PET_ID = Column(ForeignKey('PET_TABLE.PET_ID'), nullable=False, index=True)
    MONEY_AMOUNT = Column(INTEGER(11), nullable=False)
    BUDGET_ID = Column(INTEGER(11), nullable=False)
    MONEY_TO_AWARD = Column(INTEGER(11), nullable=False)

    PET_TABLE = relationship('PETTABLE')


class ITEMUSERTABLE(Base):
    __tablename__ = 'ITEM_USER_TABLE'

    USER_ID = Column(ForeignKey('USER_TABLE.USER_ID'), primary_key=True, nullable=False)
    ITEM_TYPE_ID = Column(ForeignKey('ITEM_TYPE_TABLE.ITEM_TYPE_ID'), primary_key=True, nullable=False, index=True)
    QUANTITY = Column(INTEGER(11), nullable=False)

    ITEM_TYPE_TABLE = relationship('ITEMTYPETABLE')
    USER_TABLE = relationship('USERTABLE')
