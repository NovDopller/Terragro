from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Ajuste a senha aqui para a sua instalação MySQL:
db = mysql.connector.connect(
    host="localhost",
    user="root",           # ou outro usuário se você criou
    password="ja748xt500dopller123",  # coloque a senha do seu MySQL
    database="sistema_agro"
)
cursor = db.cursor(dictionary=True)

@app.route('/api/cadastrar', methods=['POST'])
def cadastrar():
    data = request.json
    usuario = data.get('usuario')
    senha = data.get('senha')
    if not usuario or not senha:
        return jsonify({"msg": "Preencha todos os campos."}), 400
    try:
        cursor.execute("INSERT INTO usuarios (usuario, senha) VALUES (%s, %s)", (usuario, senha))
        db.commit()
        return jsonify({"msg": "Cadastro realizado!"})
    except mysql.connector.errors.IntegrityError:
        return jsonify({"msg": "Usuário já existe!"}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    usuario = data.get('usuario')
    senha = data.get('senha')
    cursor.execute("SELECT * FROM usuarios WHERE usuario=%s AND senha=%s", (usuario, senha))
    user = cursor.fetchone()
    if user:
        return jsonify({"ok": True})
    else:
        return jsonify({"msg": "Usuário ou senha inválidos!"}), 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)

