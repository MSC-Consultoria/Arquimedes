"""Modelos e dados estáticos usados no app Streamlit."""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, Iterable, List
import math


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
            task_index += 1
            tasks_count = 1
        tasks_per_week[f"Semana {week}"] = tasks_count
    return tasks_per_week


def filter_tracks(
    tracks: Iterable[Track], domains: List[str] | None, difficulties: List[str] | None
) -> List[Track]:
    filtered: Iterable[Track] = tracks
    if domains:
        filtered = [track for track in filtered if track.domain in domains]
    if difficulties:
        filtered = [track for track in filtered if track.difficulty in difficulties]
    return list(filtered)
