# Visão geral do projeto

> Status: planejamento concluído e **protótipo funcional construído** (ver [PROTOTYPE](PROTOTYPE.md)). Os documentos definem a arquitetura; o protótipo prova o ciclo central com Anime, Blackwork e Realismo.

## O que é
Um site para o tatuador Mauro Junior (Santa Isabel, SP, Instagram @maurojr_tattoo) que funciona como **um sistema de experiências visuais**, não como um portfólio com filtros.

O visitante escolhe um **universo** (um estilo de tatuagem) e **o próprio site se transforma** para acompanhar aquele universo: atmosfera, cor, tipografia, formas, imagens e movimento. A galeria de trabalhos é consequência dessa escolha.

## Objetivos
1. **Causar impacto**: o site é, ele mesmo, uma demonstração da criatividade do tatuador.
2. **Vender o trabalho**: toda experiência termina em um pedido de orçamento/agendamento claro.
3. **Escalar sem reconstruir**: adicionar um estilo novo (ex.: Tribal) deve ser organizado e relativamente simples.
4. **Funcionar em qualquer aparelho**: o hover é parte da experiência no desktop, mas nada essencial depende do mouse.
5. **Ser rápido e acessível**: animação e imagem em abundância sem travar, com `prefers-reduced-motion` e teclado respeitados.

## Não-objetivos (por enquanto)
- Não é um conjunto de sites independentes: é uma aplicação única com sistema de temas.
- Não há back-end, contas de usuário nem pagamentos. (O usuário já vetou Supabase.)
- Não copiamos estilos de outros sites; referências visuais virão numa etapa própria.
- Cores, fontes e conteúdo definitivos ainda não foram escolhidos.

## Mapa dos documentos
| Documento | Pergunta que responde |
|---|---|
| [PORTALS](PORTALS.md) | Que forma terá o portal de cada estilo? |
| [CONCEPT](CONCEPT.md) | O que é um universo e como o site se transforma? |
| [UX_FLOW](UX_FLOW.md) | Qual o caminho do visitante, do início ao orçamento? |
| [VISUAL_SYSTEM](VISUAL_SYSTEM.md) | O que muda e o que nunca muda entre universos? |
| [THEME_SYSTEM](THEME_SYSTEM.md) | Como o sistema de temas funciona por dentro? |
| [COMPONENT_ARCHITECTURE](COMPONENT_ARCHITECTURE.md) | Quais componentes são compartilhados e quais são de cada universo? |
| [ANIMATION_SYSTEM](ANIMATION_SYSTEM.md) | Como se comportam hover, transições, entrada e scroll? |
| [RESPONSIVENESS](RESPONSIVENESS.md) | Como o hover vira toque no celular? |
| [PERFORMANCE](PERFORMANCE.md) | Quais regras mantêm o site rápido? |
| [ACCESSIBILITY](ACCESSIBILITY.md) | Quais cuidados são obrigatórios? |
| [CONTENT_STRUCTURE](CONTENT_STRUCTURE.md) | Como estilos, projetos e textos são estruturados? |
| [IMAGE_SYSTEM](IMAGE_SYSTEM.md) | Como as imagens são organizadas e carregadas? |
| [PROTOTYPE](PROTOTYPE.md) | O que o protótipo entrega e como adicionar um universo? |
| [DEVELOPMENT_PLAN](DEVELOPMENT_PLAN.md) | Em que ordem construir? |
| [SKILLS](SKILLS.md) | Quais skills do ambiente ajudam, e em qual etapa? |
| [DECISIONS](DECISIONS.md) | O que já foi decidido e o que ainda está em aberto? |

## Fatos conhecidos sobre o tatuador (da conversa)
- Atua em vários estilos. Exemplos dados pelo usuário: Anime, Blackwork, Realismo, Fine Line, Oriental, Dark/Horror, Colorido, Geek.
- Pelo Instagram público (grade), os estilos vistos foram realismo/black and grey, geek/anime, fine line, pets e retratos, cobertura e flash. **Universos do lançamento (decidido pelo usuário): Cicatrizadas, Fine Line, Cobertura, Geek, Flash**, os destaques do Instagram. Ver DECISIONS D-03.
- A foto `img/mjr.png` (ele tatuando, luz quente, luvas azuis, estêncil roxo) é o único ativo visual disponível hoje.
- O usuário enviou uma paleta verde de 6 cores como "paleta inicial". Está registrada em [VISUAL_SYSTEM](VISUAL_SYSTEM.md) como insumo, não como decisão final.
