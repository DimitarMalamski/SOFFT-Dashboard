package nl.fontys.s3.my_app.Services.integrationTests;

import nl.fontys.s3.my_app.Repositories.CustomerCompany.CompanyAddressRepo;
import nl.fontys.s3.my_app.Repositories.CustomerCompany.CompanyPersonRepo;
import nl.fontys.s3.my_app.Repositories.CustomerCompany.CustomerCompanyRepo;
import nl.fontys.s3.my_app.Services.CustomerCompanyService;
import nl.fontys.s3.my_app.models.CompanyAddress;
import nl.fontys.s3.my_app.models.CompanyPerson;
import nl.fontys.s3.my_app.models.CustomerCompany;
import nl.fontys.s3.my_app.models.dtos.CustomerCompany.CustomerCompanyDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Import(CustomerCompanyService.class)
@ActiveProfiles("test")
class CustomerCompanyServiceIntegrationTest {

    @Autowired private CustomerCompanyRepo customerCompanyRepo;
    @Autowired private CompanyAddressRepo companyAddressRepo;
    @Autowired private CompanyPersonRepo companyPersonRepo;

    @Autowired private CustomerCompanyService customerCompanyService;

    private CustomerCompany company;

    @BeforeEach
    void setup() {
        company = new CustomerCompany();
        company.setUuid("company-1");
        company.setName("Test Company");
        company.setCompanyContactId(123);

        customerCompanyRepo.save(company);

        var address = new CompanyAddress();
        address.setUuid("addr-1");
        address.setCompanyUuid(company.getUuid());
        address.setCity("Eindhoven");
        address.setStreet("Stratumseind 10");
        address.setContactAddressId(1);
        address.setType(0);

        companyAddressRepo.save(address);

        var person = new CompanyPerson();
        person.setUuid("pers-1");
        person.setCompanyUuid(company.getUuid());
        person.setName("Ivan");
        person.setEmail("ivan@example.com");
        person.setPersonContactId(789);

        companyPersonRepo.save(person);
    }

    @Test
    void testGetAll_returnsCompaniesWithAddressesAndPersons() {
        List<CustomerCompanyDTO> result = customerCompanyService.getAll();

        assertEquals(1, result.size());
        var dto = result.get(0);
        assertEquals("company-1", dto.getUuid().trim());
        assertEquals("Test Company", dto.getName());

        assertEquals(1, dto.getAdresses().size());
        assertEquals("Eindhoven", dto.getAdresses().get(0).getCity());

        assertEquals(1, dto.getPersons().size());
        assertEquals("Ivan", dto.getPersons().get(0).getName());
    }

    @Test
    void testGetByUuid_returnsCompanyWithAddressesAndPersons() {
        CustomerCompanyDTO dto = customerCompanyService.getByUuid("company-1");

        assertNotNull(dto);
        assertEquals("company-1", dto.getUuid().trim());
        assertEquals("Test Company", dto.getName());

        assertEquals(1, dto.getAdresses().size());
        assertEquals("Eindhoven", dto.getAdresses().get(0).getCity());

        assertEquals(1, dto.getPersons().size());
        // Same note as above:
        assertEquals("Ivan", dto.getPersons().get(0).getName());
    }

    @Test
    void testGetByUuid_returnsNullIfNotFound() {
        CustomerCompanyDTO dto = customerCompanyService.getByUuid("not-existing");
        assertNull(dto);
    }
}