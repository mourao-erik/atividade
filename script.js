        const API = "http://localhost:8080/livro";
        
        
        async function cadastrarLivro() {
            const titulo = document.getElementById('titulo').value.trim();
            const autor = document.getElementById('autor').value.trim();
            const dataLancamento = document.getElementById('dataLancamento').value.trim();
            const isbn = document.getElementById('isbn').value.trim();
            
        
            if (!titulo || !autor || !dataLancamento || !isbn) {
                showMessage("Todos os campos são obrigatórios!", "error");
                return;
            }
            
            const novoLivro = {
                titulo: titulo,
                autor: autor,
                dataLancamento: dataLancamento,
                isbn: isbn
            };
            
            try {
                const response = await fetch(API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novoLivro)
                });
                
                if (response.ok) {
                    showMessage("Livro cadastrado com sucesso!", "success");
                    // Limpa o formulário
                    document.getElementById('titulo').value = '';
                    document.getElementById('autor').value = '';
                    document.getElementById('dataLancamento').value = '';
                    document.getElementById('isbn').value = '';
                    
                    // Atualiza a lista de livros
                    listarTodos();
                } else {
                    const errorData = await response.json();
                    showMessage(`Erro: ${errorData.message || "Falha ao cadastrar livro"}`, "error");
                }
            } catch (error) {
                console.error("Erro:", error);
                showMessage("Erro ao conectar com o servidor", "error");
            }
        }
        
        // Função auxiliar para mostrar mensagens
        function showMessage(message, type) {
            const msgElement = document.getElementById('mensagem');
            msgElement.textContent = message;
            msgElement.className = type;
        }
        
        // Funções existentes de busca (mantidas como no seu código original)
        async function fetchData(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error("Erro na requisição:", error);
                document.getElementById('resultado').innerHTML = 
                    `<p style="color: red;">Erro: ${error.message}</p>`;
                return null;
            }
        }
        
        function displayResults(data) {
            const resultadoDiv = document.getElementById('resultado');
            
            if (!data || (Array.isArray(data) && data.length === 0)) {
                resultadoDiv.innerHTML = "<p>Nenhum livro encontrado.</p>";
                return;
            }
            
            const livros = Array.isArray(data) ? data : [data];
            
            let html = `
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Data de Lançamento</th>
                            <th>ISBN</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            livros.forEach(livro => {
                html += `
                    <tr>
                        <td>${livro.titulo || '-'}</td>
                        <td>${livro.autor || '-'}</td>
                        <td>${livro.dataLancamento || '-'}</td>
                        <td>${livro.isbn || '-'}</td>
                    </tr>
                `;
            });
            
            html += `
                    </tbody>
                </table>
            `;
            
            resultadoDiv.innerHTML = html;
        }
        
        async function buscarPorTitulo() {
            const titulo = document.getElementById('tituloInput').value.trim();
            if (!titulo) {
                showMessage("Por favor, digite um título para buscar.", "error");
                return;
            }
            const livros = await fetchData(`${API}?titulo=${encodeURIComponent(titulo)}`);
            if (livros) displayResults(livros);
        }
        
        async function buscarPorAutor() {
            const autor = document.getElementById('autorInput').value.trim();
            if (!autor) {
                showMessage("Por favor, digite um autor para buscar.", "error");
                return;
            }
            const livros = await fetchData(`${API}?autor=${encodeURIComponent(autor)}`);
            if (livros) displayResults(livros);
        }
        
        async function buscarPorIsbn() {
            const isbn = document.getElementById('isbnInput').value.trim();
            if (!isbn) {
                showMessage("Por favor, digite um ISBN para buscar.", "error");
                return;
            }
            const livro = await fetchData(`${API}/${encodeURIComponent(isbn)}`);
            displayResults(livro);
        }
        
        async function listarTodos() {
            const livros = await fetchData(API);
            if (livros) displayResults(livros);
        }
        
        // Carrega todos os livros ao abrir a página
        window.onload = listarTodos;