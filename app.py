"""Streamlit app para visualizar trilhas do Arquimedes.

A aplicação foi pensada para um deploy rápido no Streamlit Cloud a partir deste
repositório no GitHub. Ela apresenta as trilhas disponíveis, seus estágios
principais e tarefas recomendadas, além de gerar uma sugestão de cronograma
por semana.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, Iterable, List
import math
import textwrap

import streamlit as st


@dataclass
class Task:
    title: str
    description: str
    kind: str
    minutes: int


@dataclass
class Stage:
    title: str
    description: str
    estimated_hours: int
    tasks: List[Task] = field(default_factory=list)


@dataclass
class Track:
    title: str
    domain: str
    difficulty: str
    focus: str
    estimated_hours: int
    stages: List[Stage] = field(default_factory=list)

    @property
    def total_tasks(self) -> int:
        return sum(len(stage.tasks) for stage in self.stages)

    @property
    def total_minutes(self) -> int:
        return sum(task.minutes for stage in self.stages for task in stage.tasks)


TRACKS: List[Track] = [
    Track(
        title="Inglês Técnico para Programadores",
        domain="Linguagens",
        difficulty="iniciante",
        focus="Comunicação e leitura de documentação",
        estimated_hours=20,
        stages=[
            Stage(
                title="Fundamentos de Inglês Técnico",
                description="Vocabulário base para entender código, mensagens de erro e documentação simples.",
                estimated_hours=7,
                tasks=[
                    Task(
                        title="Vocabulário essencial de programação",
                        description="Praticar termos como function, variable, loop, array e object em frases curtas.",
                        kind="exercício",
                        minutes=30,
                    ),
                    Task(
                        title="Leitura guiada de documentação",
                        description="Analisar documentação de uma biblioteca popular e anotar trechos importantes.",
                        kind="leitura",
                        minutes=90,
                    ),
                    Task(
                        title="Quiz de fundamentos",
                        description="Avaliar compreensão dos termos apresentados na etapa.",
                        kind="quiz",
                        minutes=15,
                    ),
                ],
            ),
            Stage(
                title="Comunicação Técnica",
                description="Prática de code reviews, stand-ups e escrita de commits em inglês.",
                estimated_hours=8,
                tasks=[
                    Task(
                        title="Listening focado em progresso de tarefas",
                        description="Assistir a conversas curtas sobre andamento de sprints e bugs.",
                        kind="vídeo",
                        minutes=30,
                    ),
                    Task(
                        title="Escrita de commits e PRs",
                        description="Redigir mensagens claras e objetivas para revisão de código.",
                        kind="exercício",
                        minutes=45,
                    ),
                    Task(
                        title="Code review simulado",
                        description="Dar e receber feedback textual em inglês para um trecho de código.",
                        kind="projeto",
                        minutes=60,
                    ),
                ],
            ),
            Stage(
                title="Inglês Avançado para Devs",
                description="Documentação, apresentações técnicas e entrevistas em inglês.",
                estimated_hours=5,
                tasks=[
                    Task(
                        title="Escrita de documentação",
                        description="Produzir um mini-guia técnico de uma funcionalidade que você domina.",
                        kind="leitura + prática",
                        minutes=120,
                    ),
                    Task(
                        title="Apresentação técnica",
                        description="Preparar e gravar um pitch de 5 minutos explicando um projeto anterior.",
                        kind="projeto",
                        minutes=75,
                    ),
                ],
            ),
        ],
    ),
    Track(
        title="Automação de Workflows com n8n",
        domain="Automação",
        difficulty="intermediário",
        focus="Orquestração low-code e integrações com APIs",
        estimated_hours=18,
        stages=[
            Stage(
                title="Fundamentos do n8n",
                description="Primeiros nós, autenticação e gatilhos para automações simples.",
                estimated_hours=6,
                tasks=[
                    Task(
                        title="Introdução aos nós de entrada e saída",
                        description="Montar um fluxo que recebe dados de formulário e envia e-mail.",
                        kind="laboratório",
                        minutes=60,
                    ),
                    Task(
                        title="Gatilhos e webhooks",
                        description="Configurar webhooks públicos e validar dados recebidos.",
                        kind="exercício",
                        minutes=45,
                    ),
                ],
            ),
            Stage(
                title="Integrações com APIs",
                description="Conectar serviços externos e manipular JSON sem código.",
                estimated_hours=7,
                tasks=[
                    Task(
                        title="Integração com Google Sheets",
                        description="Criar pipeline que consolida leads em uma planilha.",
                        kind="projeto",
                        minutes=90,
                    ),
                    Task(
                        title="APIs autenticadas",
                        description="Usar credenciais para buscar dados de CRM e disparar notificações.",
                        kind="laboratório",
                        minutes=75,
                    ),
                ],
            ),
            Stage(
                title="Escalabilidade e observabilidade",
                description="Logs, retries, filas e boas práticas de monitoramento.",
                estimated_hours=5,
                tasks=[
                    Task(
                        title="Tolerância a falhas",
                        description="Adicionar retries e alertas para etapas críticas.",
                        kind="exercício",
                        minutes=45,
                    ),
                    Task(
                        title="Dashboards de execução",
                        description="Montar painel que mostra tempos de execução e erros recentes.",
                        kind="projeto",
                        minutes=60,
                    ),
                ],
            ),
        ],
    ),
    Track(
        title="IA aplicada ao aprendizado",
        domain="Inteligência Artificial",
        difficulty="avançado",
        focus="Personalização de estudos com LLMs e agentes",
        estimated_hours=22,
        stages=[
            Stage(
                title="Fundamentos de LLMs",
                description="Tokenização, embeddings e estratégias de prompting.",
                estimated_hours=7,
                tasks=[
                    Task(
                        title="Prompt engineering",
                        description="Experimentar padrões de prompt para síntese de textos educativos.",
                        kind="laboratório",
                        minutes=60,
                    ),
                    Task(
                        title="Avaliação rápida",
                        description="Criar rubrica simples para avaliar respostas geradas.",
                        kind="quiz",
                        minutes=20,
                    ),
                ],
            ),
            Stage(
                title="Agentes e automação",
                description="Chains de ferramentas, memória e orquestração de tarefas.",
                estimated_hours=8,
                tasks=[
                    Task(
                        title="Protótipo de agente tutor",
                        description="Construir agente que sugere próximas tarefas com base no progresso.",
                        kind="projeto",
                        minutes=120,
                    ),
                    Task(
                        title="Monitoramento de qualidade",
                        description="Usar métricas simples para medir utilidade das respostas.",
                        kind="exercício",
                        minutes=60,
                    ),
                ],
            ),
            Stage(
                title="Entrega e feedback",
                description="Publicação de protótipos e coleta de sinal dos estudantes.",
                estimated_hours=7,
                tasks=[
                    Task(
                        title="Deploy rápido",
                        description="Publicar agente em ambiente de teste e acompanhar sessões.",
                        kind="projeto",
                        minutes=75,
                    ),
                    Task(
                        title="Pesquisa com usuários",
                        description="Coletar feedback estruturado e priorizar melhorias.",
                        kind="survey",
                        minutes=30,
                    ),
                ],
            ),
        ],
    ),
]


def highlight(text: str) -> str:
    return f"<span style='font-weight:600'>{text}</span>"


def format_minutes(minutes: int) -> str:
    hours, mins = divmod(minutes, 60)
    if hours and mins:
        return f"{hours}h{mins:02d}"
    if hours:
        return f"{hours}h"
    return f"{mins}min"


def plan_schedule(track: Track, hours_per_week: int) -> Dict[str, int]:
    weekly_minutes = max(hours_per_week, 1) * 60
    total_minutes = max(track.total_minutes, 1)
    weeks = math.ceil(total_minutes / weekly_minutes)

    tasks_per_week: Dict[str, int] = {}
    task_index = 0
    flat_tasks: List[Task] = [task for stage in track.stages for task in stage.tasks]

    for week in range(1, weeks + 1):
        available = weekly_minutes
        tasks_count = 0
        while task_index < len(flat_tasks) and available - flat_tasks[task_index].minutes >= 0:
            available -= flat_tasks[task_index].minutes
            tasks_count += 1
            task_index += 1
        if task_index < len(flat_tasks) and tasks_count == 0:
            # garante pelo menos uma tarefa por semana
            task_index += 1
            tasks_count = 1
        tasks_per_week[f"Semana {week}"] = tasks_count
    return tasks_per_week


def render_track(track: Track, hours_per_week: int) -> None:
    st.markdown(f"### {track.title}")
    st.caption(f"Domínio: {track.domain} · Dificuldade: {track.difficulty.title()} · Foco: {track.focus}")

    col1, col2, col3 = st.columns(3)
    col1.metric("Horas estimadas", f"{track.estimated_hours}h")
    col2.metric("Estágios", len(track.stages))
    col3.metric("Tarefas", track.total_tasks)

    plan = plan_schedule(track, hours_per_week)
    st.write("Sugestão de distribuição semanal:")
    st.progress(min(sum(plan.values()) / (track.total_tasks or 1), 1.0))
    st.write(
        ", ".join(f"{week}: {count} tarefas" for week, count in plan.items())
    )

    for stage in track.stages:
        with st.expander(f"{stage.title} · {stage.estimated_hours}h", expanded=False):
            st.markdown(textwrap.fill(stage.description, width=90))
            for task in stage.tasks:
                st.markdown(
                    f"- {highlight(task.title)} — {task.description} ({task.kind}, {format_minutes(task.minutes)})",
                    unsafe_allow_html=True,
                )


st.set_page_config(
    page_title="Arquimedes | STEAMlimit",
    page_icon="🎓",
    layout="wide",
)

st.title("Arquimedes no Streamlit")
st.subheader("Trilhas curadas, prontas para deploy rápido no Streamlit Cloud")

st.sidebar.header("Configurações")
selected_domain = st.sidebar.multiselect(
    "Filtrar por domínio",
    options=sorted({track.domain for track in TRACKS}),
    default=[],
)
selected_difficulty = st.sidebar.multiselect(
    "Filtrar por dificuldade",
    options=sorted({track.difficulty for track in TRACKS}),
    default=[],
)
hours_per_week = st.sidebar.slider(
    "Horas disponíveis por semana",
    min_value=2,
    max_value=12,
    value=6,
    step=1,
)

filtered_tracks: Iterable[Track] = TRACKS
if selected_domain:
    filtered_tracks = [t for t in filtered_tracks if t.domain in selected_domain]
if selected_difficulty:
    filtered_tracks = [t for t in filtered_tracks if t.difficulty in selected_difficulty]

st.write(
    "Use os filtros na barra lateral para destacar as trilhas mais relevantes e ajuste"
    " as horas semanais para gerar um cronograma automático de estudos."
)

col_a, col_b = st.columns(2)
col_a.metric("Trilhas", len(TRACKS))
col_b.metric("Tarefas totais", sum(track.total_tasks for track in TRACKS))

for track in filtered_tracks:
    render_track(track, hours_per_week)

if not list(filtered_tracks):
    st.info("Nenhuma trilha encontrada com os filtros atuais. Limpe os filtros para ver todas.")

st.divider()
st.markdown(
    """
    #### Como fazer o deploy
    1. Certifique-se de que o `requirements.txt` está presente neste repositório (já incluímos `streamlit`).
    2. No Streamlit Community Cloud, conecte seu app a este repositório e defina `app.py` como *Main file path*.
    3. Publique; o serviço instalará as dependências e hospedará o app sem necessidade de execução local.
    """
)
