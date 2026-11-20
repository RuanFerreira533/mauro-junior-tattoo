# Arquitetura de componentes

## Princípio
Compartilhar **estrutura e comportamento**; deixar cada universo trocar **pele e ornamento**. Um componente compartilhado lê tokens; um *slot* permite que um universo injete algo específico sem mexer no resto.

## Pastas propostas (sem código ainda)
```
app/                       rotas
  layout                   Stage permanente + providers
  page                     Hub
  estilos/[universo]/      universo (hero, galeria)
  estilos/[universo]/[trabalho]/   detalhe (rota ou modal, D-08)
content/
  universos/<slug>/        dados e textos de cada universo
  registro                 lê as pastas e expõe a lista de universos
design/
  tokens                   contrato de tokens e tema base
  universos/<slug>/        tema e slots do universo (carregados sob demanda)
components/
  stage/                   Stage, AmbientLayer, StageProvider
  hub/                     PackGrid, PackCard, PackCarousel
  universe/                UniverseShell, UniverseHero, UniverseSwitcher
  gallery/                 WorkGrid, WorkCard, WorkViewer
  brand/                   Logo, QuoteCTA, Footer, BackToHub
  ui/                      botão, link, ícone, foco, texto (primitivos)
lib/
  motion/                  presets e utilitários de animação
  images/                  utilitários e manifesto de imagens
docs/
```

## Componentes compartilhados (iguais em todos os universos)
| Componente | Papel | Lê do tema |
|---|---|---|
| `Stage` | Raiz permanente; aplica `data-universo`/`data-preview` | estado |
| `AmbientLayer` | Camada de atmosfera (imagem/padrão/grão) | tokens de atmosfera |
| `PackCard` | Card do hub; dispara preview | nome, imagem do pack |
| `PackGrid` / `PackCarousel` | Desktop em grade; celular em carrossel com snap | — |
| `UniverseShell` | Casca do universo (cabeçalho base + conteúdo + rodapé) | todos |
| `UniverseHero` | Abertura do universo | tokens + slot `Hero` opcional |
| `UniverseSwitcher` | Trocar de universo sem voltar ao hub | lista do registro |
| `WorkGrid` / `WorkCard` | Galeria; layout configurável por universo | tokens de forma |
| `WorkViewer` | Visualizador acessível (teclado, foco preso) | tokens |
| `QuoteCTA` | Botão de orçamento, mesmo rótulo/posição sempre | tokens de cor/forma |
| `BackToHub`, `Footer`, `Logo` | Marca constante | cor de tinta do tema |

## O que é específico de cada universo (slots)
Um universo **pode** fornecer, mas não é obrigado:
- `Portal`: **a forma própria do portal do universo no hub** (decisão D-26). Obrigatório para universos publicados; se faltar, usa um portal padrão neutro. Segue o contrato do portal em [THEME_SYSTEM](THEME_SYSTEM.md).
- `Hero`: abertura própria.
- `Ornament`/`Divider`: elementos decorativos e separadores.
- `Cursor`: cursor/rastro temático (só desktop, desligado em movimento reduzido).
- `GalleryLayout`: variação de grade (ex.: mosaico, linha do tempo).
- `Ambient` (tier 2): animação assinatura (canvas/SVG/GSAP), carregada sob demanda.

Regra: se um universo não define um slot, usa o padrão compartilhado. Nenhum slot pode alterar a marca constante.

## Fronteiras (o que cada camada não faz)
- Componentes compartilhados **não** conhecem universos pelo nome (nada de `if (universo === "anime")`). Só leem tokens e slots.
- Universos **não** importam uns dos outros.
- Slots **não** mexem em rota, em estado global nem no CTA.
- Conteúdo **não** contém JSX/estilo: só dados e imagens.

## Componentes de servidor × cliente
Servidor por padrão (páginas, galeria estática, textos). Cliente só onde há interação: `PackCard` (preview), `PackCarousel`, `WorkViewer`, `UniverseSwitcher`, `StageProvider`, slots animados. Isso mantém o JavaScript inicial pequeno.

## Estado global (mínimo)
Um único contexto leve: `{ preview, ativo, reduzirMovimento, economizarDados }`. Nada de store grande. Dados dos universos são estáticos e vêm do registro.

## Teste de arquitetura (critério de aceite)
Adicionar "Tribal" deve exigir: uma pasta em `content/universos`, uma definição de tema, imagens e (opcional) slots. **Nenhum** componente compartilhado precisa ser editado.
