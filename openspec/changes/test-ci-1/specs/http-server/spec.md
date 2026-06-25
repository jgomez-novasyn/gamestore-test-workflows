## ADDED Requirements

### Requirement: Validar CI con JSON
El sistema SHALL provide a functional OpenSpec validation with JSON for CI/CD testing.

#### Scenario: Script de validación
- **WHEN** un usuario ejecuta `./scripts/validate-openspec.sh`
- **THEN** el script DEBERÁ ejecutar `openspec validate --all --json` y reportar resultados exitosos o fallidos

#### Scenario: Resultados de validación
- **WHEN** el script ejecuta la validación
- **THEN** el script DEBERÁ reportar resultados éxito o fallo
