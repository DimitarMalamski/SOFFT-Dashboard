package nl.fontys.s3.my_app.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import nl.fontys.s3.my_app.Services.CustomerCompanyService;
import nl.fontys.s3.my_app.models.dtos.DataResponseDTO;
import nl.fontys.s3.my_app.models.dtos.SingleDataResponseDTO;
import nl.fontys.s3.my_app.models.dtos.CustomerCompany.*;

@RestController
@RequestMapping("/api/customercompanies")
public class CustomerCompanyController {

    private final CustomerCompanyService customerCompanyService;

    public CustomerCompanyController(CustomerCompanyService customerCompanyService) {
        this.customerCompanyService = customerCompanyService;
    }
   
    @GetMapping
    public DataResponseDTO<CustomerCompanyDTO> getAll() {
        List <CustomerCompanyDTO> allCompanies = customerCompanyService.getAll();
        return new DataResponseDTO<CustomerCompanyDTO>(allCompanies);
    }

    @GetMapping("/{uuid}")
    public SingleDataResponseDTO<CustomerCompanyDTO> getByUuid(@PathVariable String uuid) {
        CustomerCompanyDTO customerCompanyDTO = customerCompanyService.getByUuid(uuid);
        return new SingleDataResponseDTO<CustomerCompanyDTO>(customerCompanyDTO);
    }
}
