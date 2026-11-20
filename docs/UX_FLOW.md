# Fluxo do usuário

## Fluxo principal
```
ENTRADA (hub, estado base)
   ↓ explora os packs
PREVIEW (hover/foco no desktop · card centralizado no celular)
   ↓ decide
ENTRADA NO UNIVERSO (clique/toque em "Entrar")
   ↓
UNIVERSO: abertura (hero do estilo)
   ↓
GALERIA / PROJETOS
   ↓
DETALHE DO TRABALHO
   ↓
ORÇAMENTO / AGENDAMENTO
```

## Etapas
### 1. Hub
- Marca do tatuador + uma frase curta (texto a definir) + os packs.
- Estado base neutro. Convite claro a explorar ("passe o mouse" / "deslize").
- CTA de orçamento já visível, discreto.

### 2. Preview
- **Desktop:** `pointerenter`/`focus` em um pack dispara o preview após uma pequena intenção (~100 ms) para evitar disparos acidentais. `pointerleave`/`blur` reverte com carência (~250 ms) para não piscar ao cruzar o espaço entre cards.
- **Celular/tablet:** o pack que ocupa o centro do carrossel vira o preview ativo; um botão "Entrar" é o gatilho explícito. Ver [RESPONSIVENESS](RESPONSIVENESS.md).
- Preview só toca em tokens e camadas leves; nunca navega.

### 3. Entrar
- Clique/toque em "Entrar": transição que **aprofunda** o preview (o card expande para o hero do universo). Rota nova, mas o Stage não é remontado.
- Se o visitante usar "voltar" do navegador, o hub reaparece no estado base.

### 4. Dentro do universo
- **Abertura:** nome do estilo, uma linha de descrição (a definir), identidade completa.
- **Galeria:** grade/estrutura própria do universo usando componentes compartilhados. Subcategorias só se houver conteúdo que justifique (D-09).
- **Informações do estilo:** texto curto sobre como o tatuador trabalha esse estilo (conteúdo a fornecer, nunca inventado).
- **Trocar de universo:** um seletor compacto permite saltar a outro universo sem voltar ao hub (D-07).

### 5. Detalhe do trabalho
Visualizador (modal ou rota) com imagem grande, título/descrição quando existirem, e CTA "quero algo assim". Teclado: setas, Esc. Ver D-08.

### 6. Orçamento / agendamento
Presente em todo lugar: botão fixo/recorrente com o mesmo rótulo em todos os universos. O destino é decisão aberta (D-10): WhatsApp com mensagem pré-preenchida citando o estilo (ex.: "Oi, quero um orçamento de [estilo]"), formulário, ou ambos.

## Estados e casos limite
| Caso | Comportamento esperado |
|---|---|
| Universo sem trabalhos ainda | Mostra o universo e um aviso honesto ("em breve") com CTA; nunca uma grade vazia. |
| Conexão lenta | Preview usa só tokens e imagem pequena; o universo completo carrega progressivamente. |
| `prefers-reduced-motion` | Preview vira troca de cor/contraste por fade simples; sem parallax nem partículas. |
| Acesso direto à URL de um universo | A página funciona sozinha, com o tema já aplicado (sem depender de ter passado pelo hub). |
| JavaScript lento/ausente | Hub navegável por links comuns; tema do universo aplicado no servidor. |
| Visitante usa só teclado | Foco em pack = preview; Enter = entrar; Esc = reverter. |

## Métricas de sucesso (a definir com o tatuador)
Cliques em "Entrar" por pack, profundidade de galeria, cliques no CTA de orçamento por universo, taxa de saída no hub. Nenhuma ferramenta de analytics foi escolhida (D-17).
