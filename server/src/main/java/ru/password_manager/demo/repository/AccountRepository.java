package ru.password_manager.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.password_manager.demo.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
}
