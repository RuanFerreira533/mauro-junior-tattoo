# Protótipo funcional da experiência central

> Status: **construído e verificado no navegador** (2026-11-19). Prova o ciclo: hub → hover → transformação do site → entrada → universo com galeria → voltar → outro universo. Tudo que é conteúdo é **de exemplo**.

## Como rodar
```
npm install
npm run dev      # http://localhost:3000
npm run build    # produção (rotas estáticas)
npm run lint
```

## Estrutura da home (3 partes independentes, D-44)
1. **Hero** (`HubHero.tsx`): fixa, no layout do mockup do usuário. Foto em tela cheia em `public/hero/mjr.png` (trocar o arquivo para usar a foto nova), título Inter 900 com "sempre." em magenta, menu ESTILOS/ORÇAMENTO, contador 01–03 dos universos, etiqueta que segue o mouse. **Não reage aos universos.**
2. **Seção dos portais** (`UniverseHub.tsx`, `id="estilos"`): a **única** parte que se transforma. O `data-theme` fica na própria seção, com atmosfera própria (`AmbientLayer scope="section"`).
3. **Rodapé** (`HubFooter.tsx`): fixo, no estilo da hero, com chamada de orçamento provisória.

## O que o protótipo entrega
| Passo do pedido | Onde está |
|---|---|
| Hero (mockup do usuário) | `src/components/hub/HubHero.tsx` |
| Hub com portais | `src/components/hub/UniverseHub.tsx`, `Portal.tsx` |
| Hover/foco transforma o site | `src/components/stage/StageProvider.tsx` (estado `preview`), tokens em `globals.css` e `src/universes/*/theme.css`, atmosfera em `AmbientLayer.tsx` |
| Transição de entrada (≈1,3 s) | véu `clip-path: circle()` a partir do clique: `Veil.tsx`, `.veil` em `globals.css`, variações por universo em `theme.css` |
| Página do universo | `src/app/[universo]/page.tsx` + `components/universe/*` |
| Galeria própria por universo | `src/universes/*/Gallery.tsx` (+ `gallery.module.css`) |
| Voltar e trocar de universo | `UniverseNav.tsx` (hub, troca direta e orçamento) |
| Equivalente mobile | carrossel com scroll-snap; o card centralizado é o preview; botão "Entrar" |

## Como cada universo é diferente
| | Anime | Blackwork | Realismo |
|---|---|---|---|
| Atmosfera | linhas de impacto, retícula, cortes diagonais, faíscas | hairlines, mandala lenta, dotwork, cantos de moldura | névoa, luz que segue o mouse, grão de filme, poeira |
| Cor | índigo + magenta + ciano | preto + osso | grafite + prata |
| Tipografia | Bangers (itálico, sombra dura) + M PLUS Rounded | Oswald (caixa alta, largo) + Space Mono | Cormorant Garamond itálico leve + Inter |
| Forma | painel inclinado, raio 0 | monólito com cantos chanfrados | arco |
| Movimento | overshoot, "snappy" | lento e pesado | lento e suave |
| Portal (círculo, D-48) | arte recortada do usuário (PNG/WebP sem texto) | disco com duas folhas pretas que se abrem e mostram a mandala | disco com olho: as pálpebras se abrem |
| Entrada (véu) | magenta com retícula, nome "bate" na tela | preto, nome revelado por corte | névoa cinza, nome entra desfocando |
| Galeria | página de mangá (painéis recortados, efeito sonoro) | faixa horizontal de pranchas numeradas | sala de exposição com plaquetas |

## Portais circulares: como entregar a arte
- Arquivo **sem texto** (título e "Ver projetos" são código), **PNG ou WebP com fundo transparente** (ou sobre preto puro), quadrado, com a fumaça/respingos dentro da própria imagem. Salvar em `public/universos/<slug>/portal.webp` e apontar em `portal.art` no `index.ts` do universo.
- O círculo da arte fica em torno de 50% do centro; o texto entra por cima a partir de 46% da altura. Título e CTA escalam pela largura do portal (container queries).
- Se a arte vier com texto gravado, é preciso limpar antes (foi feito com preenchimento para o Anime). O melhor é gerar sem texto.

## Como adicionar um universo (ex.: Tribal)
1. Crie `src/universes/tribal/` com: `index.ts` (dados, use `mockWorks` enquanto não houver fotos), `theme.css` (tokens em `:root [data-theme="tribal"]`, atmosfera, portal, hero, véu), `Ambient.tsx`, `PortalArt.tsx`, `Art.tsx` (arte provisória), `Gallery.tsx` (+ módulo CSS).
2. `src/universes/index.ts`: **uma linha** de import e uma no array.
3. `src/universes/ui.ts`: **uma entrada** com `Ambient`, `PortalArt`, `Art`, `Gallery` e o import do `theme.css`.
4. Fontes (opcional): `src/universes/fonts.ts` e as variáveis `--f-tribal-*`.
5. Nenhum componente compartilhado precisa mudar.

Contrato dos tokens (todos obrigatórios no `theme.css`): `--bg --bg2 --ink --ink2 --accent --accent2 --accent-ink --line` (cores, animáveis), `--font-display --font-body --title-tt --title-ls --title-style --title-w --title-shadow --radius --ease --veil-bg --veil-ink --veil-ease`.

## Onde entram as fotos reais
- Coloque os arquivos em `public/universos/<slug>/` e preencha `image: { src, alt, width, height }` na obra. Com `src`, `WorkArt` usa `next/image` (lazy, AVIF/WebP); sem `src`, mostra a arte provisória rotulada **PLACEHOLDER**.
- Obras e textos têm `mock: true` no universo; ao virar real, troque para `false` e os selos "exemplo" somem.

## Dependências (justificativa)
Somente `next`, `react`, `react-dom` (mais lint/TS). **Sem GSAP/Motion** (D-13): tudo é CSS (transições, keyframes, propriedades registradas, `clip-path`) mais `IntersectionObserver` e `requestAnimationFrame` para revelação e parallax.

## Performance e acessibilidade já aplicadas
- Código por universo sob demanda: galerias via `next/dynamic`; visualizador só carrega ao abrir a primeira obra.
- Animação só em `transform`/`opacity`/`clip-path`/propriedades individuais; atmosfera fora do tema fica **pausada** e invisível; parallax só com ponteiro fino e sem reduced motion; escrita de variáveis em `rAF`.
- Fontes `preload:false` com `swap`; imagens reais via `next/image`.
- Hover nunca é o único caminho: portais são **links reais** (Tab dá o mesmo preview, Enter entra), toque usa carrossel centralizado, `aria-label` em portais e cards, `dialog` nativo no detalhe, foco visível, link "Pular para o conteúdo", `prefers-reduced-motion` (só fades; véu vira fade de 0,2 s).
- Contraste medido por universo (script no momento do protótipo): todos os pares texto/fundo ≥ 5,3:1 (AA) e foco ≥ 5:1.
- Medido no build: hub ≈ 171 KB de JS gzip, universo ≈ 177 KB; CSS ≈ 10 KB gzip.

## O que NÃO foi feito (de propósito ou por falta de tempo)
- Conteúdo, textos, identidade/logo, formulário e SEO definitivos; fotos reais; integrações; sistema de agendamento.
- View Transitions (D-38) ficou fora. O cursor com etiqueta (D-30) entrou só na home, no desktop.
- `prefers-reduced-motion` e o toque real (só emulação de viewport) **não foram testados ao vivo** no navegador do ambiente.
- A atmosfera usa elementos grandes girando (Anime/Blackwork): vale medir em celular modesto antes de ampliar.
- O hub carrega as fontes dos três universos na primeira visita (os rótulos dos portais usam a fonte de cada um). Isso evita o salto no preview; com 5+ universos, reavaliar (D-06).
