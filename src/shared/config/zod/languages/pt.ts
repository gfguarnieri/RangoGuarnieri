export const PT_BR = {
  errors: {
    invalid_type:
      'O dado deve ser do tipo {{expected}}, porém foi enviado {{received}}',
    invalid_type_received_undefined: 'Obrigatório',
    invalid_type_received_null: 'Obrigatório',
    invalid_literal: 'Valor literal inválido, era esperado {{expected}}',
    unrecognized_keys: 'Chave(s) não reconhecida(s) no objeto: {{- keys}}',
    invalid_union: 'Entrada inválida',
    invalid_union_discriminator:
      'Valor discriminador inválido. Foi esperado {{- options}}',
    invalid_enum_value:
      "Enum no formato inválido. Foi esperado {{- options}}, porém foi recebido '{{received}}'",
    invalid_arguments: 'Argumento de função inválido',
    invalid_return_type: 'Tipo de retorno de função inválido',
    invalid_date: 'Data inválida',
    custom: 'Entrada inválida',
    invalid_intersection_types:
      'Valores de interseção não poderam ser mesclados',
    not_multiple_of: 'O número deverá ser múltiplo de {{multipleOf}}',
    not_finite: 'Número não pode ser infinito',
    invalid_string: {
      email: 'E-mail inválido',
      url: 'URL inválida',
      uuid: 'UUID inválido',
      cuid: 'CUID inválido',
      regex: 'Combinação inválida',
      datetime: 'datetime inválido',
      startsWith: 'Entrada inválida: deve iniciar com "{{startsWith}}"',
      endsWith: 'Entrada inválida: deve terminar com "{{endsWith}}"',
    },
    too_small: {
      array: {
        exact: 'Lista deve conter exatamente {{minimum}} elemento(s)',
        inclusive: 'Lista deve conter no mínimo {{minimum}} elemento(s)',
        not_inclusive: 'Lista deve conter mais de {{minimum}} elemento(s)',
      },
      string: {
        exact: 'Texto deve conter exatamente {{minimum}} caracter(es)',
        inclusive: 'Texto deve conter pelo menos {{minimum}} caracter(es)',
        not_inclusive: 'Texto deve conter mais de {{minimum}} caracter(es)',
      },
      number: {
        exact: 'Número deve conter exatamente {{minimum}} caracter(es)',
        inclusive: 'Número deve ser maior ou igual a {{minimum}}',
        not_inclusive: 'Número deve ser maior que {{minimum}}',
      },
      set: {
        exact: 'Entrada inválida',
        inclusive: 'Entrada inválida',
        not_inclusive: 'Entrada inválida',
      },
      date: {
        exact: 'Data deve ser exatamente {{- maximum, datetime}}',
        inclusive: 'Data deve ser maior ou igual a {{- minimum, datetime}}',
        not_inclusive: 'Data deve ser maior que {{- minimum, datetime}}',
      },
    },
    too_big: {
      array: {
        exact: 'Lista deve conter exatamente {{maximum}} elemento(s)',
        inclusive: 'Lista deve conter no máximo {{maximum}} elemento(s)',
        not_inclusive: 'Lista deve conter menos de {{maximum}} elemento(s)',
      },
      string: {
        exact: 'Texto deve conter exatamente {{maximum}} caracter(es)',
        inclusive: 'Texto pode conter no máximo {{maximum}} caracter(es)',
        not_inclusive: 'Texto deve conter menos que {{maximum}} caracter(es)',
      },
      number: {
        exact: 'Número deve conter exatamente {{maximum}} caracter(es)',
        inclusive: 'Número deve ser menor ou igual a {{maximum}}',
        not_inclusive: 'Número deve ser menor que {{maximum}}',
      },
      set: {
        exact: 'Entrada inválida',
        inclusive: 'Entrada inválida',
        not_inclusive: 'Entrada inválida',
      },
      date: {
        exact: 'Data deve ser exatamente {{- maximum, datetime}}',
        inclusive: 'Data deve ser menor ou igual a {{- maximum, datetime}}',
        not_inclusive: 'Data deve ser menor que {{- maximum, datetime}}',
      },
    },
  },
  validations: {
    email: 'email',
    url: 'url',
    uuid: 'uuid',
    cuid: 'cuid',
    regex: 'regex',
    datetime: 'datetime',
  },
  types: {
    function: 'function',
    number: 'number',
    string: 'string',
    nan: 'nan',
    integer: 'integer',
    float: 'float',
    boolean: 'boolean',
    date: 'date',
    bigint: 'bigint',
    undefined: 'undefined',
    symbol: 'symbol',
    null: 'null',
    array: 'array',
    object: 'object',
    unknown: 'unknown',
    promise: 'promise',
    void: 'void',
    never: 'never',
    map: 'map',
    set: 'set',
  },
}
