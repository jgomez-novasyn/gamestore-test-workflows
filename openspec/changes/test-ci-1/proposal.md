---
name: test-ci-1
status: draft

## Propuesta: Pruebas CI/CD para Sessão 14

Para validar el flujo completo de CI/CD con OpenSpec usando --json, necesitamos cambios de prueba que demuestren:

- `openspec list --json` - Listar cambios activos
- `openspec validate --all --json` - Validación basada en JSON
- `./scripts/validate-openspec.sh` - Script de validación local
- `./scripts/archive-completed.sh` - Script de archivo automático
- Flujos de trabajo de GitHub Actions - `.github/workflows/openspec-validate.yml`
- Pre-commit hooks - `.husky/pre-commit`

Estos cambios validarán que la infraestructura de CI/CD funciona correctamente.
