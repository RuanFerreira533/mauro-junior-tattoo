# Plano de desenvolvimento

Ordem lógica. Cada fase termina com um **portão** (critério de aceite) antes de seguir. Nenhuma fase começa sem as decisões marcadas em DECISIONS.

## Fase 0: decisões e insumos
- Fechar D-01 a D-05 (stack, hospedagem, lista de universos, mobile, escopo do preview).
- Receber do tatuador: lista de estilos, fotos autorizadas, WhatsApp, textos.
- Etapa de referências visuais (separada, por universo).
- **Portão:** DECISIONS sem item bloqueante em aberto; inventário de conteúdo feito.

## Fase 1: fundação
- Projeto, contrato de tokens, tema base (marca), `Stage` permanente e registro de universos.
- Validação de conteúdo em build; esqueleto do pipeline de imagens.
- Um universo **neutro de teste** só para provar o contrato.
- **Portão:** adicionar um universo fictício exige só uma pasta; build valida; nenhum componente cita universo pelo nome.

## Fase 2: fatia vertical (o coração da ideia)
- Hub com **2 universos bem diferentes** (ex.: um claro/orgânico e um escuro/angular, escolha em D-03).
- Preview por hover/foco, com pré-carga por intenção e carência de saída.
- Equivalente de toque (carrossel + centralização + "Entrar").
- Transição de entrada no universo.
- **Portão:** a sensação de "o site se transforma" funciona nos dois; medição de desempenho dentro da meta; teclado e toque funcionam; movimento reduzido funciona.
- *Se esta fase não convencer, é aqui que se ajusta a ideia, antes de gastar mais.*

## Fase 3: páginas de universo
- `UniverseShell`, hero, galeria, visualizador de trabalho, seletor de universo.
- Pipeline de imagens completo (tamanhos, placeholders, manifesto).
- **Portão:** galeria rápida com 100+ imagens simuladas; sem salto de layout; acessibilidade da galeria.

## Fase 4: orçamento
- `QuoteCTA` em todo lugar com mensagem por universo; destino conforme D-10.
- **Portão:** do hub ao pedido de orçamento em poucos toques, em qualquer universo.

## Fase 5: demais universos
- Um por vez, seguindo a checklist de "universo pronto". Cada um com sua posição nos eixos visuais.
- Slots T2 apenas onde valer o custo.
- **Portão por universo:** checklist abaixo.

## Fase 6: endurecimento
- Passada de desempenho, acessibilidade e revisão de código; teste em aparelhos reais; SEO por rota (títulos, descrições, imagens de compartilhamento por universo); páginas de erro.
- **Portão:** metas de [PERFORMANCE](PERFORMANCE.md) e [ACCESSIBILITY](ACCESSIBILITY.md) atingidas.

## Fase 7: lançamento
- Hospedagem, domínio, monitoramento básico, plano de atualização de conteúdo.
- Publicação **só com autorização explícita**.

## Checklist de "universo pronto"
- [ ] Todos os tokens preenchidos e validados
- [ ] Contraste AA em todos os pares
- [ ] Preview e universo em T0; T1/T2 degradam sem quebrar
- [ ] Movimento reduzido testado
- [ ] Peso dentro do orçamento (chunk, imagens, fontes)
- [ ] Mobile (toque) testado
- [ ] Alt text e consentimento em todos os trabalhos
- [ ] Nenhum componente compartilhado foi editado para suportá-lo

## Riscos por fase
Ver SKILLS (apoio) e DECISIONS (riscos técnicos, seção final). Os dois maiores: **custo de transformar a página inteira no preview** (Fase 2) e **peso de imagens/fontes por universo** (Fases 3 e 5).

## Estratégia de testes
Validação de conteúdo e contraste automáticas no build; testes de interação do preview e do teclado; verificação visual por universo; medição de desempenho em cada portão. (Ferramentas a definir na Fase 1.)
