const alunoService = require("../src/aluno.service");

describe("Testes Unitários do AlunoService", () => {
  
  test("deve criar um aluno com dados válidos", () => {
    const timestamp = Date.now();
    const emailUnico = `joao${timestamp}@email.com`;
    const cpfUnico = `1234567890${String(timestamp).slice(-1)}`;
    
    const resultado = alunoService.criarAluno(
      "João Silva",
      emailUnico,
      cpfUnico,
      "1990-01-01",
      "11999999999"
    );

    expect(resultado).toHaveProperty("id");
    expect(resultado.nome).toBe("João Silva");
    expect(resultado.email).toBe(emailUnico);
    expect(resultado.cpf).toBe(cpfUnico);
    expect(resultado.data_nascimento).toBe("1990-01-01");
    expect(resultado.telefone).toBe("11999999999");
  });

  test("deve falhar ao criar aluno sem nome", () => {
    const timestamp = Date.now() + 1;
    const emailUnico = `teste${timestamp}@email.com`;
    const cpfUnico = `9876543210${String(timestamp).slice(-1)}`;

    const resultado = alunoService.criarAluno(
      "",
      emailUnico,
      cpfUnico,
      "1990-01-01",
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Nome é obrigatório!");
  });

  test("deve falhar ao criar aluno com email inválido", () => {
    const timestamp = Date.now() + 2;
    const cpfUnico = `5555555555${String(timestamp).slice(-1)}`;

    const resultado = alunoService.criarAluno(
      "Maria Santos",
      "email-inválido",
      cpfUnico,
      "1990-01-01",
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Email deve ter um formato válido!");
  });

  test("deve falhar ao criar aluno com CPF inválido", () => {
    const timestamp = Date.now() + 3;
    const emailUnico = `maria${timestamp}@email.com`;

    const resultado = alunoService.criarAluno(
      "Maria Santos",
      emailUnico,
      "123", // CPF inválido
      "1990-01-01",
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: CPF deve ter 11 dígitos!");
  });

  test("deve listar todos os alunos", () => {
    const timestamp = Date.now() + 4;
    const emailUnico = `listagem${timestamp}@email.com`;
    const cpfUnico = `7777777777${String(timestamp).slice(-1)}`;

    // Criar um aluno primeiro
    alunoService.criarAluno(
      "Aluno Teste Listagem",
      emailUnico,
      cpfUnico,
      "1990-01-01",
      "11999999999"
    );

    const alunos = alunoService.listarAlunos();

    expect(Array.isArray(alunos)).toBe(true);
    expect(alunos.length).toBeGreaterThan(0);
    expect(alunos.some(aluno => aluno.email === emailUnico)).toBe(true);
  });

  test("deve buscar aluno por nome", () => {
    const timestamp = Date.now() + 6;
    const nomeUnico = `Aluno Busca Nome ${timestamp}`;
    const emailUnico = `busca.nome${timestamp}@email.com`;
    const cpfUnico = `6666666666${String(timestamp).slice(-1)}`;

    // Criar um aluno primeiro
    alunoService.criarAluno(
      nomeUnico,
      emailUnico,
      cpfUnico,
      "1990-01-01",
      "11999999999"
    );

    const alunoEncontrado = alunoService.buscarAlunoPorNome(nomeUnico);

    expect(alunoEncontrado).not.toBeNull();
    expect(alunoEncontrado.nome).toBe(nomeUnico);
  });

  test("deve retornar null ao buscar aluno por nome inexistente", () => {
    const timestamp = Date.now() + 7;
    const nomeInexistente = `Nome Inexistente ${timestamp}`;
    
    const aluno = alunoService.buscarAlunoPorNome(nomeInexistente);
    expect(aluno).toBeUndefined();
  });

  test("deve buscar aluno por email", () => {
    const timestamp = Date.now() + 8;
    const emailUnico = `busca.email${timestamp}@email.com`;
    const cpfUnico = `7777777777${String(timestamp).slice(-1)}`;

    // Criar um aluno primeiro
    alunoService.criarAluno(
      "Aluno Busca Email",
      emailUnico,
      cpfUnico,
      "1990-01-01",
      "11999999999"
    );

    const alunoEncontrado = alunoService.buscarAlunoPorEmail(emailUnico);

    expect(alunoEncontrado).not.toBeNull();
    expect(alunoEncontrado.email).toBe(emailUnico);
  });

  test("deve retornar null ao buscar aluno por email inexistente", () => {
    const timestamp = Date.now() + 9;
    const emailInexistente = `inexistente${timestamp}@email.com`;
    
    const aluno = alunoService.buscarAlunoPorEmail(emailInexistente);
    expect(aluno).toBeUndefined();
  });

  test("deve falhar ao buscar aluno com email vazio", () => {
    const resultado = alunoService.buscarAlunoPorEmail("");
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Email é obrigatório para busca");
  });

  test("deve falhar ao buscar aluno com nome vazio", () => {
    const resultado = alunoService.buscarAlunoPorNome("");
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Nome é obrigatório para busca");
  });

  test("deve falhar ao criar aluno sem email", () => {
    const timestamp = Date.now() + 10;
    const cpfUnico = `1111111111${String(timestamp).slice(-1)}`;

    const resultado = alunoService.criarAluno(
      "João Silva",
      "", // Email vazio
      cpfUnico,
      "1990-01-01",
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Email é obrigatório!");
  });

  test("deve falhar ao criar aluno com email null", () => {
    const timestamp = Date.now() + 11;
    const cpfUnico = `2222222222${String(timestamp).slice(-1)}`;

    const resultado = alunoService.criarAluno(
      "João Silva",
      null, // Email null
      cpfUnico,
      "1990-01-01",
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Email é obrigatório!");
  });

  test("deve falhar ao criar aluno sem CPF", () => {
    const timestamp = Date.now() + 12;
    const emailUnico = `teste.cpf.vazio${timestamp}@email.com`;

    const resultado = alunoService.criarAluno(
      "João Silva",
      emailUnico,
      "", // CPF vazio
      "1990-01-01",
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: CPF é obrigatório!");
  });

  test("deve falhar ao criar aluno com CPF null", () => {
    const timestamp = Date.now() + 13;
    const emailUnico = `teste.cpf.null${timestamp}@email.com`;

    const resultado = alunoService.criarAluno(
      "João Silva",
      emailUnico,
      null, // CPF null
      "1990-01-01",
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: CPF é obrigatório!");
  });

  test("deve falhar ao criar aluno sem data de nascimento", () => {
    const timestamp = Date.now() + 14;
    const emailUnico = `teste.data.vazia${timestamp}@email.com`;
    const cpfUnico = `3333333333${String(timestamp).slice(-1)}`;

    const resultado = alunoService.criarAluno(
      "João Silva",
      emailUnico,
      cpfUnico,
      "", // Data vazia
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Data de nascimento é obrigatória!");
  });

  test("deve falhar ao criar aluno com data de nascimento null", () => {
    const timestamp = Date.now() + 15;
    const emailUnico = `teste.data.null${timestamp}@email.com`;
    const cpfUnico = `4444444444${String(timestamp).slice(-1)}`;

    const resultado = alunoService.criarAluno(
      "João Silva",
      emailUnico,
      cpfUnico,
      null, // Data null
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Data de nascimento é obrigatória!");
  });

  test("deve falhar ao criar aluno com email já existente", () => {
    const timestamp = Date.now() + 16;
    const emailDuplicado = `email.duplicado${timestamp}@email.com`;
    const cpf1 = `5555555555${String(timestamp).slice(-1)}`;
    const cpf2 = `6666666666${String(timestamp).slice(-1)}`;

    // Criar primeiro aluno
    const primeiroAluno = alunoService.criarAluno(
      "Primeiro Aluno",
      emailDuplicado,
      cpf1,
      "1990-01-01",
      "11999999999"
    );
    expect(primeiroAluno).toHaveProperty("id");

    // Tentar criar segundo aluno com mesmo email
    const resultado = alunoService.criarAluno(
      "Segundo Aluno",
      emailDuplicado, // Email duplicado
      cpf2,
      "1990-01-01",
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Já existe um aluno cadastrado com este email!");
  });

  test("deve falhar ao criar aluno com CPF já existente", () => {
    const timestamp = Date.now() + 17;
    const email1 = `email1.cpf.duplicado${timestamp}@email.com`;
    const email2 = `email2.cpf.duplicado${timestamp}@email.com`;
    const cpfDuplicado = `7777777777${String(timestamp).slice(-1)}`;

    // Criar primeiro aluno
    const primeiroAluno = alunoService.criarAluno(
      "Primeiro Aluno CPF",
      email1,
      cpfDuplicado,
      "1990-01-01",
      "11999999999"
    );
    expect(primeiroAluno).toHaveProperty("id");

    // Tentar criar segundo aluno com mesmo CPF
    const resultado = alunoService.criarAluno(
      "Segundo Aluno CPF",
      email2,
      cpfDuplicado, // CPF duplicado
      "1990-01-01",
      "11999999999"
    );

    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Já existe um aluno cadastrado com este CPF!");
  });

  test("deve falhar ao buscar aluno por nome com nome apenas espaços", () => {
    const resultado = alunoService.buscarAlunoPorNome("   ");
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Nome é obrigatório para busca");
  });

  test("deve falhar ao buscar aluno por email com email apenas espaços", () => {
    const resultado = alunoService.buscarAlunoPorEmail("   ");
    
    expect(typeof resultado).toBe("string");
    expect(resultado).toBe("Erro: Email é obrigatório para busca");
  });
});
