document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('categoriesGrid');
  if (!grid || !window.SpazaDB) return;
  const { data, error } = await SpazaDB.from('categories').select('id,name,description').order('name');
  if (error) { console.error(error); grid.innerHTML='<div class="empty"><h3>Categories unavailable</h3><p>Please try again later.</p></div>'; return; }
  const categories = data || [];
  grid.innerHTML = categories.length ? categories.map(c => `<a class="category-card" href="shop.html?category=${encodeURIComponent(c.name)}"><span class="category-icon">⌂</span><strong>${esc(c.name)}</strong><small>${esc(c.description || 'Browse products in this category')}</small></a>`).join('') : '<div class="empty"><h3>No categories yet</h3><p>Categories will appear when they are created in the Admin Centre.</p></div>';
  function esc(v){return String(v ?? '').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));}
});