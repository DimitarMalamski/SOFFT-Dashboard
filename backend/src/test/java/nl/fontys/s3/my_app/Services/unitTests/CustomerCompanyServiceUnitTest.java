package nl.fontys.s3.my_app.Services.unitTests;

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
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CustomerCompanyServiceUnitTest {

    private CustomerCompanyRepo customerCompanyRepo;
    private CompanyAddressRepo companyAddressRepo;
    private CompanyPersonRepo companyPersonRepo;

    private CustomerCompanyService service;

    @BeforeEach
    void setUp() {
        customerCompanyRepo = mock(CustomerCompanyRepo.class);
        companyAddressRepo = mock(CompanyAddressRepo.class);
        companyPersonRepo = mock(CompanyPersonRepo.class);

        service = new CustomerCompanyService(companyAddressRepo, companyPersonRepo, customerCompanyRepo);
    }

    @Test
    void testGetAll() {
        CustomerCompany company = new CustomerCompany();
        company.setUuid("comp-1");
        company.setName("ACME Corp");
        company.setCompanyContactId(123);

        CompanyAddress address = new CompanyAddress();
        address.setUuid("addr-1");
        address.setStreet("Main Street");
        address.setContactAddressId(1);
        address.setType(0);

        CompanyPerson person = new CompanyPerson();
        person.setUuid("person-1");
        person.setName("John Doe");
        person.setPersonContactId(789);

        when(customerCompanyRepo.findAll()).thenReturn(List.of(company));
        when(companyAddressRepo.findByCompanyUuid("comp-1")).thenReturn(Optional.of(address));
        when(companyPersonRepo.findByCompanyUuid("comp-1")).thenReturn(Optional.of(person));

        List<CustomerCompanyDTO> result = service.getAll();

        assertEquals(1, result.size());
        CustomerCompanyDTO dto = result.get(0);
        assertEquals("ACME Corp", dto.getName());
        assertEquals(1, dto.getAdresses().size());
        assertEquals("Main Street", dto.getAdresses().get(0).getStreet());
        assertEquals(1, dto.getPersons().size());
        assertEquals("John Doe", dto.getPersons().get(0).getName());
    }

    @Test
    void testGetByUuid_existingCompany() {
        CustomerCompany company = new CustomerCompany();
        company.setUuid("comp-2");
        company.setName("Beta Ltd");
        company.setCompanyContactId(456);

        CompanyAddress address = new CompanyAddress();
        address.setUuid("addr-2");
        address.setStreet("Second Street");
        address.setContactAddressId(2);
        address.setType(1);

        CompanyPerson person = new CompanyPerson();
        person.setUuid("person-2");
        person.setName("Alice Smith");
        person.setPersonContactId(789);


        when(customerCompanyRepo.findByUuid("comp-2")).thenReturn(Optional.of(company));
        when(companyAddressRepo.findByCompanyUuid("comp-2")).thenReturn(Optional.of(address));
        when(companyPersonRepo.findByCompanyUuid("comp-2")).thenReturn(Optional.of(person));

        CustomerCompanyDTO dto = service.getByUuid("comp-2");

        assertNotNull(dto);
        assertEquals("Beta Ltd", dto.getName());
        assertEquals(1, dto.getAdresses().size());
        assertEquals("Second Street", dto.getAdresses().get(0).getStreet());
        assertEquals(1, dto.getPersons().size());
        assertEquals("Alice Smith", dto.getPersons().get(0).getName());
    }

    @Test
    void testGetByUuid_nonExistingCompany() {
        when(customerCompanyRepo.findByUuid("unknown")).thenReturn(Optional.empty());

        CustomerCompanyDTO dto = service.getByUuid("unknown");

        assertNull(dto);
    }
}