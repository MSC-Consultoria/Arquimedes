/**
 * Mensagens motivacionais personalizadas para Naiara Monteiro
 * Sistema Archimedes - MSC Consultoria
 */

export const naiaraMessages = {
  // Mensagens de boas-vindas
  welcome: [
    "Olá, Naiara! Pronta para aprender hoje? 🚀",
    "Bem-vinda de volta, Naiara! Vamos continuar sua jornada! ✨",
    "Oi, Naiara! Que bom te ver aqui novamente! 💜",
    "Naiara, seu futuro brilhante começa agora! 🌟",
  ],

  // Mensagens motivacionais gerais
  motivational: [
    "🌟 Naiara, você está no caminho certo! Cada lição é um passo rumo ao seu futuro brilhante!",
    "💪 Naiara, cada exercício que você completa te deixa mais forte e preparada!",
    "✨ Você está fazendo um trabalho incrível, Naiara! Continue assim!",
    "🚀 Naiara, o conhecimento que você está adquirindo vai abrir muitas portas!",
    "🎯 Foco e determinação, Naiara! Você está construindo seu futuro agora!",
    "💜 Naiara, lembre-se: cada pequeno progresso é uma grande vitória!",
    "🌈 Você é capaz de muito mais do que imagina, Naiara! Acredite em você!",
    "⭐ Naiara, seu esforço de hoje é o seu sucesso de amanhã!",
  ],

  // Mensagens ao completar tarefa
  taskCompleted: [
    "🎉 Parabéns, Naiara! Mais uma tarefa concluída com sucesso!",
    "👏 Excelente trabalho, Naiara! Você está arrasando!",
    "✅ Muito bem, Naiara! Continue assim que você vai longe!",
    "🏆 Naiara, você está cada vez melhor! Orgulhe-se do seu progresso!",
    "💯 Perfeito, Naiara! Seu esforço está valendo a pena!",
  ],

  // Mensagens ao errar exercício
  encouragement: [
    "💙 Tudo bem errar, Naiara! É assim que aprendemos. Tente novamente!",
    "🌱 Naiara, cada erro é uma oportunidade de crescer. Você consegue!",
    "💪 Não desista, Naiara! Você está mais perto do que imagina!",
    "✨ Naiara, o importante é continuar tentando. Você vai conseguir!",
    "🎯 Quase lá, Naiara! Revise o conteúdo e tente mais uma vez!",
  ],

  // Mensagens de início de trilha
  trackStart: [
    "🎓 Naiara, você está iniciando uma jornada incrível! Vamos juntos!",
    "📚 Bem-vinda à trilha, Naiara! Prepare-se para aprender muito!",
    "🚀 Naiara, esta trilha vai transformar seu conhecimento! Vamos lá!",
    "💜 Que orgulho, Naiara! Você está investindo em você mesma!",
  ],

  // Mensagens de conclusão de trilha
  trackCompleted: [
    "🏆 INCRÍVEL, Naiara! Você concluiu toda a trilha! Parabéns!",
    "🎊 Naiara, você é uma CAMPEÃ! Trilha 100% concluída!",
    "⭐ Que conquista, Naiara! Você merece todo o sucesso do mundo!",
    "💯 Naiara, você provou que é capaz de tudo! Parabéns pela dedicação!",
  ],

  // Mensagens de streak (dias consecutivos)
  streak: [
    "🔥 Naiara, você está em sequência! {days} dias seguidos estudando!",
    "⚡ Que consistência, Naiara! {days} dias sem parar!",
    "💪 Naiara, sua dedicação é inspiradora! {days} dias de estudo!",
  ],

  // Mensagens de nível up
  levelUp: [
    "🎉 NÍVEL {level} ALCANÇADO! Naiara, você está evoluindo!",
    "⬆️ Parabéns, Naiara! Você subiu para o nível {level}!",
    "🌟 Naiara, nível {level} desbloqueado! Continue assim!",
  ],
};

/**
 * Retorna uma mensagem aleatória de uma categoria
 */
export function getRandomMessage(category: keyof typeof naiaraMessages, vars?: Record<string, any>): string {
  const messages = naiaraMessages[category];
  const randomIndex = Math.floor(Math.random() * messages.length);
  let message = messages[randomIndex] || messages[0] || "";
  
  // Substituir variáveis se fornecidas
  if (vars) {
    Object.entries(vars).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, String(value));
    });
  }
  
  return message;
}

/**
 * Retorna mensagem personalizada baseada no nome do usuário
 */
export function getPersonalizedMessage(
  userName: string,
  category: keyof typeof naiaraMessages,
  vars?: Record<string, any>
): string {
  // Se for Naiara, retorna mensagem personalizada
  if (userName === "Naiara Monteiro") {
    return getRandomMessage(category, vars);
  }
  
  // Para outros usuários, retorna mensagem genérica
  const genericMessages: Record<string, string> = {
    welcome: `Olá, ${userName.split(" ")[0]}! Pronto para aprender? 👋`,
    motivational: `✨ Cada pequeno passo te leva mais longe do que você imagina, ${userName.split(" ")[0]}!`,
    taskCompleted: `🎉 Parabéns! Mais uma tarefa concluída!`,
    encouragement: `💙 Não desista! Você está mais perto do que imagina!`,
    trackStart: `🎓 Bem-vindo à trilha! Prepare-se para aprender muito!`,
    trackCompleted: `🏆 Parabéns! Você concluiu toda a trilha!`,
    streak: `🔥 Você está em sequência! ${vars?.days || 0} dias seguidos!`,
    levelUp: `🎉 Parabéns! Você alcançou o nível ${vars?.level || 1}!`,
  };
  
  return genericMessages[category] || `Olá, ${userName.split(" ")[0]}!`;
}
