package com.example.accountservice.controller;

import com.example.accountservice.domain.User;
import com.example.accountservice.repository.UserRepository;
import com.example.accountservice.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.security.auth.UserPrincipal;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Sql(value = "/create_user_before.sql",  executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
@RunWith(SpringRunner.class)
class AccountControllerTest {

    private static final ObjectMapper mapper = new ObjectMapper();

    private MockMvc mockMvc;

    @InjectMocks
    private AccountController accountController;

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Before
    public void setup() {
        initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();
    }
    @Test
    void getCurrentUser() throws Exception {
        setup();
        final User user = new User();
        user.setEmail("test@gmail.com");
        user.setUsername("test");
        when(userService.getByName(user.getUsername())).thenReturn(Optional.of(user));
        mockMvc.perform(get("/current").principal(new UserPrincipal(user.getUsername())))
                .andExpect(jsonPath("$.name").value("test"))
                .andExpect(status().isOk());
    }

    @Test
    void getByName() throws Exception {
        setup();
        final User user = new User();
        user.setUsername("test");

        when(userService.getByName(user.getUsername())).thenReturn(Optional.of(user));

        mockMvc.perform(get("/" + user.getUsername()))
                .andExpect(jsonPath("$.username").value(user.getUsername()))
                .andExpect(status().isOk());
    }

    @Test
    void createUser() throws Exception {
        setup();
        final User user = new User();
        user.setUsername("test2");
        user.setPassword("password");
        user.setEmail("email2");
        user.setConfirmPassword("password");

        String json = mapper.writeValueAsString(user);
        mockMvc.perform(post("/create").principal(new UserPrincipal("test")).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk());
    }
}