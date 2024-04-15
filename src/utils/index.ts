export function getNormalizedTime(date: string): string {
  return new Date(date).toLocaleString().slice(12, 17)
}

export function getNormalizedDate(date: string): string {
  return new Date(date).toLocaleString().slice(0, 10).replace(/\//g, ".")
}

export function getNormalizedDateTime(date: string): string {
  return new Date(date).toLocaleString().replace(/\//g, ".").slice(0, -3)
}

export function getPortal() {
  return document.getElementById("main")!
}

export function getDayName(day: string): string {
  switch(day) {
    case "monday": return "Понедельник";
    case "tuesday": return "Вторник";
    case "wednesday": return "Среда";
    case "thursday": return "Четверг";
    case "friday": return "Пятница";
    case "saturday": return "Суббота";
    case "sunday": return "Воскресенье";
    default: return "";
  }
}

export function getLottieOptions(animationData: any) {
  return {
    loop: true,
    autoplay: true, 
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
}