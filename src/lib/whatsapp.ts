const DEFAULT_NUMBER = '50244480395'

export function buildWhatsAppLink(message: string, number = DEFAULT_NUMBER): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const WA_MESSAGES = {
  general: 'Hola, me gustaría recibir más información sobre Hotel Quinta Vista Verde.',
  room: (name: string) =>
    `Hola, me gustaría recibir información sobre la habitación ${name}.`,
  breakfast: (name: string) =>
    `Hola. Me interesa obtener información sobre el desayuno: "${name}". ¿Podrían brindarme más información?`,
  experiences:
    'Hola, me gustaría conocer las recomendaciones y actividades disponibles cerca del hotel.',
  contact: 'Hola, me gustaría recibir información sobre Hotel Quinta Vista Verde.',
  roomsInquiry:
    'Hola, me gustaría conocer más sobre las habitaciones disponibles, tarifas y disponibilidad.',
  breakfastsInquiry:
    'Hola, me gustaría reservar o conocer más sobre la carta de desayunos del restaurante.',
}
