package nl.fontys.s3.my_app.Controllers;

import nl.fontys.s3.my_app.Services.ProductService;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/paged")
    public ResponseEntity<?> getProductsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "16") int size,
            @RequestParam(required = false) String name,
            @RequestParam(required = false, name = "class") String classType,
            @RequestParam(required = false) String color
    ) {
        name = (name == null || name.isBlank()) ? null : name;
        color = (color == null || color.isBlank()) ? null : color;
        classType = (classType == null || classType.isBlank()) ? null : classType;

        return ResponseEntity.ok(
                productService.getProductsPaged(page, size, name, classType, color)
        );
    }
    
    @GetMapping("/{id}")
    public ProductDTO getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }


}
