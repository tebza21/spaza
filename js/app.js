const Spaza = {
  getCart(){ return JSON.parse(localStorage.getItem('spazaCart') || '[]'); },
  saveCart(cart){ localStorage.setItem('spazaCart', JSON.stringify(cart)); this.updateCartCount(); },
  updateCartCount(){ const el=document.getElementById('cartCount'); if(el) el.textContent=this.getCart().reduce((n,item)=>n+Number(item.qty||0),0); },
  async getFeaturedProducts(){
    if(!window.SpazaDB) return [];
    const {data,error}=await SpazaDB.from('products').select('id,name,description,category_id,brand_id,status,created_at').eq('status','ACTIVE').order('created_at',{ascending:false}).limit(12);
    if(error){ console.error('Spaza product read failed:',error); return []; }
    return data || [];
  },
  renderProducts(products){
    const el=document.getElementById('featuredProducts'); if(!el)return;
    if(!products.length){ el.innerHTML='<div class="empty"><h3>No products yet</h3><p>Approved sellers will add products through Seller Centre. The marketplace is ready for its first listings.</p></div>'; return; }
    el.innerHTML=products.map(p=>`<article class="product-card"><a class="product-image" href="product.html?id=${encodeURIComponent(p.id)}">🛍️</a><div class="product-info"><small>Seller product</small><a class="product-name" href="product.html?id=${encodeURIComponent(p.id)}">${this.escape(p.name)}</a><p>${this.escape(p.description||'View product details and available seller offers.')}</p><a class="button primary" href="product.html?id=${encodeURIComponent(p.id)}">View offers</a></div></article>`).join('');
  },
  escape(value){ return String(value??'').replace(/[&<>\'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); },
  setupMenu(){
    const b=document.getElementById('menuButton'),d=document.getElementById('drawer'),o=document.getElementById('overlay'),c=document.getElementById('closeDrawer'); if(!b||!d)return;
    const close=()=>{d.classList.remove('open');o?.classList.remove('show');d.setAttribute('aria-hidden','true');};
    b.onclick=()=>{d.classList.add('open');o?.classList.add('show');d.setAttribute('aria-hidden','false');}; c?.addEventListener('click',close); o?.addEventListener('click',close);
  }
};
window.SpazaApp=Spaza;
document.addEventListener('DOMContentLoaded',async()=>{Spaza.updateCartCount();Spaza.setupMenu();const products=await Spaza.getFeaturedProducts();Spaza.renderProducts(products);});
