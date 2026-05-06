import os
import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
@app.route('/A02-2024206510025')
def index():
    """Página Principal - Consulta de CEP via WebView e campo de busca."""
    return render_template('index.html')


@app.route('/resultado')
def resultado():
    """Página de Resultado - Exibe os dados retornados pela BrasilAPI."""
    cep = request.args.get('cep', '').strip().replace('-', '').replace('.', '')
    dados = None
    erro = None

    if cep:
        try:
            response = requests.get(
                f'https://brasilapi.com.br/api/cep/v1/{cep}',
                timeout=10
            )
            if response.status_code == 200:
                dados = response.json()
            else:
                erro = f'CEP "{cep}" não encontrado. Verifique e tente novamente.'
        except requests.exceptions.Timeout:
            erro = 'A consulta demorou muito. Tente novamente.'
        except requests.exceptions.ConnectionError:
            erro = 'Sem conexão com a internet. Verifique sua rede.'
        except Exception:
            erro = 'Ocorreu um erro inesperado. Tente novamente.'

    return render_template('resultado.html', dados=dados, erro=erro, cep_busca=cep)


@app.route('/api/cep/<cep>')
def api_cep(cep):
    """Endpoint interno para consulta AJAX de CEP."""
    cep = cep.strip().replace('-', '').replace('.', '')
    try:
        response = requests.get(
            f'https://brasilapi.com.br/api/cep/v1/{cep}',
            timeout=10
        )
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'erro': True, 'message': 'CEP não encontrado.'}), 404
    except Exception:
        return jsonify({'erro': True, 'message': 'Erro na consulta.'}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
