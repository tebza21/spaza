# Spaza Architecture

Spaza is a multi-seller marketplace. Sellers create and manage their own products; there is no preloaded vendor catalogue.

## Application areas
- Public marketplace: home, shop, product, checkout, help, partner application
- Customer area: account, orders, addresses, wishlist, reviews
- Seller Centre: dashboard, products, inventory, orders, delivery, finance, advertising, returns, disputes, settings
- Admin Centre: marketplace, sellers, customers, orders, finance, advertising, delivery, reports, accounting, security/audit, settings, support

## Core data relationship
Seller -> Product -> Seller Offer -> Inventory.

Each product records its creator. A seller offer belongs to a seller and product. Inventory belongs to the offer. The public marketplace shows active/approved listings and their seller offers.

## Security
- Supabase Auth for identity
- Database roles and `profile_roles` for authorization
- Row Level Security is the security boundary
- Never expose a service-role key in browser code
- Posted financial records are immutable; corrections use reversals
- Important transactions and administrative actions receive traceable references and audit records

## Development workflow
1. Build/test UI locally in VS Code.
2. Connect modules to Supabase incrementally.
3. Test with an empty marketplace first.
4. Test seller isolation and role restrictions.
5. Test financial traceability and audit behaviour.
6. Merge to `main` only after review.
