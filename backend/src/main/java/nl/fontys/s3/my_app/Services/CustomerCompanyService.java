package nl.fontys.s3.my_app.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import nl.fontys.s3.my_app.Repositories.CustomerCompany.CompanyAddressRepo;
import nl.fontys.s3.my_app.Repositories.CustomerCompany.CompanyPersonRepo;
import nl.fontys.s3.my_app.Repositories.CustomerCompany.CustomerCompanyRepo;
import nl.fontys.s3.my_app.models.dtos.CustomerCompany.CompanyAddressDTO;
import nl.fontys.s3.my_app.models.dtos.CustomerCompany.CompanyPersonDTO;
import nl.fontys.s3.my_app.models.dtos.CustomerCompany.CustomerCompanyDTO;

@Service
public class CustomerCompanyService {

    private final CompanyAddressRepo companyAddressRepo;
    private final CompanyPersonRepo companyPersonRepo;
    private final CustomerCompanyRepo customerCompanyRepo;

    public CustomerCompanyService(CompanyAddressRepo companyAddressRepo, CompanyPersonRepo companyPersonRepo,
            CustomerCompanyRepo customerCompanyRepo) {
        this.companyAddressRepo = companyAddressRepo;
        this.companyPersonRepo = companyPersonRepo;
        this.customerCompanyRepo = customerCompanyRepo;
    }

    public List<CustomerCompanyDTO> getAll() {
        return customerCompanyRepo.findAll()
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
    }

    public CustomerCompanyDTO getByUuid(String uuid) {
        return customerCompanyRepo.findByUuid(uuid)
                .map(cc -> new CustomerCompanyDTO(
                        cc,
                        companyAddressRepo.findByCompanyUuid(cc.getUuid())
                                .stream()
                                .map(CompanyAddressDTO::fromEntity)
                                .collect(Collectors.toList()),

                        companyPersonRepo.findByCompanyUuid(cc.getUuid())
                                .stream()
                                .map(CompanyPersonDTO::fromEntity)
                                .collect(Collectors.toList())))
                .orElse(null);
    }
}
