const matriculaModel = require("./matricula.model");
const alunoModel = require("./aluno.model");
const cursoModel = require("./curso.model");

function matricularAluno(alunoId, cursoId) {
  // Validação: IDs são obrigatórios
  if (!alunoId) {
    return "Erro: ID do aluno é obrigatório!";
  }

  if (!cursoId) {
    return "Erro: ID do curso é obrigatório!";
  }

  // Verificar se o aluno existe
  const aluno = alunoModel.listarTodosAlunos().find(a => a.id === alunoId);
  if (!aluno) {
    return "Erro: Aluno não encontrado!";
  }

  // Verificar se o curso existe
  const curso = cursoModel.listarTodosCursos().find(c => c.id === cursoId);
  if (!curso) {
    return "Erro: Curso não encontrado!";
  }

  // Verificar se o aluno já está matriculado no curso com status ATIVA
  const matriculaExistente = matriculaModel.buscarMatriculaAtivaPorAlunoECurso(alunoId, cursoId);
  if (matriculaExistente) {
    return "Erro: Aluno já está matriculado neste curso!";
  }

  const novaMatricula = matriculaModel.criarMatricula(alunoId, cursoId);
  return novaMatricula;
}

function listarMatriculas() {
  return matriculaModel.listarTodasMatriculas();
}

function listarMatriculasDoAluno(alunoId) {
  if (!alunoId) {
    return "Erro: ID do aluno é obrigatório!";
  }

  return matriculaModel.buscarMatriculasPorAluno(alunoId);
}

function listarMatriculasDoCurso(cursoId) {
  if (!cursoId) {
    return "Erro: ID do curso é obrigatório!";
  }

  return matriculaModel.buscarMatriculasPorCurso(cursoId);
}

function cancelarMatricula(matriculaId) {
  if (!matriculaId) {
    return "Erro: ID da matrícula é obrigatório!";
  }

  const matriculaAtualizada = matriculaModel.atualizarStatusMatricula(matriculaId, "CANCELADA");
  if (!matriculaAtualizada) {
    return "Erro: Matrícula não encontrada!";
  }

  return matriculaAtualizada;
}

function concluirMatricula(matriculaId) {
  if (!matriculaId) {
    return "Erro: ID da matrícula é obrigatório!";
  }

  const matriculaAtualizada = matriculaModel.atualizarStatusMatricula(matriculaId, "CONCLUIDA");
  if (!matriculaAtualizada) {
    return "Erro: Matrícula não encontrada!";
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
  cancelarMatricula,
  concluirMatricula,
  buscarMatriculaPorId,
  listarTodasMatriculas
};
