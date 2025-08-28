# Sistema de Gerenciamento Escolar

Este é um sistema de gerenciamento escolar desenvolvido em Node.js que permite administrar alunos, cursos e matrículas.

## 🚀 Funcionalidades

### Gestão de Alunos
- ✅ Cadastrar alunos com dados pessoais (nome, email, CPF, data de nascimento, telefone)
- ✅ Listar todos os alunos
- ✅ Buscar alunos por nome ou email
- ✅ Validações de dados obrigatórios e formatos
- ✅ Prevenção de duplicação de email e CPF

### Gestão de Cursos
- ✅ Cadastrar cursos com informações detalhadas (nome, descrição, carga horária, categoria, preço)
- ✅ Listar todos os cursos
- ✅ Buscar cursos por nome, categoria ou carga horária
- ✅ Validações de dados obrigatórios
- ✅ Suporte a cursos gratuitos (preço = 0)

### Gestão de Matrículas
- ✅ Matricular alunos em cursos
- ✅ Controle de status da matrícula (ATIVA, CONCLUIDA, CANCELADA)
- ✅ Listar matrículas por aluno ou por curso
- ✅ Prevenir matrículas duplicadas em cursos ativos
- ✅ Cancelar e concluir matrículas
- ✅ Permitir nova matrícula após cancelamento

## 🏗️ Arquitetura

O sistema segue uma arquitetura em camadas:

```
src/
├── *.model.js     # Camada de dados (CRUD básico)
└── *.service.js   # Camada de lógica de negócios (validações)

__tests__/
├── *.test.js           # Testes unitários
└── *.integration.test.js # Testes de integração
```

### Modelos (Models)
- `src/aluno.model.js` - Operações CRUD para alunos
- `src/curso.model.js` - Operações CRUD para cursos  
- `src/matricula.model.js` - Operações CRUD para matrículas

### Serviços (Services)
- `src/aluno.service.js` - Lógica de negócio e validações para alunos
- `src/curso.service.js` - Lógica de negócio e validações para cursos
- `src/matricula.service.js` - Lógica de negócio e validações para matrículas

### Testes
- `__tests__/aluno.test.js` - Testes unitários de alunos
- `__tests__/curso.test.js` - Testes unitários de cursos
- `__tests__/escola.integration.test.js` - **Testes de integração**

## 🧪 Testes

O projeto possui uma suíte completa de testes:

### Testes Unitários
- **Alunos**: Validação de dados, prevenção de duplicatas, buscas
- **Cursos**: Validação de dados, buscas por diferentes critérios
- **Matrículas**: Validações de relacionamentos, controle de status

### Testes de Integração
- **Fluxo completo**: Criação de aluno → curso → matrícula
- **Múltiplas entidades**: Vários alunos em vários cursos
- **Validações em cascata**: Teste de integridade referencial
- **Cenários de erro**: Dados inválidos e situações excepcionais

### Executar Testes

```bash
# Todos os testes
npm test

# Com relatório de cobertura
npm run test-coverage

# Apenas testes de integração
npm test __tests__/escola.integration.test.js
```

## 📊 Cobertura de Testes

O sistema possui alta cobertura de testes:
- **Statements**: 80.54%
- **Branches**: 77.88%
- **Functions**: 75.86%
- **Lines**: 80.89%

## 💻 Como Usar

### Exemplo de Uso Básico

```javascript
const alunoService = require('./src/aluno.service');
const cursoService = require('./src/curso.service');
const matriculaService = require('./src/matricula.service');

// 1. Criar um aluno
const aluno = alunoService.criarAluno(
  "João Silva",
  "joao@email.com", 
  "12345678901",
  "1990-01-01",
  "11999999999"
);

// 2. Criar um curso
const curso = cursoService.criarCurso(
  "JavaScript Básico",
  "Curso introdutório de JavaScript",
  40,
  "Programação",
  299.99
);

// 3. Matricular o aluno no curso
const matricula = matriculaService.matricularAluno(aluno.id, curso.id);

// 4. Listar matrículas do aluno
const matriculasDoAluno = matriculaService.listarMatriculasDoAluno(aluno.id);
```

## 🔍 Validações Implementadas

### Alunos
- Nome obrigatório
- Email obrigatório e com formato válido
- CPF obrigatório e com 11 dígitos
- Data de nascimento obrigatória
- Email único no sistema
- CPF único no sistema

### Cursos
- Nome obrigatório
- Descrição obrigatória
- Carga horária obrigatória e positiva
- Preço obrigatório e não negativo

### Matrículas
- Aluno deve existir no sistema
- Curso deve existir no sistema
- Não permite matrícula duplicada em curso ativo
- Permite nova matrícula após cancelamento

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Jest** - Framework de testes
- **JavaScript ES6+** - Linguagem de programação

## 📈 Melhorias Futuras

- [ ] Banco de dados persistente
- [ ] API REST
- [ ] Interface web
- [ ] Autenticação de usuários
- [ ] Relatórios avançados
- [ ] Sistema de notas e avaliações

---

## 🧑‍💻 Desenvolvido por

Sistema desenvolvido como exemplo de arquitetura em camadas com testes de integração completos.
