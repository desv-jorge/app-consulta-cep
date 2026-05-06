# 📍 App Consulta de CEP

Aplicativo web para consulta de CEP com duas vias de pesquisa:

1. **GuiaCEP** — Consulta direta pelo site [guiacep.com](https://guiacep.com) via WebView integrado
2. **BrasilAPI** — Consulta via API gratuita retornando dados JSON (cep, estado, cidade, bairro, rua)

## 🛠️ Tecnologias

- **Python 3.10+** (Flask)
- **BrasilAPI** — API gratuita de consulta de CEP
- **HTML/CSS/JS** — Interface responsiva com design premium
- **Docker** — Deploy via Cloud Run

## 🚀 Como Executar

### Desenvolvimento Local

```bash
pip install -r requirements.txt
python app.py
```

Acesse: [http://localhost:5000](http://localhost:5000)

### Docker

```bash
docker build -t app-cep .
docker run -p 5000:5000 -e PORT=5000 app-cep
```

## 📦 API Utilizada

**BrasilAPI** — `https://brasilapi.com.br/api/cep/v1/{cep}`

### Caminhos JSON

| Campo | JSON Path |
|---|---|
| CEP | `$.cep` |
| Estado | `$.state` |
| Cidade | `$.city` |
| Bairro | `$.neighborhood` |
| Rua | `$.street` |
| Mensagem | `$.message` |

## 📱 Estrutura

```
app_cep/
├── app.py
├── requirements.txt
├── Dockerfile
├── .gitignore
├── static/
│   ├── style.css
│   └── main.js
└── templates/
    ├── index.html
    └── resultado.html
```

---

**Disciplina:** Programação de Aplicativo para Dispositivos Móveis
**Prof. Dr. Rodrigo César Fonseca da Silva**
