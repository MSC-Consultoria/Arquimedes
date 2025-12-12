from __future__ import annotations

import textwrap

import streamlit as st

from streamlit_app.components.metrics import render_track_metrics
from streamlit_app.data import TRACKS, Track, filter_tracks


def _init_state() -> None:
    st.session_state.setdefault("selected_domain", [])
    st.session_state.setdefault("selected_difficulty", [])
    st.session_state.setdefault("hours_per_week", 6)
    st.session_state.setdefault("selected_track_title", TRACKS[0].title if TRACKS else "")


def _render_track_card(track: Track) -> None:
    st.markdown(f"### {track.title}")
    st.caption(
        f"Domínio: {track.domain} · Dificuldade: {track.difficulty.title()} · Foco: {track.focus}"
    )

    render_track_metrics(track)

    st.write(textwrap.fill(track.stages[0].description, width=90))
    if st.button("Ver detalhes na aba Trilha", key=f"select-{track.title}"):
        st.session_state["selected_track_title"] = track.title
        st.rerun()


def render() -> None:
    _init_state()

    st.title("Catálogo de trilhas")
    st.write(
        "Use os filtros para priorizar o que precisa agora e mantenha a seleção ao alternar para a aba de detalhes."
    )

    st.sidebar.header("Configurações")
    selected_domain = st.sidebar.multiselect(
        "Filtrar por domínio",
        options=sorted({track.domain for track in TRACKS}),
        default=st.session_state["selected_domain"],
        key="selected_domain",
    )
    selected_difficulty = st.sidebar.multiselect(
        "Filtrar por dificuldade",
        options=sorted({track.difficulty for track in TRACKS}),
        default=st.session_state["selected_difficulty"],
        key="selected_difficulty",
    )
    hours_per_week = st.sidebar.slider(
        "Horas disponíveis por semana",
        min_value=2,
        max_value=12,
        value=st.session_state["hours_per_week"],
        step=1,
        key="hours_per_week",
    )

    filtered_tracks = filter_tracks(TRACKS, selected_domain, selected_difficulty)

    col_a, col_b = st.columns(2)
    col_a.metric("Trilhas", len(TRACKS))
    col_b.metric("Tarefas totais", sum(track.total_tasks for track in TRACKS))

    st.write(
        "Com as horas semanais definidas como "
        f"{hours_per_week}h, cada trilha ganha um cronograma automático na aba de detalhes."
    )

    for track in filtered_tracks:
        st.divider()
        _render_track_card(track)

    if not filtered_tracks:
        st.info("Nenhuma trilha encontrada com os filtros atuais. Limpe os filtros para ver todas.")
