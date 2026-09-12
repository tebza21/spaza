document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('categoriesGrid');
  if (!grid || !window.SpazaDB) return;
  const { data, error } = await SpazaDB.from('categories').select('id,name,description,image_url,sort_order').eq('is_active',true).order('sort_order',{ascending:true}).order('name',{ascending:true});
  if (error) { console.error(error); grid.innerHTML='<div class="empty"><h3>Categories unavailable</h3><p>Please try again later.</p></div>'; return; }
  const categories = data || [];
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  grid.innerHTML = categories.length ? categories.map(c => `<a class="category-card" href="shop.html?category=${encodeURIComponent(c.name)}">${c.image_url?`<img src="${esc(c.image_url)}" alt="${esc(c.name)}" style="width:64px;height:64px;object-fit:cover;border-radius:12px">`:'<span class="category-icon">⌂</span>'}<strong>${esc(c.name)}</strong><small>${esc(c.description || 'Browse products in this category')}</small></a>`).join('') : '<div class="empty"><h3>No categories yet</h3><p>Active categories will appear here when they are created in the Admin Centre.</p></div>';
});