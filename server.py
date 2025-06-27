from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

conexao = mysql.connector.connect(
    host="localhost",
    user="root",
    password="ja748xt500dopller123",
    database="sistema_agro"
)

@app.route('/api/salvar', methods=['POST'])
def salvar():
    data = request.get_json()
    return jsonify({"msg": "Dados salvos com sucesso!"})

@app.route('/api/plantio', methods=['POST'])
def salvar_plantio():
    data = request.get_json()
    cursor = conexao.cursor()
    try:
        cultura = data.get('culturaPlantio')
        variedade = data.get('variedadePlantio')
        pms = data.get('pmsSementePlantio')
        if pms == "Sim":
            pms = 1.0
        elif pms == "Não":
            pms = 0.0
        elif pms in (None, "", "null"):
            pms = None
        else:
            try:
                pms = float(str(pms).replace(",", "."))
            except Exception:
                pms = None

        umidade = data.get('umidadeSolo')
        tipo = data.get('tipoPlantio')
        profundidade = data.get('profundidadePlantio')
        info_adicional = data.get('info_adicional_plantio')

        # --- AQUI ESTÁ O AJUSTE! ---
        latitude = data.get('latitude')
        if not latitude or latitude in ("", "null"):
            latitude = None
        else:
            latitude = float(latitude)

        longitude = data.get('longitude')
        if not longitude or longitude in ("", "null"):
            longitude = None
        else:
            longitude = float(longitude)

        print("LATITUDE NO BACKEND:", latitude, type(latitude))
        print("LONGITUDE NO BACKEND:", longitude, type(longitude))

        cursor.execute("""
            INSERT INTO plantio (cultura, variedade, pms, umidade, tipo, profundidade, info_adicional, latitude, longitude)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (cultura, variedade, pms, umidade, tipo, profundidade, info_adicional, latitude, longitude))

        conexao.commit()
        return jsonify({"msg": "Dados de plantio salvos com sucesso!"})
    except Exception as e:
        conexao.rollback()
        return jsonify({"msg": f"Erro ao salvar: {str(e)}"}), 500
    finally:
        cursor.close()


@app.route('/api/pre-plantio', methods=['POST'])
def salvar_pre_plantio():
    data = request.get_json()
    cursor = conexao.cursor()
    try:
        area_total_talhao = data.get('areaTotalTalhao')
        valor = data.get('hectaresPlantadosPP')
        hectares_plantados = float(valor) if valor not in (None, "", "null") else None
        cultura = data.get('culturaPP')
        variedade = data.get('variedadePP')
        pms = data.get('pmsPP')
        if pms == "Sim":
            pms = 1.0
        elif pms == "Não":
            pms = 0.0
        elif pms in (None, "", "null"):
            pms = None
        else:
            try:
                pms = float(str(pms).replace(",", "."))
            except Exception:
                pms = None

        data_prevista_plantio = data.get('dataPrevPlantioPP')
        if not data_prevista_plantio or data_prevista_plantio in ("", "null"):
            data_prevista_plantio = None

        data_ultima_analise_solo = data.get('dataUltAnaliseSoloPP')
        if not data_ultima_analise_solo or data_ultima_analise_solo in ("", "null"):
            data_ultima_analise_solo = None

        dosagem_calagem = data.get('dosagemCalagemPP')
        calagem = data.get('calagemPP')
        historico_solo = data.get('historico_solo')
        adubos_anteriores = data.get('adubos_anteriores')
        adubacao_ano = data.get('adubacaoAnoPP')
        insetos = data.get('insetosPP')
        insetos_qual = data.get('insetosQualPP')
        incidencia_insetos = data.get('incidenciaInsetosPP')
        urgencia_insetos = data.get('urgenciaInsetosPP')
        daninhas = data.get('daninhasPP')
        daninhas_qual = data.get('daninhasQualPP')
        incidencia_daninhas = data.get('incidenciaDaninhasPP')
        urgencia_daninhas = data.get('urgenciaDaninhasPP')
        info_adicional = data.get('info_adicional_pplantio')

        latitude = data.get('latitude')
        if not latitude or latitude in ("", "null"):
            latitude = None
        else:
            latitude = float(latitude)

        longitude = data.get('longitude')
        if not longitude or longitude in ("", "null"):
            longitude = None
        else:
            longitude = float(longitude)

        cursor.execute("""
            INSERT INTO pre_plantio (
                area_total_talhao, hectares_plantados, cultura, variedade, pms, data_prevista_plantio,
                data_ultima_analise_solo, dosagem_calagem, calagem, historico_solo,
                adubos_anteriores, adubacao_ano, insetos, insetos_qual, incidencia_insetos, urgencia_insetos,
                daninhas, daninhas_qual, incidencia_daninhas, urgencia_daninhas, info_adicional, latitude, longitude
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            area_total_talhao, hectares_plantados, cultura, variedade, pms, data_prevista_plantio,
            data_ultima_analise_solo, dosagem_calagem, calagem, historico_solo,
            adubos_anteriores, adubacao_ano, insetos, insetos_qual, incidencia_insetos, urgencia_insetos,
            daninhas, daninhas_qual, incidencia_daninhas, urgencia_daninhas, info_adicional, latitude, longitude
        ))

        conexao.commit()
        return jsonify({"msg": "Pré-Plantio salvo com sucesso!"})
    except Exception as e:
        conexao.rollback()
        return jsonify({"msg": f"Erro ao salvar: {str(e)}"}), 500
    finally:
        cursor.close()

@app.route('/api/pre-colheita', methods=['POST'])
def salvar_pre_colheita():
    data = request.get_json()
    cursor = conexao.cursor()
    try:
        condicao_lavoura = data.get('condicao_lavoura')
        dessecacao = data.get('dessecacao')
        dessecacao_motivo = data.get('dessecacao_motivo')
        uniformidade = data.get('uniformidade')
        cond_vagem = data.get('cond_vagem')
        graos_problema = data.get('graos_problema')
        umidade_grao = data.get('umidade_grao')
        risco_perda = data.get('risco_perda')
        daninhas = data.get('daninhas')
        daninhas_qual = data.get('daninhasQual')
        incidencia_daninhas = data.get('incidenciaDaninhas')
        incidencia_daninhas = float(incidencia_daninhas.replace(",", ".") or 0) if incidencia_daninhas not in (None, "", "null") else None
        urgencia_daninhas = data.get('urgenciaDaninhas')
        produtividade = data.get('produtividade')
        produtividade_outra = data.get('produtividade_outra')
        info_adicional = data.get('info_adicional_precolheita')

        cursor.execute("""
            INSERT INTO pre_colheita (
                condicao_lavoura, dessecacao, dessecacao_motivo, uniformidade, cond_vagem,
                graos_problema, umidade_grao, risco_perda, daninhas, daninhas_qual,
                incidencia_daninhas, urgencia_daninhas, produtividade, produtividade_outra, info_adicional_precolheita
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            condicao_lavoura, dessecacao, dessecacao_motivo, uniformidade, cond_vagem,
            graos_problema, umidade_grao, risco_perda, daninhas, daninhas_qual,
            incidencia_daninhas, urgencia_daninhas, produtividade, produtividade_outra, info_adicional
        ))

        conexao.commit()
        return jsonify({"msg": "Pré-Colheita salva com sucesso!"})
    except Exception as e:
        conexao.rollback()
        return jsonify({"msg": f"Erro ao salvar: {str(e)}"}), 500
    finally:
        cursor.close()

@app.route('/api/salvar_monitoramento_mip_mid', methods=['POST'])
def salvar_monitoramento_mip_mid():
    data = request.get_json()
    cursor = conexao.cursor()
    try:
        fase_cultura = data.get('faseCultura')
        precipitacao7d = data.get('precipitacao7d')
        precipitacao7d = float(precipitacao7d.replace(",", ".") or 0) if precipitacao7d not in (None, "", "null") else None
        mesmo_ciclo = data.get('mesmoCiclo')
        ciclo_motivo = data.get('cicloMotivo')
        uniformidade_graos = data.get('uniformidadeGrãos')
        uniformidade_motivo = data.get('uniformidadeMotivo')
        vagens_por_planta = data.get('vagensPorPlanta')
        vagens_por_planta = int(vagens_por_planta) if vagens_por_planta not in (None, "", "null") else None
        insetos_presentes = data.get('insetosPresentes')
        insetos_qual = data.get('insetosQualMip')
        incidencia_insetos = data.get('incidenciaInsetosMip')
        incidencia_insetos = float(incidencia_insetos.replace(",", ".") or 0) if incidencia_insetos not in (None, "", "null") else None
        urgencia_insetos = data.get('urgenciaInsetosMip')
        daninhas_presentes = data.get('daninhasPresentesMip')
        daninhas_qual = data.get('daninhasQualMip')
        incidencia_daninhas = data.get('incidenciaDaninhasMip')
        incidencia_daninhas = float(incidencia_daninhas.replace(",", ".") or 0) if incidencia_daninhas not in (None, "", "null") else None
        urgencia_daninhas = data.get('urgenciaDaninhasMip')
        doencas_presentes = data.get('doencasPresentesMip')
        doencas_qual = data.get('doencasQualMip')
        incidencia_doencas = data.get('incidenciaDoencasMip')
        incidencia_doencas = float(incidencia_doencas.replace(",", ".") or 0) if incidencia_doencas not in (None, "", "null") else None
        urgencia_doencas = data.get('urgenciaDoencasMip')
        info_adicional = data.get('info_adicional_mipmid')

        cursor.execute("""
            INSERT INTO monitoramento_mip_mid (
                fase_cultura, precipitacao7d, mesmo_ciclo, ciclo_motivo, uniformidade_graos, uniformidade_motivo, vagens_por_planta,
                insetos_presentes, insetos_qual, incidencia_insetos, urgencia_insetos,
                daninhas_presentes, daninhas_qual, incidencia_daninhas, urgencia_daninhas,
                doencas_presentes, doencas_qual, incidencia_doencas, urgencia_doencas, info_adicional_mipmid
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            fase_cultura, precipitacao7d, mesmo_ciclo, ciclo_motivo, uniformidade_graos, uniformidade_motivo, vagens_por_planta,
            insetos_presentes, insetos_qual, incidencia_insetos, urgencia_insetos,
            daninhas_presentes, daninhas_qual, incidencia_daninhas, urgencia_daninhas,
            doencas_presentes, doencas_qual, incidencia_doencas, urgencia_doencas, info_adicional
        ))

        conexao.commit()
        return jsonify({"msg": "Monitoramento MIP/MID salvo com sucesso!"})
    except Exception as e:
        conexao.rollback()
        return jsonify({"msg": f"Erro ao salvar: {str(e)}"}), 500
    finally:
        cursor.close()

@app.route('/api/contagem-estande', methods=['POST'])
def salvar_contagem_estande():
    data = request.get_json()
    cursor = conexao.cursor()
    try:
        data_semeadura = data.get('dataSemeadura')
        populacao_alvo = data.get('populacaoAlvo')
        estado_fenologico = data.get('estadoFenologico')
        distribuicao_linhas = data.get('distribuicaoLinhas')
        condicoes_climaticas = data.get('condicoesClimaticas')
        condicoes_climaticas_outro = data.get('condicoesClimaticasOutro')
        doencas_presente = data.get('doencasPresente')
        doencas_qual = data.get('doencasQual')
        incidencia_doencas = data.get('incidenciaDoencas')
        incidencia_doencas = float(incidencia_doencas.replace(',', '.') or 0) if incidencia_doencas not in (None, "", "null") else None
        urgencia_doencas = data.get('urgenciaDoencas')
        insetos_presente = data.get('insetosPresente')
        insetos_qual = data.get('insetosQual')
        incidencia_insetos = data.get('incidenciaInsetos')
        incidencia_insetos = float(incidencia_insetos.replace(',', '.') or 0) if incidencia_insetos not in (None, "", "null") else None
        urgencia_insetos = data.get('urgenciaInsetos')
        daninhas_presente = data.get('daninhasPresente')
        daninhas_qual = data.get('daninhasQual')
        incidencia_daninhas = data.get('incidenciaDaninhas')
        incidencia_daninhas = float(incidencia_daninhas.replace(',', '.') or 0) if incidencia_daninhas not in (None, "", "null") else None
        urgencia_daninhas = data.get('urgenciaDaninhas')
        plantas_metro1 = data.get('plantasMetro1')
        plantas_metro1 = int(plantas_metro1) if plantas_metro1 not in (None, "", "null") else None
        plantas_metro2 = data.get('plantasMetro2')
        plantas_metro2 = int(plantas_metro2) if plantas_metro2 not in (None, "", "null") else None
        plantas_metro3 = data.get('plantasMetro3')
        plantas_metro3 = int(plantas_metro3) if plantas_metro3 not in (None, "", "null") else None

        latitude = data.get('latitude')
        if not latitude or latitude in ("", "null"):
            latitude = None
        else:
            latitude = float(latitude)

        longitude = data.get('longitude')
        if not longitude or longitude in ("", "null"):
            longitude = None
        else:
            longitude = float(longitude)

        cursor.execute("""
            INSERT INTO contagem_estande (
                data_semeadura, populacao_alvo, estado_fenologico, distribuicao_linhas,
                condicoes_climaticas, condicoes_climaticas_outro, doencas_presente, doencas_qual,
                incidencia_doencas, urgencia_doencas, insetos_presente, insetos_qual, incidencia_insetos,
                urgencia_insetos, daninhas_presente, daninhas_qual, incidencia_daninhas,
                urgencia_daninhas, plantas_metro1, plantas_metro2, plantas_metro3,
                latitude, longitude
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            data_semeadura, populacao_alvo, estado_fenologico, distribuicao_linhas,
            condicoes_climaticas, condicoes_climaticas_outro, doencas_presente, doencas_qual,
            incidencia_doencas, urgencia_doencas, insetos_presente, insetos_qual, incidencia_insetos,
            urgencia_insetos, daninhas_presente, daninhas_qual, incidencia_daninhas,
            urgencia_daninhas, plantas_metro1, plantas_metro2, plantas_metro3,
            latitude, longitude
        ))
        conexao.commit()
        return jsonify({"msg": "Contagem de estande salva com sucesso!"})
    except Exception as e:
        conexao.rollback()
        return jsonify({"msg": f"Erro ao salvar: {str(e)}"}), 500
    finally:
        cursor.close()
from flask import request, jsonify

if __name__ == '__main__':
    app.run(debug=True)
