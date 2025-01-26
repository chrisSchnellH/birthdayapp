package com.chrisSchnellH.backend.controller;

import com.chrisSchnellH.backend.dto.AuthRequest;
import com.chrisSchnellH.backend.dto.AuthResponse;
import com.chrisSchnellH.backend.dto.PasswordChangeRequest;
import com.chrisSchnellH.backend.security.UserDetailsImpl;
import com.chrisSchnellH.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        AuthResponse response = authService.authenticate(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeRequest request,
                                                 @AuthenticationPrincipal UserDetailsImpl userDetails) {
        authService.changePassword(userDetails.getUsername(), request);
        return ResponseEntity.ok("Password changed successfully");
    }
}
