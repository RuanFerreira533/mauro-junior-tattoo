# Estrutura de conteúdo

> Define **o formato** do conteúdo. Nenhum texto ou dado definitivo do tatuador foi inventado: o que falta está marcado "a fornecer".

## Princípio
Conteúdo = **dados + imagens**, sem JSX nem estilo. Um universo é uma pasta; o site descobre as pastas e monta hub, rotas e galerias sozinho.

## Entidades
### Tatuador (único)
| Campo | Status |
|---|---|
| nome, instagram, cidade | conhecidos: Mauro Junior, @maurojr_tattoo, Santa Isabel-SP |
| WhatsApp | **a fornecer/confirmar** (só lido de uma miniatura, não confirmado) |
| endereço e horários | a fornecer |
| texto de apresentação | a fornecer/aprovar |
| reconhecimentos | a confirmar (um card "Destaques – Melhores do Ano", ano incerto) |
| foto de retrato | `img/mjr.png` existe |

### Universo (um por estilo)
| Campo | Obrigatório | Observação |
|---|---|---|
| `id` / `slug` | sim | minúsculo, sem acento, estável (vira URL) |
| `nome` | sim | como aparece no pack |
| `ordem` | sim | posição no hub |
| `resumo` | sim | uma linha para o card (a fornecer) |
| `descricao` | não | texto do estilo no universo (a fornecer) |
| `tema` | sim | tokens ([THEME_SYSTEM](THEME_SYSTEM.md)) |
| `ativos` | sim | imagem do pack, previews, atmosfera ([IMAGE_SYSTEM](IMAGE_SYSTEM.md)) |
| `slots` | não | componentes específicos |
| `movimento` | sim | preset e intensidade |
| `status` | sim | `rascunho` não aparece no hub; `publicado` aparece |
| `subcategorias` | não | só se houver conteúdo que justifique (D-09) |

### Trabalho (tatuagem)
| Campo | Obrigatório | Observação |
|---|---|---|
| `id` | sim | estável |
| `universo` | sim | um universo principal (define a identidade) e, opcionalmente, outros (ex.: fine line cicatrizada em Fine Line e em Cicatrizadas, D-21) |
| `imagem(ns)` | sim | referência a ativos otimizados |
| `alt` | sim | descrição acessível |
| `titulo` | não | |
| `descricao` | não | |
| `regiao do corpo`, `tamanho`, `ano`, `sessoes` | não | metadados opcionais |
| `cicatrizada` | não | marca fotos de tatuagem já cicatrizada |
| `destaque` | não | aparece primeiro/maior |
| `tags` | não | para subcategorias e busca futura |
| `consentimento` | sim | confirmação de que o cliente autorizou exibir (D-19) |

### CTA / contato
Rótulo único, destino (WhatsApp/formulário, D-10), mensagem pré-preenchida com o nome do universo.

## Onde fica
```
content/
  tatuador.(json|ts)          dados do tatuador
  universos/
    <slug>/
      universo.(ts|json)      definição (identidade, ordem, tema, movimento, status)
      trabalhos.(json|ts)     lista de trabalhos
      textos.md               descrição e textos do estilo
      (imagens em IMAGE_SYSTEM)
```
Formato (arquivos locais × CMS) é decisão aberta (D-11). Recomendação inicial: **arquivos locais tipados e validados**, porque o site é estático, a equipe é pequena e não há back-end. Se o tatuador for editar sozinho, avaliar CMS depois.

## Validação (em build)
- Schema valida campos obrigatórios, slugs únicos e referências de imagem existentes.
- Universo `publicado` sem trabalhos gera aviso (não erro), e a página mostra estado "em breve".
- `alt` ausente é erro.
- `consentimento` ausente em trabalho publicado é erro.

## Como adicionar um universo ou um trabalho
1. Criar a pasta do universo e preencher `universo`.
2. Adicionar imagens seguindo a convenção de nomes.
3. Adicionar entradas em `trabalhos`.
4. Rodar a validação. Se passar, o universo/trabalho aparece sem editar componentes.

## Conteúdo que precisamos do tatuador (checklist)
Lista final de estilos; uma frase por estilo; fotos de cada trabalho (boas, bem iluminadas) com autorização dos clientes; textos de apresentação; WhatsApp; endereço/horários; premiações confirmadas; preferência de orçamento (WhatsApp, formulário, ambos).
