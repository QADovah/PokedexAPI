# Pokedex Pro 🚀

Aplicación Full Stack para gestionar una Pokedex personalizada. Construida con tecnologías modernas y enfocada en performance y diseño.

![Pokedex Banner](https://via.placeholder.com/1000x300?text=Pokedex+Pro) (Placeholder para captura de pantalla)

## 🛠️ Stack Tecnológico

### Frontend
*   **Framework**: React 18 + TypeScript
*   **Build Tool**: Vite
*   **Estilos**: Vanilla CSS con variables CSS (Diseño Responsivo & Dark Mode support)
*   **Routing**: React Router DOM
*   **HTTP**: Axios
*   **Iconos**: Lucide React

### Backend
*   **Framework**: FastAPI (Python)
*   **ORM**: SQLAlchemy
*   **Validación**: Pydantic
*   **Servidor**: Uvicorn

### Base de Datos
*   **Motor**: Microsoft SQL Server (2019/2022)
*   **Driver**: ODBC Driver 18 for SQL Server

## ✨ Características

*   **Listado de Pokémon**: Grid visual con tarjetas, imágenes y tipos.
*   **Búsqueda en Tiempo Real**: Filtrado por nombre instantáneo.
*   **Gestión Completa (CRUD)**:
    *   **Crear**: Registrar nuevos Pokémon con stats personalizadas.
    *   **Leer**: Vista detallada con tarjeta de perfil, habilidades y stats.
    *   **Actualizar**: Edición completa de datos existentes.
    *   **Eliminar**: Liberar Pokémon de la base de datos.
*   **Generador de XP**: Herramienta de dado 🎲 para generar experiencia base aleatoria.
*   **Interfaz en Español**: UI completamente localizada.
*   **Manejo de Errores Robustos**: Feedback visual para cargas, errores 404/500 y validaciones.

## 🚀 Configuración e Instalación

### Prerrequisitos
*   Node.js (v18+)
*   Python (3.10+)
*   SQL Server (Instancia local o remota)
*   ODBC Driver 18 for SQL Server

### 1. Configuración del Backend

```bash
cd server
# Crear entorno virtual
python -m venv venv
# Activar entorno (Windows)
.\venv\Scripts\activate
# Instalar dependencias
pip install -r requirements.txt

# Configuración de Base de Datos
# Editar server/data/database.py con tu connection string si es diferente a H3LL\SQLSERVER22
```

Para poblar la base de datos inicialmente:
```bash
sqlcmd -S "TU_SERVIDOR" -E -i "server/data/create_db.sql"
```

Ejecutar el servidor:
```bash
uvicorn server.main:app --reload
# El servidor correrá en http://localhost:8000
```

### 2. Configuración del Frontend

```bash
cd client
# Instalar dependencias
npm install
# Ejecutar entorno de desarrollo
npm run dev
# La app correrá en http://localhost:5173
```

## 📂 Estructura del Proyecto

```
Pokedex/
├── agents/             # Documentación de Agentes de IA
├── client/             # Proyecto React (Frontend)
│   ├── src/
│   │   ├── components/ # Componentes reutilizables (Card, etc)
│   │   ├── pages/      # Vistas principales (Home, Detail, Create)
│   │   ├── services/   # Lógica de llamadas a API
│   │   └── types/      # Definiciones TypeScript
└── server/             # Proyecto FastAPI (Backend)
    ├── api/            # Endpoints
    ├── data/           # Configuración DB y Scripts SQL
    ├── models/         # Modelos SQLAlchemy
    ├── schemas/        # Esquemas Pydantic
    └── services/       # Lógica de Negocio
```

## 🤝 Contribución

1.  Fork del repositorio.
2.  Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`).
3.  Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
