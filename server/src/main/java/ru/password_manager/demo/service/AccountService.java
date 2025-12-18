package ru.password_manager.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.password_manager.demo.dto.AccountRequest;
import ru.password_manager.demo.dto.AccountResponse;
import ru.password_manager.demo.entity.Account;
import ru.password_manager.demo.exception.ResourceNotFoundException;
import ru.password_manager.demo.repository.AccountRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountResponse getAccount(Long id) {
        return accountRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Аккаунт не найден"));
    }

    public List<AccountResponse> getAccounts() {
        return accountRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AccountResponse createAccount(AccountRequest request) {
        Account account = Account.builder()
                .name(request.getName())
                .username(request.getUsername())
                .password(request.getPassword())
                .url(request.getUrl())
                .description(request.getDescription())
                .category(request.getCategory())
                .build();

        Account savedAccount = accountRepository.save(account);
        return mapToResponse(savedAccount);
    }

    public AccountResponse updateAccount(Long id, AccountRequest request) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Аккаунт не найден"));

        account.setName(request.getName());
        account.setUsername(request.getUsername());
        account.setPassword(request.getPassword());
        account.setUrl(request.getUrl());
        account.setDescription(request.getDescription());
        account.setCategory(request.getCategory());

        return mapToResponse(accountRepository.save(account));
    }

    public void deleteAccount(Long id) {
        if (!accountRepository.existsById(id)) {
            throw new ResourceNotFoundException("Аккаунт не найден");
        }
        accountRepository.deleteById(id);
    }

    private AccountResponse mapToResponse(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .name(account.getName())
                .username(account.getUsername())
                .password(account.getPassword())
                .url(account.getUrl())
                .description(account.getDescription())
                .category(account.getCategory())
                .build();
    }
}