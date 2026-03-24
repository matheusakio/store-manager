export function formatBRLFromDigits(value: string) {
  const digits = value.replace(/\D/g, "");

  const numberValue = Number(digits || "0") / 100;

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function numberToBRLInput(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
