"""Ponto de entrada do app Streamlit, registrando páginas multipage."""
from __future__ import annotations

import streamlit as st

st.set_page_config(
    page_title="Arquimedes | STEAMlimit",
    page_icon="🎓",
    layout="wide",
)

pages = [
    st.Page("streamlit_app/pages/catalogo.py", title="Catálogo", icon="📚"),
    st.Page("streamlit_app/pages/trilha.py", title="Trilha", icon="🧭"),
]

navigation = st.navigation(pages)
navigation.run()
