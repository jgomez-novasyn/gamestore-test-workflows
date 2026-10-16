## Why

Agregar un endpoint simple de ¿Hola Mundo para probar la funcionalidad de creación y despliegue de endpoints en el backend. Este endpoint puede servir como prueba básica de contrición y CI.

## What Changes

- Nuevo endpoint GET `/api/hello-world` que devuelve un mensaje de ¿olo mundo°
- El endpoint incluirá una respuesta exitosa con un mensaje amigable
- No hay cambios en las tasas ni comportamientos existentes

## Capabilities

### New Capabilities
- <nombre-c capability>none: No se crean nuevas capacidades de especificación ya que este es solo un endpoint de prueba

### Modified Capabilities

## Impact

- Backend/API: Nuevo endpoint GET en el servidor Express
- Frontend/OUsuarios: La implementación es solo backend, no hay servicios frontend
- Base de datos: No hay impacto, es solo lectura
- Test: Nuevo endpoint para pruebas básicas de API