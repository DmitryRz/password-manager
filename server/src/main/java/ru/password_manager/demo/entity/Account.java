package ru.password_manager.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "name", unique = true, nullable = false)
    String name;

    @Column(name = "username")
    String username;

    @Column(name = "password")
    String password;

    @Column(name = "URL")
    String url;

    @Column(name = "description")
    String description;

    @Column(name = "category")
    String category;
}
