# Spaza Marketplace

Spaza is a modern multi-seller marketplace. Sellers create and manage their own products; there is no preloaded vendor catalogue.

## Application areas
- Public marketplace: home, shop, product, checkout, help, partner application
- Customer area: account, orders, addresses, wishlist, reviews
- Seller Centre: dashboard, products, inventory, orders, delivery, finance, advertising, returns, disputes, settings
- Admin Centre: marketplace, sellers, customers, orders, finance, advertising, delivery, reports, accounting, security/audit, settings, support

## Core marketplace rule
A seller creates a product through Seller Centre. The product is linked to `created_by`, the seller offer is linked to the seller, and inventory is linked to the offer. Public pages read approved/active listings from Supabase.

## Security
- Supabase Auth for identity
- Database roles and `profile_roles` for authorization
- Row Level Security is the security boundary
- Never expose a service-role key in browser code
- Posted financial records are corrected by reversal, not deletion
- Important actions use traceable references and audit logs

## Development workflow
1. Build and test UI locally in VS Code.
2. Connect each module to Supabase only after its UI flow is stable.
3. Test with an empty marketplace first.
4. Test seller isolation and role restrictions before production data.
5. Merge into `main` only after review.
