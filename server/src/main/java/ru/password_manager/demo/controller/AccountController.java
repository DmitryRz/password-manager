package ru.password_manager.demo.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.password_manager.demo.dto.AccountRequest;
import ru.password_manager.demo.dto.AccountResponse;
import ru.password_manager.demo.service.AccountService;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/{id}") // Исправлено с :id на {id}
    public ResponseEntity<AccountResponse> getAccount(@PathVariable Long id) {
        log.info("Запрос на получение аккаунта id={}", id);
        AccountResponse response = accountService.getAccount(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<AccountResponse>> getAccounts() {
        log.info("Запрос на получение списка всех аккаунтов");
        List<AccountResponse> response = accountService.getAccounts();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(@RequestBody AccountRequest request) {
        log.info("Запрос на создание нового аккаунта для: {}", request.getUsername());
        AccountResponse response = accountService.createAccount(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountResponse> updateAccount(@PathVariable Long id, @RequestBody AccountRequest request) {
        log.info("Запрос на обновление аккаунта id={}", id);
        AccountResponse response = accountService.updateAccount(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        log.info("Запрос на удаление аккаунта id={}", id);
        accountService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }
}