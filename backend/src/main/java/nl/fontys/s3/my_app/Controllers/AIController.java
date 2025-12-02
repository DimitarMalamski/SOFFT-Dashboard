package nl.fontys.s3.my_app.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import nl.fontys.s3.my_app.Services.AIService;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/generate-insight")
    public ResponseEntity<String> generateInsight() {
        String insight = aiService.generateInsight();
        return ResponseEntity.ok(insight);
    }
}
