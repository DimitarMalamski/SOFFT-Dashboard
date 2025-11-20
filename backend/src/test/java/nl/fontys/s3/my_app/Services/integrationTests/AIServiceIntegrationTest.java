package nl.fontys.s3.my_app.Services.integrationTests;

import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.junit5.WireMockExtension;
import nl.fontys.s3.my_app.Services.AIService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class AIServiceIntegrationTest {

    @Autowired
    private AIService aiService;

    @RegisterExtension
    static WireMockExtension wireMock = WireMockExtension.newInstance()
            .options(wireMockConfig().port(11434))
            .build();

    @Test
    void testGenerateInsight() {
        wireMock.stubFor(WireMock.post(WireMock.urlEqualTo("/api/generate"))
                .willReturn(WireMock.aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBody("{\"response\": \"Test insight data\"}")));

        String insight = aiService.generateInsight();
        assertEquals("Test insight data", insight);
    }
}