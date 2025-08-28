const alunos = [];
let contadorId = 1;

/**
 * ALUNO
 * ID: NÚMERO (INT)
 * NOME: TEXTO (STRING)
 * EMAIL: TEXTO (STRING)
 * CPF: TEXTO (STRING)
 * DATA_NASCIMENTO: TEXTO (STRING)
 * TELEFONE: TEXTO (STRING)
 */

/**
 * Operações:
 * INSERT - Criar aluno
 * SELECT - Listar todos os alunos
 * SELECT com WHERE - Buscar aluno por critérios específicos
 */

function criarAluno(nome, email, cpf, dataNascimento, telefone) {
  const novoAluno = {
    id: contadorId++,
    nome: nome,
    email: email,
    cpf: cpf,
    data_nascimento: dataNascimento,
    telefone: telefone,
    data_cadastro: new Date().toISOString().split('T')[0]
  };

  alunos.push(novoAluno);
  return novoAluno;
}

function listarTodosAlunos() {
  return alunos;
}

function buscarAlunoPorNome(nome) {
  const alunoEncontrado = alunos.find((aluno) => 
    aluno.nome.toLowerCase().includes(nome.toLowerCase())
  );
  return alunoEncontrado;
}

function buscarAlunoPorEmail(email) {
  const alunoEncontrado = alunos.find((aluno) => aluno.email === email);
  return alunoEncontrado;
}

function buscarAlunoPorCpf(cpf) {
  const alunoEncontrado = alunos.find((aluno) => aluno.cpf === cpf);
  return alunoEncontrado;
}

module.exports = {
  criarAluno,
  listarTodosAlunos,
  buscarAlunoPorNome,
  buscarAlunoPorEmail,
  buscarAlunoPorCpf
};
