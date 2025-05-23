package br.edu.iftm.ds.exemplos.atividade.control;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.edu.iftm.ds.exemplos.atividade.domain.Livro;
import br.edu.iftm.ds.exemplos.atividade.repository.LivroRepository;

@RestController
@RequestMapping("/livro")
@CrossOrigin(origins = "*")
public class LivroControl {
    private final LivroRepository repository;

    public LivroControl(LivroRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Livro> filtro(@RequestParam(required = false) String titulo,
            @RequestParam(required = false) String autor) {
        if (titulo != null)
            return repository.buscarTitulo(titulo);
        else if (autor != null)
            return repository.buscarAutor(autor);
        else
            return repository.listTodos();
    }

    @GetMapping("/{isbn}")
    public Livro getLivroIsbn(@PathVariable("isbn") String isbn) {
        return repository.buscarIsbn(isbn);
    }

    @PostMapping
    public ResponseEntity<Livro> criarLivro(@RequestBody Livro livro) {
        repository.save(livro);
        return ResponseEntity.status(HttpStatus.CREATED).body(livro);
    }

}
