# Responsividade

## Princípio
O hover é uma **forma de revelar o universo**, não a única. Em toque, o equivalente é **centralizar** o pack e **confirmar** com um botão. A experiência principal nunca depende de mouse.

## Faixas de tela
| Faixa | Hub | Preview | Universo |
|---|---|---|---|
| Desktop (≥1024) | grade de packs | hover/foco | layout completo, seletor de universos visível |
| Tablet (640–1023) | grade de 2 colunas ou carrossel | toque + centralização (ou hover se houver ponteiro fino) | layout adaptado |
| Celular (<640) | carrossel horizontal com snap | pack centralizado é o preview | coluna única, CTA fixo |

Detecção por **capacidade**, não por largura: `(hover: hover) and (pointer: fine)` → comportamento de hover; caso contrário → comportamento de toque. Um tablet com mouse recebe hover; um notebook com tela de toque recebe os dois.

## O equivalente do hover no toque
Opções avaliadas (decisão D-04):
| Opção | Como funciona | Prós | Contras |
|---|---|---|---|
| **A. Centralização automática (recomendada)** | O pack centralizado no carrossel vira preview; botão "Entrar" visível no card | descobrível, sem gesto escondido, uma mão | só um preview por vez; exige carrossel |
| B. Primeiro toque = preview, segundo = entrar | toque duplo explícito | simples de implementar | oculto, confunde, atrapalha leitores de tela |
| C. Pressão longa | segurar mostra preview | parece com hover | pouco descobrível, conflita com menu do sistema |
| D. Preview automático em ciclo | o hub percorre os universos sozinho | vitrine | consome bateria/atenção, pode irritar |

Recomendação: **A**, com a **D** opcional apenas como amostra na primeira visita (curta, cancelável, desligada em movimento reduzido).

## Foco de teclado e leitor de tela
Foco em um pack = mesmo preview do hover. Enter = entrar. Esc = reverter ao base. O preview não deve anunciar texto a cada foco; apenas o nome do pack e a ação ("Anime, entrar").

## Layout do universo no celular
- Hero ocupa a primeira dobra com identidade completa, mas **leve** (menos camadas que no desktop).
- Galeria em 1–2 colunas, imagens com proporção conhecida (sem salto de layout).
- Botão de orçamento fixo e visível, sem cobrir conteúdo importante.
- Visualizador de trabalho em tela cheia, com gesto de deslizar e botão de fechar.
- Seletor de universo recolhido em um botão (folha inferior).

## Imagens e peso por faixa
Celular recebe tamanhos menores e **menos camadas ambientais**. A "intensidade" do preset de movimento cai um nível no celular por padrão ([ANIMATION_SYSTEM](ANIMATION_SYSTEM.md)).

## Orientação e tamanhos de toque
Alvos ≥ 44×44 px, espaço entre alvos suficiente, nada que dependa de arrastar com precisão. Suporte a paisagem sem quebrar o carrossel.

## Testes mínimos antes de lançar
Celular pequeno (≈360 px), celular médio, tablet, notebook com touchpad, desktop com mouse, desktop só com teclado, e um aparelho Android de entrada para medir desempenho.
