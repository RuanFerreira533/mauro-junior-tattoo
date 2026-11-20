# Acessibilidade

Meta: **WCAG 2.2 nível AA** em todos os universos. Acessibilidade é critério de aceite de cada universo, não etapa final.

## Princípios
1. **Hover nunca é a única via.** Tudo que o hover faz, o foco de teclado e o toque também fazem.
2. **Cada universo é testado separadamente**, porque cada paleta e tipografia pode quebrar contraste e leitura.
3. **A marca constante é o âncora de acessibilidade:** CTA, navegação base e foco têm o mesmo comportamento em todo lugar.

## Teclado e foco
- Ordem de tabulação lógica; nenhum pack só acessível por mouse.
- Foco visível com contraste suficiente em **todos** os temas (o token `foco` é obrigatório e validado).
- Foco em pack = preview; Enter = entrar; Esc = reverter.
- Navegar entre rotas move o foco para o título do universo/página.
- Visualizador de trabalho: foco preso dentro, Esc fecha, devolve o foco ao item de origem, setas navegam.
- Link "pular para o conteúdo".

## Contraste e cor
- Texto normal ≥ 4,5:1; texto grande e componentes de interface ≥ 3:1.
- Verificação **automatizada por universo** (cálculo com os tokens do tema) no build, além da conferência visual.
- Informação nunca só por cor.
- Texto sobre imagem sempre com camada de proteção de contraste.

## Movimento
- Respeitar `prefers-reduced-motion`: sem parallax, loops, rastro de cursor ou troca brusca; preview vira fade simples.
- Nada pisca mais de 3 vezes por segundo.
- Animações longas podem ser pausadas; nada começa sozinho com som.
- Transição de página não pode causar perda de contexto (foco e leitura continuam).

## Leitores de tela
- Estrutura semântica: um `h1` por página, títulos em ordem, marcos (cabeçalho, principal, rodapé), listas reais para packs e trabalhos.
- Camadas de atmosfera e ornamentos: `aria-hidden`.
- Cada imagem de trabalho com texto alternativo descrevendo a tatuagem (conteúdo a fornecer, ver CONTENT_STRUCTURE). Texto alternativo vazio só para decoração.
- Mudança de universo anunciada de forma discreta (título da página muda; sem região ao vivo a cada hover).

## Toque e motricidade
Alvos ≥ 44×44 px; nenhuma ação exige arrastar com precisão; carrossel tem botões anterior/próximo além do deslizar.

## Tipografia
Fontes decorativas (por exemplo góticas) só em tamanhos grandes e títulos; texto corrido sempre em fonte legível. Um universo não pode exigir leitura de texto longo em fonte pouco legível. Zoom de 200% sem perda de conteúdo.

## Conteúdo sensível
Universos como Dark/Horror podem ter imagens fortes. Avaliar aviso de conteúdo e opção de ocultar (D-16). O consentimento dos clientes para exibir as tatuagens também é uma pendência de conteúdo (D-19).

## Verificação
- Automática: teste de contraste por tema; auditoria de acessibilidade de página.
- Manual: percurso inteiro só com teclado; leitor de tela em um fluxo (hub → universo → orçamento); zoom 200%; movimento reduzido ligado.
- Auditoria automática com ferramenta externa só depois de definir qual (SKILLS.md lista opções; D-20).

## Checklist de "universo pronto" (acessibilidade)
- [ ] Contraste AA em todos os pares de token
- [ ] Foco visível
- [ ] Versão com movimento reduzido
- [ ] Alt text em todas as imagens de conteúdo
- [ ] Fluxo completo só com teclado
