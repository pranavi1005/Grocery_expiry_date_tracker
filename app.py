from flask import Flask, request, jsonify, render_template, session
from datetime import datetime, timedelta
import random

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set a secure secret key for sessions

# Sample grocery data structure
grocery_items = [
    {"name": "Milk", "expiry": "2025-04-05"},
    {"name": "Eggs", "expiry": "2025-03-30"},
    {"name": "Tomato", "expiry": "2025-04-12"}
]

# Fake User Authentication (for simplicity, hard-coded user)
USER_CREDENTIALS = {"username": "admin", "password": "password"}

# Home Route
@app.route('/')
def home():
    return render_template('index.html')

# Grocery Route
@app.route('/groceries', methods=['GET', 'POST'])
def groceries():
    if request.method == 'POST':
        # Add a new item
        new_item = {
            "name": request.form['item_name'],
            "expiry": request.form['expiry_date']
        }
        grocery_items.append(new_item)
        return jsonify(grocery_items)
    return jsonify(grocery_items)

# Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == USER_CREDENTIALS['username'] and password == USER_CREDENTIALS['password']:
            session['logged_in'] = True
            return redirect('/groceries')
        else:
            return "Invalid credentials, please try again."
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
