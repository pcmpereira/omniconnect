package com.omniconnect.service;



import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.omniconnect.model.User;

@Service
public class UserService {
    private static final String VIACEP_URL = "https://viacep.com.br/ws/%s/json/";

    public String createUser(User user) {
        String addressInfo = validateAddress(user.getCep());
        if (addressInfo != null) {
            return String.format("Conta criada para %s with address %s.", user.getName(), addressInfo);
        } else {
            return "Endereço inválido ! Informe um CEP correto.";
        }
    }

    private String validateAddress(String cep) {
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format(VIACEP_URL, cep);
        try {
            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            return null;
        }
    }
}