from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Ajuste os dados da sua conexão MySQL conforme necessário
conexao = mysql.connector.connect(
    host="localhost",
    user="root",          # ou outro usuário se você criou
    password="ja748xt500dopller123",  # coloque a senha do seu MySQL
    database="sistema_agro"
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

@app.route('/api/plantio', methods=['POST'])
def salvar_plantio():
    data = request.get_json()
    cursor = conexao.cursor()

    try:
        # Exemplo de extração dos campos (ajuste os nomes conforme seu form)
        cultura = data.get('culturaPlantio')
        variedade = data.get('variedadePlantio')
        pms = data.get('pmsSementePlantio')
        umidade = data.get('umidadeSolo')
        tipo = data.get('tipoPlantio')
        profundidade = data.get('profundidadePlantio')
        info_adicional = data.get('info_adicional_plantio')

        # Exemplo de inserção no banco
        cursor.execute("""
            INSERT INTO plantio (cultura, variedade, pms, umidade, tipo, profundidade, info_adicional)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (cultura, variedade, pms, umidade, tipo, profundidade, info_adicional))

        conexao.commit()
        return jsonify({"msg": "Dados de plantio salvos com sucesso!"})
    except Exception as e:
        conexao.rollback()
        return jsonify({"msg": f"Erro ao salvar: {str(e)}"}), 500
    finally:
        cursor.close()

if __name__ == '__main__':
    app.run(debug=True)