from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Ajuste os dados da sua conexão MySQL conforme necessário
conexao = mysql.connector.connect(
    host="localhost",
    user="root",          # ou outro usuário se você criou
    password="ja748xt500dopller123",  # coloque a senha do seu MySQL
    database="seu_banco_de_dados"
)

# Exemplo de uma rota qualquer, já sem necessidade de login!
@app.route('/api/salvar', methods=['POST'])
def salvar():
    data = request.get_json()
    # Seu código para salvar dados no banco
    # ...
    return jsonify({"msg": "Dados salvos com sucesso!"})

# Outras rotas normais...
# @app.route('/api/consultar', methods=['GET'])
# def consultar():
#     ...

if __name__ == '__main__':
    app.run(debug=True)
