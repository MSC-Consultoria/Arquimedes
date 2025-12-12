# Arquimedes

Este repositório agora inclui um aplicativo Streamlit (`app.py`) para explorar
as trilhas educacionais do Arquimedes. O fluxo recomendado é publicar direto a
partir do GitHub, sem necessidade de rodar localmente.

## Deploy no Streamlit Cloud
1. Mantenha este repositório (ou um fork) no GitHub.
2. No painel do [Streamlit Community Cloud](https://streamlit.io/cloud), crie
   um novo app apontando para este repositório e defina `app.py` como
   **Main file path**.
3. Confirme que `requirements.txt` está listado; o serviço instalará
   automaticamente o Streamlit.
4. Publique e compartilhe o link gerado.

## Visão geral do app
- Filtros por domínio e dificuldade para encontrar as trilhas mais relevantes.
- Estimativas de horas por trilha, número de estágios e total de tarefas.
- Sugestão de distribuição semanal das tarefas com base na sua disponibilidade.
- Orientações rápidas de deploy diretamente na interface.
