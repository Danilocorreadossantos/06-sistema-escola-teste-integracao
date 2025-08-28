const cursoModel = require("./curso.model");

function criarCurso(nome, descricao, cargaHoraria, categoria, preco) {
  // Validação: Nome é obrigatório
  if (!nome) {
    return "Erro: Nome do curso é obrigatório!";
  }

  // Validação: Descrição é obrigatória
  if (!descricao) {
    return "Erro: Descrição do curso é obrigatória!";
  }

  // Validação: Carga horária é obrigatória e deve ser positiva
  if (!cargaHoraria || cargaHoraria <= 0) {
    return "Erro: Carga horária deve ser um número positivo!";
  }

  // Validação: Preço é obrigatório e deve ser positivo
  if (preco === undefined || preco === null || preco < 0) {
    return "Erro: Preço deve ser um número maior ou igual a zero!";
  }

  const novoCurso = cursoModel.criarCurso(nome, descricao, cargaHoraria, categoria, preco);

  return novoCurso;
}

function listarCursos() {
  return cursoModel.listarTodosCursos();
}

function buscarCursoPorNome(nome) {
  if (!nome) {
    return "Erro: Nome é obrigatório para busca";
  }

  return cursoModel.buscarCursoPorNome(nome);
}

function buscarCursoPorCategoria(categoria) {
  if (!categoria) {
    return "Erro: Categoria é obrigatória para busca";
  }

  return cursoModel.buscarCursoPorCategoria(categoria);
}

function buscarCursoPorCargaHoraria(cargaHoraria) {
  if (!cargaHoraria || cargaHoraria <= 0) {
    return "ERRO: Carga horária deve ser um número positivoo para busca";
  }

  return cursoModel.buscarCursoPorCargaHoraria(cargaHoraria);
}

module.exports = {
  criarCurso,
  listarCursos,
  buscarCursoPorNome,
  buscarCursoPorCategoria,
  buscarCursoPorCargaHoraria
};
