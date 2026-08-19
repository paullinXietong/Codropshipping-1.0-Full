## 1. Customer support
- [x] 1.1 Add reliable connection, send, failure and retry states to the shared live chat.
- [x] 1.2 Open the shared live conversation in place from the customer workspace.

## 2. Orders and fulfillment
- [x] 2.1 Connect address, remark, shipping, fulfillment and cancellation actions to existing APIs.
- [x] 2.2 Add delivery-order review, payment and tracking actions to the new fulfillment UI.

## 3. Sourcing checkout and inventory
- [x] 3.1 Add a new workspace checkout using real preview, address, shipping and order creation APIs.
- [x] 3.2 Replace the low-stock dead button with a structured replenishment request.

## 4. Finance and insights
- [x] 4.1 Add exact data-scope disclosure; detailed wallet date filtering remains available on the linked wallet page.
- [x] 4.2 Remove misleading incomplete aggregate claims.

## 5. Verification
- [x] 5.1 Run the existing release lint as the repository's automated UI check.
- [x] 5.2 Run release lint and both production builds.
- [ ] 5.3 Verify authenticated mutations in the local unified application.
  - Blocked from automated completion in this pass: Chrome's signed-in control extension was unavailable, and creating, paying or cancelling real orders was intentionally not performed without an isolated test record.
