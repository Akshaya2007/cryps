from flask import Flask, jsonify, request

app = Flask(__name__)

# Dummy data for initial portfolio
portfolio = {
    "BTC": {"amount": 2.5},
    "ETH": {"amount": 10},
    "LTC": {"amount": 20}
}

# Route to fetch portfolio balance
@app.route('/portfolio')
def get_portfolio():
    return jsonify(portfolio)

# Route to update portfolio holdings
@app.route('/portfolio', methods=['POST'])
def update_portfolio():
    data = request.get_json()
    for symbol, amount in data.items():
        if amount <= 0:
            del portfolio[symbol]
        else:
            portfolio[symbol] = {"amount": amount}
    return jsonify({"message": "Portfolio updated successfully"})

if __name__ == '__main__':
    app.run(debug=True)
