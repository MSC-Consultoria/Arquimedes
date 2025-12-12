"""Componentes visuais reutilizáveis."""
from __future__ import annotations

import streamlit as st

from streamlit_app.data import Track


def render_track_metrics(track: Track) -> None:
    """Exibe cards de métricas principais de uma trilha."""
    col1, col2, col3 = st.columns(3)
    col1.metric("Horas estimadas", f"{track.estimated_hours}h")
    col2.metric("Estágios", len(track.stages))
    col3.metric("Tarefas", track.total_tasks)
