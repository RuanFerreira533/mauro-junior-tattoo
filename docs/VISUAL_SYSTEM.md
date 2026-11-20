# Sistema visual

> Este documento define a **lógica**, não os valores definitivos. Cores, fontes e referências ainda não foram escolhidas (ver DECISIONS).

## Duas camadas visuais
1. **Marca constante** (nunca muda). 2. **Identidade do universo** (muda por completo).

### Marca constante
| Elemento | Regra |
|---|---|
| Logo/marca do tatuador | Mesma forma e posição em todos os universos. Pode ganhar apenas a cor de tinta do tema (versão monocromática), nunca ser redesenhada. |
| CTA de orçamento | Mesmo rótulo, mesma posição, sempre alcançável. Só a pele (cor/forma) acompanha o tema. |
| Navegação base | "Voltar ao hub" e "trocar de universo" sempre no mesmo lugar e com o mesmo comportamento. |
| Rodapé de contato | Mesmas informações em todos os universos. |
| Regras de acessibilidade | Contraste, foco visível, alvo de toque mínimo: não negociáveis em nenhum tema. |
| Estado base do hub | Identidade neutra da marca (ver paleta inicial abaixo). |

### Identidade do universo (variável)
Cada universo define: paleta, tipografia (família, peso, caixa), formas (raio de cantos, bordas, máscaras), texturas, imagens de atmosfera, ornamentos, ritmo de animação, comportamento de cursor/foco, e componentes específicos (ver [COMPONENT_ARCHITECTURE](COMPONENT_ARCHITECTURE.md)).

## Eixos de variação (vocabulário para projetar universos)
| Eixo | Exemplos de extremos |
|---|---|
| Densidade | arejado ↔ denso |
| Contraste | suave ↔ duro |
| Geometria | orgânica ↔ angular |
| Textura | limpa ↔ granulada/rasgada |
| Ritmo | calmo ↔ frenético |
| Temperatura | fria ↔ quente |
| Escala tipográfica | discreta ↔ monumental |
| Camadas | plana ↔ em profundidade |

Cada universo ocupa uma posição diferente nesses eixos. Dois universos que ficam muito próximos em todos os eixos indicam estilos que talvez devam ser um só (D-03).

## Tokens (contrato entre universos)
Todo universo preenche **o mesmo conjunto de tokens**, o que permite trocar de tema sem tocar em componentes. Lista conceitual (nomes finais em THEME_SYSTEM):
- cores: fundo, superfície, texto, texto secundário, acento, acento-contraste, borda, foco
- tipografia: família de título, família de texto, escala, peso, espaçamento de letras
- forma: raio pequeno/médio/grande, espessura de borda, máscara de imagem
- movimento: duração base, curva, intensidade (0–3)
- atmosfera: imagem/padrão de fundo, opacidade, filtro de imagem, grão

## Paleta inicial informada pelo usuário (insumo, não decisão)
Enviada como "paleta de cores do nosso site inicial": `#0F1F17`, `#1E3A2E`, `#3E5A3F`, `#6B7F67`, `#C7CBB8`, `#3D4337` (verdes escuros, musgo, sálvia, creme esverdeado, cinza oliva).

Uso proposto (a confirmar, D-12): **base neutra do hub e da marca constante**. Cada universo traria a sua própria paleta, e esta ficaria como pano de fundo comum. Alternativa: ela ser apenas um dos universos. Pontos de atenção quando for aplicada: conferir contraste do `#6B7F67` sobre `#0F1F17`; a foto do tatuador é quente (pele e luz âmbar) contra fundo verde.

## Restrições para qualquer universo
- Passa nos contrastes mínimos ([ACCESSIBILITY](ACCESSIBILITY.md)).
- Respeita o orçamento de peso ([PERFORMANCE](PERFORMANCE.md)).
- Não esconde o CTA nem a navegação base.
- Funciona sem hover.
- Tem versão de movimento reduzido.

## Referências
Registradas em `docs/references/`. Primeira: [PORTAL_DOOR_REFERENCE](references/PORTAL_DOOR_REFERENCE.md), usada **só pelo conceito de portal e pelas animações de abrir e de transição**, não pelo visual. A pesquisa de referências visuais por universo continua sendo uma etapa futura. Nada de cópia de estilo: referências servem para calibrar posição nos eixos acima.
