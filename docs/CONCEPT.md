# Conceito: universos que transformam o site

## A ideia central
> O usuário escolhe um universo artístico e o próprio site se transforma para acompanhar aquele universo.

Não é "uma galeria com filtros". É um **hub de portais**. Cada estilo é um portal para uma identidade visual completa que continua sendo o mesmo site e a mesma marca.

## Vocabulário
| Termo | Significado |
|---|---|
| **Hub** | A tela inicial. Mostra os packs e a marca do tatuador. |
| **Pack / portal** | O card de um estilo no hub. É o gatilho da transformação. |
| **Universo** | A identidade completa de um estilo: tema visual + conteúdo + comportamento. |
| **Stage (palco)** | A camada permanente da aplicação que recebe o tema ativo. É o que "se transforma". |
| **Preview** | O estado temporário em que o Stage já veste o universo, antes do clique. |
| **Trabalho** | Uma tatuagem do portfólio, pertencente a um universo. |
| **Marca constante** | O que nunca muda entre universos (logo, CTA, navegação base). |

## Três estados do site
1. **Base (hub em repouso):** identidade neutra da marca do tatuador.
2. **Preview (hover/foco no desktop, card centralizado no celular):** o Stage veste o universo de forma reversível. É uma amostra, não uma navegação.
3. **Universo (após clicar):** o visitante entra. O tema é o mesmo do preview, agora completo e estável, com galeria, informações e CTA.

A continuidade entre 2 e 3 é essencial: o clique não pode parecer "carregar outra página"; deve parecer **aprofundar** o que o preview já mostrou.

## O que pode se transformar
Cores, tipografia, imagens de fundo, formas (cantos, bordas, máscaras), componentes específicos, ornamentos, comportamento do cursor, ritmo e tipo de animação, textura/grão. Cada universo escolhe quanto transformar, dentro de limites de performance e acessibilidade.

## O que NÃO se transforma (a marca)
Ver [VISUAL_SYSTEM](VISUAL_SYSTEM.md): marca/logo do tatuador, posição e rótulo do CTA de orçamento, esqueleto de navegação (voltar ao hub e trocar de universo), rodapé com contato, regras de acessibilidade. Isso garante "vários mundos, um só tatuador".

## Princípios
1. **O universo vem antes da galeria.** A primeira coisa que o visitante sente é o clima, depois vê as obras.
2. **Reversível e barato.** Previews são leves e canceláveis; o custo pesado só acontece ao entrar.
3. **Um sistema, não vários sites.** Temas são dados + componentes; ninguém copia uma página.
4. **Sem hover não pode quebrar.** Todo gesto de mouse tem equivalente de toque e teclado.
5. **Movimento tem motivo.** Cada animação comunica identidade ou muda de estado; nada decorativo que custe frames.
6. **Impacto sem cegar o orçamento.** O CTA fica sempre acessível, em qualquer universo.

## Exemplo ilustrativo (não é decisão visual)
Passar o mouse em "Anime": o fundo muda de atmosfera, formas e animações assumem outro ritmo, elementos temáticos surgem, a tipografia pode mudar. Tirar o mouse: volta ao estado base com transição suave. Clicar: o universo se consolida e a galeria de anime aparece já dentro dessa identidade. O mesmo para "Blackwork", com identidade completamente diferente.

## Perguntas conceituais em aberto
Ver DECISIONS: escopo do preview (página inteira ou só uma zona, D-05), o preview muda tipografia ou só cor/forma (D-06), troca direta entre universos sem passar pelo hub (D-07), quantos universos no lançamento (D-03).
