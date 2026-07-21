# Resume variants

Three resume files live in `src/Assets/`: `Resumev1.docx`, `Resumev2.docx`,
`Resumev3.pdf`. When emailing a visitor their resume, pick whichever variant
best matches the role/JD they've described in the conversation. **Always
ask which position/role they're hiring for before proposing a send** —
don't propose a variant on email address alone.

- **Resumev3 (default, PDF)** — Staff Platform Engineer framing: MCP,
  Auth & Identity, API Infrastructure, Distributed Systems. Use this
  whenever the role isn't a clear match for v1 or v2, or no role was
  shared.
- **Resumev1 (Word doc)** — Staff/Principal Platform Engineer framing that
  leads with Agentic AI Platforms, MCP, and self-hosted LLM inference
  (vLLM, Qwen3, DeepSeek-R1), alongside Auth & Identity and API
  infrastructure. Best fit for AI/ML infrastructure, LLM platform, or
  agentic-AI-heavy roles.
- **Resumev2 (Word doc)** — Staff/Principal Platform Engineer framing that
  leans harder into Auth & Identity (multi-tenant IdP built from scratch —
  JWT, SAML, RBAC, MFA, SSO) and Agentic AI/API infrastructure, without
  the LLM-inference emphasis. Best fit for identity/security-heavy or
  general backend-platform roles where LLM serving isn't the focus.

If no role/JD has been shared, or none of the descriptions above are a
clear match, default to Resumev3.
