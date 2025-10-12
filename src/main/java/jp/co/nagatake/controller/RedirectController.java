package jp.co.nagatake.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController {
    @GetMapping("/")
    public String redirectToTop() {
        return "redirect:/html/top.html";
    }
}