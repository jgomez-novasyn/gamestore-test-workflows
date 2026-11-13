## Contexto

Se necesita un endpoint de prueba simple en el backend para verificar las funcionalidades básicas de API en el proyecto GameStore E-commerce de videojuegos. El backend actual implementa un servidor Express con TypeScript, manejando múltiples endpoints para productos, carrito de compras, autenticación, y datos de carrito en SQLite. Este endpoint de Hola Mundo servirá como un endpoint de prueba funcional para CI/CD y pruebas básicas de API.

## Goals / Non-Goals

**Goals:**
- Agregar un endpoint GET `/api/hello-world` que devuelva un mensaje amigable de "hola mundo°
- Seguir las convenciones de API del backend (respuestas JSON con estructura { success: boolean, data?: any, error?: string })
- Ser un endpoint de prueba mínimo que demuestre la operación exitosa de API

**Non-Goals:**
- No gestionar estado, autenticación, o autorización
- No registrar interacciones para auditoria o monitoreo
- No realizar validaciones de compenetencia u operaciones de base de datos
- No incluir validación sofisticada o middleware más allá de lo necesario para una respuesta básica

## Decisions

**Decisiones de Arquitectura**

| Decisión | Alternativas | Por qué |
|----------|-------------|------|
| Implementar un endpoint GET minimal | Usar un controlador más elaborado | Simplicidad, prueba clara de API básica. Este endpoint demuestra el funcionamiento de la API sin introducir complejidad innecesaria. |
| Ruta /api/hello-world | Ruta /api/health | `hello-world` es más descriptivo para un endpoint de prueba. `health` implica verificación de estado, lo que podría inducir expectativas erróneas. |
| Envolver respuesta en { success: true, data: "Hello World!" } | Devolver solo el string | Consistencia con todas las otras API del backend, siguiendo el patrón establecido. Las convenciones del proyecto exigen respuestas JSON uniformes. |

## Riesgos / Trade-offs

**Riesgo: Endpoint mínimo vs. Características de productos**
→ Mitigación: Este endpoint está destinado estrictamente a pruebas, no a producción. Sin esta prueba básica, cualquier servicio de API podría no funcionar correctamente sin señales inmediatas del retroalimentador. |

**Riesgo: Controlador duplicado**
→ Mitigación: Usar módulo existente si hay un controlador de prueba. Si no hay uno, crear uno de cero para centrarlo, unificando aún así. Este endpoint demostrará las operaciones de router, registro y middleware, potencialmente detectando inconsistencias en el patrón. |

## Plan de Migración

1. Agregar el nuevo endpoint a `src/controllers` (nombre de archivo: `hello-world-controller.ts`)
2. Implementar la lógica del controlador (cumplir con el esquema `HelloWorldResponse`)
3. Configurar la ruta en `src/router.ts` (ajustar pruebas si las hay)
4. Agregar pruebas unitarias (si hay infraestructura de pruebas)
5. Ejecutar pruebas del backend para verificar la subida e integración

## Preguntas Abiertas

- ¿Hay un controlador existente `health` que puedo duplicar/refactorizar?
- ¿El endpoint debe incluir información del sistema (memoria, cpus) como métricas? |

