# Decisões

Registro único de decisões. **Nada em aberto deve ser assumido na implementação.** Quando uma decisão for tomada, mude o status e escreva a data e o motivo.

Status: `ABERTA` · `PROPOSTA` (há recomendação, falta aprovação) · `DECIDIDA`

## Já decididas (vindas do usuário)
| ID | Decisão | Fonte |
|---|---|---|
| D-00a | O site é um sistema de universos que transforma a interface; a galeria é consequência | pedido atual |
| D-00b | Arquitetura **única e centralizada** com sistema de temas; nada de sites independentes | pedido atual |
| D-00c | Hover no desktop transforma o site; clique entra no universo; toque precisa de equivalente | pedido atual |
| D-00d | Sem back-end e sem Supabase | conversas anteriores |
| D-00e | PT-BR | conversas anteriores |
| D-00f | Nesta etapa: nada de implementação, cores/fontes definitivas, referências externas, imagens criadas nem conteúdo inventado | pedido atual |

## Os 5 universos (D-03)
Fonte: imagem dos destaques do Instagram enviada pelo usuário ("esses são os estilos"). Nomes como aparecem lá. **Não há decisão visual aqui**; só o que cada universo precisa resolver.

| Universo | O que é | Natureza | Pergunta de design que ele traz |
|---|---|---|---|
| **Fine Line** | traço fino e delicado | estilo visual | como transmitir delicadeza e precisão? |
| **Geek** | personagens e cultura pop | estilo/tema | como ser vibrante sem virar o "universo Anime" que descartamos? |
| **Flash** | desenhos prontos para tatuar | tipo de oferta | como mostrar um "catálogo" disponível, com ação de reservar? |
| **Cobertura** | cobrir tatuagem antiga com outra | **serviço** (cover-up) | como mostrar a transformação (antes e depois)? |
| **Cicatrizadas** | tatuagens já cicatrizadas | **estado do resultado** | como mostrar o tempo e a fidelidade ao longo da cicatrização? |

Observações:
- **Dois dos cinco não são "estilos visuais"** (Cobertura é serviço; Cicatrizadas é estado). Isso é aceito, e cria oportunidades: antes/depois em Cobertura, linha do tempo de cicatrização em Cicatrizadas. Mas a identidade visual deles precisa de uma ideia própria, ou ficarão parecidos entre si.
- **Cicatrizadas atravessa os outros:** é natural que suas fotos também pertençam a Fine Line, Geek ou Flash (D-21).
- **Realismo, Anime, Blackwork, Oriental, Dark/Horror e Colorido não entram no lançamento.** Se o Mauro fizer, voltam como universos novos; a arquitetura foi feita para isso.
- **Risco:** com só 5 e dois deles "não visuais", a diferença entre universos depende mais de ideia que de paleta. Cuidado para não repetir o mesmo layout cinco vezes.

## Bloqueiam a implementação
| ID | Questão | Opções | Recomendação | Status |
|---|---|---|---|---|
| D-01 | **Stack** | Next.js (App Router) + TypeScript + Tailwind; Astro com ilhas; Vite + React | Next.js: rotas estáticas por universo, imagens otimizadas, transições entre rotas. Astro é a alternativa mais leve se o JS inicial virar problema. | PROPOSTA |
| D-02 | **Hospedagem e deploy** | Vercel (CLI, já logada); outra | Vercel pela CLI (o conector não envia imagens binárias) | PROPOSTA |
| D-03 | **Lista de universos no lançamento** | Os 8 do exemplo (Anime, Blackwork, Realismo, Fine Line, Oriental, Dark/Horror, Colorido, Geek) ou menos | Pelo que se viu no Instagram: realismo/black and grey, geek/anime, fine line, pets, cobertura, flash. **Oriental, Dark/Horror e Colorido não foram vistos**: confirmar com o tatuador. Lançar com 3–4 universos bem feitos e crescer. | **DECIDIDA (usuário, 19/11): 5 universos, os destaques do Instagram: Cicatrizadas, Fine Line, Cobertura, Geek, Flash.** Realismo, Anime, Blackwork, Oriental, Dark/Horror e Colorido ficam fora do lançamento (podem entrar depois). Ver "Os 5 universos" abaixo. |
| D-04 | **Equivalente do hover no toque** | A centralização automática + botão "Entrar"; B toque duplo; C pressão longa; D ciclo automático | A, com D curta opcional na primeira visita | PROPOSTA |
| D-05 | **Escopo do preview** | Página inteira se transforma; só uma zona (fundo + título); híbrido | Página inteira, mas só com tokens e camada de atmosfera leve (barato). Validar na Fase 2. | PROPOSTA |

## Importantes (decidir antes da fase indicada)
| ID | Questão | Recomendação | Fase | Status |
|---|---|---|---|---|
| D-06 | O preview muda **tipografia** ou só cor/forma/atmosfera? | Só se a fonte já estiver carregada; senão a troca acontece ao entrar | 2 | PROPOSTA |
| D-07 | Trocar de universo **direto** (sem voltar ao hub)? | Sim, com seletor compacto | 3 | PROPOSTA |
| D-08 | Detalhe do trabalho: **modal** ou **rota própria**? | Rota interceptada: abre como modal na navegação, mas a URL é compartilhável | 3 | PROPOSTA |
| D-09 | Subcategorias dentro de um universo? | Só quando houver conteúdo que justifique; começar sem | 3 | ABERTA |
| D-10 | **Destino do orçamento**: WhatsApp, formulário ou ambos? Número? | WhatsApp com mensagem citando o universo; formulário só se o tatuador quiser filtrar pedidos. **Número a confirmar.** | 4 | ABERTA |
| D-11 | Conteúdo em **arquivos locais** ou **CMS**? | Arquivos tipados e validados; CMS só se o tatuador for editar sozinho | 1 | PROPOSTA |
| D-12 | Papel da **paleta verde** enviada pelo usuário | Base neutra do hub e da marca; cada universo traz a sua. Alternativa: ser um dos universos | 2 | ABERTA |
| D-13 | **Biblioteca de animação** e se algum universo usa 3D/canvas | CSS + Web Animations + View Transitions; GSAP só em slots T2 sob demanda; 3D só com justificativa | 1–2 | PROPOSTA |
| D-14 | Resolução máxima das fotos de origem e política de originais | Definir teto (ex.: lado maior limitado) e guardar originais fora do build | 3 | ABERTA |
| D-15 | Metas de desempenho oficiais | Aceitar as do PERFORMANCE.md como ponto de partida e calibrar na Fase 2 | 2 | PROPOSTA |

## Podem esperar
| ID | Questão | Status |
|---|---|---|
| D-16 | Aviso de conteúdo/ocultar imagens fortes (Dark/Horror) | ABERTA |
| D-17 | Analytics (ferramenta, consentimento, o que medir) | ABERTA |
| D-18 | Domínio próprio e e-mail | ABERTA |
| D-19 | Processo de **consentimento dos clientes** para exibir tatuagens | ABERTA (obrigatório antes de publicar fotos) |
| D-20 | Ferramenta de auditoria de acessibilidade (Axe, A11y Enforcer ou WebAbility) | ABERTA |
| D-21 | Um trabalho pode pertencer a **mais de um** universo? Agora é provável: uma tatuagem fine line cicatrizada pertence a Fine Line **e** a Cicatrizadas | PROPOSTA: sim, com um universo "principal" por trabalho (define a identidade na página dele) |
| D-22 | Marca d'água nas fotos | ABERTA |
| D-23 | Idioma(s): só PT-BR ou também EN | ABERTA |
| D-24 | Som (nenhum por padrão) | PROPOSTA: sem som |
| D-25 | Instalar plugins/skills do catálogo (SKILLS.md, seção B) | ABERTA |

## Surgidas da referência de portal (19/11/2026)
Origem: [references/PORTAL_DOOR_REFERENCE.md](references/PORTAL_DOOR_REFERENCE.md). O usuário escolheu esse site como referência de **conceito de portal e animações de abrir e de transição**.
| ID | Questão | Opções | Recomendação | Status |
|---|---|---|---|---|
| D-26 | **Quão literal é a metáfora?** A porta é a assinatura do autor da referência | portas literais; portais com forma própria por universo (mesma mecânica); um único portal genérico | Manter a **mecânica** (estados, abertura, travessia, chegada) e criar portais **nossos** por universo. Evita parecer cópia e reforça "um universo = um mundo". | **DECIDIDA (usuário, 19/11): forma própria por estilo.** Contrato em THEME_SYSTEM. |
| D-32 | **Forma de cada um dos 5 portais** | Fine Line: traço que se desenha; Geek: cartucho ou quadro que rompe; Flash: folha colada que vira página; Cobertura: tinta que cobre e revela; Cicatrizadas: película que se descola. Detalhes em [PORTALS](PORTALS.md) | Aprovar ou trocar cada um; começar a fatia vertical com Fine Line + Flash/Geek | PROPOSTA |
| D-27 | Duração da travessia e comportamento em visita repetida | ~3 s como a referência; ≤1,5 s; curto após a primeira vez | ≤1,5 s, e mais curta nas visitas seguintes (guardar preferência local) | PROPOSTA |
| D-28 | O hub usa **rolagem fixa (pin)** e **rolagem suave** como a referência? | sim; só rolagem normal | Só rolagem normal no início: rolagem suave e seção fixa têm custo e riscos de acessibilidade. Reavaliar na Fase 2. | PROPOSTA |
| D-29 | **Navegação real × transição sem recarregar** | recarregar a página como a referência; transição de página mantendo o Stage | Manter o Stage (continuidade do preview). Exige cuidado com suporte de navegador. | PROPOSTA |
| D-30 | Cursor em "pílula" com a ação sobre os packs | sim; não | Sim no desktop, desligado em toque e movimento reduzido | PROPOSTA |
| D-31 | Visual da referência (claro, quente, tátil) como estilo do hub? | só conceito/animação (resposta do usuário); também o visual | **Só conceito/animação**, conforme dito pelo usuário; o visual segue a paleta verde e os universos | DECIDIDA (usuário) |

## Riscos técnicos identificados
| # | Risco | Por que importa | Mitigação |
|---|---|---|---|
| R-1 | **Custo do preview na página inteira** (repintura em hover) | Pode travar, principalmente no celular | Preview só em tokens + 1 camada; animar compositor; medir na Fase 2; degradar tiers |
| R-2 | **Piscar/instabilidade** ao cruzar de card em card | Parece defeito | Intenção 100 ms, carência de saída 250 ms, transição direta A→B |
| R-3 | **Fontes por universo** (peso e salto de layout) | LCP e CLS | Subconjunto, ≤2 famílias, métricas de fallback, pré-carga por intenção, troca só se pronta |
| R-4 | **Peso de imagens** (muitas obras) | Lentidão e custo | Pipeline local, formatos modernos, janelas de renderização, paginação |
| R-5 | **Hover no toque** | Perder metade do público | Equivalente de toque desde a Fase 2, não depois |
| R-6 | **JS acumulado** com 8+ universos | Hub pesado | Código por universo sob demanda; hub só com o essencial |
| R-7 | **Contraste por universo** | Cada paleta pode quebrar AA | Teste automatizado por tema no build |
| R-8 | **Transição entre rotas sem remontar o Stage** | Quebra a continuidade | Stage no layout raiz; View Transitions como melhoria progressiva com fallback |
| R-9 | **Inconsistência de marca** entre universos | Parece "vários sites" | Marca constante definida e testada; componentes não citam universos |
| R-10 | **Direitos e privacidade das fotos** | Risco legal/ético | Campo de consentimento obrigatório, remover EXIF, não enviar fotos a terceiros |
| R-11 | **Conteúdo faltando** | Universos vazios | Estado "em breve" honesto; publicar só universos com conteúdo mínimo |
| R-12 | **Suporte de navegador** a recursos modernos (transições, animação por scroll, propriedades registradas) | Comportamento diferente | Sempre com fallback funcional; nunca depender só do recurso novo |
| R-13 | **Escopo crescer** com a criatividade | Nunca termina | Fatia vertical primeiro; checklist de "universo pronto"; lançar com poucos |
| R-14 | **Dependência de uma só foto** hoje | Impossível testar universos sem imagens | Planejar a produção/recebimento de fotos antes da Fase 3 |

## Log de decisões
| Data | ID | Decisão | Motivo |
|---|---|---|---|
| 2026-11-19 | D-00a…f | Registradas as decisões iniciais do pedido | Ponto de partida do planejamento |
| 2026-11-19 | D-31 | Referência de portal (therishithakor.com): usar conceito de portal e animações de abrir e de transição, não o visual | Resposta do usuário |
| 2026-11-19 | D-26 | Cada estilo terá **portal de forma própria**, mantendo a mesma máquina de estados | Resposta do usuário; evita cópia e reforça "um universo = um mundo" |
| 2026-11-19 | D-03 | Lançamento com 5 universos: Cicatrizadas, Fine Line, Cobertura, Geek, Flash | Resposta do usuário (destaques do Instagram) |
| 2026-11-19 | D-32 | Proposta de portal por estilo registrada em PORTALS.md, aguardando aprovação | Pedido do usuário: "que tipo as portas vão ser" |
| 2026-11-19 | R-17 | Novo risco: Cobertura e Cicatrizadas não são estilos visuais, então podem ficar sem identidade distinta | Dar a cada um um conceito próprio (antes/depois; tempo de cicatrização) antes de desenhar o portal |
| 2026-11-19 | R-16 | Novo risco: portais de formas diferentes podem quebrar a coesão do hub e multiplicar o trabalho por universo | Contrato único do portal (partes, estados, orçamento); composição do hub definida antes dos portais; portal padrão como reserva |
| 2026-11-19 | R-15 | Novo risco: abertura 3D + travessia aumentam custo e podem cansar em visitas repetidas | Orçamento de ≤1,5 s, degradação por tier, versão curta recorrente |
| 2026-11-19 | D-33 | **Protótipo funcional** usa 3 universos de teste: **Anime, Blackwork, Realismo** (D-03 continua valendo para o lançamento) | Pedido do usuário: provar a experiência central com 3 identidades bem diferentes |
| 2026-11-19 | D-01 | Stack confirmada para o protótipo: **Next.js (App Router) + TypeScript + CSS puro/CSS Modules**, sem Tailwind. `cacheComponents` desligado (o `Activity` dele mantém rotas ocultas e conflita com a máquina de estados do Stage) | Tokens por CSS variables dispensam utilitários; menos peças |
| 2026-11-19 | D-13 | **Sem GSAP/Motion no protótipo**: CSS transitions/keyframes + WAAPI onde precisar. Biblioteca só se um slot T2 realmente exigir | Cada dependência precisa de justificativa; nada exige ainda |
| 2026-11-19 | D-34 | Registro de universos **explícito** (`src/universes/index.ts`, uma linha de import por universo). Adicionar "Tribal" = criar a pasta + 1 linha | Simples, tipado e sem mágica de filesystem |
| 2026-11-19 | D-35 | **Imagens do protótipo são placeholders** gerados em SVG/CSS, rotulados "PLACEHOLDER", sem fotos de terceiros nem imagens aleatórias. Cada obra tem `image: { src?, alt }`: quando `src` existir, `next/image` o usa; sem `src`, entra a arte-placeholder | Regra do usuário: nada aleatório apresentado como trabalho real |
| 2026-11-19 | D-36 | **Fontes provisórias** (Google Fonts via `next/font`, `preload: false`): Anime = Bangers + M PLUS Rounded 1c; Blackwork = **Oswald + Space Mono** (gótica evitada por legibilidade); Realismo = Cormorant Garamond + Inter. Trocam por universo e são provisórias | Identidade tipográfica distinta por universo; D-06 (troca só se carregada) |
| 2026-11-19 | D-37 | **Paletas dos 3 universos são provisórias** e independentes da paleta verde (D-12 segue aberta; o hub usa o verde como base neutra) | O hub é a marca; cada universo tem a sua cor |
| 2026-11-19 | D-10 | Destino do orçamento no protótipo: **link do Instagram (@maurojr_tattoo)** com texto pré-preenchido indisponível; o WhatsApp só entra quando confirmado. Formulário real fora do escopo | WhatsApp ainda não confirmado |
| 2026-11-19 | D-38 | Transição de entrada: véu com `clip-path: circle()` que cresce do ponto do clique (≈0,9 s), `router.push` ao cobrir, véu sai quando a rota muda. View Transitions não é usada no protótipo | Funciona em qualquer navegador; respeita ≤1,5 s (D-27) |
| 2026-11-19 | D-39 | Toque: carrossel com scroll-snap; o card centralizado vira *preview* (IntersectionObserver) e o botão "Entrar" é explícito (D-04 opção A). Detecção por `(hover: hover) and (pointer: fine)`, não por user agent | Equivalente ao hover, não igual |
| 2026-11-19 | D-40 | Detalhe da obra no protótipo: **`<dialog>` modal** com anterior/próxima (D-08 segue aberta para rota interceptada) | Nativo, acessível, sem rota extra |
| 2026-11-19 | D-41 | Os rótulos dos portais usam a fonte do próprio universo, então o hub baixa as fontes dos 3 na primeira visita (D-06 revista: sem salto no preview; reavaliar com 5+ universos) | Verificado no protótipo |
| 2026-11-19 | D-42 | O portal carrega o próprio `data-theme`: mantém a identidade mesmo quando o palco mostra outro universo | Coesão dos portais e contraste previsível |
| 2026-11-19 | D-43 | Cursor pílula (D-30) e View Transitions ficam fora do protótipo | Prioridade: transformação, entrada e galeria |
| 2026-11-19 | D-44 | A home passa a ter **3 partes independentes**: (1) **hero fixa** no layout do mockup do usuário; (2) **seção dos portais**, a única que se transforma com o hover (tokens e atmosfera escopados no `data-theme` da seção); (3) **rodapé fixo** com estilo próprio. O palco só muda de tema por rota | Pedido do usuário. Substitui a transformação de página inteira no hub (D-05 passa a valer só para a seção dos portais no hub) |
| 2026-11-19 | D-45 | Base da marca (hero, menu, seção base, rodapé) = **preto `#0a0a0b` + magenta `#e0187c`** em vez da paleta verde (D-12 fica registrada como insumo antigo). Magenta ajustado para contraste AA com texto branco (4,6:1) | Mockup do usuário |
| 2026-11-19 | D-46 | Tipografia da marca = **Inter** (título 900 com letter-spacing −0,045em; texto 400–500; menu e labels 500–600 com 0,15em), seguindo a direção do usuário. Cada universo mantém fonte própria **somente** dentro da seção dos portais e das páginas dos universos | Direção tipográfica enviada pelo usuário; coesão da marca |
| 2026-11-19 | D-47 | Copy da hero vem do mockup do usuário ("Arte que fica pra sempre.", "Tatuador profissional", parágrafo e "Explore os estilos"). Menu com só ESTILOS e ORÇAMENTO enquanto SOBRE e CONTATO não existirem. Marca "M" é provisória. Foto da hero em `public/hero/mjr.png` (usuário vai enviar a foto definitiva) | Não linkar seções inexistentes |
| 2026-11-19 | D-48 | **Portais viram círculos** no estilo da imagem do usuário: arte recortada (sem texto) rompe o contorno, título em Inter 900 e "Ver projetos ⊙→" são texto real, sem luzes de fundo atrás da arte, cor de destaque do próprio universo. Substitui D-26 (forma própria por estilo): a identidade agora vem da arte, da cor e do efeito | Pedido do usuário ("os portais devem ser nesse estilo") |
| 2026-11-19 | D-49 | Slot de arte por universo: `portal.art` (WebP/PNG com alfa em `public/universos/<slug>/portal.webp`) e `portal.jp` opcional. Sem arte, o portal usa o desenho próprio dentro de um disco (`PortalArt`). A arte do Anime veio com o texto gravado; ele foi removido por preenchimento (script) e o texto é refeito em código | Texto real é acessível, nítido e editável |
| 2026-11-19 | D-50 | Lista de 8 universos mostrada pelo usuário (Anime, Fine Line, Coberturas, Geek, Realismo, Blackwork, Oriental, Flash) tratada como **provável**, ainda sem confirmação explícita; no código seguem 3 (Anime, Blackwork, Realismo) até as artes e o conteúdo chegarem. Cicatrizadas (D-03) fica fora por ora | Pedir confirmação antes de criar 5 universos sem arte |
| 2026-11-19 | R-18 | Risco: a arte do Anime mostra um **personagem reconhecível de uma obra de terceiros** (direitos autorais). Para uso comercial no site, avaliar trocar por personagem original ou estilo genérico | Decisão do tatuador/usuário |
| 2026-11-19 | D-51 | Fontes de título por universo (indicadas pelo usuário): Fine Line = Cinzel, Coberturas = Oswald Bold, Realismo = Cormorant Garamond, Blackwork = Bebas Neue. Valem para o título da seção em preview e para as páginas dos universos; os nomes dentro dos portais seguem em Inter 900 (mockup). Anime segue Bangers (provisória) | Pedido do usuário |
| 2026-11-19 | D-52 | Fundo do universo Anime = paisagem de anime enviada pelo usuário (`public/universos/anime/bg.webp`, só 736 px de largura na origem: fica suave; trocar por versão maior se quiser nitidez), com camada escura por cima e brilhos. Substitui retícula, raios e cortes diagonais | Pedido do usuário. Origem da imagem não confirmada: verificar direitos antes de publicar |
| 2026-11-19 | D-53 | Fundo do Realismo = shader WebGL "Silk" (fornecido pelo usuário, sem bibliotecas): cores #0F0F0F/#474444/#2D2B2B/#333030, redemoinho no cursor. Só renderiza com o tema ativo, pausa com a aba oculta e desenha quadro estático com reduced motion. `ink2` do Realismo clareado para manter contraste AA sobre o shader | Pedido do usuário |
| 2026-11-19 | D-54 | Os cards de trabalhos de **todos** os universos usam o carrossel "squeeze" (um painel aberto e o resto em ripas; port do 21st.dev para CSS puro, sem Tailwind/shadcn: D-01). O visual de cada universo vem dos tokens (cor, fonte, raio). Substitui as galerias próprias (mangá, faixa de pranchas, sala de exposição, folhas soltas) | Pedido do usuário |
| 2026-11-19 | D-55 | Fundo do Blackwork = seda em canvas 2D (adaptada de um componente 21st.dev): baixa resolução esticada por CSS, ~30 fps, só com o universo ativo, osso bem escuro para manter contraste AA, quadro estático com reduced motion. Substitui grade, mandala de fundo e dotwork | Pedido do usuário |
| 2026-11-19 | D-56 | Fine Line usa a fonte **Bemdayni (Demo)** enviada pelo usuário (`src/universes/fineline/fonts/`), com Cinzel de reserva. Versões "Demo" costumam ser só para uso pessoal: **confirmar a licença comercial antes de publicar** | Pedido do usuário; substitui parte de D-51 |
| 2026-11-19 | D-57 | Bemdayni (Demo) testada no Fine Line e **revertida**: letra cursiva ilegível em título e botões. Fine Line volta para Cinzel (D-51); D-56 cancelada | Usuário |
| 2026-11-19 | D-58 | Logo "M" do usuário (PNG branco recortado em `public/brand/logo-m.png`) substitui a marca provisória; removida a etiqueta que seguia o cursor (D-30 cancelada); hero ganha entrada escalonada em CSS (foto, menu, título linha a linha, texto, contador) | Pedido do usuário. Servidor MCP do 21st.dev não estava conectado: ideias de animação próprias |
| 2026-11-19 | D-59 | Rodapé do hub vira grade de 4 colunas (chamada, links rápidos, contato, redes), reescrita em CSS puro a partir do footer 21st.dev. Sem newsletter (sem back-end), sem modo claro/escuro, sem links de páginas inexistentes, sem endereço/telefone inventados. Título da chamada: "Vamos transformar a ideia em decalque?" | Pedido do usuário |
| 2026-11-19 | D-10 | WhatsApp **+55 11 95460-0110** informado pelo usuário e exibido no rodapé do hub (link wa.me). Os botões de orçamento continuam apontando para o Instagram até ele decidir se trocam para o WhatsApp | Usuário |
| 2026-11-19 | D-10 | **Resolvida**: os botões de orçamento (menu da hero, rodapé do hub e seção de cada universo) abrem o **WhatsApp** com mensagem pronta (nome do universo, quando houver); o Instagram segue como alternativa em texto e no ícone. Números e links em `src/lib/contact.ts` | Pedido do usuário |
| 2026-11-19 | D-60 | Base da marca volta à **paleta verde** enviada no início (#0F1F17 fundo, #1E3A2E superfície, #C7CBB8 texto e botões, #6B7F67 destaque) no lugar de preto + magenta (D-45 substituída). `#9FB09A` (derivado) para texto secundário, porque `#6B7F67` sobre `#0F1F17` só dá 3,9:1 | Pedido do usuário |
| 2026-11-19 | D-61 | Paleta verde na base **revertida** (ficou ruim): volta preto + magenta (D-45 vale de novo; D-60 cancelada). Única mudança: as palavras em destaque dentro de letras ("sempre." e "decalque?") deixam de ser rosa e usam `#9FB09A`; quadrado e botões seguem magenta | Usuário |
| 2026-11-19 | D-62 | Palavras em destaque ("sempre.", "decalque?") voltam a ser **rosa/magenta** (`--accent`); D-61 fica só como a reversão da paleta verde | Usuário |
| 2026-11-19 | D-63 | Galerias dos 4 universos passam a usar **fotos reais** do Instagram @maurojr_tattoo (miniaturas baixadas com o usuário logado; classificação por imagem: Anime 17, Fine Line 52, Blackwork 16, Realismo 41; fora: conteúdo que não é tatuagem, rostos de clientes, e estilos sem universo ainda: oriental, colorido/flash, cobertura). Originais em `refs/instagram/`. **Pendente antes de publicar:** autorização de cada cliente (D-19) e conferência da classificação pelo Mauro | Pedido do usuário |
| 2026-11-19 | D-64 | Curadoria: o site usa só as **melhores** fotos por universo (Anime 8, Fine Line 10, Blackwork 9, Realismo 11). As escolhidas e as de estilos sem universo (oriental, colorido/flash, geek) ficam copiadas e categorizadas em `refs/instagram/categorizado/`, com lista e links dos posts em `refs/instagram/CATEGORIAS.md`. Substitui as quantidades de D-63 | Usuário |
| 2026-11-19 | D-65 | Removida do Fine Line a foto C-QNAnJpS2N (montagem digital/edição, não é foto da tatuagem pronta) | Usuário |
