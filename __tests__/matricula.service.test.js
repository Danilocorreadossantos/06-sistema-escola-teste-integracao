const matriculaService = require("../src/matricula.service");
const alunoService = require("../src/aluno.service");
const cursoService = require("../src/curso.service");

describe("Testes Unitários do MatriculaService", () => {

  test("deve matricular um aluno em um curso com sucesso", () => {
    const timestamp = Date.now();
    
    // Criar aluno e curso primeiro usando os services
    const aluno = alunoService.criarAluno(
      `Aluno Teste Matrícula ${timestamp}`,
      `aluno.matricula${timestamp}@escola.com`,
      `1234567890${String(timestamp).slice(-1)}`,
      "1995-05-15",
      "11999888777"
    );

    const curso = cursoService.criarCurso(
      `Curso Teste Matrícula ${timestamp}`,
      "Curso para teste de matrícula",
      60,
      "Teste",
      150.00
    );

    const matricula = matriculaService.matricularAluno(aluno.id, curso.id);

    expect(matricula).toHaveProperty("id");
    expect(matricula.aluno_id).toBe(aluno.id);
    expect(matricula.curso_id).toBe(curso.id);
    expect(matricula.status).toBe("ATIVA");
    expect(matricula).toHaveProperty("data_matricula");
  });

  test("deve falhar ao tentar matricular aluno inexistente", () => {
    const timestamp = Date.now() + 1;
    
    const curso = cursoService.criarCurso(
      `Curso Teste Aluno Inexistente ${timestamp}`,
      "Curso para teste com aluno inexistente",
      60,
      "Teste",
      150.00
    );

    const resultado = matriculaService.matricularAluno(999999, curso.id);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Aluno não encontrado!");
  });

  test("deve falhar ao tentar matricular em curso inexistente", () => {
    const timestamp = Date.now() + 2;
    
    const aluno = alunoService.criarAluno(
      `Aluno Curso Inexistente ${timestamp}`,
      `aluno.curso.inexistente${timestamp}@escola.com`,
      `9876543210${String(timestamp).slice(-1)}`,
      "1990-03-20",
      "11888777666"
    );

    const resultado = matriculaService.matricularAluno(aluno.id, 999999);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Curso não encontrado!");
  });

  test("deve cancelar matrícula com sucesso", () => {
    const timestamp = Date.now() + 3;
    
    const aluno = alunoService.criarAluno(
      `Aluno Cancelamento ${timestamp}`,
      `aluno.cancelamento${timestamp}@escola.com`,
      `1357924680${String(timestamp).slice(-1)}`,
      "1992-07-10",
      "11777666555"
    );

    const curso = cursoService.criarCurso(
      `Curso Cancelamento ${timestamp}`,
      "Curso para teste de cancelamento",
      80,
      "Teste",
      200.00
    );

    const matricula = matriculaService.matricularAluno(aluno.id, curso.id);
    const matriculaCancelada = matriculaService.cancelarMatricula(matricula.id);

    expect(matriculaCancelada.status).toBe("CANCELADA");
    expect(matriculaCancelada.id).toBe(matricula.id);
  });

  test("deve falhar ao tentar cancelar matrícula inexistente", () => {
    const resultado = matriculaService.cancelarMatricula(999999);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Matrícula não encontrada!");
  });

  test("deve listar matrículas do aluno", () => {
    const timestamp = Date.now() + 4;
    
    const aluno = alunoService.criarAluno(
      `Aluno Lista Matrículas ${timestamp}`,
      `aluno.lista${timestamp}@escola.com`,
      `2468135790${String(timestamp).slice(-1)}`,
      "1988-12-01",
      "11666555444"
    );

    const curso1 = cursoService.criarCurso(
      `Curso Lista 1 ${timestamp}`,
      "Primeiro curso para lista",
      50,
      "Teste",
      100.00
    );

    const curso2 = cursoService.criarCurso(
      `Curso Lista 2 ${timestamp}`,
      "Segundo curso para lista",
      70,
      "Teste",
      175.00
    );

    matriculaService.matricularAluno(aluno.id, curso1.id);
    matriculaService.matricularAluno(aluno.id, curso2.id);

    const matriculas = matriculaService.listarMatriculasDoAluno(aluno.id);

    expect(Array.isArray(matriculas)).toBe(true);
    expect(matriculas.length).toBe(2);
    expect(matriculas.every(m => m.aluno_id === aluno.id)).toBe(true);
  });

  test("deve retornar array vazio para aluno sem matrículas", () => {
    const timestamp = Date.now() + 5;
    
    const aluno = alunoService.criarAluno(
      `Aluno Sem Matrícula ${timestamp}`,
      `aluno.sem.matricula${timestamp}@escola.com`,
      `9876543210${String(timestamp).slice(-1)}`,
      "1985-09-25",
      "11555444333"
    );

    const matriculas = matriculaService.listarMatriculasDoAluno(aluno.id);

    expect(Array.isArray(matriculas)).toBe(true);
    expect(matriculas.length).toBe(0);
  });

  test("deve listar matrículas do curso", () => {
    const timestamp = Date.now() + 6;
    
    const curso = cursoService.criarCurso(
      `Curso Múltiplas Matrículas ${timestamp}`,
      "Curso com vários alunos",
      90,
      "Teste",
      250.00
    );

    const aluno1 = alunoService.criarAluno(
      `Primeiro Aluno ${timestamp}`,
      `primeiro.aluno${timestamp}@escola.com`,
      `1111111111${String(timestamp).slice(-1)}`,
      "1990-01-01",
      "11111111111"
    );

    const aluno2 = alunoService.criarAluno(
      `Segundo Aluno ${timestamp}`,
      `segundo.aluno${timestamp}@escola.com`,
      `2222222222${String(timestamp).slice(-1)}`,
      "1991-02-02",
      "11222222222"
    );

    matriculaService.matricularAluno(aluno1.id, curso.id);
    matriculaService.matricularAluno(aluno2.id, curso.id);

    const matriculas = matriculaService.listarMatriculasDoCurso(curso.id);

    expect(Array.isArray(matriculas)).toBe(true);
    expect(matriculas.length).toBe(2);
    expect(matriculas.every(m => m.curso_id === curso.id)).toBe(true);
  });

  test("deve retornar array vazio para curso sem matrículas", () => {
    const timestamp = Date.now() + 7;
    
    const curso = cursoService.criarCurso(
      `Curso Vazio ${timestamp}`,
      "Curso sem alunos",
      40,
      "Teste",
      80.00
    );

    const matriculas = matriculaService.listarMatriculasDoCurso(curso.id);

    expect(Array.isArray(matriculas)).toBe(true);
    expect(matriculas.length).toBe(0);
  });

  test("deve buscar matrícula por ID", () => {
    const timestamp = Date.now() + 8;
    
    const aluno = alunoService.criarAluno(
      `Aluno Busca ID ${timestamp}`,
      `aluno.busca.id${timestamp}@escola.com`,
      `3456789012${String(timestamp).slice(-1)}`,
      "1993-04-18",
      "11333333333"
    );

    const curso = cursoService.criarCurso(
      `Curso Busca ID ${timestamp}`,
      "Curso para busca por ID",
      65,
      "Teste",
      190.00
    );

    const matricula = matriculaService.matricularAluno(aluno.id, curso.id);
    const matriculaEncontrada = matriculaService.buscarMatriculaPorId(matricula.id);

    expect(matriculaEncontrada).not.toBeNull();
    expect(matriculaEncontrada.id).toBe(matricula.id);
    expect(matriculaEncontrada.aluno_id).toBe(aluno.id);
    expect(matriculaEncontrada.curso_id).toBe(curso.id);
  });

  test("deve retornar null ao buscar matrícula inexistente", () => {
    const matricula = matriculaService.buscarMatriculaPorId(999999);
    expect(matricula).toBeNull();
  });

  test("deve listar todas as matrículas", () => {
    const timestamp = Date.now() + 9;
    
    const aluno = alunoService.criarAluno(
      `Aluno Lista Todas ${timestamp}`,
      `aluno.lista.todas${timestamp}@escola.com`,
      `5678901234${String(timestamp).slice(-1)}`,
      "1989-11-30",
      "11444444444"
    );

    const curso = cursoService.criarCurso(
      `Curso Lista Todas ${timestamp}`,
      "Curso para listagem completa",
      55,
      "Teste",
      130.00
    );

    const matriculasAntes = matriculaService.listarTodasMatriculas().length;
    
    matriculaService.matricularAluno(aluno.id, curso.id);
    
    const matriculasDepois = matriculaService.listarTodasMatriculas();

    expect(Array.isArray(matriculasDepois)).toBe(true);
    expect(matriculasDepois.length).toBe(matriculasAntes + 1);
  });

  test("deve concluir matrícula com sucesso", () => {
    const timestamp = Date.now() + 10;
    
    const aluno = alunoService.criarAluno(
      `Aluno Conclusão ${timestamp}`,
      `aluno.conclusao${timestamp}@escola.com`,
      `6789012345${String(timestamp).slice(-1)}`,
      "1994-08-12",
      "11555555555"
    );

    const curso = cursoService.criarCurso(
      `Curso Conclusão ${timestamp}`,
      "Curso para teste de conclusão",
      75,
      "Teste",
      220.00
    );

    const matricula = matriculaService.matricularAluno(aluno.id, curso.id);
    const matriculaConcluida = matriculaService.concluirMatricula(matricula.id);

    expect(matriculaConcluida.status).toBe("CONCLUIDA");
    expect(matriculaConcluida.id).toBe(matricula.id);
  });

  test("deve falhar ao tentar concluir matrícula inexistente", () => {
    const resultado = matriculaService.concluirMatricula(999999);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Matrícula não encontrada!");
  });

  test("deve falhar ao matricular aluno sem ID do aluno", () => {
    const timestamp = Date.now() + 11;
    
    const curso = cursoService.criarCurso(
      `Curso Teste ID Aluno ${timestamp}`,
      "Curso para teste sem ID do aluno",
      60,
      "Teste",
      150.00
    );

    const resultado = matriculaService.matricularAluno(null, curso.id);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: ID do aluno é obrigatório!");
  });

  test("deve falhar ao matricular aluno sem ID do curso", () => {
    const timestamp = Date.now() + 12;
    
    const aluno = alunoService.criarAluno(
      `Aluno Teste ID Curso ${timestamp}`,
      `aluno.teste.id.curso${timestamp}@escola.com`,
      `1234567890${String(timestamp).slice(-1)}`,
      "1990-03-20",
      "11888777666"
    );

    const resultado = matriculaService.matricularAluno(aluno.id, null);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: ID do curso é obrigatório!");
  });

  test("deve falhar ao tentar matricular aluno já matriculado no mesmo curso", () => {
    const timestamp = Date.now() + 13;
    
    const aluno = alunoService.criarAluno(
      `Aluno Dupla Matrícula ${timestamp}`,
      `aluno.dupla${timestamp}@escola.com`,
      `9876543210${String(timestamp).slice(-1)}`,
      "1990-03-20",
      "11888777666"
    );

    const curso = cursoService.criarCurso(
      `Curso Dupla Matrícula ${timestamp}`,
      "Curso para teste de matrícula dupla",
      60,
      "Teste",
      150.00
    );

    // Primeira matrícula (deve funcionar)
    const primeiraMatricula = matriculaService.matricularAluno(aluno.id, curso.id);
    expect(primeiraMatricula).toHaveProperty("id");

    // Segunda matrícula (deve falhar)
    const resultado = matriculaService.matricularAluno(aluno.id, curso.id);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Aluno já está matriculado neste curso!");
  });

  test("deve falhar ao listar matrículas sem ID do aluno", () => {
    const resultado = matriculaService.listarMatriculasDoAluno(null);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: ID do aluno é obrigatório!");
  });

  test("deve falhar ao listar matrículas sem ID do curso", () => {
    const resultado = matriculaService.listarMatriculasDoCurso(null);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: ID do curso é obrigatório!");
  });

  test("deve falhar ao cancelar matrícula sem ID", () => {
    const resultado = matriculaService.cancelarMatricula(null);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: ID da matrícula é obrigatório!");
  });

  test("deve falhar ao concluir matrícula sem ID", () => {
    const resultado = matriculaService.concluirMatricula(null);
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: ID da matrícula é obrigatório!");
  });

  test("deve retornar null ao buscar matrícula sem ID", () => {
    const resultado = matriculaService.buscarMatriculaPorId(null);
    
    expect(resultado).toBeNull();
  });

  test("deve retornar null ao buscar matrícula com ID vazio", () => {
    const resultado = matriculaService.buscarMatriculaPorId("");
    
    expect(resultado).toBeNull();
  });

  test("deve retornar null ao buscar matrícula com ID undefined", () => {
    const resultado = matriculaService.buscarMatriculaPorId(undefined);
    
    expect(resultado).toBeNull();
  });

  test("deve listar matrículas usando método listarMatriculas", () => {
    const timestamp = Date.now() + 20;
    
    const aluno = alunoService.criarAluno(
      `Aluno Lista Matrículas ${timestamp}`,
      `aluno.lista.matriculas${timestamp}@escola.com`,
      `5678901234${String(timestamp).slice(-1)}`,
      "1989-11-30",
      "11444444444"
    );

    const curso = cursoService.criarCurso(
      `Curso Lista Matrículas ${timestamp}`,
      "Curso para listagem de matrículas",
      55,
      "Teste",
      130.00
    );

    const matriculasAntes = matriculaService.listarMatriculas().length;
    
    matriculaService.matricularAluno(aluno.id, curso.id);
    
    const matriculasDepois = matriculaService.listarMatriculas();

    expect(Array.isArray(matriculasDepois)).toBe(true);
    expect(matriculasDepois.length).toBe(matriculasAntes + 1);
  });
});
