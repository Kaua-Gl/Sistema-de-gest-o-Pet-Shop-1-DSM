/* Single source for sidebar and header across all internal screens. */
(() => {
  const sidebar = document.getElementById('app-sidebar');
  if (!sidebar) return;
  const { escape, icon, modal, hydrateIcons } = TiaLari.ui;
  const page = document.body.dataset.page;
  const items = [
    { label: 'Início', icon: 'home', page: 'dashboard' },
    { label: 'Clientes', icon: 'users', page: 'clientes', child: 'novo-cliente' },
    { label: 'Pets', icon: 'paw', page: 'pets', child: 'novo-pet' },
    { label: 'Agendas', icon: 'calendar' },
    { label: 'Atendimentos', icon: 'clipboard' },
    { label: 'Pacotes', icon: 'box' },
    { label: 'Produtos', icon: 'box' },
    { label: 'Usuários', icon: 'users' }
  ];
  const navItems = items.map((item) => {
    const active = item.page === page || item.child === page;
    return item.page
      ? `<a class="nav-link${active ? ' active' : ''}" href="${item.page}.html"${active ? ' aria-current="page"' : ''}>${icon(item.icon)}${item.label}</a>`
      : `<button type="button" class="nav-link" data-future="${item.label}">${icon(item.icon)}${item.label}</button>`;
  }).join('');
  sidebar.innerHTML = `<aside class="app-sidebar offcanvas-lg offcanvas-start" tabindex="-1" id="sidebar-panel" aria-labelledby="sidebar-title"><div class="offcanvas-body"><div class="sidebar-inner"><button class="icon-button sidebar-close d-lg-none" type="button" data-bs-dismiss="offcanvas" data-bs-target="#sidebar-panel" aria-label="Fechar menu">${icon('close')}</button><a class="brand" href="dashboard.html" aria-label="Tia Lari — início"><img src="assets/images/logo.png" width="112" height="112" alt="Tia Lari Banho e Tosa"></a><h2 class="sidebar-label mb-1" id="sidebar-title">MENU PRINCIPAL</h2><nav class="nav flex-column sidebar-nav mb-4" aria-label="Menu principal">${navItems}</nav><div class="sidebar-bottom"><nav class="nav sidebar-nav" aria-label="Configurações"><button class="nav-link" type="button" data-future="Configurações">${icon('settings')}Configurações</button></nav><div class="profile"><span class="avatar" aria-hidden="true">TL</span><div><strong>Equipe Tia Lari</strong><small>Atendimento</small></div><a class="profile-logout" href="login.html" aria-label="Voltar à tela de login">${icon('logout')}</a></div></div></div></div></aside>`;
  document.getElementById('app-header').innerHTML = `<header class="app-header"><button class="icon-button d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar-panel" aria-controls="sidebar-panel" aria-label="Abrir menu">${icon('menu')}</button><p class="app-breadcrumb">Painel / ${escape(document.body.dataset.breadcrumb)}</p><div class="header-tools"><span class="demo-label">Dados de demonstração</span><button class="icon-button" type="button" id="notifications" aria-label="Ver notificações">${icon('bell')}</button><span class="avatar" aria-label="Equipe Tia Lari">TL</span></div></header>`;
  sidebar.querySelectorAll('[data-future]').forEach((button) => {
    button.addEventListener('click', () => modal(button.dataset.future, '<p class="mb-0">Este módulo está previsto para uma próxima etapa. Nesta versão, estão disponíveis apenas as seis telas de demonstração.</p>'));
  });
  document.getElementById('notifications').addEventListener('click', () => modal('Notificações', '<p class="mb-0">Nenhuma nova notificação neste ambiente de demonstração.</p>'));
  hydrateIcons();
})();
