package br.edu.iftm.ds.exemplos.atividade.repository;

import java.util.*;
import org.springframework.stereotype.Repository;
import java.util.stream.Collectors;

import br.edu.iftm.ds.exemplos.atividade.domain.Livro;

@Repository
public class LivroRepository {
    private List<Livro> livros = new ArrayList<>();

    public LivroRepository() {

        Livro poter = Livro.builder()
                .titulo("pe de abacate")
                .autor("Roberto")
                .dataLancamento("10/07/2006")
                .isbn("978-65-89999-01-3.")
                .build();
        Livro alice = Livro.builder()
                .titulo("alice")
                .autor("Gil Constantine")
                .dataLancamento("20/02/1889")
                .isbn("978-65-89999-02-4.")
                .build();
        Livro tania = Livro.builder()
                .titulo("Noite sem fim")
                .autor("Tania Azevedo ")
                .dataLancamento("24/02/1995")
                .isbn("978-65-89999-23-2.")
                .build();
        Livro jose = Livro.builder()
                .titulo("Contos de um excluido")
                .autor("Jose de Assis")
                .dataLancamento("20/12/1989")
                .isbn("978-65-89999-10-3.")
                .build();
        livros.add(poter);
        livros.add(alice);
        livros.add(tania);
        livros.add(jose);
    }

    public List<Livro> listTodos() {
        return livros;
    }

    public List<Livro> buscarTitulo(String titulo) {
        return livros.stream()
                .filter(l -> l.getTitulo().toLowerCase().contains(titulo.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Livro> buscarAutor(String autor) {
        return livros.stream()
                .filter(l -> l.getAutor().toLowerCase().contains(autor.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Livro buscarIsbn(String isbn) {
        return livros.stream()
                .filter(l -> l.getIsbn().equals(isbn))
                .findFirst()
                .orElse(null);
    }

    public void save(Livro livro) {
        livros.add(livro);

    }

}