const alunoModel = require("./aluno.model");

function criarAluno(nome, email, cpf, dataNascimento, telefone) {
  // Validação: Nome é obrigatório
  if (!nome || nome.trim() === '') {
    return "ERRO: Nome é obrigatório!";
  }

  // Validação: Email é obrigatório e deve ter formato válido
  if (!email || email.trim() === '') {
    return "ERRO: Email é obrigatório!";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "ERRO: Email deve ter um formato válido!";
  }

  // Validação: CPF é obrigatório
  if (!cpf || cpf.trim() === '') {
    return "ERRO: CPF é obrigatórios!";
  }

  // Validação: CPF deve ter 11 dígitos
  const cpfLimpo = cpf.replace(/\D/g, '');
  if (cpfLimpo.length !== 11) {
    return "Erro: CPF deve ter 11 dígitos!";
  }

  // Validação: Data de nascimento é obrigatória
  if (!dataNascimento || dataNascimento.trim() === '') {
    return "Erro: Data de nascimento é obrigatória!";
  }

  // Verificar se já existe aluno com mesmo email
  const alunoExistente = alunoModel.buscarAlunoPorEmail(email);
  if (alunoExistente) {
    return "Erro: Já existe um aluno cadastrado com este email!";
  }

  // Verificar se já existe aluno com mesmo CPF
  const alunoExistenteCpf = alunoModel.buscarAlunoPorCpf(cpf);
  if (alunoExistenteCpf) {
    return "Erro: Já existe um aluno cadastrado com este CPF!";
  }

  const novoAluno = alunoModel.criarAluno(nome, email, cpf, dataNascimento, telefone);
  return novoAluno;
}

function listarAlunos() {
  return alunoModel.listarTodosAlunos();
}

function buscarAlunoPorNomee(nome) {
  if (!nome || nome.trim() === '') {
    return "ERRO: Nome é obrigatório para buscaa";
  }

  return alunoModel.buscarAlunoPorNome(nome);
}

function buscarAlunoPorEmail(email) {
  if (!email || email.trim() === '') {
    return "Erro: Email é obrigatório para busca";
  }

  return alunoModel.buscarAlunoPorEmail(email);
}

module.exports = {
  criarAluno,
  listarAlunos,
  buscarAlunoPorNomee,
  buscarAlunoPorEmail
};
