## Context

El endpoint para enviar el mensaje "Prueba Husky" no está implementado actualmente. El sistema necesita un endpoint de prueba simple para:
- Verificación de salud del servicio/estado del API
- Validación de pipeline CI/CD
- Pruebas de integración rápidas

Actualmente los usuarios deben verificar manualmente el estado del API o implementar métodos de prueba alternativos.

## Goals / Non-Goals

**Goals:**
- Implementar endpoint `/api/test-husky` que reciba POST con mensaje opcional
- Endpoint responde con confirmación exitosa
- Integrar endpoint con frontend para demostración de prueba
- Documentar endpoint en esquemas API
- Mantener endpoint simple y seguro (sin autenticación requerida)

**Non-Goals:**
- No implementar lógica de autenticación/verificación compleja
- No crear endpoint completo de monitoreo de salud del sistema
- No incluir rate limiting o seguridad avanzada
- No persistir datos del mensaje

## Decisions

| Decisión | Alternativas | Por qué |
|----------|-------------|-----|
| `POST /api/test-husky` con cuerpo JSON opcional | GET con query param, WebSocket | POST es más estándar para endpoints de acción/consumo |
| Respuesta simple `{success: true, timestamp, message}` | Respuesta minimalista | Mensaje útil para logs y verificación |
| Sin autenticación requerida | API key, JWT token | Endpoint de prueba debe ser público para CI/CD |
| Mensaje opcional en body | Fijo "test-husky" | Flexibilidad para diferentes escenarios de prueba |

## Riesgos / Trade-offs

[Riesgo] Alta exposición a spam/bruteforce → Mitigación: Endpoint simple sin estado, monitoreo para uso anormal
[Riesgo] Posible confusión con endpoints de salud reales → Mitigación: Documentar claramente propósito de prueba CI/CD

## Migration Plan

1. Implementar endpoint en backend Express
2. Agregar route a frontend React
3. Testear manualmente ambos extremos
4. Documentar en README y esquemas API
5. Add to CI/CD pipeline (ejemplo)

## Open Questions

- ¿Necesitamos loggear cada request del endpoint?
- ¿Deberíamos limitar rate por IP?
- ¿Se necesita endpoint GET adicional para verificación de estado?
- ¿El endpoint necesita ser incluido en esquemas de API generados?