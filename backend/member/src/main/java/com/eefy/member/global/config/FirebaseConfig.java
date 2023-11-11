package com.eefy.member.global.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.sdk.path}")
    private String firebaseSdkPath;

    @Bean
    public FirebaseMessaging initFirebaseMessaging() throws IOException {
        String file = FirebaseConfig.class.getClassLoader().getResource(firebaseSdkPath).getFile();
        FileInputStream serviceAccount = new FileInputStream(file);

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        return FirebaseMessaging.getInstance(FirebaseApp.initializeApp(options));
    }
}
