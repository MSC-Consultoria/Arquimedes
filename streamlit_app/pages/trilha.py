from __future__ import annotations

import textwrap

import streamlit as st

from streamlit_app.components.metrics import render_track_metrics
from streamlit_app.data import TRACKS, Track, format_minutes, plan_schedule


def _init_state() -> None:
    st.session_state.setdefault("selected_domain", [])
    st.session_state.setdefault("selected_difficulty", [])
    st.session_state.setdefault("hours_per_week", 6)
    st.session_state.setdefault("selected_track_title", TRACKS[0].title if TRACKS else "")


def _highlight(text: str) -> str:
    return f"<span style='font-weight:600'>{text}</span>"


def _get_selected_track() -> Track:
    for track in TRACKS:
        if track.title == st.session_state.get("selected_track_title"):
            return track
    return TRACKS[0]


def render() -> None:
    _init_state()

    st.title("Detalhes da trilha")
    st.write(
        "Selecione a trilha que deseja estudar e ajuste as horas semanais para gerar um cronograma sugerido."
    )

    selected_track_title = st.selectbox(
        "Escolha a trilha",
        options=[track.title for track in TRACKS],
        index=[track.title for track in TRACKS].index(st.session_state["selected_track_title"])
        if TRACKS
        else 0,
        key="selected_track_title",
    )

    hours_per_week = st.slider(
        "Horas disponíveis por semana",
        min_value=2,
        max_value=12,
        value=st.session_state["hours_per_week"],
        step=1,
        key="hours_per_week",
    )

    track = _get_selected_track()
    st.subheader(track.title)
    st.caption(
        f"Domínio: {track.domain} · Dificuldade: {track.difficulty.title()} · Foco: {track.focus}"
    )

    render_track_metrics(track)

    st.divider()
    st.markdown("#### Agenda semanal sugerida")
    plan = plan_schedule(track, hours_per_week)
    st.progress(min(sum(plan.values()) / (track.total_tasks or 1), 1.0))
    st.write(
        ", ".join(f"{week}: {count} tarefas" for week, count in plan.items())
    )

    st.divider()
    st.markdown("#### Estágios e tarefas")
    for stage in track.stages:
        with st.expander(f"{stage.title} · {stage.estimated_hours}h", expanded=False):
            st.markdown(textwrap.fill(stage.description, width=90))
            for task in stage.tasks:
                st.markdown(
                    f"- {_highlight(task.title)} — {task.description} ({task.kind}, {format_minutes(task.minutes)})",
                    unsafe_allow_html=True,
                )
