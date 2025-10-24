package nl.fontys.s3.my_app.Controllers;

import java.util.stream.Collectors;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import nl.fontys.s3.my_app.Repositories.CustomerCompany.*;
import nl.fontys.s3.my_app.models.dtos.DataResponseDTO;
import nl.fontys.s3.my_app.models.dtos.CustomerCompany.*;

@RestController
@RequestMapping("/api/customercompanies")
public class CustomerCompanyController {

    private final CompanyAddressRepo companyAddressRepo;
    private final CompanyPersonRepo companyPersonRepo;
    private final CustomerCompanyRepo customerCompanyRepo;

    public CustomerCompanyController(CompanyAddressRepo companyAddressRepo, CompanyPersonRepo companyPersonRepo,
            CustomerCompanyRepo customerCompanyRepo) {
        this.companyAddressRepo = companyAddressRepo;
        this.companyPersonRepo = companyPersonRepo;
        this.customerCompanyRepo = customerCompanyRepo;
    }

    @GetMapping
    public DataResponseDTO<CustomerCompanyDTO> getAll() {

        List<CustomerCompanyDTO> allCompanies = customerCompanyRepo.findAll()
                .stream().map(cc -> new CustomerCompanyDTO(
                        cc,
                        companyAddressRepo.findByCompanyUuid(cc.getUuid())
                                .stream()
                                .map(CompanyAddressDTO::fromEntity)
                                .collect(Collectors.toList()),

                        companyPersonRepo.findByCompanyUuid(cc.getUuid())
                                .stream()
                                .map(CompanyPersonDTO::fromEntity)
                                .collect(Collectors.toList())))
                .collect(Collectors.toList());

        return new DataResponseDTO<CustomerCompanyDTO>(allCompanies);
    }
}
