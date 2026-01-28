package com.manas.journalApp.services;

import com.manas.journalApp.Repositories.UserRepository;
import com.manas.journalApp.entity.User;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ArgumentsSource;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTests {
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;

    @Test
    public void testFindByUserName() {
       assertNotNull(userRepository.findByUserName("Boss"));
    }

    @Disabled
    @ParameterizedTest
    @CsvSource({
            "6,7,13"
    })
    public void testAdd(int a, int b, int expected){
        assertEquals(expected, a + b);
    }
    @ParameterizedTest
    @ArgumentsSource(UserArgumentsProvider.class)
    public void testSaveNewUser(User user){
        assertTrue(userService.saveNewUser(user));
    }

}
