const cursoService = require("../src/curso.service");

test("deve criar um curso com dados válidos", () => {
  const timestamp = Date.now();
  const nomeUnico = `JavaScript Básico ${timestamp}`;

  const resultado = cursoService.criarCurso(
    nomeUnico,
    "Curso de JavaScript para iniciantes",
    40,
    "Programação",
    299.99
  );

  expect(resultado).toHaveProperty("id");
  expect(resultado.nome).toBe(nomeUnico);
  expect(resultado.descricao).toBe("Curso de JavaScript para iniciantes");
  expect(resultado.carga_horaria).toBe(40);
  expect(resultado.categoria).toBe("Programação");
  expect(resultado.preco).toBe(299.99);
});

test("deve falhar ao criar curso sem nome", () => {
  const resultado = cursoService.criarCurso(
    "",
    "Descrição do curso",
    40,
    "Programação",
    299.99
  );

  expect(typeof resultado).toBe("string");
  expect(resultado).toBe("Erro: Nome do curso é obrigatório!");
});

test("deve falhar ao criar curso sem descrição", () => {
  const timestamp = Date.now() + 1;
  const nomeUnico = `Curso Sem Descrição ${timestamp}`;

  const resultado = cursoService.criarCurso(
    nomeUnico,
    "",
    40,
    "Programação",
    299.99
  );

  expect(typeof resultado).toBe("string");
  expect(resultado).toBe("Erro: Descrição do curso é obrigatória!");
});

test("deve falhar ao criar curso com carga horária inválida", () => {
  const timestamp = Date.now() + 2;
  const nomeUnico = `Curso Carga Inválida ${timestamp}`;

  const resultado = cursoService.criarCurso(
    nomeUnico,
    "Descrição do curso",
    -10, // Carga horária negativa
    "Programação",
    299.99
  );

  expect(typeof resultado).toBe("string");
  expect(resultado).toBe("Erro: Carga horária deve ser um número positivo!");
});

test("deve criar curso mesmo sem categoria", () => {
  const timestamp = Date.now() + 3;
  const nomeUnico = `Curso Sem Categoria ${timestamp}`;

  const resultado = cursoService.criarCurso(
    nomeUnico,
    "Descrição do curso",
    40,
    "",
    299.99
  );

  // Como não há validação de categoria no service, deve funcionar
  expect(resultado).toHaveProperty("id");
  expect(resultado.nome).toBe(nomeUnico);
});

test("deve falhar ao criar curso com preço inválido", () => {
  const timestamp = Date.now() + 4;
  const nomeUnico = `Curso Preço Inválido ${timestamp}`;

  const resultado = cursoService.criarCurso(
    nomeUnico,
    "Descrição do curso",
    40,
    "Programação",
    -50 // Preço negativo
  );

  expect(typeof resultado).toBe("string");
  expect(resultado).toBe(
    "Erro: Preço deve ser um número maior ou igual a zero!"
  );
});

test("deve listar todos os cursos", () => {
  const timestamp = Date.now() + 5;
  const nomeUnico = `Curso para Listagem ${timestamp}`;

  // Criar um curso primeiro
  cursoService.criarCurso(
    nomeUnico,
    "Curso para teste de listagem",
    50,
    "Teste",
    199.99
  );

  const cursos = cursoService.listarCursos();

  expect(Array.isArray(cursos)).toBe(true);
  expect(cursos.length).toBeGreaterThan(0);
  expect(cursos.some((curso) => curso.nome === nomeUnico)).toBe(true);
});

test("deve buscar curso por nome", () => {
  const timestamp = Date.now() + 6;
  const nomeUnico = `Curso Busca Nome ${timestamp}`;

  // Criar um curso primeiro
  cursoService.criarCurso(
    nomeUnico,
    "Curso para busca por nome",
    70,
    "Teste",
    349.99
  );

  const cursoEncontrado = cursoService.buscarCursoPorNome(nomeUnico);

  expect(cursoEncontrado).not.toBeNull();
  expect(cursoEncontrado.nome).toBe(nomeUnico);
});

test("deve retornar null ao buscar curso por nome inexistente", () => {
  const timestamp = Date.now() + 7;
  const nomeInexistente = `Curso Inexistente ${timestamp}`;

  const curso = cursoService.buscarCursoPorNome(nomeInexistente);
  expect(curso).toBeUndefined();
});

test("deve buscar cursos por categoria", () => {
  const timestamp = Date.now() + 8;
  const nomeUnico = `Curso Categoria ${timestamp}`;
  const categoriaUnica = `TestCategoria${timestamp}`;

  // Criar um curso com categoria específica
  cursoService.criarCurso(
    nomeUnico,
    "Curso para teste de categoria",
    80,
    categoriaUnica,
    399.99
  );

  const cursosCategoria = cursoService.buscarCursoPorCategoria(categoriaUnica);

  expect(Array.isArray(cursosCategoria)).toBe(true);
  expect(cursosCategoria.length).toBeGreaterThan(0);
  expect(
    cursosCategoria.every((curso) => curso.categoria === categoriaUnica)
  ).toBe(true);
});

test("deve retornar array vazio para categoria inexistente", () => {
  const timestamp = Date.now() + 9;
  const categoriaInexistente = `CategoriaInexistente${timestamp}`;

  const cursos = cursoService.buscarCursoPorCategoria(categoriaInexistente);

  expect(Array.isArray(cursos)).toBe(true);
  expect(cursos.length).toBe(0);
});

test("deve falhar ao buscar curso com nome vazio", () => {
  const resultado = cursoService.buscarCursoPorNome("");

  expect(typeof resultado).toBe("string");
  expect(resultado).toBe("Erro: Nome é obrigatório para busca");
});

test("deve falhar ao buscar cursos com categoria vazia", () => {
  const resultado = cursoService.buscarCursoPorCategoria("");

  expect(typeof resultado).toBe("string");
  expect(resultado).toBe("Erro: Categoria é obrigatória para busca");
});
