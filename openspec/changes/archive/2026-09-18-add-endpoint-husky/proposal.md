## Why

El endpoint para enviar el mensaje "Prueba Husky" está ausente. Esta funcionalidad es necesaria para proporcionar un endpoint de prueba simple para verificación de salud del servicio o para validación de pipeline CI/CD.

## What Changes

- Agregar nuevo endpoint `/api/test-husky` en backend
- Implementar componente frontend para llamar al endpoint
- Documentar el endpoint en documentación API

## Capabilities

### New Capabilities
- test-husky: Endpoint para enviar mensaje de prueba Husky

### Modified Capabilities

## Impact

- Backend: Nuevo route de API para endpoint test-husky
- Frontend: Nuevo componente para probar el endpoint
- Database: No hay cambios
- Testing: Nuevo test case para el endpoint

## Riesgos

- Nombre de endpoint inconsistente con convenciones existentes - mitigado siguiendo convenciones de kebab-case existentes

## Complejidad
Media