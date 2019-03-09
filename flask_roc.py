import pandas as pd
import numpy as np
import sklearn
from sklearn.linear_model import LogisticRegression
from sklearn import preprocessing
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_curve
from sklearn import metrics
from flask import Flask
from flask_cors import CORS
import simplejson as json
from flask import Flask,jsonify


app = Flask(__name__)
CORS(app)

@app.route('/roc_curve/c=<c>', methods=['GET'])
def roc_curve(c):
    
    X_train1 = preprocessing.scale(X_train)
    X_test1=preprocessing.scale(X_test)
    lr = LogisticRegression(C=float(c),random_state=0, solver='lbfgs')
    classifier=lr.fit(X_train1, y_train)
    print(lr)
    y_pred = classifier.predict_proba(X_test1)
    fpr, tpr, thresholds = metrics.roc_curve(y_test,y_pred[:,1],pos_label=1)
    result=[]
    for i in range(len(fpr)):
        result.append({"fpr":fpr[i],"tpr":tpr[i]})
    return json.dumps(result)

# Dont edit main

df = pd.read_csv('transfusion.data')
xDf = df.loc[:, df.columns != 'Donated']
y = df['Donated']
np.random.seed(1)
r = np.random.rand(len(df))
X_train = xDf[r < 0.8]
X_test = xDf[r >= 0.8]
y_train = y[r < 0.8]
y_test = y[r >= 0.8]

app.run(debug = True)
