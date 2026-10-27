/* In-memory filtering only. Replace the data source when integrating an API. */
(() => {
  const isPet = document.body.dataset.page === 'pets';
  const records = isPet ? TiaLari.demo.pets : TiaLari.demo.clients;
  const { escape, modal } = TiaLari.ui;
  const search = document.getElementById('search');
  const filter = document.getElementById('filter');
  const sort = document.getElementById('sort');
  const tbody = document.getElementById('records');
  const normalize = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  function render() {
    const term = normalize(search.value.trim());
    const rows = records.filter((record) => {
      const text = isPet ? `${record.name} ${record.breed} ${record.tutor}` : `${record.name} ${record.phone} ${record.pet}`;
      const matchesFilter = !filter.value || (isPet ? record.size === filter.value : filter.value === 'with' ? Boolean(record.pet) : !record.pet);
      return normalize(text).includes(term) && matchesFilter;
    }).sort((a, b) => sort.value === 'recent' ? b.id - a.id : a.name.localeCompare(b.name, 'pt-BR') * (sort.value === 'asc' ? 1 : -1));
    tbody.innerHTML = rows.map((record) => `<tr><th scope="row"><span class="pet-initial" aria-hidden="true">${escape(record.name[0])}</span>${escape(record.name)}</th>${(isPet ? [record.breed, record.size, record.tutor] : [record.phone, record.pet || 'Sem pets']).map((value) => `<td>${escape(value)}</td>`).join('')}<td class="text-end"><button class="btn btn-outline-primary" type="button" data-detail="${record.id}" aria-label="Ver detalhes de ${escape(record.name)}">Ver detalhes</button></td></tr>`).join('');
    document.getElementById('result-count').textContent = `${rows.length} ${rows.length === 1 ? 'registro' : 'registros'}`;
    document.getElementById('empty-state').hidden = rows.length > 0;
    tbody.closest('.table-responsive').hidden = rows.length === 0;
  }
  document.getElementById('filters').addEventListener('submit', (event) => event.preventDefault());
  search.addEventListener('input', render);
  [filter, sort].forEach((element) => element.addEventListener('change', render));
  document.getElementById('clear-filters').addEventListener('click', () => {
    document.getElementById('filters').reset();
    render();
    search.focus();
  });
  tbody.addEventListener('click', (event) => {
    const button = event.target.closest('[data-detail]');
    if (!button) return;
    const record = records.find((item) => item.id === Number(button.dataset.detail));
    const fields = isPet
      ? [['Nome', record.name], ['Raça', record.breed], ['Porte', record.size], ['Tutor', record.tutor], ['Observações', record.notes || 'Nenhuma observação']]
      : [['Nome', record.name], ['Telefone', record.phone], ['Pet', record.pet || 'Sem pets'], ['E-mail', record.email || 'Não informado'], ['Endereço', record.address || 'Não informado']];
    modal(isPet ? 'Detalhes do pet' : 'Detalhes do cliente', `<dl class="row mb-0">${fields.map(([label, value]) => `<dt class="col-sm-4 mb-2">${escape(label)}</dt><dd class="col-sm-8 mb-3 text-break">${escape(value)}</dd>`).join('')}</dl>`);
  });
  render();
})();
