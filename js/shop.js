document.addEventListener('DOMContentLoaded', async () => {
  if (!window.SpazaDB || !document.getElementById('categoryFilter')) return;
  const filter = document.getElementById('categoryFilter');
  const sort = document.getElementById('sortFilter');
  const params = new URLSearchParams(location.search);
  const selected = params.get('category') || 'all';
  const { data: categories, error } = await SpazaDB.from('categories').select('id,name').eq('is_active', true).order('name');
  if (error) { console.error(error); return; }
  const esc = value => String(value ?? '').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  filter.innerHTML = '<option value="all">All categories</option>' + (categories || []).map(c => `<option value="${esc(c.name)}">${esc(c.name)}</option>`).join('');
  if ([...filter.options].some(o => o.value === selected)) filter.value = selected;
  filter.addEventListener('change', () => {
    const url = new URL(location.href);
    if (filter.value === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', filter.value);
    url.searchParams.delete('q');
    location.href = url.toString();
  });
  sort?.addEventListener('change', () => window.Spaza?.renderShop());
  const clear = document.getElementById('clearFilters');
  clear?.addEventListener('click', () => { location.href = 'shop.html'; });
  const show = document.getElementById('showFilters');
  const panel = document.getElementById('filtersPanel');
  show?.addEventListener('click', () => panel?.classList.toggle('open'));
});