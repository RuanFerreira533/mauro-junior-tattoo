# Sistema de animação

## Camadas (tiers)
| Tier | O que é | Custo | Quando |
|---|---|---|---|
| **T0** | Troca de tokens com transição (cor, contraste, raio) e fade de atmosfera | mínimo | sempre, inclusive em movimento reduzido (como fade simples) |
| **T1** | Movimento ambiente: transform/opacity em poucos elementos, loops curtos em CSS | baixo | preview e universo, desligável |
| **T2** | Animação assinatura do universo (SVG/canvas/GSAP), carregada sob demanda | médio/alto | só ao entrar no universo, nunca no preview inicial |

Todo universo precisa funcionar em T0. T1 e T2 são enriquecimento.

## Princípios
1. **Compositor primeiro:** animar `transform`, `opacity`, `clip-path`/máscara e, com moderação, `filter`. Evitar animar largura, altura, margem, top/left, sombras grandes.
2. **Interrompível:** toda animação pode ser cancelada no meio e revertida sem salto (preview que entra e sai rápido).
3. **Uma coisa grande por vez:** no máximo um elemento de tela cheia animando.
4. **CSS antes de JS:** CSS/Web Animations para o que for possível; biblioteca de animação só para sequências complexas e só no universo que precisa.
5. **Pausa fora da tela:** loops param quando o elemento sai da viewport ou a aba fica em segundo plano.
6. **Orçamento de frame:** mirar 60 fps em aparelho médio; se cair, reduzir tier automaticamente.

## Eventos e comportamentos
### Hover/foco em um pack (desktop)
- **Intenção:** esperar ~100 ms de permanência antes de iniciar (evita varredura acidental do mouse).
- **Entrada do preview:** 400–700 ms, curva suave; T0 imediato, T1 logo depois. O próprio card reage (destaque), mas o ponto central é o **Stage** mudar.
- **Pré-carga:** ao detectar intenção, pré-buscar imagem de atmosfera pequena, fonte e o trecho de código do universo.
- **Saída:** carência de ~250 ms; se o ponteiro entrar em outro pack nesse intervalo, **transição direta de A para B** sem passar pelo base.
- **Reverter:** voltar ao base em ~500 ms.

### Clique/toque em "Entrar"
Transição de **continuidade**: o card expande para o hero do universo (ou, em navegadores sem suporte, um crossfade). Usar a API de transições de página (View Transitions) como melhoria progressiva; fallback com CSS simples. Duração alvo 500–800 ms. Foco movido para o título do universo ao terminar.

### Entrada da página do universo
Sequência curta e única (título, depois galeria). Nada de "cada seção entra deslizando". Em acesso direto por URL, a sequência é reduzida.

### Scroll
Preferir animações guiadas por scroll nativas (CSS) onde houver suporte; fallback com `IntersectionObserver` que apenas marca "visível" e deixa o CSS animar. Evitar parallax em listeners de scroll.

### Troca de universo (seletor)
Mesma transição A→B do hub, sem passar pelo base.

### Voltar ao hub
Reverso da entrada: o hero recolhe para o card e o Stage retorna ao base.

## Movimento reduzido e economia de dados
- `prefers-reduced-motion: reduce`: T1/T2 desligados; preview e navegação viram fade de tokens; sem parallax, sem loops, sem rastro de cursor.
- Economia de dados (`Save-Data`/conexão lenta): preview usa só tokens, sem imagens de atmosfera; T2 não carrega até o usuário pedir.

## Biblioteca de animação (decisão aberta)
Padrão recomendado: **CSS + Web Animations + View Transitions**. GSAP (ou similar) só **dentro de slots T2** de universos que realmente precisem de timelines, importado dinamicamente. Decisão D-13 registra isso.

## Presets
Cada universo escolhe um preset de movimento (`calmo`, `medio`, `intenso`) que ajusta duração, curva e quantidade de elementos T1, em vez de definir números soltos. Isso mantém o conjunto coerente e testável.

## Portal: abrir, atravessar, chegar
Baseado na referência em [references/PORTAL_DOOR_REFERENCE.md](references/PORTAL_DOOR_REFERENCE.md) (conceito e mecanismo; o visual será nosso).

### Máquina de estados do portal
```
repouso → intenção → preview → pressionado → abrindo → atravessando → chegada
   ↑          │          │                                              │
   └──────────┴──────────┘ (cancelável até "pressionado")               └→ universo (estável)
```
| Estado | Gatilho | O que acontece | Cancelável |
|---|---|---|---|
| repouso | — | hub em estado base | — |
| intenção | pointerenter/foco por ~100 ms | começa pré-carga | sim |
| preview | intenção confirmada | o **Stage inteiro** veste o universo (T0 + T1); packs inativos recuam (menos opacidade/cor); o portal ativo ganha profundidade e luz; cursor em pílula com a ação | sim (saída com carência de ~250 ms) |
| pressionado | clique/toque | resposta tátil imediata no portal (ex.: puxador/trinco), em < 100 ms | não |
| abrindo | logo após | o portal "abre" (folha/forma gira ou se parte em 3D, com luz saindo do vão); outros elementos recuam | não |
| atravessando | ~0,5–1 s | o portal se expande até preencher a tela; fundo do hub desaparece | não |
| chegada | ~2–3 s | a rota do universo aparece **já com o tema ativo**; foco vai ao título | — |

### Regras
1. **Estado em atributo, animação em CSS.** JavaScript só troca o estado do Stage/portal; as transições são CSS. Evita render de React por frame.
2. **Abertura em 3D leve:** rotação de um painel com origem na borda (dobradiça), perspectiva e `will-change` apenas durante a ação. A profundidade (espessura, sombra, luz) vem de camadas simples, não de imagens grandes.
3. **Escala por contêiner:** o portal usa unidades relativas ao próprio tamanho para ficar igual em qualquer tela.
4. **Continuidade:** o que "atravessamos" é o que chegamos. O fundo da tela cheia na abertura é a atmosfera do universo.
5. **Duração total alvo:** abertura + travessia ≤ ~1,5 s percebidos; a referência levou mais (~3 s) e isso pode cansar quem volta várias vezes. Em visita recorrente, encurtar (D-27).
6. **Mobile:** sem hover; o portal abre no toque em "Entrar", com a mesma sequência (talvez mais curta).
7. **Movimento reduzido:** sem rotação 3D nem expansão; o portal faz um fade de tokens e a rota abre direto.
8. **Teclado:** foco = preview; Enter = pressionar/abrir; Esc volta ao repouso.
9. **Voltar:** a abertura é revertida em sentido contrário, ou um fade curto.
10. **Cada universo pode ter o portal com forma e abertura próprias** (porta, cortina, fenda, página que se rasga...), desde que obedeça esta máquina de estados e o orçamento de desempenho (D-26).

## Checklist por animação
- [ ] Anima só propriedades baratas?
- [ ] Pode ser interrompida?
- [ ] Tem versão sem movimento?
- [ ] Pausa fora da tela?
- [ ] Medida em celular médio?
