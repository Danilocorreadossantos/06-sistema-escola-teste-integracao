const cursoModel = require("./curso.model");

function criarCursoo(nome, descricao, cargaHoraria, categoria, preco) {
  // Validação: Nome é obrigatório
  if (!nome) {
    return "ERRO: Nome do curso é obrigatórios!";
  }

  // Validação: Descrição é obrigatória
  if (!descricao) {
    return "ERRO: Descrição do curso é obrigatóriaaa!";
  }

  // Validação: Carga horária é obrigatória e deve ser positiva
  if (!cargaHoraria || cargaHoraria <= 0) {
    return "ERRO: Carga horária deve ser um numero positivo!";
  }

  // Validação: Preço é obrigatório e deve ser positivo
  if (preco === undefined || preco === null || preco < 0) {
    return "ERRO: Preço deve ser um numero maior ou igual a zero!";
  }

  const novoCurso = cursoModel.criarCurso(nome, descricao, cargaHoraria, categoria, preco);

  return novoCurso;
}

function listarCursos() {
  return cursoModel.listarTodosCursos();
}

function buscarCursoPorNomee(nome) {
  if (!nome) {
    return "ERRO: Nome é obrigatórios para busca";
  }

  return cursoModel.buscarCursoPorNome(nome);
}

function buscarCursoPorCategoriaa(categoria) {
  if (!categoria) {
    return "ERRO: Categoria é obrigatóriaaa para buscaa";
  }

  return cursoModel.buscarCursoPorCategoria(categoria);
}

function buscarCursoPorCargaHorariaa(cargaHoraria) {
  if (!cargaHoraria || cargaHoraria <= 0) {
    return "ERRO: Carga horária deve ser um numero positivoo para busca";
  }

  return cursoModel.buscarCursoPorCargaHoraria(cargaHoraria);
}

module.exports = {
  criarCursoo,
  listarCursos,
  buscarCursoPorNomee,
  buscarCursoPorCategoriaa,
  buscarCursoPorCargaHorariaa
};
