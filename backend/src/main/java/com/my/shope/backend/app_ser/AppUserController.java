package com.my.shope.backend.app_ser;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
@RequestMapping("/api/app-users")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService service;

    @PostMapping
    public AppUser create(@RequestBody AppUser appUser){
        appUser.setId(null);
        return  service.create(appUser);
    }


   @GetMapping("/me")
   public Optional<AppUser> me(){
    return service.findByUsernameWithoutPassword(
            SecurityContextHolder.getContext().getAuthentication().getName()
    );

   }
    @GetMapping("/logout")
    public void logout(HttpSession httpSession){
        httpSession.invalidate();
    }

    @PostMapping("/login")
    public Optional<AppUser> login() {
        return me();
    }



}
