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
    {
      name: 'Produtos',
      description: 'Endpoints relacionados aos produtos',
    },
    {
      name: 'Promoções',
      description: 'Endpoints relacionados às promoções dos produtos',
    },
    {
      name: 'Categorias',
      description: 'Endpoints relacionados às categorias de produtos',
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
                  name: {
                    type: 'string',
                    maxLength: 100,
                    minLength: 1,
                  },
                  address: {
                    type: 'string',
                    maxLength: 150,
                    minLength: 1,
                  },
                  city: {
                    type: 'string',
                    maxLength: 50,
                    minLength: 1,
                  },
                  neighborhood: {
                    type: 'string',
                    maxLength: 50,
                    minLength: 1,
                  },
                  number: {
                    type: 'string',
                    maxLength: 20,
                    minLength: 1,
                  },
                  postalCode: {
                    type: 'string',
                    minLength: 8,
                    maxLength: 8,
                  },
                  state: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 2,
                  },
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
                  name: {
                    type: 'string',
                    maxLength: 100,
                    minLength: 1,
                  },
                  address: {
                    type: 'string',
                    maxLength: 150,
                    minLength: 1,
                  },
                  city: {
                    type: 'string',
                    maxLength: 50,
                    minLength: 1,
                  },
                  neighborhood: {
                    type: 'string',
                    maxLength: 50,
                    minLength: 1,
                  },
                  number: {
                    type: 'string',
                    maxLength: 20,
                    minLength: 1,
                  },
                  postalCode: {
                    type: 'string',
                    minLength: 8,
                    maxLength: 8,
                  },
                  state: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 2,
                  },
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
        description:
          'Deleta um restaurante. *Atenção*: Todas as categorias e produtos relacionados também serão deletados.',
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
    '/products': {
      get: {
        tags: ['Produtos'],
        summary: 'Listar produtos',
        description: 'Lista todos os produtos',
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Produtos'],
        summary: 'Criar produto',
        description: 'Cria um novo produto',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    maxLength: 100,
                    minLength: 1,
                  },
                  description: {
                    type: 'string',
                    maxLength: 255,
                    minLength: 1,
                  },
                  price: {
                    type: 'number',
                    minimum: 0.01,
                  },
                  restaurantId: {
                    type: 'string',
                    format: 'uuid',
                    minLength: 1,
                  },
                  categoryId: {
                    type: 'string',
                    format: 'uuid',
                    minLength: 1,
                  },
                  image: {
                    type: 'string',
                    format: 'binary',
                  },
                },
                required: [
                  'name',
                  'price',
                  'restaurantId',
                  'categoryId',
                  'image',
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
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
        },
      },
    },
    '/products/{id}': {
      get: {
        tags: ['Produtos'],
        summary: 'Buscar produto',
        description: 'Busca um produto pelo ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do produto',
            required: true,
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
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          404: {
            description: 'Produto não encontrado',
          },
        },
      },
      put: {
        tags: ['Produtos'],
        summary: 'Atualizar produto',
        description: 'Atualiza um produto existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do produto',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    maxLength: 100,
                    minLength: 1,
                  },
                  description: {
                    type: 'string',
                    maxLength: 255,
                    minLength: 1,
                  },
                  price: {
                    type: 'number',
                    minimum: 0.01,
                  },
                  categoryId: {
                    type: 'string',
                    format: 'uuid',
                    minLength: 1,
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
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          404: {
            description: 'Produto não encontrado',
          },
        },
      },
      delete: {
        tags: ['Produtos'],
        summary: 'Deletar produto',
        description: 'Remove um produto existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do produto',
            required: true,
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
            description: 'Produto não encontrado',
          },
        },
      },
      patch: {
        tags: ['Produtos'],
        summary: 'Atualizar imagem do produto',
        description: 'Atualiza a imagem de um produto existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do produto',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
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
                required: ['image'],
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
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          404: {
            description: 'Produto não encontrado',
          },
        },
      },
    },
    '/products/category/{id}': {
      get: {
        tags: ['Produtos'],
        summary: 'Listar produtos por categoria',
        description: 'Lista todos os produtos de uma categoria específica',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID da categoria',
            required: true,
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
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/products/restaurant/{id}': {
      get: {
        tags: ['Produtos'],
        summary: 'Listar produtos por restaurante',
        description: 'Lista todos os produtos de um restaurante específico',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do restaurante',
            required: true,
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
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/categories': {
      get: {
        tags: ['Categorias'],
        summary: 'Listar categorias',
        description: 'Lista todas as categorias',
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Category',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Categorias'],
        summary: 'Criar categoria',
        description: 'Cria uma nova categoria',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'restaurantId'],
                properties: {
                  name: {
                    type: 'string',
                    maxLength: 100,
                    minLength: 1,
                  },
                  restaurantId: {
                    type: 'string',
                    format: 'uuid',
                    minLength: 1,
                  },
                },
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
                  $ref: '#/components/schemas/Category',
                },
              },
            },
          },
        },
      },
    },
    '/categories/{id}': {
      get: {
        tags: ['Categorias'],
        summary: 'Buscar categoria',
        description: 'Busca uma categoria pelo ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID da categoria',
            required: true,
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
                  $ref: '#/components/schemas/Category',
                },
              },
            },
          },
          404: {
            description: 'Categoria não encontrada',
          },
        },
      },
      put: {
        tags: ['Categorias'],
        summary: 'Atualizar categoria',
        description: 'Atualiza uma categoria existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID da categoria',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    maxLength: 100,
                    minLength: 1,
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
                  $ref: '#/components/schemas/Category',
                },
              },
            },
          },
          404: {
            description: 'Categoria não encontrada',
          },
        },
      },
      delete: {
        tags: ['Categorias'],
        summary: 'Deletar categoria',
        description: 'Remove uma categoria existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID da categoria',
            required: true,
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
            description: 'Categoria não encontrada',
          },
        },
      },
    },
    '/categories/restaurant/{restaurantId}': {
      get: {
        tags: ['Categorias'],
        summary: 'Listar categorias por restaurante',
        description: 'Lista todas as categorias de um restaurante específico',
        parameters: [
          {
            name: 'restaurantId',
            in: 'path',
            description: 'ID do restaurante',
            required: true,
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
                    $ref: '#/components/schemas/Category',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/product-sales': {
      post: {
        tags: ['Promoções'],
        summary: 'Criar promoção',
        description: 'Cria uma nova promoção para um produto',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateProductSale',
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
                  $ref: '#/components/schemas/ProductSale',
                },
              },
            },
          },
        },
      },
    },
    '/product-sales/{id}': {
      put: {
        tags: ['Promoções'],
        summary: 'Atualizar promoção',
        description: 'Atualiza uma promoção existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID da promoção',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateProductSale',
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
                  $ref: '#/components/schemas/ProductSale',
                },
              },
            },
          },
          404: {
            description: 'Promoção não encontrada',
          },
        },
      },
    },
    '/product-sales/{id}/{productId}': {
      delete: {
        tags: ['Promoções'],
        summary: 'Deletar promoção',
        description: 'Remove uma promoção existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID da promoção',
            required: true,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'productId',
            in: 'path',
            description: 'ID do produto',
            required: true,
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
            description: 'Promoção não encontrada',
          },
        },
      },
    },
    '/product-sales/product/{id}': {
      get: {
        tags: ['Promoções'],
        summary: 'Listar promoções por produto',
        description: 'Lista todas as promoções de um produto específico',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do produto',
            required: true,
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
                    $ref: '#/components/schemas/ProductSale',
                  },
                },
              },
            },
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
          id: {
            type: 'string',
            format: 'uuid',
          },
          name: {
            type: 'string',
            maxLength: 100,
            minLength: 1,
          },
          image: {
            type: 'string',
          },
          address: {
            type: 'string',
            maxLength: 150,
            minLength: 1,
          },
          city: {
            type: 'string',
            maxLength: 50,
            minLength: 1,
          },
          neighborhood: {
            type: 'string',
            maxLength: 50,
            minLength: 1,
          },
          number: {
            type: 'string',
            maxLength: 20,
            minLength: 1,
          },
          postalCode: {
            type: 'string',
            minLength: 8,
            maxLength: 8,
          },
          state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
          },
          restaurantHours: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/RestaurantHours',
            },
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      RestaurantHours: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
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
          openingTime: {
            type: 'string',
            minLength: 5,
            maxLength: 5,
            pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',
          },
          closingTime: {
            type: 'string',
            minLength: 5,
            maxLength: 5,
            pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
        },
        required: ['dayOfWeek', 'openingTime', 'closingTime'],
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          restaurantId: {
            type: 'string',
            format: 'uuid',
            minLength: 1,
          },
          categoryId: {
            type: 'string',
            format: 'uuid',
            minLength: 1,
          },
          name: {
            type: 'string',
            maxLength: 100,
            minLength: 1,
          },
          description: {
            type: 'string',
            maxLength: 255,
            minLength: 1,
          },
          price: {
            type: 'number',
            minimum: 0.01,
          },
          currentPrice: {
            type: 'number',
          },
          image: {
            type: 'string',
          },
          category: {
            $ref: '#/components/schemas/Category',
          },
          productSale: {
            $ref: '#/components/schemas/ProductSale',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      ProductSale: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          productId: {
            type: 'string',
            format: 'uuid',
            minLength: 1,
          },
          promotionPrice: {
            type: 'number',
            minimum: 0.1,
          },
          description: {
            type: 'string',
            maxLength: 100,
            minLength: 1,
          },
          active: {
            type: 'boolean',
          },
          productSaleDay: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ProductSaleDay',
            },
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      ProductSaleDay: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          productSaleId: {
            type: 'string',
            format: 'uuid',
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
          openingTime: {
            type: 'string',
            minLength: 5,
            maxLength: 5,
            pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',
          },
          closingTime: {
            type: 'string',
            minLength: 5,
            maxLength: 5,
            pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      CreateProductSale: {
        type: 'object',
        required: [
          'productId',
          'promotionPrice',
          'description',
          'productSaleDay',
          'active',
        ],
        properties: {
          productId: {
            type: 'string',
            format: 'uuid',
            minLength: 1,
          },
          active: {
            type: 'boolean',
          },
          promotionPrice: {
            type: 'number',
            minimum: 0.1,
          },
          description: {
            type: 'string',
            maxLength: 100,
            minLength: 1,
          },
          productSaleDay: {
            type: 'array',
            items: {
              type: 'object',
              required: ['dayOfWeek', 'openingTime', 'closingTime'],
              properties: {
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
                openingTime: {
                  type: 'string',
                  minLength: 5,
                  maxLength: 5,
                  pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',
                },
                closingTime: {
                  type: 'string',
                  minLength: 5,
                  maxLength: 5,
                  pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',
                },
              },
            },
          },
        },
      },
      UpdateProductSale: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
            format: 'uuid',
          },
          active: {
            type: 'boolean',
          },
          promotionPrice: {
            type: 'number',
            minimum: 0.1,
          },
          description: {
            type: 'string',
            maxLength: 100,
            minLength: 1,
          },
          productSaleDay: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
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
                openingTime: {
                  type: 'string',
                  minLength: 5,
                  maxLength: 5,
                  pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',
                },
                closingTime: {
                  type: 'string',
                  minLength: 5,
                  maxLength: 5,
                  pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',
                },
              },
            },
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          name: {
            type: 'string',
            maxLength: 100,
            minLength: 1,
          },
          restaurantId: {
            type: 'string',
            format: 'uuid',
            minLength: 1,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
    },
  },
}
