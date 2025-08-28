const cursos = [];
let contadorId = 1;

/**
 * CURSO
 * ID: NÚMERO (INT)
 * NOME: TEXTO (STRING)
 * DESCRICAO: TEXTO (STRING)
 * CARGA_HORARIA: NÚMERO (INT)
 * CATEGORIA: TEXTO (STRING)
 * PRECO: NÚMERO (FLOAT)
 */

/**
 * Operações:
 * INSERT - Criar curso
 * SELECT - Listar todos os cursos
 * SELECT com WHERE - Buscar curso por critérios específicos
 */

function criarCurso(nome, descricao, cargaHoraria, categoria, preco) {
  const novoCurso = {
    id: contadorId++,
    nome: nome,
    descricao: descricao,
    carga_horaria: cargaHoraria,
    categoria: categoria || "GERAL",
    preco: preco,
    data_criacao: new Date().toISOString().split('T')[0]
  };

  cursos.push(novoCurso);
  return novoCurso;
}

function listarTodosCursos() {
  return cursos;
}

function buscarCursoPorNome(nome) {
  const cursoEncontrado = cursos.find((curso) => 
    curso.nome.toLowerCase().includes(nome.toLowerCase())
  );
  return cursoEncontrado;
}

function buscarCursoPorCategoria(categoria) {
  const cursosEncontrados = cursos.filter((curso) => 
    curso.categoria.toLowerCase() === categoria.toLowerCase()
  );
  return cursosEncontrados;
}

function buscarCursoPorCargaHoraria(cargaHoraria) {
  const cursosEncontrados = cursos.filter((curso) => 
    curso.carga_horaria === cargaHoraria
  );
  return cursosEncontrados;
}

module.exports = {
  criarCurso,
  listarTodosCursos,
  buscarCursoPorNome,
  buscarCursoPorCategoria,
  buscarCursoPorCargaHoraria
};
