from flask import Flask
from flask_restful import Resource, Api
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_curve
import pandas as pd
import numpy as np
import json

from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.metrics import roc_curve

app = Flask(__name__)
api = Api(app)

class ROC(Resource):

    def get(self, preprocessing, c):

        df = pd.read_csv('data/transfusion.data')
        xDf = df.loc[:, df.columns != 'Donated']
        y = df['Donated']
        # get random numbers to split into train and test
        np.random.seed(1)
        r = np.random.rand(len(df))
        # split into train test
        X_train = xDf[r < 0.8]
        X_test = xDf[r >= 0.8]
        y_train = y[r < 0.8]
        y_test = y[r >= 0.8]        

        if preprocessing == "standard":
            scaler = StandardScaler()
        else:
            scaler = MinMaxScaler()

        X_train1 = scaler.fit_transform(X_train)
        X_test1 = scaler.transform(X_test)
        
        lr = LogisticRegression(C=float(c),random_state=0, solver='lbfgs')
        classifier=lr.fit(X_train1, y_train)
        y_pred = classifier.predict_proba(X_test1)
        fpr, tpr, thresholds = roc_curve(y_test,y_pred[:,1],pos_label=1)
        result=[]
        import math
        for i in range(len(fpr)):
            fpr[i] = round(fpr[i],3)
            tpr[i] = round(tpr[i],3)
            result.append({"fpr":fpr[i],"tpr":tpr[i]})
        return json.dumps(result)
        

api.add_resource(ROC, '/roc/<preprocessing>/<c>')    
    # Here you need to add the ROC resource, ex: api.add_resource(HelloWorld, '/')
    # for examples see 
    # https://flask-restful.readthedocs.io/en/latest/quickstart.html#a-minimal-api

if __name__ == '__main__':
    # load data
    df = pd.read_csv('data/transfusion.data')
    xDf = df.loc[:, df.columns != 'Donated']
    y = df['Donated']
    # get random numbers to split into train and test
    np.random.seed(1)
    r = np.random.rand(len(df))
    # split into train test
    X_train = xDf[r < 0.8]
    X_test = xDf[r >= 0.8]
    y_train = y[r < 0.8]
    y_test = y[r >= 0.8]
    app.run(debug=True)
