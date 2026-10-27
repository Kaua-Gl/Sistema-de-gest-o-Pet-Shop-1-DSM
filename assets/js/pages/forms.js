/* Visual form behavior. Submission is intentionally simulated, never persisted. */
(() => {
  const form = document.querySelector('.needs-validation');
  const { modal, escape } = TiaLari.ui;
  const cpf = document.getElementById('cpf');
  const phone = document.getElementById('phone');
  const tutor = document.getElementById('tutor');
  if (tutor) {
    TiaLari.demo.clients.forEach((client) => tutor.add(new Option(client.name, client.id)));
  }
  function isValidCpf(value) {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
    for (let length = 9; length < 11; length++) {
      let sum = 0;
      for (let index = 0; index < length; index++) sum += Number(digits[index]) * (length + 1 - index);
      const remainder = (sum * 10) % 11;
      if ((remainder === 10 ? 0 : remainder) !== Number(digits[length])) return false;
    }
    return true;
  }
  cpf?.addEventListener('input', () => {
    const digits = cpf.value.replace(/\D/g, '').slice(0, 11);
    cpf.value = digits.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    cpf.setCustomValidity(isValidCpf(cpf.value) ? '' : 'Informe um CPF válido.');
  });
  phone?.addEventListener('input', () => {
    const digits = phone.value.replace(/\D/g, '').slice(0, 11);
    phone.value = digits.length > 10
      ? digits.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3')
      : digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    phone.setCustomValidity(digits.length >= 10 ? '' : 'Informe DDD e telefone.');
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelectorAll('input[type="text"]').forEach((input) => {
      input.value = input.value.trim();
    });
    if (cpf) cpf.setCustomValidity(isValidCpf(cpf.value) ? '' : 'Informe um CPF válido.');
    if (phone) phone.setCustomValidity(phone.value.replace(/\D/g, '').length >= 10 ? '' : 'Informe DDD e telefone.');
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      form.querySelector(':invalid')?.focus();
      return;
    }
    modal('Prévia de cadastro concluída', `<p>Os dados de <strong>${escape(form.elements.name.value)}</strong> passaram pela validação da tela.</p><p class="mb-0">Esta é uma simulação visual. Nenhum dado foi enviado ou armazenado. A integração com o backend será feita em uma próxima etapa.</p>`);
  });
})();
