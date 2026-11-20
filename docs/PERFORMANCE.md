# Performance

> Orçamentos abaixo são **metas propostas**, a confirmar com medição real (D-15).

## Metas
| Métrica | Meta (celular médio, 4G) |
|---|---|
| LCP do hub | < 2,5 s |
| CLS | ≈ 0 (< 0,05) |
| INP | < 200 ms |
| JavaScript inicial do hub | pequeno: **orçamento de ~100 KB comprimidos** (referência a validar) |
| Chunk de cada universo | ≤ ~60 KB comprimidos, carregado sob demanda |
| Imagem de pack/preview | ≤ ~60 KB cada, em formato moderno |

## Regras de arquitetura
1. **Estático por padrão:** hub, universos e galerias são gerados em build. Nada de busca de dados no cliente.
2. **Servidor por padrão:** componentes de cliente só para interação.
3. **Código por universo, sob demanda:** slots T2 e bibliotecas de animação são importados dinamicamente na rota do universo, nunca no hub.
4. **Pré-carga por intenção:** hover/foco/centralização iniciam pré-busca do universo (imagem de atmosfera pequena, fonte, trecho de código). Também pré-carga em ociosidade para os mais prováveis.
5. **Nada bloqueia o primeiro quadro:** o hub aparece com o estado base e só depois enriquece.

## Imagens (detalhes em IMAGE_SYSTEM)
- Formatos modernos (AVIF/WebP) com fallback, tamanhos responsivos, dimensões conhecidas para evitar salto.
- `loading="lazy"` abaixo da dobra; a imagem principal do hero do universo tem prioridade.
- Placeholder borrado minúsculo para carregamento progressivo.
- Galeria grande: renderizar apenas o que está perto da viewport; paginar/“carregar mais” em vez de despejar centenas de imagens.
- Limite de resolução máxima definido (D-14) para não servir fotos de câmera cruas.

## Fontes
- Subconjunto latino com acentos, no máximo 2 famílias por universo, carregadas só na rota do universo.
- Fallback com métricas ajustadas para evitar salto de layout.
- Pré-carga por intenção; o preview só troca a tipografia se a fonte já estiver pronta.

## Animação
- Só propriedades baratas ([ANIMATION_SYSTEM](ANIMATION_SYSTEM.md)); um elemento grande animando por vez.
- Loops pausam fora da tela e em aba oculta.
- `will-change` somente durante a animação, removido depois.
- **Degradação automática:** se a taxa de quadros cair ou a conexão for lenta, cair de T2 para T1 e de T1 para T0.
- Evitar efeitos caros em mobile: blur grande, sombras enormes, `backdrop-filter` em áreas amplas, WebGL sem necessidade.

## JavaScript
- Sem bibliotecas grandes no hub. Preferir CSS e APIs do navegador.
- Sem escutas de scroll/pointer globais sem `passive` e sem agrupar por frame.
- Estado global mínimo; sem re-render da árvore inteira a cada mudança de preview (o preview muda atributos do Stage, não renderiza React).

## Cache e entrega
Ativos estáticos com cache longo e nomes com hash; imagens servidas por CDN; compressão Brotli. Plataforma de hospedagem em aberto (D-18).

## Como medir
Medir em cada fase com: auditoria de laboratório em perfil de celular, gravação de desempenho no navegador, e verificação em aparelho real de entrada. Cada universo novo passa pela checklist de peso antes de entrar.

## Checklist de "universo pronto" (peso)
- [ ] Chunk dentro do orçamento
- [ ] Imagens otimizadas e com dimensões
- [ ] Fontes dentro do limite
- [ ] Preview sem baixar nada além do previsto
- [ ] Degrada para T0 sem quebrar
