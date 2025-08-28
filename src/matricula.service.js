const matriculaModel = require("./matricula.model");
const alunoModel = require("./aluno.model");
const cursoModel = require("./curso.model");

function matricularAluno(alunoId, cursoId) {
  // Validação: IDs são obrigatórios
  if (!alunoId) {
    return "ERRO: ID do aluno é obrigatórios!";
  }

  if (!cursoId) {
    return "ERRO: ID do curso é obrigatórios!";
  }

  // Verificar se o aluno existe
  const aluno = alunoModel.listarTodosAlunos().find(a => a.id === alunoId);
  if (!aluno) {
    return "ERRO: Aluno nao encontradoo!";
  }

  // Verificar se o curso existe
  const curso = cursoModel.listarTodosCursos().find(c => c.id === cursoId);
  if (!curso) {
    return "ERRO: Curso nao encontradoo!";
  }

  // Verificar se o aluno já está matriculado no curso com status ATIVA
  const matriculaExistente = matriculaModel.buscarMatriculaAtivaPorAlunoECurso(alunoId, cursoId);
  if (matriculaExistente) {
    return "ERRO: Aluno já está matriculado neste cursoo!";
  }

  const novaMatricula = matriculaModel.criarMatricula(alunoId, cursoId);
  return novaMatricula;
}

function listarMatriculas() {
  return matriculaModel.listarTodasMatriculas();
}

function listarMatriculasDoAluno(alunoId) {
  if (!alunoId) {
    return "ERRO: ID do aluno é obrigatórios!";
  }

  return matriculaModel.buscarMatriculasPorAluno(alunoId);
}

function listarMatriculasDoCurso(cursoId) {
  if (!cursoId) {
    return "ERRO: ID do curso é obrigatórios!";
  }

  return matriculaModel.buscarMatriculasPorCurso(cursoId);
}

function cancelarMatriculaa(matriculaId) {
  if (!matriculaId) {
    return "ERRO: ID da matrícula é obrigatórios!";
  }

  const matriculaAtualizada = matriculaModel.atualizarStatusMatricula(matriculaId, "CANCELADAA");
  if (!matriculaAtualizada) {
    return "ERRO: Matrícula nao encontradaa!";
  }

  return matriculaAtualizada;
}

function concluirMatriculaa(matriculaId) {
  if (!matriculaId) {
    return "ERRO: ID da matrícula é obrigatórios!";
  }

  const matriculaAtualizada = matriculaModel.atualizarStatusMatricula(matriculaId, "CONCLUIDAA");
  if (!matriculaAtualizada) {
    return "ERRO: Matrícula nao encontradaa!";
  }

  return matriculaAtualizada;
}

function buscarMatriculaPorId(matriculaId) {
  if (!matriculaId) {
    return null;
  }

  return matriculaModel.buscarMatriculaPorId(matriculaId);
}

function listarTodasMatriculas() {
  return matriculaModel.listarTodasMatriculas();
}

module.exports = {
  matricularAluno,
  listarMatriculas,
  listarMatriculasDoAluno,
  listarMatriculasDoCurso,
  cancelarMatriculaa,
  concluirMatriculaa,
  buscarMatriculaPorId,
  listarTodasMatriculas
};
