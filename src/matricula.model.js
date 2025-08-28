const matriculas = [];
let contadorId = 1;

/**
 * MATRICULAfunction atualizarStatusMatricula(id, novoStatus) {
  const matricula = matriculas.find(m => m.id === id);
  if (matricula) {
    matricula.status = novoStatus;
    return matricula;
  }
  return null;
}

function buscarMatriculaPorId(id) {
  return matriculas.find(m => m.id === id) || null;
}

module.exports = {
  criarMatricula,
  listarTodasMatriculas,
  buscarMatriculasPorAluno,
  buscarMatriculasPorCurso,
  buscarMatriculaPorAlunoECurso,
  buscarMatriculaAtivaPorAlunoECurso,
  atualizarStatusMatricula,
  buscarMatriculaPorId
};NT)
 * ALUNO_ID: NÚMERO (INT)
 * CURSO_ID: NÚMERO (INT)
 * DATA_MATRICULA: TEXTO (STRING)
 * STATUS: TEXTO (STRING) - ATIVA, CONCLUIDA, CANCELADA
 */

/**
 * Operações:
 * INSERT - Criar matrícula
 * SELECT - Listar todas as matrículas
 * SELECT com WHERE - Buscar matrícula por critérios específicos
 */

function criarMatricula(alunoId, cursoId) {
  const novaMatricula = {
    id: contadorId++,
    aluno_id: alunoId,
    curso_id: cursoId,
    data_matricula: new Date().toISOString().split('T')[0],
    status: "ATIVA"
  };

  matriculas.push(novaMatricula);
  return novaMatricula;
}

function listarTodasMatriculas() {
  return matriculas;
}

function buscarMatriculasPorAluno(alunoId) {
  const matriculasDoAluno = matriculas.filter((matricula) => 
    matricula.aluno_id === alunoId
  );
  return matriculasDoAluno;
}

function buscarMatriculasPorCurso(cursoId) {
  const matriculasDoCurso = matriculas.filter((matricula) => 
    matricula.curso_id === cursoId
  );
  return matriculasDoCurso;
}

function buscarMatriculaPorAlunoECurso(alunoId, cursoId) {
  const matriculaEncontrada = matriculas.find((matricula) => 
    matricula.aluno_id === alunoId && matricula.curso_id === cursoId
  );
  return matriculaEncontrada;
}

function buscarMatriculaAtivaPorAlunoECurso(alunoId, cursoId) {
  const matriculaEncontrada = matriculas.find((matricula) => 
    matricula.aluno_id === alunoId && matricula.curso_id === cursoId && matricula.status === "ATIVA"
  );
  return matriculaEncontrada;
}

function atualizarStatusMatricula(matriculaId, novoStatus) {
  const matricula = matriculas.find((m) => m.id === matriculaId);
  if (matricula) {
    matricula.status = novoStatus;
    return matricula;
  }
  return null;
}

function buscarMatriculaPorId(id) {
  return matriculas.find(m => m.id === id) || null;
}

module.exports = {
  criarMatricula,
  listarTodasMatriculas,
  buscarMatriculasPorAluno,
  buscarMatriculasPorCurso,
  buscarMatriculaPorAlunoECurso,
  buscarMatriculaAtivaPorAlunoECurso,
  atualizarStatusMatricula,
  buscarMatriculaPorId
};
