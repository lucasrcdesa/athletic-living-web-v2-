package com.salucas.athleticLiving.api.avaliacao;

import com.salucas.athleticLiving.application.avaliacao.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
@RequiredArgsConstructor
public class AvaliacaoController {

    private final CadastrarAvaliacaoService cadastrarAvaliacaoService;
    private final ListarAvaliacoesService listarAvaliacoesService;
    private final BuscarAvaliacaoPorIdService buscarAvaliacaoPorIdService;
    private final AtualizarAvaliacaoService atualizarAvaliacaoService;
    private final DeletarAvaliacaoService deletarAvaliacaoService;
    private final ListarMinhasAvaliacoesService listarMinhasAvaliacoesService;
    private final CadastrarAvaliacoesEmLoteService cadastrarAvaliacoesEmLoteService;

    @PostMapping
    public ResponseEntity<AvaliacaoResponseDTO> cadastrar(@RequestBody AvaliacaoRequestDTO dto) {
        AvaliacaoResponseDTO response = cadastrarAvaliacaoService.cadastrar(dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<AvaliacaoResponseDTO>> listarTodos() {
        List<AvaliacaoResponseDTO> avaliacoes = listarAvaliacoesService.listarAvaliacoes();
        return ResponseEntity.ok(avaliacoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvaliacaoResponseDTO> buscarPorId(@PathVariable Long id) {
        AvaliacaoResponseDTO avaliacao = buscarAvaliacaoPorIdService.buscarPorId(id);
        return ResponseEntity.ok(avaliacao);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AvaliacaoResponseDTO> atualizar(@PathVariable Long id, @RequestBody AvaliacaoRequestDTO dto) {
        AvaliacaoResponseDTO response = atualizarAvaliacaoService.atualizar(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        deletarAvaliacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<List<AvaliacaoResponseDTO>> listarPorAluno(@PathVariable Long alunoId) {
        List<AvaliacaoResponseDTO> avaliacoes = listarMinhasAvaliacoesService.listarPorAlunoId(alunoId);
        return ResponseEntity.ok(avaliacoes);
    }

    @PostMapping("/lote")
    public ResponseEntity<List<AvaliacaoResponseDTO>> cadastrarEmLote(@RequestBody List<AvaliacaoRequestDTO> dtos) {
        List<AvaliacaoResponseDTO> response = cadastrarAvaliacoesEmLoteService.executar(dtos);
        return ResponseEntity.ok(response);
    }
} 