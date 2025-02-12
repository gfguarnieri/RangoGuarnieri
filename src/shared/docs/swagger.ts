export const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Rango Guarnieri',
    description: 'API para gerenciamento de restaurantes e produtos',
    version: '1.0.0',
    contact: {
      name: 'Giovanni Francesco Guarnieri',
      email: 'gfguarnieri@hotmail.com',
      url: 'https://www.giovanniguarnieri.com.br',
    },
  },
  servers: [
    {
      url: 'http://localhost:3333',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Restaurante',
      description: 'Endpoints relacionados a restaurantes',
    },
    {
      name: 'Horários de funcionamento',
      description:
        'Endpoints relacionados aos horários de funcionamento dos restaurantes',
    },
  ],
  paths: {
    '/restaurants': {
      get: {
        tags: ['Restaurante'],
        summary: 'Listar restaurantes',
        description: 'Lista todos os restaurantes',
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Restaurant',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Restaurante'],
        summary: 'Cadastro de um novo restaurante',
        description: `O cadastro de restaurante pode receber os horários de funcionamento do restaurante.  
        Cada intervalo de horário de funcionamento deve ter no mínimo 15 minutos de duração.`,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', maxLength: 100 },
                  address: { type: 'string', maxLength: 150 },
                  city: { type: 'string', maxLength: 50 },
                  neighborhood: { type: 'string', maxLength: 50 },
                  number: { type: 'string', maxLength: 20 },
                  postalCode: { type: 'string', minLength: 8, maxLength: 8 },
                  state: { type: 'string', minLength: 2, maxLength: 2 },
                  restaurantHours: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        openingTime: {
                          type: 'string',
                          minLength: 5,
                          maxLength: 5,
                          format: 'time',
                          example: '08:00',
                        },
                        closingTime: {
                          type: 'string',
                          minLength: 5,
                          maxLength: 5,
                          format: 'time',
                          example: '08:00',
                        },
                        dayOfWeek: {
                          type: 'string',
                          enum: [
                            'SUNDAY',
                            'MONDAY',
                            'TUESDAY',
                            'WEDNESDAY',
                            'THURSDAY',
                            'FRIDAY',
                            'SATURDAY',
                          ],
                        },
                      },
                    },
                  },
                },
                required: [
                  'name',
                  'address',
                  'city',
                  'neighborhood',
                  'number',
                  'postalCode',
                  'state',
                ],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Restaurant',
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/restaurants/{restaurantId}': {
      get: {
        tags: ['Restaurante'],
        summary: 'Buscar restaurante',
        description: 'Busca um restaurante pelo ID',
        parameters: [
          {
            name: 'restaurantId',
            in: 'path',
            required: true,
            description: 'Restaurant ID',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Restaurant',
                },
              },
            },
          },
          404: {
            description: 'Not Found',
          },
        },
      },
      put: {
        tags: ['Restaurante'],
        summary: 'Atualizar restaurante',
        description:
          'Atualiza as informações de um restaurante. Os horários de funcionamento são atualizados por completo.',
        parameters: [
          {
            name: 'restaurantId',
            in: 'path',
            required: true,
            description: 'Restaurant ID',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', maxLength: 100 },
                  address: { type: 'string', maxLength: 150 },
                  city: { type: 'string', maxLength: 50 },
                  neighborhood: { type: 'string', maxLength: 50 },
                  number: { type: 'string', maxLength: 20 },
                  postalCode: { type: 'string', minLength: 8, maxLength: 8 },
                  state: { type: 'string', minLength: 2, maxLength: 2 },
                  restaurantHours: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        openingTime: {
                          type: 'string',
                          minLength: 5,
                          maxLength: 5,
                          format: 'time',
                          example: '08:00',
                        },
                        closingTime: {
                          type: 'string',
                          minLength: 5,
                          maxLength: 5,
                          format: 'time',
                          example: '08:00',
                        },
                        dayOfWeek: {
                          type: 'string',
                          enum: [
                            'SUNDAY',
                            'MONDAY',
                            'TUESDAY',
                            'WEDNESDAY',
                            'THURSDAY',
                            'FRIDAY',
                            'SATURDAY',
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Restaurant',
                },
              },
            },
          },
          404: {
            description: 'Not Found',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
      patch: {
        tags: ['Restaurante'],
        summary: 'Atualizar imagem do restaurante',
        description: 'Atualiza a imagem do restaurante',
        parameters: [
          {
            name: 'restaurantId',
            in: 'path',
            required: true,
            description: 'Restaurant ID',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  image: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    image: { type: 'string' },
                  },
                },
              },
            },
          },
          404: {
            description: 'Not Found',
          },
        },
      },
      delete: {
        tags: ['Restaurante'],
        summary: 'Deletar restaurante',
        description: `Deleta um restaurante. 
          *Atenção*: Todas as categorias e produtos relacionados também serão deletados.`,
        parameters: [
          {
            name: 'restaurantId',
            in: 'path',
            required: true,
            description: 'Restaurant ID',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          204: {
            description: 'No Content',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
    },
    '/restaurant-hours/{restaurantId}': {
      get: {
        tags: ['Horários de funcionamento'],
        summary: 'Listar horários de funcionamento',
        description: 'Lista os horários de funcionamento de um restaurante',
        parameters: [
          {
            name: 'restaurantId',
            in: 'path',
            required: true,
            description: 'Restaurant ID',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      createdAt: { type: 'string', format: 'date-time' },
                      restaurantId: { type: 'string' },
                      openingTime: {
                        type: 'string',
                        format: 'time',
                        example: '08:00',
                      },
                      closingTime: {
                        type: 'string',
                        format: 'time',
                        example: '08:00',
                      },
                      dayOfWeek: {
                        type: 'string',
                        enum: [
                          'SUNDAY',
                          'MONDAY',
                          'TUESDAY',
                          'WEDNESDAY',
                          'THURSDAY',
                          'FRIDAY',
                          'SATURDAY',
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Horários de funcionamento'],
        summary: 'Atualizar horários de funcionamento',
        description: 'Atualiza os horários de funcionamento de um restaurante',
        parameters: [
          {
            name: 'restaurantId',
            in: 'path',
            required: true,
            description: 'Restaurant ID',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  restaurantHours: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        openingTime: {
                          type: 'string',
                          minLength: 5,
                          maxLength: 5,
                          format: 'time',
                          example: '08:00',
                        },
                        closingTime: {
                          type: 'string',
                          minLength: 5,
                          maxLength: 5,
                          format: 'time',
                          example: '08:00',
                        },
                        dayOfWeek: {
                          type: 'string',
                          enum: [
                            'SUNDAY',
                            'MONDAY',
                            'TUESDAY',
                            'WEDNESDAY',
                            'THURSDAY',
                            'FRIDAY',
                            'SATURDAY',
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          204: {
            description: 'No Content',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Restaurant: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          address: { type: 'string' },
          city: { type: 'string' },
          neighborhood: { type: 'string' },
          number: { type: 'string' },
          postalCode: { type: 'string' },
          state: { type: 'string' },
          restaurantHours: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                openingTime: {
                  type: 'string',
                  format: 'time',
                  example: '08:00',
                },
                closingTime: {
                  type: 'string',
                  format: 'time',
                  example: '08:00',
                },
                dayOfWeek: {
                  type: 'string',
                  enum: [
                    'SUNDAY',
                    'MONDAY',
                    'TUESDAY',
                    'WEDNESDAY',
                    'THURSDAY',
                    'FRIDAY',
                    'SATURDAY',
                  ],
                },
              },
            },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
}
