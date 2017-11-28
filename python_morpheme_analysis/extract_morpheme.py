from pymongo import MongoClient
from konlpy.tag import Kkma
from konlpy.utils import pprint

kkma = Kkma()
client = MongoClient('mongodb://localhost/')

db = client.rosybrown
comments = db.comments
morpheme_list = db.morphemelists

def calculateRating():
    total_cnt = comments.count()
    total_rating = 0
    for comment in comments.find():
        total_rating += comment['rating']
    
    return (total_rating/total_cnt)

def extractOverAverage(average):
    morpheme_list.drop()
    for comment in comments.find({"rating":{ "$gt": average}}):
        result = kkma.nouns(comment["comment"])
        
        for i in result:
            pprint(i)
            morpheme_list.insert({"noun":i})

extractOverAverage(calculateRating())