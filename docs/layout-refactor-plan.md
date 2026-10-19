# Plano de refatoração do layout

Branch: `layout-refactor` (criada a partir da `main` em 2026-10-14).

**Referência visual (canvas de design):** https://claude.ai/artifact/MXFuC9JSEkrUJWZTGkbqhN

O canvas tem 8 telas: Início, Sobre mim, Experiência e Contato (desktop), o modal de experiência, Início e Experiência (mobile) e um guia de estilo com tokens e componentes. Ele é a fonte da verdade para cores, tipografia, espaçamentos e estados.

## Decisões de design

- **Paleta:** fundo `#0f1218`, superfície `#181c24`, superfície 2 `#232935`, texto `#e8eaed`, texto suave `#9aa3b2`, texto secundário `#b4bbc7`/`#c3c9d4`, borda `rgba(255,255,255,.07–.16)`, erro `#e0796b` / texto de erro `#f0a197`.
- **Cor de destaque:** dourado `#f5b94a` (texto sobre o destaque: `#1a1405`). Variações com alfa: `1f` (fundo suave) e `59`/`73` (borda).
- **Tipografia:** Space Grotesk (500–700) nos títulos, Inter (400–600) no texto. Texto corrido sempre alinhado à esquerda, `line-height` 1.6–1.7.
- **Raios:** 8 / 12 / 18 / 22px. Espaçamento em múltiplos de 4px. Alvos de toque ≥ 44px.
- **Animações:** 200–300ms, deslocamentos curtos (8–16px), respeitando `prefers-reduced-motion`.

## Regras durante a refatoração

- Manter os `data-cy` usados pelos testes: `title`, `subtitle`, `selfie`, `language-button`, `pt`, `en`, `send-button`, `about-me-option`, `work-experience-option`, `contact-option` e os gerados por `dataCy`/`nextRouteDataCy`. Se algum seletor mudar de elemento, atualizar o spec junto.
- Todo texto novo entra em `src/config/locale/pt.json` **e** `en.json` (ou `common-locale.json` quando não depende de idioma).
- Rodar `npx cypress run --component` e `--e2e` (com `npm run build && npm start`) ao fim de cada fase.
- Um commit por passo, no padrão `tipo: descrição em português`.

## Fase 1 — Fundação (tokens e estilos globais)

- [x] 1.1 Criar `src/app/styles/theme.ts` com os tokens (cores, fontes, raios, espaçamentos, transições). Exportados como constantes em vez de `ThemeProvider`, para os component tests do Cypress (que montam sem providers) continuarem funcionando.
- [x] 1.2 Carregar Space Grotesk via `next/font/google` junto da Inter (`src/app/styles/fonts.ts`), expostas como `--font-inter` e `--font-space-grotesk` no `<html>`. Removidas as instâncias duplicadas da Inter nos componentes.
- [x] 1.3 Atualizar `globalStyle.ts`: novo fundo/cor de texto, `button, input, textarea, select { font: inherit; }`, foco visível (`:focus-visible`) na cor de destaque, `prefers-reduced-motion`.
- [x] 1.4 `body` com `overflow-x: hidden` (rolagem vertical liberada) e `Main` com `min-height: 100dvh`.
- [x] 1.5 `<html lang="pt-BR">` no `layout.tsx`, sincronizado com o idioma selecionado pelo `LanguageOptionsProvider`.
- [x] 1.6 Substituir cores hardcoded pelos tokens nos arquivos existentes (inclui remover o `outline: none` dos inputs do contato).

## Fase 2 — Header e navegação

- [x] 2.1 Unificar header em uma barra: logo "LA" + nome à esquerda, menu no centro/direita, seletor de idioma à direita (`template.tsx`, `NavigationMenu.component.tsx`).
- [x] 2.2 Item ativo como pílula na cor de destaque (fundo suave) em `NavigationMenuOption.component.tsx`.
- [x] 2.3 Trocar o botão/tooltip de idioma por um seletor segmentado PT | EN (`LanguageOptions.component.tsx`), mantendo `data-cy` `language-button`/`pt`/`en` (ajustar o e2e de tradução se o fluxo de clique mudar).
- [x] 2.4 Menu mobile: trocar o checkbox sem rótulo por `<button aria-label aria-expanded>` (`NavigationMenuMobileToggle.component.tsx`) e redesenhar o painel aberto.

## Fase 3 — Home

- [x] 3.1 Layout em duas colunas no desktop (texto à esquerda, foto à direita); empilhado no mobile (foto pequena ao lado do selo de localização).
- [x] 3.2 Adicionar "Olá, eu sou", nome grande (`clamp`), cargo, frase de apresentação e selo "Rio de Janeiro".
- [x] 3.3 Botões de ação: "Ver experiência" (primário), "Entrar em contato" (secundário) e "Baixar CV" (definir se haverá arquivo de CV; senão, remover). → "Baixar CV" deixado comentado em `page.tsx` até definirmos o arquivo.
- [x] 3.4 Ícones sociais monocromáticos perto do hero; anel na cor de destaque em volta da foto.
- [ ] 3.5 (Opcional) Trocar a selfie por uma foto com melhor iluminação.

## Fase 4 — Sobre mim

- [ ] 4.1 Título + parágrafos alinhados à esquerda em coluna principal.
- [ ] 4.2 Cards de números (11 anos de front-end, 4 empresas, formado em 2014).
- [ ] 4.3 Coluna lateral com chips de stack e "Fora do código" + CTA "Vamos conversar".

## Fase 5 — Experiência profissional

- [ ] 5.1 Timeline vertical à esquerda (desktop e mobile) substituindo `Desk.component.tsx`/`Mobile.component.tsx` por um único componente responsivo.
- [ ] 5.2 Cards como `<button>` com hover: iniciais/logo, empresa, cargo, período em pílula, resumo, 3–4 habilidades e "Ver detalhes" (`DeskCard`/`MobileCard`/`InfoCard`). Novo campo de resumo no locale.
- [ ] 5.3 Esconder os marcadores "+" de leitores de tela (`aria-hidden`).
- [ ] 5.4 Atualizar os component tests `DeskCard`/`MobileCard` (ou unificá-los) conforme a nova estrutura.

## Fase 6 — Modal

- [ ] 6.1 Redesenhar `CompanyModal.component.tsx`: cabeçalho com iniciais, cargo · período, botão fechar com ícone, seções "O que eu fazia" e "Habilidades técnicas" (chips), link "Visitar site da empresa".
- [ ] 6.2 Texto do modal alinhado à esquerda; `max-height` com rolagem interna.
- [ ] 6.3 Encurtar as animações de `ModalBackdrop.component.tsx` (hoje 500ms + 500ms de atraso) para ~250ms no total.
- [ ] 6.4 Acessibilidade: `role="dialog"`, `aria-modal`, foco preso no modal e Esc para fechar.

## Fase 7 — Contato

- [ ] 7.1 Duas colunas: introdução "Vamos conversar?" + atalhos (e-mail, LinkedIn, GitHub) à esquerda; formulário em card à direita.
- [ ] 7.2 Rótulos visíveis acima dos campos, espaçamento 16–20px, Nome/E-mail lado a lado no desktop (`Input.component.tsx`).
- [ ] 7.3 Estados de foco e erro conforme o guia de estilo.
- [ ] 7.4 Botão "Enviar mensagem" preenchido na cor de destaque (manter `data-cy="send-button"`).
- [ ] 7.5 Margem lateral de 20px no mobile.
- [ ] 7.6 Definir qual e-mail público mostrar (no canvas está como placeholder).

## Fase 8 — Footer e transições

- [ ] 8.1 Footer enxuto: "© ano Lucas Amaral" (+ ícones sociais monocromáticos, se não ficarem só no hero).
- [ ] 8.2 Trocar o slide de 1000px entre páginas (`template.tsx`) por fade + deslocamento curto (~200ms).

## Fase 9 — Fechamento

- [ ] 9.1 Revisar mobile (390px) e desktop (1440px) com Playwright em todas as páginas, menus e modal.
- [ ] 9.2 Conferir contraste (≥ 4.5:1) e navegação por teclado.
- [ ] 9.3 Rodar a suíte completa do Cypress e atualizar o `CLAUDE.md` se a arquitetura mudar (ex.: `ThemeProvider`, componentes unificados).
- [ ] 9.4 Abrir PR de `layout-refactor` para `main`.
