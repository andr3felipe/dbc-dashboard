export function formatCep(cep: string): string | undefined {
  if (cep) {
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  }
}
