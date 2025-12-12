# Design System MSC - Sistema Educacional
## Identidade Visual e UX Mobile-First

**Versão**: 1.0  
**Data**: 04 de Dezembro de 2025  
**Autor**: Manus AI

---

## Visão Geral

O Design System MSC foi criado para o Sistema Educacional da MSC Consultoria, priorizando uma experiência mobile-first excepcional, já que 90% dos usuários acessarão via celular. O sistema combina a identidade visual da MSC (branco e azul) com princípios modernos de UX, gamificação visual e atenção meticulosa aos detalhes gráficos.

---

## Identidade Visual

### Paleta de Cores Principal

A paleta de cores é baseada na identidade MSC, utilizando tons de azul como cor primária e branco como base, complementados por cores de suporte para diferentes estados e funcionalidades.

**Azul MSC (Primário)**
- `primary-50`: #E3F2FD (azul muito claro - backgrounds sutis)
- `primary-100`: #BBDEFB (azul claro - hover states)
- `primary-200`: #90CAF9 (azul médio-claro)
- `primary-300`: #64B5F6 (azul médio)
- `primary-400`: #42A5F5 (azul médio-escuro)
- `primary-500`: #2196F3 (azul MSC principal - botões, links)
- `primary-600`: #1E88E5 (azul escuro - hover em botões)
- `primary-700`: #1976D2 (azul mais escuro)
- `primary-800`: #1565C0 (azul muito escuro)
- `primary-900`: #0D47A1 (azul profundo - textos importantes)

**Branco e Neutros**
- `white`: #FFFFFF (backgrounds principais)
- `gray-50`: #FAFAFA (backgrounds secundários)
- `gray-100`: #F5F5F5 (cards, containers)
- `gray-200`: #EEEEEE (borders sutis)
- `gray-300`: #E0E0E0 (borders padrão)
- `gray-400`: #BDBDBD (textos desabilitados)
- `gray-500`: #9E9E9E (textos secundários)
- `gray-600`: #757575 (textos terciários)
- `gray-700`: #616161 (textos principais)
- `gray-800`: #424242 (headings)
- `gray-900`: #212121 (textos escuros)

**Cores de Suporte (Gamificação)**
- `success`: #4CAF50 (verde - conquistas, acertos)
- `warning`: #FF9800 (laranja - avisos, atenção)
- `error`: #F44336 (vermelho - erros, falhas)
- `info`: #00BCD4 (ciano - informações)
- `gold`: #FFD700 (dourado - recompensas especiais)
- `silver`: #C0C0C0 (prata - recompensas médias)
- `bronze`: #CD7F32 (bronze - recompensas básicas)

### Tipografia

A tipografia prioriza legibilidade em telas pequenas, com tamanhos generosos e espaçamento adequado para leitura confortável em dispositivos móveis.

**Fonte Principal**: Inter (Google Fonts)
- Moderna, legível e otimizada para telas
- Pesos: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

**Escala Tipográfica (Mobile-First)**
- `text-xs`: 12px / 16px line-height (labels pequenos)
- `text-sm`: 14px / 20px line-height (textos secundários)
- `text-base`: 16px / 24px line-height (corpo de texto padrão)
- `text-lg`: 18px / 28px line-height (destaques)
- `text-xl`: 20px / 28px line-height (subtítulos)
- `text-2xl`: 24px / 32px line-height (títulos de seção)
- `text-3xl`: 30px / 36px line-height (títulos principais)
- `text-4xl`: 36px / 40px line-height (hero titles)

**Hierarquia de Texto**
- **Headings**: Bold (700), cor `gray-900`, espaçamento generoso
- **Body**: Regular (400), cor `gray-700`, line-height 1.6
- **Labels**: Medium (500), cor `gray-600`, uppercase opcional
- **Links**: Medium (500), cor `primary-600`, underline no hover

### Espaçamento e Grid

Sistema de espaçamento baseado em múltiplos de 4px para consistência visual e alinhamento perfeito.

**Escala de Espaçamento**
- `spacing-1`: 4px
- `spacing-2`: 8px
- `spacing-3`: 12px
- `spacing-4`: 16px
- `spacing-5`: 20px
- `spacing-6`: 24px
- `spacing-8`: 32px
- `spacing-10`: 40px
- `spacing-12`: 48px
- `spacing-16`: 64px

**Padding Padrão de Containers**
- Mobile: 16px (spacing-4)
- Tablet: 24px (spacing-6)
- Desktop: 32px (spacing-8)

**Grid System**
- Mobile: 1 coluna (full-width com padding lateral)
- Tablet: 2 colunas (gap de 16px)
- Desktop: 3-4 colunas (gap de 24px)

### Bordas e Sombras

Bordas arredondadas e sombras sutis criam uma interface moderna e amigável.

**Border Radius**
- `rounded-sm`: 4px (inputs, tags)
- `rounded`: 8px (cards, botões)
- `rounded-lg`: 12px (containers maiores)
- `rounded-xl`: 16px (modals, dialogs)
- `rounded-full`: 9999px (avatares, badges circulares)

**Shadows (Elevação)**
- `shadow-sm`: 0 1px 2px rgba(0,0,0,0.05) (cards sutis)
- `shadow`: 0 1px 3px rgba(0,0,0,0.1) (cards padrão)
- `shadow-md`: 0 4px 6px rgba(0,0,0,0.1) (cards elevados)
- `shadow-lg`: 0 10px 15px rgba(0,0,0,0.1) (modals)
- `shadow-xl`: 0 20px 25px rgba(0,0,0,0.1) (popovers)

---

## Componentes Principais

### Botões

Botões grandes, touch-friendly (mínimo 44px de altura) com estados visuais claros.

**Botão Primário**
- Background: `primary-500`
- Texto: `white`, Bold (600)
- Padding: 12px 24px
- Border-radius: 8px
- Hover: `primary-600` + shadow-md
- Active: `primary-700` + scale(0.98)
- Disabled: opacity 50%

**Botão Secundário**
- Background: `white`
- Border: 2px solid `primary-500`
- Texto: `primary-600`, Bold (600)
- Hover: background `primary-50`

**Botão Outline**
- Background: transparent
- Border: 1px solid `gray-300`
- Texto: `gray-700`, Medium (500)
- Hover: background `gray-50`

**Botão Icon (FAB - Floating Action Button)**
- Circular (rounded-full)
- 56px x 56px (mobile)
- Background: `primary-500`
- Icon: `white`, 24px
- Shadow-lg
- Posição: fixed bottom-right

### Cards

Containers principais para conteúdo, otimizados para toque e leitura.

**Card Padrão**
- Background: `white`
- Border: 1px solid `gray-200`
- Border-radius: 12px
- Padding: 16px
- Shadow: shadow-sm
- Hover: shadow-md + transform translateY(-2px)

**Card de Trilha**
- Inclui imagem de capa (aspect-ratio 16:9)
- Badge de progresso (circular, canto superior direito)
- Título: text-xl, Bold
- Descrição: text-sm, 2 linhas max (ellipsis)
- Footer: ícones de módulos, duração, nível

**Card de Módulo**
- Layout horizontal em mobile
- Ícone grande à esquerda (48px)
- Título e descrição à direita
- Badge de status (Bloqueado, Disponível, Completo)
- Progress bar na parte inferior

### Navegação Mobile

Navegação otimizada para uso com uma mão em dispositivos móveis.

**Bottom Navigation Bar**
- Altura: 64px
- Background: `white`
- Border-top: 1px solid `gray-200`
- Shadow-lg (reversa)
- 4-5 itens máximo
- Ícones: 24px, cor `gray-600` (inativo) / `primary-600` (ativo)
- Labels: text-xs, cor `gray-600` (inativo) / `primary-600` (ativo)
- Indicador ativo: barra azul no topo do item (4px altura)

**Itens da Bottom Nav**
- Home (ícone: casa)
- Trilhas (ícone: mapa)
- Progresso (ícone: gráfico)
- Perfil (ícone: usuário)

**Top App Bar**
- Altura: 56px
- Background: `primary-500` (gradiente sutil para `primary-600`)
- Título: text-lg, Bold, `white`
- Ícones: `white`, 24px
- Shadow-md

### Inputs e Forms

Inputs grandes e fáceis de tocar, com feedback visual claro.

**Input de Texto**
- Altura: 48px (mobile)
- Padding: 12px 16px
- Border: 2px solid `gray-300`
- Border-radius: 8px
- Font-size: 16px (evita zoom no iOS)
- Focus: border `primary-500` + shadow-sm azul
- Error: border `error` + mensagem vermelha abaixo

**Select/Dropdown**
- Mesmas dimensões do input
- Ícone de seta à direita
- Opções: lista com padding generoso (48px altura por item)

**Checkbox e Radio**
- Tamanho: 24px x 24px (touch-friendly)
- Border: 2px solid `gray-400`
- Checked: background `primary-500`, ícone `white`
- Label: text-base, à direita com padding de 12px

### Badges e Tags

Indicadores visuais de status, níveis e conquistas.

**Badge de Nível**
- Circular, 32px diâmetro
- Background: gradiente baseado no nível
  - Iniciante: verde claro → verde
  - Intermediário: azul claro → azul
  - Avançado: roxo claro → roxo
- Texto: número do nível, Bold, `white`
- Border: 2px solid `white`
- Shadow-md

**Badge de Progresso**
- Circular, 40px diâmetro
- Progress ring (stroke azul)
- Texto central: percentual, Bold
- Background: `white`

**Tag de Status**
- Pill shape (rounded-full)
- Padding: 4px 12px
- Text-xs, Bold
- Cores:
  - Completo: background `success-100`, texto `success-700`
  - Em Progresso: background `primary-100`, texto `primary-700`
  - Bloqueado: background `gray-100`, texto `gray-600`

### Modais e Dialogs

Sobreposições para ações importantes ou informações detalhadas.

**Modal Padrão**
- Background overlay: rgba(0,0,0,0.5)
- Container: background `white`, rounded-xl, shadow-xl
- Max-width: 90vw (mobile), 500px (desktop)
- Padding: 24px
- Header: text-2xl, Bold, border-bottom
- Body: text-base, padding vertical 16px
- Footer: botões alinhados à direita

**Bottom Sheet (Mobile)**
- Slide up from bottom
- Border-radius: 16px nos cantos superiores
- Drag handle no topo (barra cinza)
- Altura: max 80vh
- Scroll interno se necessário

### Progress Indicators

Indicadores de progresso claros e motivadores.

**Progress Bar Linear**
- Altura: 8px
- Background: `gray-200`
- Fill: gradiente `primary-400` → `primary-600`
- Border-radius: 4px
- Animação suave de preenchimento

**Progress Ring (Circular)**
- Stroke width: 4px
- Background stroke: `gray-200`
- Progress stroke: `primary-500`
- Animação de preenchimento circular
- Texto central: percentual ou ícone

**XP Bar (Gamificação)**
- Altura: 12px
- Background: `gray-200`
- Fill: gradiente dourado (`gold` → laranja)
- Brilho/shine animado
- Labels: XP atual / XP necessário

---

## Gamificação Visual

### Eras Históricas (Temas Visuais)

Cada era tem uma paleta de cores e estilo visual único que transforma a interface conforme o usuário progride.

**Idade Média (Nível 1-10)**
- Cores: marrom, bege, verde musgo
- Texturas: pergaminho, pedra
- Ícones: espadas, escudos, castelos
- Fonte de acento: serif medieval

**Renascimento (Nível 11-20)**
- Cores: dourado, vermelho vinho, azul royal
- Texturas: veludo, mármore
- Ícones: penas, livros, arte
- Fonte de acento: serif elegante

**Revolução Industrial (Nível 21-30)**
- Cores: cinza metálico, cobre, preto
- Texturas: metal, engrenagens
- Ícones: máquinas, vapor, fábricas
- Fonte de acento: sans-serif industrial

**Era Moderna (Nível 31-40)**
- Cores: azul elétrico, prata, branco
- Texturas: vidro, aço escovado
- Ícones: arranha-céus, carros, aviões
- Fonte de acento: sans-serif moderna

**Era Digital (Nível 41-50)**
- Cores: ciano neon, roxo, verde tech
- Texturas: circuitos, pixels, hologramas
- Ícones: computadores, código, redes
- Fonte de acento: monospace tech

**Era do Futuro (Nível 51+)**
- Cores: azul plasma, roxo profundo, branco puro
- Texturas: energia, luz, espaço
- Ícones: foguetes, IA, cosmos
- Fonte de acento: futurista

### Avatares e Personagens

Sistema de avatares personalizáveis que evoluem com o progresso do usuário.

**Avatar Base**
- Circular, 80px diâmetro (perfil)
- Border: 4px, cor baseada no nível
- Background: gradiente da era atual
- Ícone ou inicial do usuário

**Customização**
- Desbloqueável com moedas do jogo
- Categorias: roupas, acessórios, backgrounds, molduras
- Preview em tempo real

### Recompensas e Conquistas

Elementos visuais que celebram o progresso e motivam o usuário.

**Card de Conquista**
- Background: gradiente baseado na rariedade
  - Comum: cinza
  - Raro: azul
  - Épico: roxo
  - Lendário: dourado
- Ícone grande (64px)
- Título: text-lg, Bold
- Descrição: text-sm
- Data de conquista
- Animação de "reveal" quando desbloqueada

**Notificação de Recompensa**
- Toast no topo da tela
- Background: gradiente dourado
- Ícone de troféu/moeda
- Texto: "+50 XP", "+10 Moedas"
- Animação de slide-in + fade-out
- Som de recompensa (opcional)

---

## Padrões de Interação Mobile

### Gestos

Interações touch otimizadas para uma experiência fluida.

**Tap**
- Área mínima: 44x44px (Apple HIG)
- Feedback visual: ripple effect azul
- Delay: 100ms para evitar taps acidentais

**Long Press**
- Duração: 500ms
- Feedback: vibração leve + menu contextual
- Uso: opções adicionais, preview

**Swipe**
- Horizontal: navegar entre módulos, deletar itens
- Vertical: scroll, pull-to-refresh
- Feedback: elemento segue o dedo, bounce no limite

**Pull to Refresh**
- Indicador circular azul
- Animação de loading
- Feedback de sucesso: checkmark verde

**Drag and Drop**
- Elemento levanta (shadow-xl)
- Área de drop destaca (border azul tracejado)
- Snap to grid ao soltar

### Animações

Transições suaves que melhoram a percepção de performance.

**Transições de Página**
- Duração: 300ms
- Easing: ease-out
- Tipo: slide (mobile), fade (desktop)

**Micro-interações**
- Botões: scale + shadow (100ms)
- Cards: lift (200ms)
- Inputs: border color (150ms)
- Badges: pulse quando atualiza

**Loading States**
- Skeleton screens (placeholders animados)
- Spinner: azul MSC, 32px
- Progress bar: indeterminate wave

**Feedback de Sucesso**
- Checkmark animado (draw animation)
- Confetti para conquistas importantes
- Toast com slide-in suave

### Estados de Vazio

Telas vazias com ilustrações e CTAs claros.

**Empty State**
- Ilustração SVG (200px)
- Título: "Nenhuma trilha iniciada"
- Descrição: texto motivador
- CTA: botão primário grande
- Cor: tons de cinza + azul MSC

---

## Acessibilidade

Garantir que o sistema seja utilizável por todos.

**Contraste de Cores**
- Ratio mínimo: 4.5:1 (texto normal)
- Ratio mínimo: 3:1 (texto grande, ícones)
- Ferramenta: WebAIM Contrast Checker

**Tamanho de Toque**
- Mínimo: 44x44px (Apple HIG)
- Recomendado: 48x48px (Material Design)
- Espaçamento entre elementos: 8px mínimo

**Foco Visível**
- Outline: 2px solid `primary-500`
- Offset: 2px
- Border-radius: mesma do elemento

**Screen Readers**
- Labels descritivos em todos os inputs
- ARIA labels em ícones
- Landmarks semânticos (nav, main, aside)

**Modo Escuro (Futuro)**
- Paleta invertida
- Backgrounds: `gray-900`, `gray-800`
- Textos: `gray-100`, `gray-200`
- Primário: `primary-400` (mais claro)

---

## Responsividade

Breakpoints e adaptações para diferentes tamanhos de tela.

**Breakpoints**
- `sm`: 640px (smartphones grandes)
- `md`: 768px (tablets portrait)
- `lg`: 1024px (tablets landscape, laptops pequenos)
- `xl`: 1280px (desktops)
- `2xl`: 1536px (desktops grandes)

**Estratégia Mobile-First**
- Design base: mobile (320px - 640px)
- Progressivamente adicionar features para telas maiores
- Nunca esconder funcionalidades em mobile

**Adaptações por Tamanho**
- Mobile: 1 coluna, bottom nav, full-width cards
- Tablet: 2 colunas, side nav opcional, cards em grid
- Desktop: 3-4 colunas, side nav permanente, dashboard layout

---

## Performance

Otimizações para garantir carregamento rápido em conexões móveis.

**Imagens**
- Formato: WebP com fallback para PNG/JPG
- Lazy loading: nativo (loading="lazy")
- Responsive images: srcset para diferentes resoluções
- Compressão: TinyPNG, ImageOptim

**Fonts**
- Preload: fonte principal
- Font-display: swap
- Subset: apenas caracteres usados

**CSS**
- Critical CSS inline
- Resto carrega async
- Purge CSS não utilizado (Tailwind)

**JavaScript**
- Code splitting por rota
- Lazy load de componentes pesados
- Debounce em inputs de busca

**Cache**
- Service Worker para offline
- Cache de imagens e assets estáticos
- Invalidação inteligente

---

## Conclusão

Este Design System MSC garante uma experiência visual consistente, moderna e altamente otimizada para dispositivos móveis. A identidade visual branco e azul da MSC é aplicada de forma sofisticada, com atenção meticulosa aos detalhes gráficos e princípios sólidos de UX. O sistema de gamificação visual torna o aprendizado envolvente e motivador, enquanto os padrões de interação mobile garantem uma navegação intuitiva e fluida.

---

**Próximos Passos de Implementação**:
1. Configurar tema customizado no Tailwind com as cores MSC
2. Implementar componentes base (Button, Card, Input)
3. Criar Bottom Navigation Bar
4. Redesenhar telas principais (Home, Trilhas, Progresso, Perfil)
5. Implementar sistema de login simplificado
6. Testar em dispositivos móveis reais
