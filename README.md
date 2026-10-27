# Tia Lari · Telas de gestão

Front-end em **Bootstrap 5.3.8**, HTML semântico, CSS e JavaScript puro. Sem framework de aplicação, build obrigatório ou backend.

## Executar

Abra `index.html` no navegador ou, preferencialmente, sirva a pasta por HTTP:

```sh
python -m http.server 8080
```

Acesse **http://localhost:8080**. Todos os recursos usados pelas telas são locais, sem depender de CDN em tempo de execução.

## Telas

| Arquivo | Tela |
| --- | --- |
| `index.html` | Entrada para o login |
| `login.html` | Login demonstrativo |
| `dashboard.html` | Indicadores e agenda de exemplo |
| `clientes.html` | Listagem, busca, filtros e detalhes de clientes |
| `pets.html` | Listagem, busca, filtros e detalhes de pets |
| `novo-cliente.html` | Formulário de tutor |
| `novo-pet.html` | Formulário de pet com seleção de tutor |

**Somente telas:** o login aceita uma identificação preenchida e senha com pelo menos quatro caracteres, sem autenticação. Cadastros validam os campos e abrem uma confirmação de simulação; nada é enviado ou armazenado. As listagens não são alteradas após a simulação. Não utilize dados reais. Indicadores, notificações e agenda são demonstrativos. Os demais itens do menu informam que estão fora do escopo.

## Fidelidade visual

Esta versão recupera a composição das capturas originais: listagens em cartões (não tabelas), ícones SVG de patinhas e clientes, menu de 240px, cabeçalho com botão de recolher inclusive no desktop, tipografia, cores, espaçamentos e agenda original. Bootstrap continua local e é usado no grid de cartões, formulários, utilitários e modais. Classes originais conflitantes com Bootstrap foram isoladas com o prefixo `tl-`.

Testes automatizados em Chromium verificaram as seis telas em 1440px e 375px, sem transbordamento horizontal ou erros JavaScript, além de busca, detalhes, estado vazio, menu móvel, validação de formulário e login demonstrativo.

## Organização

```text
assets/
  css/
    theme.css                 # Estilos e proporções recuperados da versão original
    layout.css                # Compatibilidade com Bootstrap e componentes compartilhados
    pages.css                 # Cartões, formulários e ajustes fiéis às referências
  js/
    components/
      ui.js                   # Ícones, modal, toast e escape de conteúdo
      layout.js               # Menu, cabeçalho, perfil e navegação compartilhados
    data/demo.js              # Massa fictícia centralizada
    pages/
      dashboard.js
      lists.js                # Busca, filtros, ordenação, detalhes e estado vazio
      forms.js                # Máscaras, validação e simulação de cadastro
      login.js                # Mostrar senha e navegação demonstrativa
  fonts/                      # Fontes extraídas dos HTMLs originais
  images/logo.png             # Logotipo fornecido
  vendor/bootstrap/           # Bootstrap 5.3.8 local + licença
archive/original/             # HTMLs, metadados e CSS anteriores, sem alterações
docs/references/             # Capturas e referências fornecidas
scripts/check_project.py      # Verificação estática dos arquivos das telas
```

Os HTMLs mantêm o conteúdo específico de cada tela. Menu, cabeçalho e diálogos são montados por componentes compartilhados em JavaScript — habilite JavaScript para usar a interface. Não é necessário usar `fetch` para carregar fragmentos.

## Convenções para expandir

1. Copie a estrutura de uma tela interna, com `data-page`, `data-breadcrumb`, os pontos de montagem e o `<main>`.
2. Cadastre a navegação em `assets/js/components/layout.js`.
3. Coloque o comportamento da nova tela em `assets/js/pages/`, sem incluir scripts inline.
4. Use grid, formulários, tabelas responsivas, modal e offcanvas do Bootstrap. Ajuste tokens em `theme.css`, estrutura em `layout.css` e exceções visuais em `pages.css`.
5. Na futura integração, substitua o consumo de `TiaLari.demo` por uma camada de serviços. Autenticação, autorização, validação definitiva e persistência devem ser implementadas no servidor; a validação atual é apenas de interface.
6. Não edite o Bootstrap minificado. Para atualizar, substitua a distribuição local e mantenha a licença.

## Verificações

```sh
python scripts/check_project.py
```

Se Node.js estiver disponível, também é possível validar a sintaxe de cada JS com `node --check caminho/do/arquivo.js`.

Checklist manual recomendado: telas em 375px, 768px e desktop; menu móvel com teclado/Escape; busca sem resultados; ordenação e filtros; detalhes em modal; formulário vazio e preenchido; mostrar/ocultar senha; links de cancelar e voltar ao login.

## Preservação e dependências

Os originais foram copiados para `archive/original/` antes da reorganização. As capturas estão em `docs/references/`; não são recursos de produção. A identidade visual (verde, creme, tipografia e logo) foi mantida a partir do material fornecido.

Bootstrap é distribuído sob licença MIT, incluída em `assets/vendor/bootstrap/LICENSE`. O logotipo, as referências e as fontes vieram dos arquivos fornecidos; confirme seus direitos de uso antes de publicar.
