# Portais: proposta de forma para cada universo

> Status: **proposta para aprovação** (DECISIONS D-32). São ideias de conceito e de mecânica, **não** decisões visuais: cores, fontes e acabamento seguem em aberto. Segue o contrato do portal em [THEME_SYSTEM](THEME_SYSTEM.md) e a sequência de estados em [ANIMATION_SYSTEM](ANIMATION_SYSTEM.md) (repouso → intenção → preview → pressionado → abrindo → atravessando → chegada).

## Critério usado
Cada portal nasce **da natureza do universo**, não de um enfeite: o objeto do portal deve ser a ideia do estilo. Por isso Cobertura e Cicatrizadas, que não são estilos visuais, ganham portais que **contam o que fazem**.

## Os cinco portais

### 1. Fine Line: o traço que se desenha
- **Objeto:** uma folha em branco onde **um único traço contínuo** desenha a silhueta do portal (um arco, uma moldura).
- **Repouso:** o traço já desenhado, finíssimo, com muito espaço vazio.
- **Preview:** o traço "respira" e desenha detalhes delicados no interior; o site inteiro fica claro e arejado.
- **Gatilho tátil:** a ponta do traço (uma agulha/caneta) que acompanha o cursor.
- **Abrir:** o traço **se abre como um zíper/costura** pelo meio e a folha se parte, mostrando o interior.
- **Atravessar:** o espaço em branco se expande até preencher a tela.
- **Interior (prévia do universo):** linhas se desenhando sozinhas.
- **Custo:** **baixo** (SVG com traço animado, quase só CSS).
- **Versão simples (T0):** a silhueta troca de traço fino para cheio e faz fade.

### 2. Geek: o cartucho (ou o quadro que rompe)
- **Objeto:** um **cartucho de console** no encaixe. Alternativa: um **quadro de quadrinhos** cuja moldura rompe.
- **Preview:** a "tela" por trás liga, cores e ritmo mais vibrantes; o encaixe acende.
- **Gatilho tátil:** apertar o cartucho para dentro, com um "clique" visual.
- **Abrir:** o cartucho é inserido e a tela liga com uma varredura; no quadro, os cantos estouram.
- **Atravessar:** a tela do "jogo" cresce até preencher.
- **Interior:** cena de abertura do universo com movimento de jogo.
- **Custo:** **médio** (camadas e movimento mais ricos).
- **Cuidado:** não virar o "universo Anime" que descartamos; o que define o Geek é cultura pop em geral.

### 3. Flash: a folha na parede
- **Objeto:** uma **folha de desenhos flash colada com fita** em uma parede de estúdio.
- **Preview:** a folha se destaca da parede (outras recuam), e a parede ao fundo ganha mais folhas.
- **Gatilho tátil:** a fita que se solta.
- **Abrir:** a folha se **descola e vira como uma página**, revelando a parede de designs atrás.
- **Atravessar:** a parede de folhas cobre a tela.
- **Interior:** mosaico de desenhos prontos.
- **Custo:** **médio** (3D leve de virar página, camadas simples).
- **Ligação com o produto:** o universo é um catálogo; cada desenho pode ter "reservar".

### 4. Cobertura: a tinta que cobre
- **Objeto:** um painel de **duas camadas**: embaixo, uma tatuagem antiga (borrada, apagada); em cima, uma cobertura.
- **Preview:** a cobertura recua um pouco e deixa ver que há algo por baixo; o clima do site muda de "antigo" para "renovado".
- **Gatilho tátil:** passar o cursor "limpa" a camada como uma esponja.
- **Abrir:** a tinta nova **se espalha por cima** do antigo e, em seguida, a camada de cima se retrai revelando o novo desenho (a ideia de **antes e depois** feita movimento).
- **Atravessar:** a mancha de tinta preenche a tela.
- **Interior:** par "antes/depois".
- **Custo:** **médio** (máscara animada entre duas imagens; precisa de fotos antes/depois reais).
- **Dependência de conteúdo:** só funciona bem com pares reais de antes e depois do Mauro.

### 5. Cicatrizadas: a película que se descola
- **Objeto:** uma **película transparente de cicatrização** sobre a pele, com marcas de tempo (dia 1, semana 1, mês 1...).
- **Preview:** a película começa a se descolar de um canto e as marcas de tempo avançam; o site fica mais "calmo" e nítido.
- **Gatilho tátil:** o canto da película que se levanta.
- **Abrir:** a película **se descola** e o tempo avança, mostrando a pele cicatrizada.
- **Atravessar:** a pele cicatrizada preenche a tela.
- **Interior:** uma linha do tempo de cicatrização.
- **Custo:** **médio** (descolar com máscara/3D leve; linha do tempo).
- **Dependência de conteúdo:** fotos de cicatrização em momentos diferentes seriam o ideal.

## Resumo
| Universo | Objeto-portal | Abre como | Custo | Depende de conteúdo real |
|---|---|---|---|---|
| Fine Line | traço contínuo | zíper/costura | baixo | pouco |
| Geek | cartucho ou quadro | encaixa / estoura | médio | pouco |
| Flash | folha colada | desprende e vira página | médio | sim (desenhos) |
| Cobertura | camadas de tinta | tinta cobre e revela | médio | **sim (antes/depois)** |
| Cicatrizadas | película + tempo | se descola e avança | médio | **sim (fotos por época)** |

## Coesão do hub (regra comum a definir antes de desenhar)
Mesmo com formas diferentes, os cinco precisam parecer uma família. Proposta de regras (a validar na Fase 2): mesma **proporção de área** (por exemplo, todos num quadro alto), mesma **linha de base** (um "chão" comum), mesmo **espaçamento**, mesma **posição do rótulo** do estilo, e o mesmo **gesto** de abrir (a ação é sempre "entrar"). O que varia é o objeto e a maneira de abrir.

## Recomendação para a fatia vertical (Fase 2)
Construir **dois** portais muito diferentes para provar o conceito:
1. **Fine Line** (leve, claro, barato: prova o preview que transforma o site).
2. **Flash** ou **Geek** (denso, vibrante: prova o contraste entre universos).
**Cobertura** e **Cicatrizadas** ficam para depois, porque dependem de fotos reais de antes/depois e de tempo.

## Não decidido aqui
Cores, tipografia, acabamento dos materiais, ilustrações. Também não escolhi referências visuais; elas virão na etapa de pesquisa.
