package br.edu.iftm.ds.exemplos.atividade.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor

public class Livro {
    private String titulo;
    private String autor;
    private String dataLancamento;
    private String isbn;

}