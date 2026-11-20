# Sistema de imagens

## Objetivo
Muitas imagens, carregamento rápido, nenhuma imagem solta sem dono. Cada imagem pertence a um universo e a um papel.

## Papéis de imagem
| Papel | Onde aparece | Peso alvo | Observação |
|---|---|---|---|
| `pack` | card no hub | ≤ ~60 KB | proporção fixa, carregada com o hub |
| `preview` | atmosfera durante o hover | ≤ ~60 KB | pequena, pré-carregada por intenção |
| `atmosfera` | fundo do universo | ≤ ~150 KB | pode ser padrão/textura em vez de foto |
| `hero` | abertura do universo | prioridade alta | única com prioridade de carregamento |
| `trabalho` | galeria | miniatura pequena + versão grande | um arquivo-fonte, vários tamanhos gerados |
| `ornamento` | decoração | SVG sempre que possível | vetor, leve |
| `retrato` | tatuador | — | usa a foto existente, recortada por papel |

## Organização de arquivos (proposta)
```
content/universos/<slug>/
  ativos/
    pack.<ext>
    preview.<ext>
    atmosfera.<ext>
    hero.<ext>
    ornamentos/
  trabalhos/
    <NNN>-<descricao-curta>.<ext>      ex.: 001-dragao-braco.jpg
originais/                              fora do build, backup em resolução cheia (não versionar)
```

## Convenção de nomes
- Minúsculas, sem acentos, hífens, sem espaços.
- Trabalhos: `NNN-descricao-curta` (NNN = ordem estável de 3 dígitos).
- Sufixos reservados: `-cicatrizada` marca tatuagem já cicatrizada.
- O nome do arquivo **não** carrega informação que pertence ao dado (título, ano): isso vai em `trabalhos`.

## Pipeline (em build, local)
1. Entrada: arquivo-fonte de qualidade (limite de resolução máxima, D-14).
2. Geração de **conjunto de tamanhos** (ex.: pequeno/médio/grande/cheio) em AVIF e WebP, mais fallback.
3. **Placeholder borrado** minúsculo embutido para carregamento progressivo.
4. **Manifesto** com largura, altura e proporção de cada imagem, para reservar espaço (sem salto de layout).
5. Falha de build se uma imagem referenciada não existir ou não tiver `alt`.
Ferramentas: o otimizador do próprio framework e a biblioteca de processamento local; **não** enviar fotos de clientes a serviços externos de terceiros (SKILLS.md explica por quê).

## Carregamento
- `hero` com prioridade; o resto `lazy`.
- Galeria: renderizar por janelas (perto da viewport) e paginar.
- `pack`/`preview`: pré-carregados só por intenção ou ociosidade.
- Atributo de tamanhos (`sizes`) correto por layout para o navegador escolher o arquivo certo.
- Em economia de dados: sem `preview` de imagem; miniaturas menores.

## Privacidade e direitos
- Fotos de clientes exigem consentimento registrado (campo no trabalho, D-19).
- Remover metadados (localização/EXIF) das imagens publicadas.
- Marca d'água: decisão aberta (D-22).

## Qualidade visual
Fotos de tatuagem precisam de cor fiel. Cada universo pode aplicar tratamento de cor **só na atmosfera**, nunca nas fotos das obras (para não alterar o trabalho do artista).

## O que existe hoje
Apenas `img/mjr.png` (1672×941, ~1,9 MB). Será usada como retrato e fonte de recortes; precisa do pipeline acima antes de ir ao ar.
