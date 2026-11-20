# Referência: conceito de portal e animação de "abrir porta"

Fonte: therishithakor.com (página `/work`), analisada em 19/11/2026 no navegador. É uma referência de **conceito e de animação**, indicada pelo usuário. **Não é referência de estilo visual** (o site dele é claro, quente e tátil; o nosso será outro).

> Cuidado de originalidade: a metáfora "uma porta por habilidade" é a assinatura desse autor. Usamos o **mecanismo** (portal + abertura + atravessar + chegada), mas o portal de cada universo e o acabamento visual precisam ser nossos (ver DECISIONS D-26).

## O conceito
Uma seção fixa mostra **uma porta por habilidade**, cada uma de uma cor, com plaquinha e maçaneta. Cada porta é um **portal** para uma página própria (`/app-developer/`, etc.). Existe até uma 5ª porta "secreta" revelada por um estado extra da seção. Mapeia diretamente para o nosso "pack/universo".

## O que foi observado
### Estrutura de uma porta (botão acessível)
`botão.doorway` com rótulo acessível "Open the Web Developer door", contendo camadas separadas:
- `casing`: moldura/batente.
- `opening`: o vão, com `room` (o interior que se vê quando a porta abre), `spill` (luz que escapa), `door` (a folha), `sill` (soleira).
- `door`: textura canelada, `plate` (placa), `handle` (maçaneta com alavanca e fechadura), `door__shade` (escurecimento) e `leak` (vazamento de luz).
- `pool`: poça de luz no chão (desligada em alguns estados).
Cada camada é um elemento simples; o efeito vem de **camadas + CSS**, não de imagens pesadas.

### Estados da seção (classes aplicadas por JavaScript, animação em CSS)
| Estado | Quando | O que muda (observado) |
|---|---|---|
| `in` | seção entra na tela | entrada das portas |
| `on` (na porta) | hover/foco | sombra e profundidade da porta aumentam; a luz do `room` acende |
| `focus` (na seção) | uma porta ativa | as **outras portas escurecem quase por completo** (opacidade ~0,03) e perdem cor |
| `lift` | hover numa porta | a textura de fundo some (opacidade 0); a seção "se destaca" |
| `press` (na porta) | clique | a alavanca da maçaneta gira (~-32°) |
| abrir | clique | a folha gira em 3D em torno da dobradiça à esquerda; a placa e o painel acompanham; luz sai pelo vão |
| `through` | ~1 s após o clique | paredes e piso se estendem para os lados (55vw cada) até cobrir a tela, como "entrar" no cômodo |
| chegada | ~3 s após o clique (medida grosseira) | **navegação real** para a página do portal, que aparece de um véu claro dentro de uma moldura de cantos arredondados |
| `reveal` | ação extra | a fileira de portas desliza e mostra a porta secreta |

### Técnicas
- **Sem biblioteca de animação** detectada (nem GSAP nem Framer). Animação com **transições/keyframes de CSS** + classes de estado; rolagem suave com **Lenis**.
- **3D real de CSS:** a folha usa `rotateY` com `transform-origin` na borda esquerda (dobradiça), `transform-style: preserve-3d` e `will-change: transform`; a espessura da porta é um pseudo-elemento girado -90°.
- Medidas em **unidades de contêiner** (`cqi`) para que a porta escale inteira com seu tamanho.
- Escurecimento controlado por **variável CSS** (`--o`) ligada à abertura.
- **Cursor próprio**: no desktop o cursor some sobre a porta e aparece uma "pílula" seguindo o mouse com a ação ("abrir").
- **Curvas:** transições de ~0,5 s com curva suave (`cubic-bezier(0.16, 1, 0.3, 1)`) e deslocamentos de ~0,8 s (`cubic-bezier(0.65, 0, 0.35, 1)`).
- **Tokens por tema:** cada porta tem cor própria e variante para modo escuro (`--door` / `--door-dk`).
- **Acessibilidade vista:** o portal é um `button` real com rótulo, e há contorno de foco visível. Não verificado: movimento reduzido, leitor de tela, navegação por teclado completa.
- **Celular:** o CSS mostra uma dica e pontos de paginação (`doors__hint`, `doors__dots`), o que indica carrossel no toque. Não vi funcionando.
- Pede consentimento de analytics com um aviso de cookies.

## O que não consegui verificar
Como o JavaScript calcula a abertura (tempo × rolagem), duração exata de cada etapa, comportamento em celular real, o véu e a moldura da chegada em detalhe, e o que acontece com movimento reduzido.

## Como isso vira o nosso sistema
| Observado | Aproveitamos como | Mudamos |
|---|---|---|
| Estados por classes + transição em CSS | **Máquina de estados do portal** (ver ANIMATION_SYSTEM) | os estados agem no **Stage inteiro**, não só na seção |
| Outras portas escurecem no foco | Packs não ativos recuam durante o preview | além disso, **o site inteiro veste o universo** (requisito do hover) |
| Abertura 3D da folha | Abertura do portal do universo | o "portal" de cada estilo pode ter forma própria (D-26) |
| Atravessar (paredes se estendem) | Transição de entrada: o portal se expande até preencher a tela | a tela preenchida já é o hero do universo (continuidade com o preview) |
| Navegação real após o efeito | Rota do universo | manter o Stage montado e usar transição de página, em vez de recarregar tudo |
| Cursor em pílula | Cursor de ação nos packs (só desktop) | desligado em movimento reduzido e no toque |
| Carrossel + dica no celular | Equivalente de toque (RESPONSIVENESS, D-04) | |
| Camadas simples em vez de imagens | Mantém peso baixo (PERFORMANCE) | |
