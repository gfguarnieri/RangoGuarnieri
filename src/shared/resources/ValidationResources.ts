export class ValidationResources {
  static get required(): string {
    return 'Este campo é obrigatório'
  }

  static get invalidTime(): string {
    return 'Horário inválido - Seguir o padrão HH:mm'
  }

  static maxLength(max: number): string {
    return `É necessário ter no máximo ${max} caracteres`
  }

  static minLength(min: number): string {
    return `É necessário ter no mínimo ${min} caracteres`
  }

  static strLength(length: number): string {
    return `É necessário ter ${length} caracteres`
  }

  static get invalidUUID(): string {
    return 'Id inválido'
  }
}
