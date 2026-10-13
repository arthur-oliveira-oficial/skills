---
name: ux-cognitive-laws
description: Audita e implementa melhorias de UX em frontends usando as leis de Fitts, Hick, Jakob e Miller e os efeitos Zeigarnik, Goal-Gradient e Von Restorff. Use para melhorar usabilidade, fluxos, formulários, onboarding, navegação, CTAs, dashboards e conversão em React, Next.js, Vue, Nuxt, Angular, Svelte ou HTML/CSS. Não use para tarefas exclusivamente de backend ou mudanças sem interface.
---

# UX Cognitive Laws

Melhore a capacidade real de uma pessoa encontrar, entender e concluir tarefas na interface. Trate os sete princípios como **hipóteses de design**, nunca como regras cegas. Quando o pedido for implementar, altere o código; não entregue apenas uma auditoria.

Idioma: use o idioma do usuário (padrão: português brasileiro). Preserve o idioma e a terminologia do produto, inclusive i18n.

## Quando ativar

- Pedidos para criar, revisar ou otimizar UI/UX, checkout, formulários, onboarding, navegação, dashboards, tabelas, landing pages e fluxos.
- Pedidos que citem Fitts, Hick, Jakob, Miller, Zeigarnik, gradiente de meta ou Von Restorff.
- Quando o objetivo for reduzir atrito, erros de toque, indecisão, abandono ou desorientação.

Não ative para mudanças só de API, banco ou infraestrutura sem efeito visual/interativo. Se o pedido for somente auditoria, não modifique arquivos.

## Fluxo

1. **Inspecione antes de alterar.** Leia `AGENTS.md`, `CLAUDE.md` ou README, `package.json` e o frontend relevante. Descubra stack, roteamento, estilos, tokens, componentes, validação, testes e convenções de acessibilidade. Não presuma framework nem biblioteca de UI.
2. **Delimite a jornada real.** Identifique usuário, objetivo e etapas críticas. Se o escopo estiver aberto, priorize poucas melhorias de alto impacto em vez de redesenhar. Considere loading, erro, vazio, sucesso, mobile e desktop.
3. **Avalie as sete leis.** Para cada uma, registre o sintoma observado, o componente/fluxo e a intervenção, ou marque **N/A** com o motivo. Não invente fricção nem force padrões.
4. **Priorize.** Ordem sugerida: bloqueio de tarefa > acessibilidade/erro > clareza de decisão > progressão/orientação > diferenciação visual.
5. **Implemente no código existente.** Reaproveite componentes, tokens, validação, estado e traduções. Corrija a interação de fato; não altere só cores. Mantenha a mudança coesa e reversível.
6. **Valide.** Rode lint, tipos, testes e build disponíveis. Quando houver navegador, verifique ao menos uma largura móvel e uma desktop. Se não for possível executar algo, diga exatamente o que faltou; nunca afirme que passou sem testar.
7. **Relate.** Liste arquivos alterados, leis aplicadas e N/A, validações executadas e pendências. Seja curto e concreto; não invente métricas de conversão.

## As sete leis

| Princípio | Pergunta diagnóstica | Intervenção usual |
| --- | --- | --- |
| Lei de Fitts | O alvo é pequeno, próximo de outro ou longe da ação? | Ampliar a área interativa real; espaçar; aproximar a ação do contexto. |
| Lei de Hick | Há escolhas demais sem hierarquia? | Agrupar por intenção; destacar a ação principal; buscar/filtrar listas grandes; revelar avançados sob demanda. |
| Efeito Zeigarnik | Há tarefa interrompida cujo estado importa? | Mostrar pendências reais; permitir retomar; indicar o próximo passo; diferenciar "salvo" de "enviado". |
| Lei de Jakob | Controles ou fluxos quebram expectativas consolidadas? | Usar padrões familiares e semântica HTML; alinhar ao design system atual. |
| Gradiente de meta | A pessoa sabe quanto falta para concluir? | Mostrar progresso **verdadeiro**, etapa atual, total e conclusão clara. |
| Von Restorff | A ação ou informação crucial se perde visualmente? | Dar contraste de prioridade com texto, forma, peso e espaçamento; usar destaque com parcimônia. |
| Lei de Miller | A interface exige memorizar dados ou ler blocos densos? | Agrupar semanticamente (títulos, `fieldset`/`legend`); reexibir dados necessários perto da decisão. |

## Regras obrigatórias

- **Não** aplique os sete efeitos na mesma tela; cada um precisa de problema e benefício demonstráveis.
- **Não** crie padrões obscuros: falsa urgência, escassez fabricada, progresso inventado, etapas extras para reter o usuário, cancelamento escondido, confirmações enganosas ou opt-ins pré-marcados.
- **Não** sacrifique funções secundárias essenciais ao simplificar escolhas.
- **Não** trate Miller como limite rígido de 7 itens; use agrupamento significativo.
- **Não** dependa só de cor, hover ou animação: garanta teclado, foco visível, labels, leitor de tela, contraste e `prefers-reduced-motion`.
- Alvos de ponteiro devem atender WCAG 2.2 AA 2.5.8 (24×24 CSS px ou exceção válida). **Prefira 44×44 px** em controles touch importantes. Nunca diga que 44 px é o mínimo normativo AA.
- Prefira HTML semântico, foco gerenciado, erros associados ao campo e validação não destrutiva.
- Não salve dados pessoais, senhas ou dados sensíveis em `localStorage` só para explorar Zeigarnik. Use o mecanismo de persistência aprovado no projeto.
- Preserve contratos de API, navegação, funcionalidades, responsividade e convenções. Não adicione bibliotecas sem necessidade nem reescreva arquiteturas sem autorização.
- Não alegue aumento de conversão sem medição; apresente o impacto como hipótese.

## Resolução de conflitos

1. Conformidade, segurança, consentimento e sucesso da tarefa.
2. Previsibilidade (Jakob) e facilidade motora (Fitts).
3. Clareza de escolha (Hick), agrupamento (Miller) e hierarquia (Von Restorff).
4. Retomada (Zeigarnik) e progresso (gradiente de meta), quando houver jornada finita real.

Nenhuma lei obriga a criar um wizard: compare agrupar na mesma página com dividir em etapas, usando o fluxo real.

## Resposta esperada

- **Implementação:** o que mudou, onde, por quê (lei + problema real), validações executadas e pendências. Cite as sete leis, inclusive as N/A.
- **Auditoria:** achados priorizados com arquivo/tela, evidência, recomendação e risco, sem editar código.

## Skills relacionadas

- `product-ui-engineer`: construir ou redesenhar telas com Next.js, React, Tailwind e shadcn/ui. Use-o depois desta skill quando a melhoria exigir uma nova tela ou componente.
- `design-system-spec`: se o projeto tiver `docs/design/DESIGN.md`, os tokens e regras dele têm precedência sobre estilos ad hoc.

## Referências

- Laws of UX: https://lawsofux.com/
- WCAG 2.2, tamanho mínimo do alvo: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
