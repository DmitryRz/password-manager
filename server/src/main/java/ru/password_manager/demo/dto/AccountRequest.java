package ru.password_manager.demo.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AccountRequest {
    String name;
    String username;
    String password;
    String url;
    String description;
    String category;
}
