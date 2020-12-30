const testJson = {
  swagger: "2.0",
  info: { version: "project.info.version", title: "Process mining REST API" },
  host: "localhost:8080",
  basePath: "/",
  tags: [
    {
      name: "analysis-controller",
      description: "Сервис для работы с факторным анализом"
    },
    {
      name: "dashboard-controller",
      description: "Сервис для работы с диаграммами"
    },
    { name: "export-controller", description: "Сервис для выгрузки отчетов" },
    {
      name: "ml-text-controller",
      description: "Сервис для работы с текстовым анализом"
    },
    {
      name: "notation-controller",
      description: "Сервис для работы с нотациями"
    },
    {
      name: "research-controller",
      description: "Сервис для работы с исследованиями"
    },
    {
      name: "sigma-admin-registration-controller",
      description: "Контроллер для регистрации администратора в домене сигма"
    },
    {
      name: "user-account-controller",
      description: "Сервис регистрации и авторизации"
    }
  ],
  schemes: ["http"],
  produces: ["application/json"],
  paths: {
    "/api/v1/accounts/login": {
      post: {
        tags: ["user-account-controller"],
        summary: "Авторизовать пользователя",
        operationId: "loginUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "requestDTO",
            description: "requestDTO",
            required: true,
            schema: { $ref: "#/definitions/AuthRequest" }
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/AuthResponse" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "403": {
            description: "Ошибка авторизации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        deprecated: false
      }
    },
    "/api/v1/accounts/logout": {
      get: {
        tags: ["user-account-controller"],
        summary: "Выйти из системы",
        operationId: "logoutUsingGET",
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/SuccessMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/accounts/register": {
      post: {
        tags: ["user-account-controller"],
        summary: "Зарегистрировать пользователя",
        operationId: "registerUserUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "requestDTO",
            description: "requestDTO",
            required: true,
            schema: { $ref: "#/definitions/RegistrationRequest" }
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/RegistrationResponse" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        deprecated: false
      }
    },
    "/api/v1/accounts/restore": {
      post: {
        tags: ["user-account-controller"],
        summary: "Восстановить учетную запись",
        operationId: "restoreUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "email",
            description: "email",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: { "200": { description: "OK", schema: { type: "object" } } },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/admin/register": {
      post: {
        tags: ["sigma-admin-registration-controller"],
        summary: "Зарегистрировать нового администратора",
        operationId: "registerAdminUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "registrationRequest",
            description: "registrationRequest",
            required: true,
            schema: { $ref: "#/definitions/RegistrationRequest" }
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/SuccessMessage" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/export/audit.xlsx": {
      get: {
        tags: ["export-controller"],
        summary: "Получить журнал аудита в формате xlsx",
        operationId: "getAuditUsingGET",
        produces: ["application/vnd.ms-excel"],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { type: "string", format: "byte" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "403": {
            description: "Нет прав",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/export/track-event": {
      post: {
        tags: ["export-controller"],
        summary: "Залогировть действие на фронте",
        operationId: "trackEventUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "export",
            description: "export",
            required: true,
            schema: { $ref: "#/definitions/Export" }
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/SuccessMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "403": {
            description: "Нет прав",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/notations/element/types": {
      get: {
        tags: ["notation-controller"],
        summary: "Получить список нотаций пользователя",
        operationId: "getNotationElementTypesUsingGET",
        responses: {
          "200": {
            description: "OK",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/NotationElementType" }
            }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/notations/element/{id}/unique-values": {
      get: {
        tags: ["notation-controller"],
        summary: "Получить список уникальных значений элемента нотации",
        operationId: "getElementUniqueValuesUsingGET",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/NotationElementUniqueValue" }
            }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/notations/list": {
      get: {
        tags: ["notation-controller"],
        summary: "Получить список нотаций пользователя",
        operationId: "getNotationsUsingGET",
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { type: "array", items: { $ref: "#/definitions/Notation" } }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/notations/{id}": {
      get: {
        tags: ["notation-controller"],
        summary: "Получить информацию о нотации",
        operationId: "getNotationUsingGET",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/NotationDetail" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/notations/{id}/elements": {
      get: {
        tags: ["notation-controller"],
        summary: "getNotationElements",
        operationId: "getNotationElementsUsingGET",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "OK",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/NotationElement" }
            }
          }
        },
        deprecated: false
      }
    },
    "/api/v1/notations/{id}/remove": {
      delete: {
        tags: ["notation-controller"],
        summary: "Удалить нотацию пользователя",
        operationId: "removeNotationUsingDELETE",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/SuccessMessage" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/notations/{id}/update": {
      post: {
        tags: ["notation-controller"],
        summary: "Обновить информацию о нотации пользователя",
        operationId: "updateNotationUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          },
          {
            in: "body",
            name: "requestDTO",
            description: "requestDTO",
            required: true,
            schema: { $ref: "#/definitions/NotationUpdateRequest" }
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/NotationDetail" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/create": {
      post: {
        tags: ["research-controller"],
        summary: "Создать исследование",
        operationId: "createResearchUsingPOST",
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "department",
            in: "formData",
            description: "Подразделение",
            required: true,
            type: "string",
            "x-example": "ДБО"
          },
          {
            name: "encode",
            in: "formData",
            description: "Кодировка",
            required: true,
            type: "string",
            "x-example": "UTF_8"
          },
          {
            name: "file",
            in: "formData",
            description: "Файл для исследования",
            required: true,
            type: "file"
          },
          {
            name: "name",
            in: "formData",
            description: "Наименование исследования",
            required: true,
            type: "string",
            "x-example": "Исследование 1"
          },
          {
            name: "notationId",
            in: "formData",
            description: "Идентификатор нотации",
            required: false,
            type: "string"
          },
          {
            name: "separator",
            in: "formData",
            description: "Разделитель в файле",
            required: true,
            type: "string",
            "x-example": "|"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/ResearchCreateResponse" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/list": {
      get: {
        tags: ["research-controller"],
        summary: "Получить список исследований пользователя",
        operationId: "getResearchesUsingGET",
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/ResearchResponse" }
            }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{id}": {
      get: {
        tags: ["research-controller"],
        summary: "Получить информацию о графе",
        operationId: "getResearchUsingGET",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "OK",
            schema: { $ref: "#/definitions/ResearchResponse" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{id}/ml/analysis": {
      get: {
        tags: ["analysis-controller"],
        summary: "Получить факторный анализ",
        operationId: "getAnalysisUsingGET",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "OK",
            schema: { $ref: "#/definitions/AnalysisResponse" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      },
      post: {
        tags: ["analysis-controller"],
        summary: "Создать новый факторный анализ",
        operationId: "analysisCreateUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "analysisRequest",
            description: "analysisRequest",
            required: true,
            schema: { $ref: "#/definitions/AnalysisRequest" }
          },
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "OK",
            schema: { type: "integer", format: "int64" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{id}/ml/analysis/check": {
      get: {
        tags: ["analysis-controller"],
        summary: "Проверка готовности вычислений на ML сервере",
        operationId: "analysisCheckUsingGET",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "OK",
            schema: { type: "string", enum: ["NEW", "DONE", "ERROR"] }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{id}/ml/text": {
      get: {
        tags: ["ml-text-controller"],
        summary: "Получить текстовый анализ",
        operationId: "getMlTextUsingGET",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/MlText" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      },
      post: {
        tags: ["ml-text-controller"],
        summary: "Создать новый текстовый анализ",
        operationId: "mlTextCreateUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          },
          {
            in: "body",
            name: "mlText",
            description: "mlText",
            required: true,
            schema: { $ref: "#/definitions/MlText" }
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/MlText" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{id}/ml/text/check": {
      get: {
        tags: ["ml-text-controller"],
        summary: "Проверка готовы ли вычисления на ML сервере",
        operationId: "mlTextCheckUsingGET",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { type: "string", enum: ["NEW", "DONE", "ERROR"] }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{id}/remove": {
      delete: {
        tags: ["research-controller"],
        summary: "Удалить исследование пользователя",
        operationId: "removeResearchUsingDELETE",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/SuccessMessage" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{id}/update": {
      post: {
        tags: ["research-controller"],
        summary: "Обновить информацию о исследовании пользователя",
        operationId: "updateResearchUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64"
          },
          {
            in: "body",
            name: "requestDTO",
            description: "requestDTO",
            required: true,
            schema: { $ref: "#/definitions/ResearchUpdateRequest" }
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/SuccessMessage" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{researchId}/dashboards": {
      get: {
        tags: ["dashboard-controller"],
        summary: "Получить диаграммы по исследованию",
        operationId: "getDashboardsUsingGET",
        parameters: [
          {
            name: "researchId",
            in: "path",
            description: "researchId",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/Dashboard" }
            }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      },
      post: {
        tags: ["dashboard-controller"],
        summary: "Построить диаграмму по исследованию",
        operationId: "createDashboardUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "dashboard",
            description: "dashboard",
            required: true,
            schema: { $ref: "#/definitions/FrontDashboard" }
          },
          {
            name: "researchId",
            in: "path",
            description: "researchId",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/Dashboard" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "500": {
            description: "Внутренняя ошибка сервера",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{researchId}/dashboards/panel": {
      get: {
        tags: ["dashboard-controller"],
        summary: "Получить агрегирующие методы для диаграммы",
        operationId: "getAggregateMethodsUsingGET",
        parameters: [
          {
            name: "researchId",
            in: "path",
            description: "researchId",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/DashboardPanel" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{researchId}/dashboards/{dashboardId}": {
      delete: {
        tags: ["dashboard-controller"],
        summary: "Удалить диаграмму в исследовании",
        operationId: "deleteDashboardUsingDELETE",
        parameters: [
          {
            name: "dashboardId",
            in: "path",
            description: "dashboardId",
            required: true,
            type: "integer",
            format: "int64"
          },
          {
            name: "researchId",
            in: "path",
            description: "researchId",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/SuccessMessage" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    },
    "/api/v1/researches/{researchId}/dashboards/{dashboardId}/rename": {
      post: {
        tags: ["dashboard-controller"],
        summary: "Изменение полей alias'ов в диаграмме",
        operationId: "renameDashboardUsingPOST",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "chartRename",
            description: "chartRename",
            required: true,
            schema: {
              type: "array",
              items: { $ref: "#/definitions/ChartRename" }
            }
          },
          {
            name: "dashboardId",
            in: "path",
            description: "dashboardId",
            required: true,
            type: "integer",
            format: "int64"
          },
          {
            name: "researchId",
            in: "path",
            description: "researchId",
            required: true,
            type: "integer",
            format: "int64"
          }
        ],
        responses: {
          "200": {
            description: "Успешное выполнение",
            schema: { $ref: "#/definitions/Dashboard" }
          },
          "400": {
            description: "Ошибка бизнес логики",
            schema: { $ref: "#/definitions/ErrorMessage" }
          },
          "401": {
            description: "Ошибка аутентификации",
            schema: { $ref: "#/definitions/ErrorMessage" }
          }
        },
        security: [{ "Token Access": [] }],
        deprecated: false
      }
    }
  },
  securityDefinitions: {
    "Token Access": { type: "apiKey", name: "token", in: "header" }
  },
  definitions: {
    AggregateMethod: {
      type: "object",
      required: ["alias", "id", "name"],
      properties: {
        alias: {
          type: "string",
          example: "Количество",
          description: "Alias для отображения нормального названия на фронте"
        },
        id: {
          type: "integer",
          format: "int64",
          example: 1,
          description: "Идентификатор метода агрегации"
        },
        name: {
          type: "string",
          example: "COUNT",
          description: "Значение метода агрегации",
          enum: [
            "COUNT",
            "MEAN",
            "VARIANCE",
            "VARIANCE_UNBIASED",
            "STANDARD_DEVIATION",
            "STANDARD_DEVIATION_UNBIASED",
            "MIN",
            "MAX",
            "SUM"
          ]
        }
      },
      title: "AggregateMethod"
    },
    AnalysisRequest: {
      type: "object",
      required: ["interpretation", "mlAlgorithm", "mlKeysRequest"],
      properties: {
        expertMode: {
          description: "Информация об экспертном режиме",
          $ref: "#/definitions/ExpertMode"
        },
        filterSelectedValues: {
          type: "array",
          description: "Фильтр",
          items: { type: "integer", format: "int64" }
        },
        interpretation: {
          type: "string",
          description: "Информация о выбранном методе интерпретации",
          enum: ["FEATURE_IMPORTANCE", "PERMUTATION_IMPORTANCE"]
        },
        maxWaitTime: {
          type: "integer",
          format: "int32",
          example: 2,
          description: "Максимально допустимое время ожидания в минутах"
        },
        mlAlgorithm: {
          type: "string",
          description: "Информация о выбранном алгоритме",
          enum: ["XGBOOST", "RANDOM_FOREST"]
        },
        mlKeysRequest: {
          description: "Информация о ML ключах факторного анализа",
          $ref: "#/definitions/MlKeysRequest"
        }
      },
      title: "AnalysisRequest",
      description: "Информация о факторном анализе при обращении к серверу"
    },
    AnalysisResponse: {
      type: "object",
      required: ["interpretation", "mlAlgorithm"],
      properties: {
        data: {
          description: "Расчеты с ML сервера",
          $ref: "#/definitions/MlAnalysis"
        },
        errorMessage: { type: "string", description: "Сообщение об ошибке" },
        expertMode: {
          description: "Информация об экспертном режиме",
          $ref: "#/definitions/ExpertMode"
        },
        filterSelectedValues: {
          type: "array",
          description: "Выбранные значения в фильтре",
          items: { type: "integer", format: "int64" }
        },
        id: {
          type: "integer",
          format: "int64",
          example: 7,
          description: "Идентификатор сущности"
        },
        interpretation: {
          type: "array",
          description:
            "Информация о возможных и выбранном методах интерпретации",
          items: { $ref: "#/definitions/Interpretation" }
        },
        maxWaitTime: {
          type: "integer",
          format: "int32",
          example: 2,
          description: "Максимально допустимое время ожидания в минутах"
        },
        mlAlgorithm: {
          type: "array",
          description: "Информация о возможных и выбранном алгоритмах",
          items: { $ref: "#/definitions/MlAlgorithm" }
        },
        mlKeysResponse: {
          description: "Информация о features и target анализа",
          $ref: "#/definitions/MlKeysResponse"
        },
        params: {
          type: "array",
          description:
            "Список уникальных значений элементов нотации и их уникальные значения",
          items: { $ref: "#/definitions/NotationElement" }
        },
        selectedAlgorithm: {
          description: "Информация о выбранном алгоритме",
          $ref: "#/definitions/MlAlgorithm"
        },
        selectedInterpretation: {
          description: "Информация о выбранном методе интерпретации",
          $ref: "#/definitions/Interpretation"
        },
        status: {
          type: "string",
          description: "Состояние факторного анализа",
          enum: ["NEW", "DONE", "ERROR"]
        }
      },
      title: "AnalysisResponse",
      description: "Факторный анализ(ответ сервера)"
    },
    AuthRequest: {
      type: "object",
      required: ["login", "password"],
      properties: {
        login: {
          type: "string",
          example: "tsarkov",
          description: "Логин пользователя"
        },
        password: {
          type: "string",
          example: 12345678,
          description: "Пароль пользователя"
        }
      },
      title: "AuthRequest",
      description: "Входные параметры для авторизации"
    },
    AuthResponse: {
      type: "object",
      required: ["message", "role", "token"],
      properties: {
        login: {
          type: "string",
          example: "user@sberbank.ru",
          description: "Логин пользователя"
        },
        message: {
          type: "string",
          example: "Успешно",
          description: "Сообщение об успешной авторизации"
        },
        role: {
          type: "string",
          example: "SPM_USER",
          description: "Роль авторизованного пользователя",
          enum: ["SPM_ADMIN", "SPM_USER"]
        },
        token: {
          type: "string",
          example: "ergergerg67834tkj",
          description: "Токен авторизации"
        }
      },
      title: "AuthResponse",
      description: "Ответ об успешной авторизации"
    },
    Chart: {
      type: "object",
      required: ["id", "type", "x", "y"],
      properties: {
        data: {
          description: "Значения для постройки графика диаграммы",
          $ref: "#/definitions/ExternalData"
        },
        id: {
          type: "integer",
          format: "int64",
          description: "Идентификатор chart'а"
        },
        type: { type: "string", description: "Тип выбранной диаграммы" },
        x: {
          type: "array",
          example: ["ТБ", "Status_Name"],
          description: "Лист агрегации по х",
          items: { type: "string" }
        },
        y: {
          type: "array",
          example: ["Gender"],
          description: "Лист агрегации по у",
          items: { type: "string" }
        }
      },
      title: "Chart"
    },
    ChartRename: {
      type: "object",
      required: ["x", "y"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
          description: "Идентификатор chart'а"
        },
        x: {
          type: "array",
          description: "Псевдоним названий листа агрегации по X",
          items: { type: "string" }
        },
        y: {
          type: "array",
          description: "Псевдоним названий листа агрегации по Y",
          items: { type: "string" }
        }
      },
      title: "ChartRename"
    },
    CommonDto: {
      type: "object",
      properties: { value: { type: "object", description: "Результат" } },
      title: "CommonDto",
      description: "Универсалный DTO"
    },
    CommonDtoOfstring: {
      type: "object",
      properties: {
        value: {
          type: "string",
          description: "Результат",
          enum: ["NEW", "DONE", "ERROR"]
        }
      },
      title: "CommonDtoOfstring",
      description: "Универсалный DTO"
    },
    Dashboard: {
      type: "object",
      required: ["aggregateMethod", "charts", "created", "name"],
      properties: {
        aggregateMethod: {
          type: "string",
          example: "COUNT",
          description: "Метод агрегации полей датасета",
          enum: [
            "COUNT",
            "MEAN",
            "VARIANCE",
            "VARIANCE_UNBIASED",
            "STANDARD_DEVIATION",
            "STANDARD_DEVIATION_UNBIASED",
            "MIN",
            "MAX",
            "SUM"
          ]
        },
        charts: {
          type: "array",
          description:
            "Объект, содержащий в себе информацию о постройке диаграммы",
          items: { $ref: "#/definitions/Chart" }
        },
        created: {
          type: "string",
          example: 1581022800,
          description: "Дата создания"
        },
        id: {
          type: "integer",
          format: "int64",
          example: 7,
          description: "Идентификатор сущности"
        },
        name: {
          type: "string",
          example: "Диаграмма",
          description: "Имя диаграммы"
        }
      },
      title: "Dashboard",
      description: "Базовая сущность, отвечающая за id"
    },
    DashboardPanel: {
      type: "object",
      required: ["aggregateMethods", "notationElements"],
      properties: {
        aggregateMethods: {
          type: "array",
          description: "Лист элементов агрегирующих методов",
          items: { $ref: "#/definitions/AggregateMethod" }
        },
        notationElements: {
          type: "array",
          description: "Лист элементов нотации",
          items: { $ref: "#/definitions/NotationDetails" }
        }
      },
      title: "DashboardPanel"
    },
    ErrorMessage: {
      type: "object",
      required: ["message"],
      properties: {
        message: {
          type: "string",
          example: "Неправильный логин или пароль",
          description: "Сообщение об ошибке"
        }
      },
      title: "ErrorMessage",
      description: "Описание ошибки"
    },
    ExpertMode: {
      type: "object",
      properties: {
        estimators: {
          type: "integer",
          format: "int32",
          example: 4,
          description: "Количество эстиматоров"
        },
        tasks: {
          type: "integer",
          format: "int32",
          example: 4,
          description: "Количество задач"
        }
      },
      title: "ExpertMode",
      description: "Информация о экспертном режиме"
    },
    Export: {
      type: "object",
      required: ["objectId", "param", "success"],
      properties: {
        objectId: {
          type: "integer",
          format: "int64",
          example: 16,
          description: "Идентификатор экспортируемого объекта"
        },
        param: {
          type: "string",
          example: "export.pdf",
          description: "Поле записывается как параметр в журнал аудита"
        },
        success: {
          type: "boolean",
          example: true,
          description: "Успешность выгрузки"
        }
      },
      title: "Export",
      description: "Экспорт данных с фронта"
    },
    ExternalData: {
      type: "object",
      required: ["x1", "x2", "y"],
      properties: {
        x1: {
          type: "array",
          example: ["ТБ", "ГОСБ", "Status_Name", "ОТПРАВЛЕНО В МИДДЛ"],
          description: "Лист агрегации по х1",
          items: { type: "string" }
        },
        x2: {
          type: "array",
          example: ["ТБ", "ГОСБ", "Status_Name", "ОТПРАВЛЕНО В МИДДЛ"],
          description: "Лист агрегации по x2",
          items: { type: "string" }
        },
        y: {
          type: "array",
          example: [0.564, 1.542, 2.646, 8.453],
          description: "Лист агрегации по y",
          items: { type: "number", format: "double" }
        }
      },
      title: "ExternalData"
    },
    FrontChart: {
      type: "object",
      required: ["type", "x", "y"],
      properties: {
        type: { type: "string", description: "Тип выбранной диаграммы" },
        x: {
          type: "array",
          description: "Лист агрегации по х",
          items: { type: "string" }
        },
        y: {
          type: "array",
          description: "Лист агрегации по у",
          items: { type: "string" }
        }
      },
      title: "FrontChart"
    },
    FrontDashboard: {
      type: "object",
      required: ["aggregateMethod", "charts", "name"],
      properties: {
        aggregateMethod: {
          type: "string",
          example: "COUNT",
          description: "Метод агрегации полей датасета",
          enum: [
            "COUNT",
            "MEAN",
            "VARIANCE",
            "VARIANCE_UNBIASED",
            "STANDARD_DEVIATION",
            "STANDARD_DEVIATION_UNBIASED",
            "MIN",
            "MAX",
            "SUM"
          ]
        },
        charts: {
          type: "array",
          description:
            "Объект, содержащий в себе информацию о постройке диаграммы",
          items: { $ref: "#/definitions/FrontChart" }
        },
        name: {
          type: "string",
          example: "Диаграмма",
          description: "Имя диаграммы"
        }
      },
      title: "FrontDashboard"
    },
    Interpretation: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "FEATURE_IMPORTANCE",
          description: "ID метода интерпретации",
          enum: ["FEATURE_IMPORTANCE", "PERMUTATION_IMPORTANCE"]
        },
        interpretationName: {
          type: "string",
          example: "Feature importance",
          description: "Отображаемое значение"
        }
      },
      title: "Interpretation",
      description: "Информация о методах интерпретации"
    },
    MlAlgorithm: {
      type: "object",
      properties: {
        algorithmName: {
          type: "string",
          example: "XGboost",
          description: "Отображаемое значение"
        },
        id: {
          type: "string",
          example: "XGBOOST",
          description: "ID алгоритма",
          enum: ["XGBOOST", "RANDOM_FOREST"]
        }
      },
      title: "MlAlgorithm",
      description: "Информация о алгоритме"
    },
    MlAnalysis: {
      type: "object",
      properties: {
        target: { type: "string" },
        x: { type: "array", items: { type: "string" } },
        y: { type: "array", items: { type: "string" } }
      },
      title: "MlAnalysis",
      description: "Информация о факторном анализе, рассчитанная на ML сервере"
    },
    MlKeysRequest: {
      type: "object",
      required: ["featuresIds", "targetId"],
      properties: {
        featuresIds: {
          type: "array",
          example: [1],
          description:
            "ID(s) NotationElement(s), выбранные в качестве Features",
          items: { type: "integer", format: "int64" }
        },
        targetAttributeId: {
          type: "integer",
          format: "int64",
          example: 1,
          description:
            "ID NotationElementUniqueValue, выбранный в качестве Target"
        },
        targetId: {
          type: "integer",
          format: "int64",
          example: 1,
          description: "ID NotationElement, выбранный в качестве Target"
        }
      },
      title: "MlKeysRequest",
      description: "Информация о ML ключах(при обращении к серверу)"
    },
    MlKeysResponse: {
      type: "object",
      required: ["features", "target"],
      properties: {
        features: {
          type: "array",
          description: "NotationElement(s), выбранные в качестве Features",
          items: { $ref: "#/definitions/NotationElement" }
        },
        target: {
          description: "NotationElement, выбранный в качестве Target",
          $ref: "#/definitions/NotationElement"
        },
        targetAttribute: {
          description: "NotationElementUniqueValue, выбранны в качестве Target",
          $ref: "#/definitions/NotationElementUniqueValue"
        }
      },
      title: "MlKeysResponse",
      description: "Информация о ML ключах(ответ сервера)"
    },
    MlText: {
      type: "object",
      required: ["clustersAmount"],
      properties: {
        clustersAmount: {
          type: "integer",
          format: "int64",
          example: 5,
          description: "Количество кластеров"
        },
        data: { type: "string", description: "Вычисления ML сервера" },
        errorMessage: { type: "string", description: "Сообщение об ошибке" },
        filterSelectedValues: {
          type: "array",
          description: "Фильтр",
          items: { type: "integer", format: "int64" }
        },
        id: {
          type: "integer",
          format: "int64",
          example: 7,
          description: "Идентификатор сущности"
        },
        params: {
          type: "array",
          description: "Список уникальных значений элементов",
          items: { $ref: "#/definitions/NotationElement" }
        },
        status: {
          type: "string",
          description: "Состояние текстового анализа",
          enum: ["NEW", "DONE", "ERROR"]
        },
        textKey: {
          type: "string",
          example: "Текст переписки",
          description: "Текстовый ключ"
        }
      },
      title: "MlText",
      description: "Текстовый анализ"
    },
    Notation: {
      type: "object",
      required: [
        "created",
        "notationId",
        "notationName",
        "researchId",
        "researchName",
        "status",
        "updated"
      ],
      properties: {
        created: {
          type: "string",
          example: 1581022800,
          description: "Дата создания"
        },
        notationId: {
          type: "integer",
          format: "int64",
          example: 16,
          description: "Идентификатор нотации"
        },
        notationName: {
          type: "string",
          example: "Нотация данных получения кредита онлайн",
          description: "Наименование нотации"
        },
        researchId: {
          type: "integer",
          format: "int64",
          example: 16,
          description: "Идентификатор исследования"
        },
        researchName: {
          type: "string",
          example: "Исследование данных получения кредита онлайн",
          description: "Наименование исследования"
        },
        status: {
          type: "string",
          example: "PRIVATE",
          description: "Статус нотации",
          enum: ["PUBLIC", "PRIVATE"]
        },
        updated: {
          type: "string",
          example: 1581023800,
          description: "Дата обновления"
        }
      },
      title: "Notation",
      description: "Нотация"
    },
    NotationDetail: {
      type: "object",
      required: [
        "created",
        "elements",
        "notationId",
        "notationName",
        "researchId",
        "researchName",
        "status",
        "updated"
      ],
      properties: {
        created: {
          type: "string",
          example: 1581022800,
          description: "Дата создания"
        },
        elements: {
          type: "array",
          description: "Элементы нотации",
          items: { $ref: "#/definitions/NotationElement" }
        },
        notationId: {
          type: "integer",
          format: "int64",
          example: 16,
          description: "Идентификатор нотации"
        },
        notationName: {
          type: "string",
          example: "Нотация данных получения кредита онлайн",
          description: "Наименование нотации"
        },
        researchId: {
          type: "integer",
          format: "int64",
          example: 16,
          description: "Идентификатор исследования"
        },
        researchName: {
          type: "string",
          example: "Исследование данных получения кредита онлайн",
          description: "Наименование исследования"
        },
        status: {
          type: "string",
          example: "PRIVATE",
          description: "Статус нотации",
          enum: ["PUBLIC", "PRIVATE"]
        },
        updated: {
          type: "string",
          example: 1581023800,
          description: "Дата обновления"
        }
      },
      title: "NotationDetail",
      description: "Информация о нотации"
    },
    NotationDetails: {
      type: "object",
      required: ["alias", "id", "name"],
      properties: {
        alias: {
          type: "string",
          example: "my_status",
          description: "Пользовательское наименование элемента"
        },
        id: {
          type: "integer",
          format: "int64",
          example: 16,
          description: "Идентификатор элемента"
        },
        name: {
          type: "string",
          example: "status_name",
          description: "Наименование элемента"
        }
      },
      title: "NotationDetails",
      description: "Элементы нотации для диаграмм"
    },
    NotationElement: {
      type: "object",
      required: ["alias", "id", "name"],
      properties: {
        alias: {
          type: "string",
          example: "my_status",
          description: "Пользовательское наименование элемента"
        },
        description: {
          type: "string",
          example: "STATUS_NAME",
          description: "Описание ключа"
        },
        id: {
          type: "integer",
          format: "int64",
          example: 16,
          description: "Идентификатор элемента"
        },
        name: {
          type: "string",
          example: "status_name",
          description: "Наименование элемента"
        },
        typeKey: {
          type: "string",
          example: "STATUS_NAME",
          description: "Тип ключа элемента",
          enum: [
            "ID",
            "STATUS_NAME",
            "DATE",
            "USER_ID",
            "USER_ROLE",
            "MINUTE_COST",
            "SPENT_TIME",
            "OTHER"
          ]
        },
        uniqueValues: {
          type: "array",
          description: "Список уникальных значений элемента",
          items: { $ref: "#/definitions/NotationElementUniqueValue" }
        }
      },
      title: "NotationElement",
      description: "Элемент нотации"
    },
    NotationElementType: {
      type: "object",
      required: ["code", "description", "id"],
      properties: {
        code: {
          type: "string",
          example: "ID",
          description: "Наименование типа элемента",
          enum: [
            "ID",
            "STATUS_NAME",
            "DATE",
            "USER_ID",
            "USER_ROLE",
            "MINUTE_COST",
            "SPENT_TIME",
            "OTHER"
          ]
        },
        description: {
          type: "string",
          example: "Идентификатор события",
          description: "Описание типа элемента"
        },
        id: {
          type: "integer",
          format: "int64",
          example: 1,
          description: "Идентификатор тип элемента"
        }
      },
      title: "NotationElementType",
      description: "Типы элементов нотации"
    },
    NotationElementUniqueValue: {
      type: "object",
      required: ["alias", "id", "isSelected", "name"],
      properties: {
        alias: {
          type: "string",
          example: "Кабинет клиента",
          description: "Пользовательское наименование значения элемента"
        },
        id: {
          type: "integer",
          format: "int64",
          example: 123,
          description: "Идентификатор значения элемента"
        },
        isSelected: {
          type: "boolean",
          example: true,
          description: "Признак выбора данного значения для фильтрации"
        },
        name: {
          type: "string",
          example: "Личный кабинет клиента",
          description: "Наименование значения элемента"
        }
      },
      title: "NotationElementUniqueValue",
      description: "Уникальные значения элемента нотации"
    },
    NotationUpdateRequest: {
      type: "object",
      required: ["elements", "notationName", "status"],
      properties: {
        elements: {
          type: "array",
          description: "Элементы нотации",
          items: { $ref: "#/definitions/NotationElement" }
        },
        notationName: {
          type: "string",
          example: "Нотация данных получения кредита онлайн",
          description: "Наименование нотации"
        },
        status: {
          type: "string",
          example: "PRIVATE",
          description: "Статус нотации",
          enum: ["PUBLIC", "PRIVATE"]
        }
      },
      title: "NotationUpdateRequest",
      description: "Обновление нотации"
    },
    RegistrationRequest: {
      type: "object",
      required: ["login", "name", "password", "surname"],
      properties: {
        login: {
          type: "string",
          example: "tsarkov@yandex.ru",
          description: "Логин"
        },
        name: {
          type: "string",
          example: "Вадим",
          description: "Имя пользователя"
        },
        password: { type: "string", example: 12345678, description: "Пароль" },
        surname: {
          type: "string",
          example: "Царьков",
          description: "Фамилия пользователя"
        }
      },
      title: "RegistrationRequest",
      description: "Форма регистрации нового клиента"
    },
    RegistrationResponse: {
      type: "object",
      required: ["message"],
      properties: {
        message: {
          type: "string",
          example: "Успешная регистрация",
          description: "Сообщение об успешной регистрации"
        }
      },
      title: "RegistrationResponse",
      description: "Форма ответа регистрации нового клиента"
    },
    ResearchCreateResponse: {
      type: "object",
      required: ["notationId"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
          example: 7,
          description: "Идентификатор сущности"
        },
        notationId: {
          type: "integer",
          format: "int64",
          example: 4,
          description: "Идентификатор нотации"
        }
      },
      title: "ResearchCreateResponse",
      description: "Ответ о создании исследования"
    },
    ResearchResponse: {
      type: "object",
      required: [
        "created",
        "file",
        "notationId",
        "notationName",
        "researchId",
        "researchName",
        "result",
        "status",
        "updated"
      ],
      properties: {
        created: {
          type: "string",
          example: 1581022800,
          description: "Дата создания"
        },
        department: {
          type: "string",
          example: "СБОЛ",
          description: "Наименование подразделения"
        },
        file: {
          type: "string",
          example: "domclick_100k.csv",
          description: "Наименование файла"
        },
        id: {
          type: "integer",
          format: "int64",
          example: 7,
          description: "Идентификатор сущности"
        },
        notationId: {
          type: "integer",
          format: "int64",
          example: 2,
          description: "Идентификатор нотации"
        },
        notationName: {
          type: "string",
          example: "Нотация данных получения кредита онлайн",
          description: "Наименование нотации"
        },
        researchId: {
          type: "integer",
          format: "int64",
          example: 1,
          description: "Идентификатор исследования"
        },
        researchName: {
          type: "string",
          example: "Исследование данных получения кредита онлайн",
          description: "Наименование исследования"
        },
        result: {
          type: "boolean",
          example: false,
          description: "Результат выполнения исследования"
        },
        status: {
          type: "string",
          example: "PRIVATE",
          description: "Статус исследования",
          enum: ["PUBLIC", "PRIVATE"]
        },
        updated: {
          type: "string",
          example: 1581023800,
          description: "Дата обновления"
        }
      },
      title: "ResearchResponse",
      description: "Исследование в разделе исследований"
    },
    ResearchUpdateRequest: {
      type: "object",
      required: ["department", "name"],
      properties: {
        department: {
          type: "string",
          example: "ДБО",
          description: "Наименование подразделения"
        },
        name: {
          type: "string",
          example: "Исследование получения кредита онлайн",
          description: "Наименование исследования"
        }
      },
      title: "ResearchUpdateRequest",
      description: "Обновление нотации"
    },
    SuccessMessage: {
      type: "object",
      required: ["message"],
      properties: {
        message: {
          type: "string",
          example: "Успешная авторизация",
          description: "Сообщение об успешном выполнении"
        }
      },
      title: "SuccessMessage",
      description: "Описание успешного выполнения"
    }
  }
};

exports.testJson = testJson;
