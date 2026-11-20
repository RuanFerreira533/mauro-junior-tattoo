# Skills e ferramentas

> **Nada foi instalado.** Este arquivo só identifica o que existe, para que serve e em qual etapa ajuda. Instalar qualquer coisa do catálogo exige aprovação do usuário.
> Levantamento feito nas skills da sessão e na busca do catálogo de plugins (19/11/2026).

Legenda de uso: **P** = planejamento, **I** = implementação, **R** = revisão.

## A. Já disponíveis neste ambiente
### Design e front-end
| Skill | Para que serve | Etapa | Uso |
|---|---|---|---|
| `frontend-design:frontend-design` | Direção visual com ponto de vista (paleta, tipografia, layout), evita aparência genérica | Fase 2 e 5 (identidade de cada universo) | P, I |
| `artifact-design` / `artifact-diagramming` | Páginas e diagramas para apresentar ao cliente (ex.: mapa do fluxo, comparação de universos) | Fase 0 e 2 | P |
| `claude-mem:design-is` | Auditoria de um design contra os princípios do Dieter Rams, gerando plano | Revisão de universos | R |
| `simplify` | Revisa código alterado para reaproveitar, simplificar e ganhar eficiência | Fases 1–6 | R |
| `ponytail:ponytail`, `ponytail-review`, `ponytail-audit` | Mudanças mínimas e revisão contra excesso de código | Fases 1–6 | I, R |

### Processo e qualidade
| Skill | Para que serve | Etapa | Uso |
|---|---|---|---|
| `superpowers:brainstorming` | Esclarecer intenção antes de construir | Fase 0 | P |
| `superpowers:writing-plans` / `executing-plans` | Planos de implementação por fase e execução com checkpoints | Fim da Fase 0 em diante | P, I |
| `claude-mem:make-plan` / `claude-mem:do` | Plano em fases com descoberta de documentação, executado por subagentes | Fases 1–5 | P, I |
| `superpowers:test-driven-development` | Testes antes do código (validação de conteúdo, contraste, schema) | Fase 1 | I |
| `superpowers:verification-before-completion` | Provar que funciona antes de dizer "pronto" | Todo portão | R |
| `superpowers:requesting-code-review` / `code-review` | Revisão de mudanças | Todo portão | R |
| `superpowers:systematic-debugging` | Depuração metódica (ex.: preview piscando, salto de layout) | Quando necessário | I |
| `superpowers:using-git-worktrees`, `dispatching-parallel-agents`, `subagent-driven-development` | Trabalho paralelo isolado (um universo por ramo) | Fase 5 | I |
| `security-audit`, `security-review` | Revisão de segurança (formulário de orçamento, cabeçalhos, dependências) | Fase 6 | R |
| `claude-mem:mem-search`, `handoff` | Memória entre sessões e passagem de contexto | Sempre | P |

### Verificação visual
| Ferramenta | Para que serve | Etapa | Uso |
|---|---|---|---|
| Navegador embutido (`anthropic-skills:built-in-browser`) | Ver o site rodando, redimensionar (celular/tablet/desktop), ler console e rede, medir | Todo portão | R |
| `anthropic-skills:chrome-browser` | Mesmo, no Chrome do usuário | Quando precisar de login/extensões | R |
| Conector Vercel (já conectado) | Publicar, ver logs, domínio | Fase 7 | I |

## B. No catálogo, **não instaladas** (precisam de aprovação)
| Plugin / skill | Para que serve | Etapa | Uso | Observações |
|---|---|---|---|---|
| **audit-suite** (`web-animation-design`, `web-design-guidelines`, `make-interfaces-feel-better`, `emil-design-engineering`, `vercel-react-best-practices`, `audit-as-a11y-eng`, `audit-as-perf-eng`, `audit-as-design-eng`, `audit-as-frontend-eng`, `full-audit`) | Princípios de animação e de acabamento de interface; auditorias de acessibilidade, desempenho, design e front-end; boas práticas de React/Next | Fases 2 (animação), 6 (auditorias) | P, R | **Recomendada.** Só skills, alcance contido, sem dependências externas. Comunitária. |
| **Skills For Real React/React Native Engineers** (`gsap-react`, `gsap-scroll-trigger`, `gsap-timelines`, `gsap-performance`, `gsap-text`, `css-animations`, `ui-motion`, `ui-interactions`, `nextjs-routing`, `component-architecture`, `performance`, `tailwind`, `unslop`) | Cobre GSAP, animação CSS, roteamento Next, arquitetura de componentes | Fases 1–2 e 5 | P, I | Única que cobre **GSAP**. Alcance "privilegiado": inclui hooks e agentes; ler o conteúdo antes de instalar. Também tem partes de React Native, que não usamos. |
| **ultrapowers-dev** (`nextjs-patterns`, `react-patterns`, `tailwind-patterns`, `typescript-best-practices`, `web-design-guidelines`, `frontend-design`) | Padrões de Next, React, Tailwind e TypeScript | Fase 1 | I | Alcance contido; sobrepõe outras skills. |
| **design-skills** (`design-systems`, `interaction-design`, `accessibility-audit`, `journey-mapping`, `ux-strategy`, `design-critique`) | Fundamentos de design de sistemas, interação e jornada | Fase 0 e 2 | P, R | Bom para validar o sistema de tokens e o fluxo. |
| **21st** (`21st-ui` + servidor MCP) | Achar componentes de UI e temas e obter o código | Fase 2–3 | I | Já oferecida ao usuário antes; não instalada. Pode ajudar em componentes de apoio, não no efeito central do hub. |
| **Axe Accessibility** (Deque, parceira; servidor MCP remoto) | Varredura, correção e verificação de acessibilidade, com testes guiados de teclado | Fase 6 | R | Caminho **legítimo** para o axe: injetar o axe por script externo na página foi bloqueado pelo ambiente. |
| **A11y Enforcer**, **WebAbility** | Verificação de WCAG 2.2 em código e páginas | Fase 6 | R | Alternativas à Axe; escolher uma só (D-20). |
| **Website Design (UXKIN)** | Landing pages e sistemas de design a partir de sites reais; servidor MCP remoto | — | — | **Não usar agora**: depende de referências de sites reais, e esta etapa proíbe referências externas. Reavaliar na etapa de pesquisa. |
| **Imagelato** (otimização de imagens, serviço remoto) | Redimensionar/reformatar imagens | — | — | **Não recomendada**: envia fotos de clientes a um terceiro. O pipeline local resolve. |
| **tailwind-design-system** (comunitária) | Coleção mista e pouco relacionada | — | — | Não recomendada. |
| Context7 (conector de documentação) | Documentação atualizada de bibliotecas | Fases 1–3 | I | Existe no catálogo de conectores, **não conectado**. |

## C. Lacunas encontradas
- **Nenhuma skill de GSAP instalada** (só na coleção "Skills For Real React Engineers").
- **Nenhuma skill dedicada a Next.js instalada.** Mitigação: a documentação do próprio Next fica em `node_modules/next/dist/docs` depois da instalação e deve ser lida antes de codar (o projeto anterior sinalizou que essa versão tem mudanças relevantes).
- **Nenhuma skill de otimização de imagem.** Mitigação: otimizador do framework + processamento local (ver IMAGE_SYSTEM).
- **Nenhuma skill de WebGL/3D.** Só relevante se algum universo exigir T2 em 3D (D-13).

## Recomendação mínima (para decisão do usuário)
1. Usar já as skills instaladas: `frontend-design`, `make-plan`/`writing-plans`, `verification-before-completion`, navegador embutido.
2. Se aprovar instalação: **audit-suite** (animação + auditorias) e, só se o GSAP for escolhido, as skills de GSAP da coleção React (lendo antes o que ela instala).
3. Acessibilidade automática: escolher **uma** entre Axe/A11y Enforcer/WebAbility na Fase 6.
