package nl.fontys.s3.my_app.Controllers;

import nl.fontys.s3.my_app.models.dtos.AI.ChatMessageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody ChatMessageRequest request) {
        String response = aiService.sendMessage(request);
        return ResponseEntity.ok(response);
    }
}