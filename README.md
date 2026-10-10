# Juma Clube 🐆

Portal de conteúdo do **Juma Clube**, o clube cultural favorito para descobrir Manaus:
cultura, rolês, moda, entretenimento, achados e experiências.

Feito mobile-first (a maioria dos leitores chega pelo Instagram), com estética de revista
independente: fundo creme, bordô e branco das listras do perfil, preto absoluto nas bordas
e capas em estilo colagem.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) + TypeScript
- Tailwind CSS v4
- Ícones [lucide-react](https://lucide.dev) (o ícone do Instagram é desenhado à mão em
  `src/components/InstagramIcon.tsx`, porque o lucide não traz mais ícones de marcas)
- Fontes: Anton (títulos), DM Sans (texto) e Caveat (bilhetinhos escritos à mão)

## Rodando localmente

Requer Node.js 20.9 ou mais recente.

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>. Para testar no celular na mesma rede Wi-Fi, use o endereço
"Network" que aparece no terminal.

Outros comandos:

```bash
npm run build   # build de produção
npm run start   # serve o build de produção
npm run lint    # ESLint
```

## Estrutura

```
src/
├── app/
│   ├── layout.tsx               # Fontes, Header e Footer globais
│   ├── page.tsx                 # Home: destaques, hero, recentes, categorias, quem somos
│   ├── categoria/[slug]/page.tsx
│   ├── post/[slug]/page.tsx     # Matéria + "Mais rolês e achados"
│   ├── not-found.tsx
│   └── globals.css              # Tokens de cor/fonte e utilitários (listras, fita, papel)
├── components/                  # Header, Footer, PostCard, Hero, ArticleBody…
├── data/
│   ├── categories.json          # Editorias: agenda, lifestyle, cultura, achados, moda
│   └── posts.json               # Mock das matérias
└── lib/
    ├── content.ts               # Tipos e funções de leitura do conteúdo
    └── styles.ts                # Cores de cada categoria
public/images/posts/             # Capas ilustradas (SVG) usadas no mock
```

## Editando o conteúdo

Todo o conteúdo vem de `src/data/posts.json`. Cada post tem título, resumo, categoria,
autor, data (`AAAA-MM-DD`), tempo de leitura, capa, um bilhetinho opcional (`note`) e o
corpo em blocos:

| Bloco       | Campos                                         |
| ----------- | ---------------------------------------------- |
| `paragraph` | `text`                                         |
| `heading`   | `text`                                         |
| `quote`     | `text`, `cite` (opcional)                      |
| `list`      | `items` (lista de textos)                      |
| `agenda`    | `items` com `day`, `title`, `place`, `time`, `price` |

O post com `"featured": true` aparece no destaque da home. Para usar fotos de verdade,
coloque os arquivos em `public/images/` e aponte `cover.src` para eles.

> Os locais, eventos e autores do mock são fictícios — troque pelos reais antes de publicar.
