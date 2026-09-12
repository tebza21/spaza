document.addEventListener('DOMContentLoaded', async () => {
  if (!window.SpazaDB || !document.getElementById('categoryFilter')) return;
  const filter = document.getElementById('categoryFilter');
  const params = new URLSearchParams(location.search);
  const selected = params.get('category') || 'all';
  const { data: categories, error } = await SpazaDB.from('categories').select('id,name').order('name');
  if (error) { console.error(error); return; }
  filter.innerHTML = '<option value="all">All categories</option>' +
    (categories || []).map(c => `<option value="${String(c.name).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;')}">${String(c.name).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</option>`).join('');
  if ([...filter.options].some(o => o.value === selected)) filter.value = selected;
  filter.addEventListener('change', () => {
    const url = new URL(location.href);
    if (filter.value === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', filter.value);
    url.searchParams.delete('q');
    location.href = url.toString();
  });
  const show = document.getElementById('showFilters');
  const panel = document.getElementById('filtersPanel');
  show?.addEventListener('click', () => panel?.classList.toggle('open'));
});