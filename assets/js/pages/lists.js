/* Original card layout and SVG illustrations, with in-memory Bootstrap grid. */
(() => {
  const isPet = document.body.dataset.page === 'pets';
  const { pets, clients } = TiaLari.demo;
  const records = isPet ? pets : clients;
  const { escape, icon, modal } = TiaLari.ui;
  const search = document.getElementById('search');
  const filter = document.getElementById('status-filter');
  const sort = document.getElementById('sort');
  const container = document.getElementById('records');
  container.className = 'row g-3 records-grid';
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const linkedPets = record => pets.filter(pet => pet.tutor === record.name).map(pet => pet.name);
  function render() {
    const term = normalize(search.value.trim());
    const rows = records.filter(record => {
      const text = isPet ? `${record.name} ${record.tutor}` : `${record.name} ${record.cpf} ${record.phone}`;
      return normalize(text).includes(term) && (!filter.value || (isPet ? record.size === filter.value : filter.value === 'with' ? linkedPets(record).length > 0 : linkedPets(record).length === 0));
    }).sort((a, b) => sort.value === 'original' ? b.id - a.id : a.name.localeCompare(b.name, 'pt-BR') * (sort.value === 'asc' ? 1 : -1));
    document.getElementById('record-count').textContent = `${rows.length} ${rows.length === 1 ? 'cadastro' : 'cadastros'}`;
    document.getElementById('list-summary').textContent = `Exibindo ${rows.length} de ${records.length} registros`;
    container.innerHTML = rows.length ? rows.map(record => `<div class="col-12 col-md-6 col-xl-4"><article class="card record h-100"><div class="tl-row"><span class="record-icon">${icon(isPet ? 'paw' : 'users')}</span><div><h3>${escape(record.name)}</h3><p class="sub">${escape(isPet ? record.breed : record.phone)}</p></div></div><span class="pill">${isPet ? `Porte ${escape(record.size.toLowerCase())}` : 'Cadastro ativo'}</span><div class="relation"><small>${isPet ? 'Tutor' : 'Pets vinculados'}</small><strong>${escape(isPet ? record.tutor : linkedPets(record).join(', ') || 'Nenhum pet vinculado')}</strong></div><div class="record-footer"><span>${isPet ? 'Cuidados e informações' : `${linkedPets(record).length} ${linkedPets(record).length === 1 ? 'pet vinculado' : 'pets vinculados'}`}</span><button class="btn btn-ghost btn-arrow" type="button" data-detail="${record.id}" aria-label="Ver ${escape(record.name)}">Ver</button></div></article></div>`).join('') : '<div class="col-12"><div class="no-results"><h3>Nenhum cadastro encontrado</h3><p class="lead">Tente outro termo ou altere o filtro.</p><button class="btn btn-secondary mt-3" type="button" data-clear>Limpar filtros</button></div></div>';
  }
  search.addEventListener('input', render);
  [filter, sort].forEach(element => element.addEventListener('change', render));
  container.addEventListener('click', event => {
    if (event.target.closest('[data-clear]')) {
      search.value = ''; filter.value = ''; sort.value = 'original'; render(); search.focus(); return;
    }
    const button = event.target.closest('[data-detail]');
    if (!button) return;
    const record = records.find(item => item.id === Number(button.dataset.detail));
    const fields = isPet
      ? [['Tutor', record.tutor], ['Raça', record.breed], ['Porte', record.size], ['Observações', record.notes || 'Nenhuma registrada']]
      : [['Telefone', record.phone], ['CPF', record.cpf || 'Não informado'], ['E-mail', record.email || 'Não informado'], ['Endereço', record.address || 'Não informado'], ['Pets', linkedPets(record).join(', ') || 'Nenhum pet vinculado']];
    modal(record.name, `<div class="stack">${fields.map(([label, value]) => `<div class="detail-row"><span>${escape(label)}</span><strong class="text-end text-break">${escape(value)}</strong></div>`).join('')}</div>`);
  });
  render();
})();
