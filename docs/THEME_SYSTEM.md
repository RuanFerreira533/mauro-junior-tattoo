# Sistema de temas

## Objetivo
Trocar a identidade inteira do site mudando **dados**, não reescrevendo componentes. Adicionar um universo = adicionar uma pasta de conteúdo + uma definição de tema.

## Modelo conceitual
```
UniverseDefinition (1 por estilo)
 ├─ identidade:  id, slug, nome, ordem, descrição curta
 ├─ tema:        tokens (cores, tipografia, forma, movimento, atmosfera)
 ├─ ativos:      imagem do pack, imagens de preview, atmosfera, ornamentos
 ├─ slots:       componentes específicos opcionais (hero, ornamento, divisor, cursor...)
 ├─ movimento:   preset (tier 0/1/2) + intensidade
 └─ conteúdo:    trabalhos, textos, info do estilo (ver CONTENT_STRUCTURE)
```
A definição é **tipada e validada em build** (schema). Um universo com token faltando ou imagem inexistente falha o build, não o visitante.

## Como o tema é aplicado (proposta)
1. **Stage permanente:** um único elemento raiz (`<div data-stage>`) vive no layout raiz e nunca é remontado ao navegar. Ele carrega os atributos de estado.
2. **Atributos de estado:** `data-universo="anime"` (ativo) e `data-preview="blackwork"` (temporário). Se ambos existem, o preview vence enquanto durar.
3. **Tokens como variáveis CSS:** cada universo é um bloco que redefine variáveis (`--cor-fundo`, `--fonte-titulo`, `--raio-m`...). Componentes só leem variáveis.
4. **Transição entre temas:** variáveis de cor registradas (`@property`) permitem interpolar cores com `transition` nativo, sem JavaScript por frame.
5. **SSR do tema:** na rota de um universo, o servidor já escreve `data-universo`, então não há flash de tema errado nem dependência de JS.

## Estados e precedência
| Estado | Origem | Reversível? | Efeito |
|---|---|---|---|
| base | hub em repouso | — | tokens da marca |
| preview | hover/foco/centralização | sim | tokens do universo + camada de atmosfera leve |
| ativo | rota do universo | ao navegar | tokens + todos os slots e ativos |

## O que o preview pode e não pode fazer
- **Pode:** trocar cores, forma, atmosfera (imagem pequena já pré-carregada), ritmo de pequenos elementos.
- **Não deve:** carregar fontes novas sem cache, baixar JavaScript pesado, disparar layout (mudar tamanhos/posições de blocos grandes), tocar em rotas.
- **Tipografia no preview:** só se a fonte do universo já estiver carregada (pré-carregada por intenção ou ociosidade); caso contrário usa a fonte base e a troca acontece ao entrar (D-06).

## Adicionar um universo novo (contrato)
1. Criar pasta do universo em `content/universos/<slug>/` ([CONTENT_STRUCTURE](CONTENT_STRUCTURE.md)).
2. Preencher `UniverseDefinition` com todos os tokens obrigatórios.
3. Adicionar imagens seguindo [IMAGE_SYSTEM](IMAGE_SYSTEM.md).
4. (Opcional) registrar slots específicos, carregados sob demanda.
5. Rodar a checklist de "universo pronto" ([DEVELOPMENT_PLAN](DEVELOPMENT_PLAN.md)): contraste, peso, movimento reduzido, mobile.
6. O registro lê a pasta e inclui o pack no hub e a rota do universo automaticamente (sem editar componentes).

## Contrato de tokens (nomes provisórios)
Cores: `fundo`, `superficie`, `texto`, `texto-2`, `acento`, `acento-texto`, `borda`, `foco`. Tipografia: `fonte-titulo`, `fonte-texto`, `escala`, `peso-titulo`, `tracking`. Forma: `raio-p/m/g`, `borda-largura`, `mascara-imagem`. Movimento: `dur-base`, `curva`, `intensidade`. Atmosfera: `atmosfera-img`, `atmosfera-opacidade`, `filtro-img`, `grao`.

## Estratégia de fontes por universo
Fontes por universo são o maior risco de peso e de "pulo" visual. Regras: subconjunto latino com acentos do português; no máximo 2 famílias por universo; carregamento sob demanda na rota do universo; `font-display` com fallback de métrica ajustada para evitar salto de layout; pré-carga por intenção no hub (hover/viewport). Detalhes em [PERFORMANCE](PERFORMANCE.md).

## Contrato do portal (D-26: forma própria por estilo)
Cada universo desenha **o próprio portal**, mas todos obedecem ao mesmo contrato, para o hub continuar coerente e o código previsível.

**O que muda por universo:** forma e silhueta, material/textura, o gatilho tátil (o que "puxa", "gira" ou "rasga"), a maneira de abrir, a luz/atmosfera do interior, a etiqueta do cursor.

**O que é igual em todos:**
| Item | Regra |
|---|---|
| Elemento | um `button` real, com rótulo acessível ("Entrar em [estilo]") |
| Área de toque/clique | tamanho mínimo e posição na grade definidos pelo hub (a forma pode variar *dentro* da área) |
| Partes nomeadas | moldura, vão/interior, elemento que abre, gatilho tátil, luz. Cada uma é uma camada simples; sem imagem grande por parte |
| Interior | mostra a **atmosfera do próprio universo** (é a prévia dele) |
| Estados | repouso, intenção, preview, pressionado, abrindo, atravessando, chegada ([ANIMATION_SYSTEM](ANIMATION_SYSTEM.md)) |
| Abertura | a abertura termina preenchendo a tela com o hero do universo |
| Orçamento | peso e custo de animação dentro do limite por portal (PERFORMANCE) |
| Reserva | versão T0 (só troca de tokens e fade) e versão de movimento reduzido obrigatórias |
| Teclado/toque | mesmo comportamento: foco = preview, Enter/toque em "Entrar" = abrir |

**Composição do hub:** formas diferentes só funcionam se houver uma regra comum (alinhamento, escala, espaçamento, "chão"/linha de base). Essa regra é definida **antes** de desenhar os portais (Fase 2), e vale mais que a criatividade de cada um.

**Custo:** um portal por estilo é trabalho de design e de código por universo. Para controlar: peças reutilizáveis (moldura, luz, gatilho) com variações por token, e um portal padrão neutro como reserva enquanto o próprio não fica pronto.

## Alternativas consideradas
| Opção | Prós | Contras | Veredito |
|---|---|---|---|
| Variáveis CSS + `data-*` no Stage | barato, transitável, SSR simples | exige disciplina de tokens | **recomendada** |
| CSS-in-JS por universo | tipagem forte | custo de runtime, hidratação | descartada |
| Uma folha de CSS por universo carregada sob demanda | isolamento | flash na troca, mais requisições | só para ornamentos pesados |
| Páginas totalmente separadas por estilo | liberdade total | duplicação, derrota o objetivo | descartada |
